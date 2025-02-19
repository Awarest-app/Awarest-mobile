import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Questions from './Questions';
import colors from '../../styles/colors';
import {fonts} from '../../styles/fonts';
import {Questiontypes} from '../../type/question.type';
import {axiosGetQuestions} from '../../api/axios';

interface QuestionsContainerProps {
}

export default function QuestionsCard({
}: QuestionsContainerProps) {
  const [questions, setQuestions] = useState<Questiontypes[]>([]);

  const handleGetQuestions = async () => {
    try {
      const response: any = await axiosGetQuestions();
      setQuestions(response.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    handleGetQuestions();
  }, []);
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>Today's Questions</Text>
      </View>
      {questions && questions.length > 0 ? (
        questions.map(question => (
          <Questions
            key={question.questionId}
            questionId={question.questionId}
            content={question.content}
          />
        ))
      ) : (
      <View style={styles.questionDone}>
        <Text style={styles.questionDoneText}>🎊 Great job! 🎊</Text>
        <Text style={styles.questionDoneText}>
          You've answered all of today's questions!
        </Text>
      </View>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 14,
    paddingVertical: 24,
    gap: 10,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: colors.card_border,
  },
  cardTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.black,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 12,
  },
  questionDone: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionDoneText: {
    fontFamily: fonts.roboto_medium,
    textAlign: 'center',
    fontSize: 22,
  },
});