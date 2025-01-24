import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Warning from '../../assets/svg/warning-icon.svg';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
}: DeleteModalProps ) => {

  return (
    <Modal visible={isOpen} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Warning/>
          <Text style={styles.modalText}>
            Are you sure?
          </Text>
          <Text style={styles.modalSubText}>
            It cannot be undone
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.delete_button}]}
              onPress={onSubmit}
            >
              <Text style={[styles.modalButtonText, {color: colors.delete_text}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
});

export default DeleteModal;