import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {ActivityIndicator, Alert, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function OAuthScreen({navigation}) {
  const [loading, setLoading] = useState(true);

  const handleNavigation = event => {
    const {url} = event;

    // 임시 토큰을 포함한 URL 처리
    if (url.startsWith('http://localhost:8081/temp-login')) {
      const tempToken = extractTempToken(url);

      // 임시 토큰으로 JWT 요청
      fetch('https://localhost:3000/auth/google/exchange-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({tempToken}),
      })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            console.log('JWT:', data.token);
            // JWT 저장 (예: AsyncStorage에 저장)
            saveToken(data.token);

            // 다음 화면으로 이동
            navigation.replace('Home');
          } else {
            Alert.alert('Error', 'Failed to retrieve token.');
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Something went wrong.');
        });
    }
  };

  const extractTempToken = url => {
    const queryParams = new URL(url).searchParams;
    return queryParams.get('tempToken');
  };

  const saveToken = async token => {
    // AsyncStorage 또는 SecureStore를 사용해 JWT를 저장
    try {
      await AsyncStorage.setItem('jwtToken', token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <WebView
        source={{uri: 'http://localhost:3000/auth/google'}} // OAuth 시작점
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigation}
        style={{flex: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
