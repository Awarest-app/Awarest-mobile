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
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ProfileGradient;
