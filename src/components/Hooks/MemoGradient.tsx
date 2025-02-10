import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';

const MemoGradient = React.memo(() => {
  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]}
      start={{x: 0, y: 0.4}}
      end={{x: 0, y: 1}}
      style={StyleSheet.absoluteFillObject}
    />
  );
});

export default MemoGradient;
