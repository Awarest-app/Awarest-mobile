import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import colors from '../styles/colors';
// import {getQuestions} from '../api/api';
import EditIcon from '../assets/svg/edit-icon.svg';
import PrevIcon from '../assets/svg/prev-icon.svg';
import NextIcon from '../assets/svg/next-icon.svg';
import {QuestionProps} from '../type/api.type';
import {fonts} from '../styles/fonts';
import {globalStyle} from '../styles/global';
import Accordion from '../components/Hooks/Accordion';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const [answersIndex, setAnswersIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const answersPerPage = 3;
  const [pageChanged, setPageChanged] = useState<boolean>(false);
  const [closeAccordion, setCloseAccordion] = useState<boolean>(false);
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

  //todo : 이거 axios 날릴때 남은건냅두고 처음에 6개, 그뒤에 6개씩추가
  const previousAnswers = [
    {
      question: 'What made you feel proud todaydsasd asd asd asdasd adsasd asd asd ds?',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiud2222222y ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        }
      ],
    },
    {
      question: 'What made you feel proud todaydsasd asd asd asdasd adsasd asd asd ds?',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqi222222uasukdy ukyd wqi5555jbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        }
      ],
    },
    {
      question: 'What made you feel proud todaydsasd asd asd asdasd adsasd asd asd ds?',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqi2222222udy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        },
        {
          text: 'teystuy uasukdy ukyd wqi3333333udy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer3',
          date: '2025-01-24 01:40 PM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiu444444444dy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer4',
          date: '2025-01-24 01:40 PM',
        },
        {
          text: 'teystuy uasukdy ukyd wqi666udy ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer5',
          date: '2025-01-24 01:40 PM',
        },
      ],
    },
    {
      question: 'next page test',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiud2222222y ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        }
      ],
    },
    {
      question: 'next page test',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiud2222222y ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        }
      ],
    },
    {
      question: 'next page test',
      subquestions: [
        {
          text: 'subquestionasdhkjasdhkj1323987',
          answer: 'answer1',
          date: '2025-01-21 10:20 AM',
        },
        {
          text: 'teystuy uasukdy ukyd wqiud2222222y ask jdba sjkcba sku Aysheduiq wDHASasdbkjasdbas kjbadjk',
          answer: 'answer2',
          date: '2025-01-24 01:40 PM',
        }
      ],
    },
  ];
  const handleEdit = () => {
    //여기서 소질문 뜨게 하기 
    Alert.alert(
      'Profile', // 제목
      'Do you want to proceed?', // 메시지
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel', // 버튼 스타일 (기본: cancel)
        },
        {
          text: 'Yes',
          onPress: () => console.log('Yes Pressed'),
        },
      ],
      { cancelable: false } // Alert 외부를 눌렀을 때 닫힘 여부
    );
  }
  const totalPages = Math.ceil(previousAnswers.length / answersPerPage);
  const paginatedAnswers = previousAnswers.slice(
    answersIndex * answersPerPage, (answersIndex + 1) * answersPerPage
  );
  const handlePrev = () => {
    if (answersIndex === 0) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswersIndex(answersIndex - 1);
      setPageChanged(true);
      setCloseAccordion(false);
    }, 300); // Accordion에서 duration: 300과 동일
  };
  const handleNext = () => {
    if (answersIndex === totalPages - 1) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswersIndex(answersIndex + 1);
      setPageChanged(true);
      setCloseAccordion(false);
    }, 300); // Accordion에서 duration: 300과 동일
  };
  useEffect(() => {
    if (pageChanged) {
      // setTimeout 또는 requestAnimationFrame 등을 사용하여
      // 실제 렌더링이 완료된 뒤에 scrollToEnd() 호출
      const timer = setTimeout(() => {
        scrollRef.current?.scrollToEnd({animated: true});
        setPageChanged(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [answersIndex, pageChanged]);
  return (
    <View style={styles.container}>
      <MemoGradient />
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        ref={scrollRef}
      >
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
          <View style={styles.prevAnsweralign}>
            <View style={styles.prevAnswerContainer}>
              {paginatedAnswers.map((item, index) => (
                <Accordion
                  title={item.question}
                  key={index}
                  forceClose={closeAccordion}
                >
                  <View style={styles.prevAnswers} key={index}>
                    {item.subquestions.map((subquestion, ansIndex) => (
                      <View style={styles.subquestionContainer}
                        key={ansIndex}
                      >
                        <Text style={styles.subquestionText}>{subquestion.text}</Text>
                        <View
                          style={styles.answerContainer}
                          // onStartShouldSetResponder={() => true} //자식요소가 touch event 소비하게 하기
                        >
                          <Text style={styles.answerText}>{subquestion.answer}</Text>
                          <View style={styles.answerBottom}>
                            <Text style={styles.answerDate}>{subquestion.date}</Text>
                            <TouchableOpacity style={styles.editButton}
                              onPress={handleEdit}
                            >
                              <EditIcon />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </Accordion>
              ))}
            </View>
            <View style={styles.moveButtonContainer}>
              <TouchableOpacity style={styles.prevButton}
                onPress={handlePrev}
                >
                <PrevIcon/>
                <Text style={styles.prevButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <NextIcon/>
              </TouchableOpacity>
            </View>
          </View>
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
  prevAnsweralign: {
    gap: 16,
    alignItems: 'center',
  },
  prevAnswerContainer: {
    gap: 10,
  },
  prevAnswers: {
    gap: 16,
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
  editButton: {
  },
  moveButtonContainer: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prevButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  prevButtonText: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: colors.text_hint,
  },
  nextButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  nextButtonText: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: 'black',
  },
});
