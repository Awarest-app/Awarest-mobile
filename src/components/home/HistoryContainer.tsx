import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PrevIcon from '../../assets/svg/prev-icon.svg';
import NextIcon from '../../assets/svg/next-icon.svg';
import {fonts} from '../../styles/fonts';
import Accordion from './Accordion';
import PrevAnswers from '../home/PrevAnswers';
import colors from '../../styles/colors';
import {AnswerTypes} from '../../type/answer.type';
import {axiosUpdateAnswers, axiosGetAnswers} from '../../api/axios';

interface HistoryContainerProps {
  scrollRef: React.RefObject<ScrollView>;
}

export default function HistoryContainer({
  scrollRef,
}: HistoryContainerProps) {
  const [closeAccordion, setCloseAccordion] = useState<boolean>(false);
  const answersPerPage = 3;
  const [answersPageIndex, setAnswerPageIndex] = useState<number>(0);
  const [previousAnswers, setPreviousAnswers] = useState<AnswerTypes[]>([]);

  const totalPages = Math.ceil(previousAnswers.length / answersPerPage);
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
  const handleGetQuestionHistory = async () => {
    try {
      const response = await axiosGetAnswers();
      setPreviousAnswers(response);
    } catch (error) {
    }
  };
  useEffect(() => {
    handleGetQuestionHistory();
  }, []);
  return (
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
  );
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