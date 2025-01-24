import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'; // 추가

import UnFire from '../assets/svg/unfire-icon.svg';
import Fire from '../assets/svg/fire-icon.svg';
import Leaf from '../assets/svg/leaf-icon.svg';
import Award from '../assets/svg/award-icon.svg';
import {fonts} from '../styles/fonts';

export function Header() {
  // Safe Area insets
  const datas = {
      newAnswer: true,
      day: '7',
      Resources: '1000',
      level: '1',
    };
  const insets = useSafeAreaInsets();
  const [isFire, setIsFire] = useState(false);
  useEffect(() => {
    //todo axios
  }, []);

  return (
    <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <View style={styles.iconButton}>
          {isFire ? <Fire/> : <UnFire/>}
          <Text style={styles.dataText}>{datas.day} Days</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Leaf/>
          <Text style={styles.dataText}>{datas.Resources}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Award/>
          <Text style={styles.dataText}>level {datas.level}</Text>
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
    marginBottom: 30,
    backgroundColor: 'transparent', // 투명 배경
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent', // 투명 배경
    elevation: 3,
    width: '100%',
  },
  iconButton: {
    flexDirection: 'row', // 가로 정렬 설정
    alignItems: 'center', // 아이콘과 텍스트 수직 중앙 정렬
    gap: 2, // 아이콘과 텍스트 간격
  },
  dataText: {
    fontFamily: fonts.inter_semibold,
    fontSize: 18,
    marginLeft: 8, // 아이콘과 텍스트 사이 여백
  },
});
