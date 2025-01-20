import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';

export default function SettingProfileScreen() {
  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  return (
    <View style={styles.container}>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
      <Text>SettingPSSSSSSSS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});
