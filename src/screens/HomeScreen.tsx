import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';
import {Header} from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import {getQuestions} from '../api/api';
import {QuestionProps} from '../type/api.type';
import {fonts} from '../styles/fonts';
import {globalStyle} from '../styles/global';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [todayQuestions, setTodayQuestion] = useState<QuestionProps>([]);

  const handleGetTodayQuestions = async () => {
    try {
      const res = await getQuestions();
      // const data = await response.json();
      console.log('res', res);
      setTodayQuestion(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const previousAnswers = [
    {
      question: 'What made you feel proud today?',
      answers: [
        {
          text: 'I completed a challenging project at work ahead of schedule.',
          date: '2025-01-24 10:20 AM',
        },
      ],
    },
    {
      question: "What's one thing you learned?",
      answers: [
        {
          text: 'React Native styling techniques',
          date: '2025-01-24 10:25 AM',
        },
      ],
    },
  ];

  useEffect(() => {
    handleGetTodayQuestions();
  }, []);

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0.4}} // 그라디언트 시작점
      end={{x: 0, y: 1}} // 그라디언트 종료점
      style={globalStyle.gradientContainer} // 전체 배경 적용
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Header />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Questions</Text>
            {todayQuestions &&
              todayQuestions.map(question => (
                <TouchableOpacity
                  key={question.id}
                  style={styles.questionBox}
                  onPress={() => {
                    navigation.navigate('Anwser');
                  }}>
                  <Text style={styles.questionText}>{question.content}</Text>
                  <Text style={styles.tapToReflect}>Tap to reflect</Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Answers</Text>
            {previousAnswers.map((item, index) => (
              <View key={index} style={styles.previousAnswerBlock}>
                <Text style={[styles.questionText, styles.previousQuestion]}>
                  {item.question}
                </Text>
                {item.answers.map((answer, ansIndex) => (
                  <View key={ansIndex} style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer.text}</Text>
                    <Text style={styles.answerDate}>{answer.date}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* 나중에 제외 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Answers</Text>
            {previousAnswers.map((item, index) => (
              <View key={index} style={styles.previousAnswerBlock}>
                <Text style={[styles.questionText, styles.previousQuestion]}>
                  {item.question}
                </Text>
                {item.answers.map((answer, ansIndex) => (
                  <View key={ansIndex} style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer.text}</Text>
                    <Text style={styles.answerDate}>{answer.date}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    opacity: 0.9,
  },
  cardTitle: {
    marginLeft: 8,
    marginTop: 16,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionBox: {
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    gap: 5,
    // backgroundColor: '#fafafa',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tapToReflect: {
    fontSize: 14,
    color: '#888',
  },
  previousAnswerBlock: {
    marginBottom: 16,
  },
  previousQuestion: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  answerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  answerDate: {
    fontSize: 12,
    color: '#888',
  },
});
