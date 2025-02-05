import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { globalStyle } from '../styles/global';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';

export default function Logo() {
  return (
    <>
      <Text style={globalStyle.logo}>Awarest</Text>
      <Text style={styles.subtitle}>Your awareness forest</Text>
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: colors.textSubtle,
    fontFamily: fonts.roboto_medium,
    letterSpacing: -1,
  },
});