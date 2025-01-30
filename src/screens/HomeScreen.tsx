import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import colors from '../styles/colors';
import PrevIcon from '../assets/svg/prev-icon.svg';
import NextIcon from '../assets/svg/next-icon.svg';
import {fonts} from '../styles/fonts';
import Accordion from '../components/Hooks/Accordion';
import {
  axiosGetAnswers,
  axiosGetQuestions,
  axiosUpdateAnswers,
} from '../api/axios';
import {Questiontypes} from '../type/question.type';
import {AnswerTypes} from '../type/answer.type';
import PrevAnswers from '../components/home/PrevAnswers';
import Questions from '../components/home/Questions';

//todo: 컴포넌트 쪼개기
const HomeScreen = () => {
  const [answersIndex, setAnswersIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const [pageChanged, setPageChanged] = useState<boolean>(false);
  const [closeAccordion, setCloseAccordion] = useState<boolean>(false);
  const answersPerPage = 3;
  const [questions, setQuestions] = useState<Questiontypes[]>([
    {questionId: 123, type: 'hi', content: 'asdasdasdasd'},
    {questionId: 124, type: 'hi', content: 'asdasdasdasdsd'},
  ]);

  //todo : 이거 axios 날릴때 남은건냅두고 처음에 6개, 그뒤에 6개씩추가
  const [previousAnswers, setPreviousAnswers] = useState<AnswerTypes[]>([]);
  const totalPages = Math.ceil(previousAnswers.length / answersPerPage);

  // TODO : page 로 나중에 6개씩 날리기
  const paginatedAnswers =
    previousAnswers &&
    previousAnswers.slice(
      answersIndex * answersPerPage,
      (answersIndex + 1) * answersPerPage,
    );
  // a = (subquestionId + answersIndex) * answersPerPage;
  // previousanswers[a].
  //previousAnswers
  const handlePrev = () => {
    if (answersIndex === 0) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswersIndex(answersIndex - 1);
      setPageChanged(true);
      setCloseAccordion(false);
    }, 100); // Accordion에서 duration이랑 맞춰야됨
  };
  const handleNext = () => {
    if (answersIndex === totalPages - 1) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswersIndex(answersIndex + 1);
      setPageChanged(true);
      setCloseAccordion(false);
    }, 100); // Accordion에서 duration이랑 맞춰야됨
  };
  useEffect(() => {
    if (pageChanged) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollToEnd({animated: true});
        setPageChanged(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [answersIndex, pageChanged]);

  const editPrevAnswer = (subquestionId: number, newText: string) => {
    const prevAnswerId = (subquestionId + answersIndex) * answersPerPage;
    const updatedAnswers = [...previousAnswers]; //shallow copy
    updatedAnswers[prevAnswerId].subquestions[subquestionId].answer = newText;
    setPreviousAnswers(updatedAnswers);
  };

  const handleSaveEdit = (newText: string, subquestionId: number) => {
    try {
      //이거 수정이라서 백엔드
      console.log('Save:', newText);
      const res = axiosUpdateAnswers(subquestionId, newText);
      //아래 부분은 state 변경
      editPrevAnswer(subquestionId, newText);
      // const updatedAnswers = [...previousAnswers]; //shallow copy
      // updatedAnswers[prevAnswerId]
      // .subquestions[subquestionId].answer = newText;
      // setPreviousAnswers(updatedAnswers);
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  // TODO : 나중에 response type 정의하기
  const handleGetQuestions = async () => {
    try {
      const response: any = await axiosGetQuestions();
      console.log('Questions:', response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error getting questions:', error);
    }
  };
  //previous questions 요청axios
  const handleGetQuestionHistory = async () => {
    try {
      const response = await axiosGetAnswers();
      // console.log('Answers:', JSON.stringify(response, null, 2));
      console.log('Answers:', response);
      // console.log('Answers:', response.subquestions);
      setPreviousAnswers(response);
    } catch (error) {
      console.error('Error getting questions:', error);
    }
  };

  // RN은 화면을 캐싱해서 다시 돌아왔을 때 다시 렌더링하지 않음
  useFocusEffect(
    React.useCallback(() => {
      // 스크린이 포커스될 때마다 실행할 함수
      handleGetQuestions();
      handleGetQuestionHistory();

      return () => {
        // 필요시 정리 작업 수행
        console.log('MyScreen has lost focus');
      };
    }, []), // 빈 배열을 사용하여 콜백이 마운트 시 한 번만 생성되도록 함
  );

  return (
    <View style={styles.container}>
      <MemoGradient />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        ref={scrollRef}>
        <Header />
        <View style={styles.card}>
          <TouchableOpacity
          //  onPress={handleGetQuestions}
          >
            <Text style={styles.cardTitle}>Today's Questions</Text>
          </TouchableOpacity>
          {questions && //이거우너래대로 answers로 바꿔야됨
            questions.map(question => (
              <Questions
                key={question.questionId}
                questionId={question.questionId}
                content={question.content}
              />
            ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your previous Answers</Text>
          <View style={styles.prevAnsweralign}>
            <View style={styles.prevAnswerContainer}>
              {paginatedAnswers &&
                paginatedAnswers.map((item, subquestionId) => (
                  <Accordion
                    title={item.question}
                    key={subquestionId}
                    forceClose={closeAccordion}>
                    <View style={styles.prevAnswers}>
                      {item.subquestions.map(subquestion => (
                        <PrevAnswers
                          key={subquestion.id}
                          subquestion={subquestion}
                          subquestionId={subquestion.id} //이거 실제 questionIndex 받아야할듯
                          handleSaveEdit={handleSaveEdit}
                          // handleEdit={handleEdit}
                        />
                      ))}
                    </View>
                  </Accordion>
                ))}
            </View>
            <View style={styles.moveButtonContainer}>
              <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
                <PrevIcon />
                <Text style={styles.prevButtonText}>Prev</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <NextIcon />
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
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  card: {
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
  editButton: {},
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
    color: colors.black,
  },
});
