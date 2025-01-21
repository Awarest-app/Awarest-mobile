import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import colors from '../styles/colors';
// import {getQuestions} from '../api/api';
import EditIcon from '../assets/svg/edit-icon.svg';
import {QuestionProps} from '../type/api.type';
import {fonts} from '../styles/fonts';
import {globalStyle} from '../styles/global';
import Accordion from '../components/Hooks/Accordion';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  // const [todayQuestions, setTodayQuestion] = useState<QuestionProps>([]);

  // const handleGetTodayQuestions = async () => {
  //   try {
  //     const res = await getQuestions();
  //     // const data = await response.json();
  //     console.log('res', res);
  //     setTodayQuestion(res);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  const dummyQuestions: QuestionProps[] = [
    {
      id: 1,
      type: 'multiple-choice',
      content: 'What is your favorite color?',
    },
    {
      id: 2,
      type: 'open-ended',
      content: 'Describe your ideal vacation destination.',
    },
    {
      id: 3,
      type: 'true-false',
      content: 'Do you enjoy working in teams?',
    },
  ];

  const previousAnswers = [
    {
      question: 'What made you feel proud todaydsasd asd asd asdasd adsasd asd asd ds?',
      answers: [
        {
          text: 'I completed a challenging project at work ahead of schedule.',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiudy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          date: '2025-01-24 01:40 PM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiudy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          date: '2025-01-24 01:40 PM',
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
    {
      question: "Third dummy question",
      answers: [
        {
          text: 'hello wolrdes',
          date: '2025-01-24 10:25 AM',
        },
      ],
    },
  ];

  // useEffect(() => {
  //   handleGetTodayQuestions();
  // }, []);

  return (
    <View style={styles.container}>
      <MemoGradient />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Questions</Text>
          {dummyQuestions &&
            dummyQuestions.map(question => (
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
            <Accordion
              title={item.question}
              key={index}
            >
              <View style={styles.prevQuestionContainer} key={index}>
                {item.answers.map((answer, ansIndex) => (
                  <View
                    style={styles.answerContainer}
                    key={ansIndex}
                    // onStartShouldSetResponder={() => true} //자식요소가 touch event 소비하게 하기
                  >
                    <Text style={styles.answerText}>{answer.text}</Text>
                    <View style={styles.answerBottom}>
                      <Text style={styles.answerDate}>{answer.date}</Text>
                      <TouchableOpacity>
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </Accordion>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const calculateDp = (px: number) => {
  return (px * width) / 320;
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 14,
    paddingVertical: 24,
    gap: 16,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: colors.card_border,
    // elevation: 2,
    // opacity: 0.9,
  },
  cardTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: calculateDp(18),
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 12,
  },
  questionBox: {
    borderColor: colors.card_border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    gap: 8,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  questionText: {
    fontFamily: fonts.roboto_medium,
    fontSize: calculateDp(16),
  },
  tapToReflect: {
    fontFamily: fonts.lato_regular,
    // fontFamily: fonts.roboto_regular,
    fontSize: calculateDp(14),
    color: colors.text_hint,
  },
  prevQuestionContainer: {
    // height: '100%',
    gap: 16,
  },
  answerContainer: {
    backgroundColor: 'white',
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
    fontSize: calculateDp(14),
    color: colors.prev_answer,
  },
  answerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerDate: {
    fontFamily: fonts.roboto_regular,
    fontSize: calculateDp(14),
    color: colors.text_hint,
  },
});
