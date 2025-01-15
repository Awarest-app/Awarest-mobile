// src/components/Header.tsx
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context'; // 추가
import {RootStackParamList} from '../type/route.type';

export function Header() {
  // Safe Area insets
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    // paddingTop: insets.top을 줘서 상태 표시줄과 겹치지 않게
    <View
      style={[
        styles.headerContainer,
        {paddingTop: insets.top}, // 추가
      ]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerTitle}>7 Days</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Anwser')}>
          <Text style={styles.headerTitle}>answer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.headerTitle}>profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Result')}>
          <Text style={styles.headerTitle}>Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // 기존에 height: 56이라면, insets.top을 추가해줄 수도 있습니다.
    // 예: height: 56 + insets.top (동적으로 적용하고 싶다면 inline 스타일에서 처리)
    // 여기서는 height는 빼고 paddingTop만 주는 방식도 괜찮습니다.
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 3,
    width: '100%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
