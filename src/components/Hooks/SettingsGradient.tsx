import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';

const { height } = Dimensions.get('window'); 

const SettingsGradient = React.memo(() => {
  return (
    <LinearGradient
      colors={[colors.settings_gradientStart, colors.settings_gradientEnd]}
      start={{x: 0, y: 0.1}}
      end={{x: 0, y: 0.5}}
      style={styles.gradientStyle}
    />
  );
});

const styles = StyleSheet.create({
  gradientStyle: {
    height: height * 1.4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
});

export default SettingsGradient;
