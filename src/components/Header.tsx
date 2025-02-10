import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UnFire from '../assets/svg/unfire-icon.svg';
import Fire from '../assets/svg/fire-icon.svg';
import Leaf from '../assets/svg/leaf-icon.svg';
import Award from '../assets/svg/award-icon.svg';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {useProfileStore} from '../zustand/useProfileStore';
export function Header() {
  const {is_first_response, profile} = useProfileStore();
  const datas = profile
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <View style={styles.iconButton}>
          {is_first_response ? <Fire/> : <UnFire/>}
          <Text style={styles.dataText}>{datas.dayStreak} Days</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}
          disabled={true}
        >
          <Leaf/>
          <Text style={styles.dataText}>Soon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}
          disabled={true}
        >
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
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    width: '100%',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  dataText: {
    fontFamily: fonts.inter_semibold,
    fontSize: 18,
    marginLeft: 8,
    color : colors.black,
  },
});
