import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';

const ProfileGradient = React.memo(() => {
  return (
    <LinearGradient
      colors={[colors.profile_gradientStart, colors.profile_gradientEnd]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      // 화면 전체를 채우도록
      style={styles.gradientStyle}
    />
  );
});

const styles = StyleSheet.create({
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10, // 원하는 borderRadius 값 설정
    overflow: 'hidden', // 부모 컴포넌트 경계 안에서 자르기
  },
});

export default ProfileGradient;
