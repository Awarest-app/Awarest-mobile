import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../type/route.type';
import colors from '../../styles/colors';
import { fonts } from '../../styles/fonts';

interface QuestionsProps {
  questionId: number;
  content: string;
}

const Questions = ({
  questionId, content
}: QuestionsProps) => {

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.questionBox}
      onPress={() => {//todo: question_id 확인
        navigation.navigate('Answer', { question_id: 1 });
      }}
    >
      <Text style={styles.questionText}>{content}</Text>
      <Text style={styles.tapToReflect}>Tap to reflect</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  questionBox: {
    borderColor: colors.card_border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    gap: 10,
    backgroundColor: colors.white_80,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  questionText: {
    fontFamily: fonts.roboto_medium,
    color: colors.black,
    fontSize: 20,
  },
  tapToReflect: {
    fontFamily: fonts.lato_regular,
    fontSize: 18,
    color: colors.text_hint,
  },
});

export default Questions;