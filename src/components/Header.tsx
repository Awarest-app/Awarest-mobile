import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'; // 추가
import {RootStackParamList} from '../type/route.type';

import FireIcon from '../assets/svg/fire-blue-icon.svg';
import StarIcon from '../assets/svg/star-icon.svg';

export function Header() {
  // Safe Area insets
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton} // 스타일 추가
          onPress={() => navigation.navigate('Home')}>
          <FireIcon width={16} height={16} />
          <Text style={styles.headerTitle}>7 Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton} // 스타일 추가
          onPress={() => navigation.navigate('Anwser')}>
          <StarIcon width={16} height={16} />
          <Text style={styles.headerTitle}>answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton} // 스타일 추가
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.headerTitle}>level 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // marginVertical: 20
    marginBottom: 40,
    backgroundColor: 'transparent', // 투명 배경
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingVertical: 12,
    backgroundColor: 'transparent', // 투명 배경
    elevation: 3,
    width: '100%',
  },
  iconButton: {
    flexDirection: 'row', // 가로 정렬 설정
    alignItems: 'center', // 아이콘과 텍스트 수직 중앙 정렬
    gap: 8, // 아이콘과 텍스트 간격
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // 아이콘과 텍스트 사이 여백
  },
});
