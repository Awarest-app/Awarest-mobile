import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import MemoGradient from '../Hooks/MemoGradient';
import Logo from '../Logo';

interface HomeLoadingProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function HomeLoading({
  isOpen,
  setIsOpen,
}: HomeLoadingProps) {
  setTimeout(() => {
    setIsOpen(false);
  }, 1000);
  return (
    <Modal
    visible={isOpen}
    animationType="none"
    style={styles.background}
    >
      <MemoGradient />
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
  }
});