import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
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
  axiosNotificationPermisson,
} from '../api/axios';
import {Questiontypes} from '../type/question.type';
import {AnswerTypes} from '../type/answer.type';
import PrevAnswers from '../components/home/PrevAnswers';
import Questions from '../components/home/Questions';
import {useProfileStore} from '../zustand/useProfileStore';
import {isToday} from '../components/utils/utils';
import HomeLoading from '../components/modals/HomeLoading';
import {messaging} from '../firebase/setting'

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

  const paginatedAnswers =
    previousAnswers &&
    previousAnswers.slice(
      answersPageIndex * answersPerPage,
      (answersPageIndex + 1) * answersPerPage,
    );
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
  const handleNotification = async () => {
    const status = await messaging.requestPermission();
    if (status == 1 || status == 2) {
      const token = await messaging.getToken();
      axiosNotificationPermisson(token);
    }
  }
  useEffect(() => {
    const initializeFCM = async () => {
      await handleNotification();
      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        console.log('FCM Message:', remoteMessage);
      });
      await fetchProfile();

      return unsubscribe;
    }
    const unsubscribePromise = initializeFCM();
    return () => {
      unsubscribePromise.then(unsub => unsub && unsub());
    };
  }, []);

  useEffect(() => {
    handleGetQuestions();
    handleGetQuestionHistory();
    isDayStreak(isToday(profile.lastStreakDate));
  }, [profile.totalAnswers, isDayStreak, profile.lastStreakDate]);

  const editPrevAnswer = (
    questionIndex: number,
    subquestionIndex: number,
    newText: string,
  ) => {
    const prevAnswerId = answersPageIndex * answersPerPage + questionIndex;
    const updatedAnswers = [...previousAnswers];
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
      await axiosUpdateAnswers(subquestionId, newText);
      editPrevAnswer(questionIndex, subquestionIndex, newText);
    } catch (error) {
    }
  };

  const handleGetQuestions = async () => {
    try {
      const response: any = await axiosGetQuestions();
      setQuestions(response.data);
      setIsFirst(false);
    } catch (error) {
    }
  };
  const handleGetQuestionHistory = async () => {
    try {
      const response = await axiosGetAnswers();
      setPreviousAnswers(response);
    } catch (error) {
    }
  };
  return (
    <View style={styles.container}>
      {isFirst && (
        <HomeLoading isOpen={isFirst}/>
      )}
      <MemoGradient />
      {!isFirst && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          ref={scrollRef}>
          <Header />
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

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Answers</Text>
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
