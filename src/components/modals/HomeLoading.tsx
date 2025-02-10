import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import Logo from '../Logo';
import colors from '../../styles/colors';
interface HomeLoadingProps {
  isOpen: boolean;
}

export default function HomeLoading({
  isOpen,
}: HomeLoadingProps) {
  return (
    <Modal
    visible={isOpen}
    animationType="none"
    style={styles.background}
    >
      <View style={styles.background}>
        <Logo />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green_gradientStart
  }
});