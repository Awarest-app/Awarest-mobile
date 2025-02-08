import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
import {useProfileStore} from '../zustand/useProfileStore';
import {isToday} from '../components/utils/utils';
import HomeLoading from '../components/modals/HomeLoading';

//todo: 컴포넌트 쪼개기
export default function HomeScreen() {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [answersPageIndex, setAnswerPageIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const [closeAccordion, setCloseAccordion] = useState<boolean>(false);
  const answersPerPage = 3;
  const [questions, setQuestions] = useState<Questiontypes[]>([]);
  const [previousAnswers, setPreviousAnswers] = useState<AnswerTypes[]>([]);
  const totalPages = Math.ceil(previousAnswers.length / answersPerPage);
  const {fetchProfile, isDayStreak, profile} = useProfileStore();

  //todo : 이거 axios 날릴때 남은건냅두고 처음에 6개, 그뒤에 6개씩추가
  // TODO : page 로 나중에 6개씩 날리기
  const paginatedAnswers =
    previousAnswers &&
    previousAnswers.slice(
      answersPageIndex * answersPerPage,
      (answersPageIndex + 1) * answersPerPage,
    ); //0~2, 3~5, 6~8
  const handlePrev = () => {
    if (answersPageIndex === 0) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswerPageIndex(answersPageIndex - 1);
      setCloseAccordion(false);
    }, 100);
    scrollRef.current?.scrollToEnd({animated: true});
  };
  const handleNext = () => {
    if (answersPageIndex === totalPages - 1) return;

    setCloseAccordion(true);
    setTimeout(() => {
      setAnswerPageIndex(answersPageIndex + 1);
      setCloseAccordion(false);
    }, 100);
    scrollRef.current?.scrollToEnd({animated: true});
  };
  useEffect(() => {
    fetchProfile();
    console.log('useEffect homescreen 3');
  }, []);

  useEffect(() => {
    console.log('useEffect homescreen ');
    handleGetQuestions();
    handleGetQuestionHistory();
    isDayStreak(isToday(profile.lastStreakDate));
  }, [profile.totalAnswers, isDayStreak, profile.lastStreakDate]);

  //subquestionId가 달라져서 ㄱ수정
  const editPrevAnswer = (
    questionIndex: number,
    subquestionIndex: number,
    newText: string,
  ) => {
    console.log(answersPageIndex, subquestionIndex);
    const prevAnswerId = answersPageIndex * answersPerPage + questionIndex;
    const updatedAnswers = [...previousAnswers]; //shallow copy
    // updatedAnswers[대질문index].subquestions[subquestions].answer = newText;
    console.log('333prevAnswer:', updatedAnswers[0]);
    updatedAnswers[prevAnswerId].subquestions[subquestionIndex].answer =
      newText;
    setPreviousAnswers(updatedAnswers);
  };

  const handleSaveEdit = async (
    newText: string,
    questionIndex: number,
    subquestionId: number,
    subquestionIndex: number,
  ) => {
    try {
      //이거 수정이라서 백엔드
      await axiosUpdateAnswers(subquestionId, newText); //subquestionId로 날리고
      editPrevAnswer(questionIndex, subquestionIndex, newText); //subquestionIndex로 변경
      //아래 부분은 state 변경
    } catch (error) {
      console.error('handleSaveEdit answer:', error);
    }
  };

  const handleGetQuestions = async () => {
    try {
      const response: any = await axiosGetQuestions();
      setQuestions(response.data);
      // setIsFirst(false);
    } catch (error) {
      console.error('Error getting questions:', error);
    }
  };
  //previous questions 요청axios
  const handleGetQuestionHistory = async () => {
    try {
      const response = await axiosGetAnswers();
      setPreviousAnswers(response);
    } catch (error) {
      console.error('Error getting questions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MemoGradient />
      <HomeLoading isOpen={isFirst} setIsOpen={setIsFirst} />
      {!isFirst && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          ref={scrollRef}>
          <Header />
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Today's Questions</Text>
            </View>
            {questions && questions.length > 0 ? ( //타입에러?
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

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Responses</Text>
            <View style={styles.prevAnsweralign}>
              <View style={styles.prevAnswerContainer}>
                {paginatedAnswers &&
                  paginatedAnswers.map((item, questionIndex) => (
                    <Accordion
                      title={item.question}
                      key={questionIndex}
                      forceClose={closeAccordion}>
                      <View style={styles.prevAnswers}>
                        {item.subquestions.map(
                          (subquestion, subquestionIndex) => (
                            <PrevAnswers
                              key={subquestion.id}
                              questionIndex={questionIndex}
                              subquestion={subquestion}
                              subquestionId={subquestion.id}
                              subquestionIndex={subquestionIndex}
                              handleSaveEdit={handleSaveEdit}
                            />
                          ),
                        )}
                      </View>
                    </Accordion>
                  ))}
              </View>
              <View style={styles.moveButtonContainer}>
                <TouchableOpacity
                  style={styles.prevButton}
                  onPress={handlePrev}>
                  <PrevIcon />
                  <Text style={styles.prevButtonText}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Next</Text>
                  <NextIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

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
  prevAnsweralign: {
    gap: 16,
    alignItems: 'center',
  },
  prevAnswerContainer: {
    width: '100%',
    gap: 10,
  },
  prevAnswers: {
    width: '100%',
    gap: 16,
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
    color: colors.black,
  },
});
