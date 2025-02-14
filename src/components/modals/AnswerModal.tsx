import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function AnswerModal ({
  isOpen,
  onClose,
  onSubmit,
}: AnswerModalProps ){
  return (
    <Modal visible={isOpen} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure?
          </Text>
          <Text style={styles.modalSubText}>
            you won't be able to revert this action
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.modal_gray_button}]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}
              onPress={onSubmit}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
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
    backgroundColor: colors.white,
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
