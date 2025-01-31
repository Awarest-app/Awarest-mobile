import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
interface LevelModalProps {
  isOpen: boolean;
  data: {
    levelXP: number;
    totalXP: number;
    prevXP:number;
    level: number;
  };
  onClose: () => void;
  onSubmit?: () => void;
}
const LevelModal = ({
  data,
  isOpen,
  onClose,
}: LevelModalProps ) => {
  const levelXP = data.levelXP - data.prevXP;
  const totalXP = data.totalXP - data.prevXP;
  const level = data.level;
  const progress = Math.min(totalXP / levelXP, 1);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  if (isOpen) {
    console.log('Progress:', progress); 
    animatedWidth.stopAnimation();
    animatedWidth.setValue(0);
    Animated.timing(animatedWidth, {
      toValue: progress * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Level {level}</Text>
              <Text style={styles.modalSubText}>
                You need {levelXP - totalXP} XP to reach Level {level + 1}
              </Text>
              <View style={styles.expBar}>
                {/* 경험치 바 */}
                <View style={styles.barBackground}>
                  <Animated.View
                    style={[
                      styles.barProgress,
                      {
                        width: animatedWidth.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'], // '90%'로 바 전체 너비와 일치하게 설정
                        }),
                        overflow: 'hidden',
                        // backgroundColor: 'red',
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={['#0D9488', '#3ED2C4']} // 그라데이션 색상
                      start={{x: 0, y: 0}} // 시작 좌표
                      end={{x: 1, y: 0}} // 끝 좌표
                      style={{flex: 1}} // 그라데이션 스타일
                    />
                  </Animated.View>
                </View>
                <Text style={styles.text}>
                  {totalXP} / {levelXP} XP
                </Text>
              </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalContent: {
    width: '80%',
    height: 250,
    gap: 20,
    paddingVertical: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    fontFamily: fonts.roboto_medium,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubText: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  expBar: {
    width: '100%',
    alignItems: 'center',
  },
  barBackground: {
    width: '90%', // 바의 전체 너비
    height: 25, // 바의 높이
    borderRadius: 20, // 둥근 모서리
    backgroundColor: '#e0e0e0', // 회색 배경
    overflow: 'hidden',
  },
  barProgress: {
    height: '100%',
  },
  text: {
    fontFamily: fonts.lato_regular,
    marginTop: 10,
    fontSize: 16,
    color: colors.black,
  },
});

export default LevelModal;