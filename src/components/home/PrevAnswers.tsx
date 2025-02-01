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
  questionIndex: number;
  subquestionIndex: number;
  handleSaveEdit: (newText: string, questionIndex:number, subquestionId:number ,subquestionIndex: number) => void; // ✅ 수정 완료 후 저장하는 함수
}

const PrevAnswers = ({
  subquestion, 
  subquestionId,
  questionIndex,
  subquestionIndex,
  handleSaveEdit,
}: PrevAnswersProps) => {
  // ✅ EditModal 상태 관리
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAnswer, setEditAnswer] = useState<string>(subquestion.answer);
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // 로케일을 명시적으로 지정하고 하이픈 처리
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  
    // 포매팅 후 문자열 가공
    return formatter.format(date)
      .replace(/\//g, '-') // 슬래시 → 하이픈
      .replace(', ', ' '); // 날짜/시간 구분자 제거
  };
  const parsedDate = parseDate(subquestion.date);
  return (
    <View style={styles.prevAnswers}>
      {/* ✅ EditModal 추가 */}
      <EditModal
        isOpen={isEditModalOpen}
        currentValue={editAnswer}
        questionIndex={questionIndex}
        subquestion={subquestion.text}
        subquestionId={subquestionId}
        subquestionIndex={subquestionIndex}
        onClose={() => setIsEditModalOpen(false)}
        handleSaveEdit={handleSaveEdit}
      />
      <View style={styles.subquestionContainer}>
        <Text style={styles.subquestionText}>{subquestion.text}</Text>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{subquestion.answer}</Text>
          <View style={styles.answerBottom}>
            <Text style={styles.answerDate}>{parsedDate}</Text>
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