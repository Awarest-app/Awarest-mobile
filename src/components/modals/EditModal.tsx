import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
import EditIcon from '../../assets/svg/modal-edit-icon.svg';
interface EditModalProps {
  isOpen: boolean;
  currentValue: string;
  subquestion: string;
  subquestionIndex: number;
  onClose: () => void;
  handleSaveEdit: (newText: string, subquestionIndex: number) => void;
}

const EditModal = ({
  isOpen,
  currentValue,
  subquestion,
  subquestionIndex,
  onClose,
  handleSaveEdit,
}: EditModalProps) => {
  const [text, setText] = useState<string>(currentValue);
  
  // useEffect(() => {//처음 인식
  //   setText(currentValue);
  // }, [currentValue]);

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <EditIcon/>
            <Text style={styles.modalTitle}>{subquestion}</Text>
          </View>
          <TextInput
            style={styles.modalInput}
            value={text}
            onChangeText={setText}
            multiline
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.modal_gray_button}]}
              onPress={() => {
                onClose();
                setText(currentValue);
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}
              onPress={() => {
                handleSaveEdit(text, subquestionIndex);
                onClose();
              }}
            >
              <Text style={styles.modalButtonText}>Save</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 60,//위치 조정
  },
  modalContent: {
    width: '80%',
    gap: 14,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    width: '80%',
    fontSize: 18,
    fontFamily: fonts.roboto_medium,
  },
  modalInput: {
    fontFamily: fonts.lato_regular,
    width: '100%',
    height: 140,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    padding: 10,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'flex-end',
  },
  modalButton: {
    width: 80,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  modalButtonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: '#F0F9F8',
  },
});

export default EditModal;