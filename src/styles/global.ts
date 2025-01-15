import {StyleSheet} from 'react-native';
import colors from './colors';
import {fonts} from './fonts';

export const GlobalStyle = StyleSheet.create({
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.logo_font,
  },
  gradientContainer: {
    flex: 1,
  },
});
