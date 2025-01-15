import React from 'react';
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

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const todayQuestions = [
    {id: 1, title: 'What made you feel proud today?'},
    {id: 2, title: "What's one thing you learned?"},
    {id: 3, title: 'How did you take care of yourself?'},
  ];

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

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0.4}} // 그라디언트 시작점
      end={{x: 0, y: 1}} // 그라디언트 종료점
      style={styles.gradientBackground} // 전체 배경 적용
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Header />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Questions</Text>
            {todayQuestions.map(question => (
              <TouchableOpacity
                key={question.id}
                style={styles.questionBox}
                onPress={() => {
                  navigation.navigate('Anwser');
                }}>
                <Text style={styles.questionText}>{question.title}</Text>
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
  gradientBackground: {
    flex: 1, // 화면 전체를 채우기 위해 flex: 1 설정
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // 배경 투명 설정
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  questionBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
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
