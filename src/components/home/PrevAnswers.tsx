import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnswerTypes, SubquestionTypes } from '../../type/answer.type';
import EditIcon from '../../assets/svg/edit-icon.svg';
import colors from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import EditModal from '../modals/EditModal'; // ✅ EditModal 추가

interface PrevAnswersProps {
  subquestion: SubquestionTypes;
  subquestionId: number;
  handleSaveEdit: (newText: string, subquestionIndex: number) => void; // ✅ 수정 완료 후 저장하는 함수
}

const PrevAnswers = ({
  subquestion, 
  subquestionId,
  handleSaveEdit,
}: PrevAnswersProps) => {
  // ✅ EditModal 상태 관리
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAnswer, setEditAnswer] = useState<string>(subquestion.answer);

  return (
    <View style={styles.prevAnswers}>
      {/* ✅ EditModal 추가 */}
      <EditModal
        isOpen={isEditModalOpen}
        currentValue={editAnswer}
        subquestion={subquestion.text}
        onClose={() => setIsEditModalOpen(false)}
        subquestionId={subquestionId}
        handleSaveEdit={handleSaveEdit}
      />
      <View style={styles.subquestionContainer}>
        <Text style={styles.subquestionText}>{subquestion.text}</Text>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{subquestion.answer}</Text>
          <View style={styles.answerBottom}>
            <Text style={styles.answerDate}>{subquestion.date}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditModalOpen(true)}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prevAnswers: {
  },
  subquestionContainer: {
    gap: 10,
  },
  subquestionText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: colors.primary,
  },
  answerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.card_border,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  answerText: {
    fontFamily: fonts.lato_regular,
    fontSize: 18,
    color: colors.prev_answer,
  },
  answerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerDate: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: colors.text_hint,
  },
  editButton: {},
});

export default PrevAnswers;