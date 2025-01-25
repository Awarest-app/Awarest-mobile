import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
interface LevelModalProps {
  isOpen: boolean;
  data: { levelXP: number; totalXP: number; level: number };
  onClose: () => void;
  onSubmit: () => void;
}

const LevelModal = ({
  data,
  isOpen,
  onClose,
}: LevelModalProps ) => {
  const levelXP = data.levelXP;  
  const currentXP = data.totalXP;
  const progress = Math.min(currentXP / levelXP, 1);
  console.log('Progress:', progress); 
  return (
    <Modal visible={isOpen} transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure?</Text>
              <Text style={styles.modalSubText}>It cannot be undone</Text>
              <View style={styles.expBar}>
                {/* 경험치 바 */}
                <View style={styles.barBackground}>
                  <View style={[styles.barProgress, { width: `${progress * 100}%` }]} />
                </View>
                {/* 현재 XP / 레벨 XP */}
                <Text style={styles.text}>
                  {currentXP} / {levelXP} XP
                </Text>
              </View>
              {/* <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.modal_gray_button}]}
                  onPress={onClose}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton}
                  onPress={onSubmit}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </View> */}
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
    height: '40%',
    gap: 20,
    paddingVertical: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 22,
    fontFamily: fonts.roboto_medium,
    textAlign: 'center',
  },
  modalSubText: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: colors.text_hint,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  modalButton: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  modalButtonText: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: '#F0F9F8',
  },
  expBar: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  barBackground: {
    width: '90%', // 바의 전체 너비
    height: 20, // 바의 높이
    backgroundColor: '#e0e0e0', // 회색 배경
    borderRadius: 10, // 둥근 모서리
    overflow: 'hidden',
  },
  barProgress: {
    height: '100%',
    backgroundColor: '#fbc02d', // 노란색 (진행된 부분)
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default LevelModal;