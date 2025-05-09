import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import colors from './colors';
import {fonts} from './fonts';

const {height} = Dimensions.get('window');

export const globalStyle = StyleSheet.create({
  
  defaultTabBarStyle: {
    height: height * 0.088,
    borderTopWidth: 1,
    borderTopColor: colors.card_border,
    backgroundColor: 'rgba(237, 237, 237, 0.75)',
    position: 'absolute',
  },
  logo: {
    fontSize: 42,
    color: colors.primary,
    fontFamily: fonts.logo,
    height: 52,
    letterSpacing: -2,
  },

  gradientContainer: {
    flex: 1,
  },

  bottom_background: {
    backgroundColor: 'rgb(250, 250, 250, 0.5)',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.card_border,
  }
});
