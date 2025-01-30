import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  useRoute,
  RouteProp,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// API
import {axiosGetSubquestions, axiosPostAnswers} from '../api/axios';
// 타입
import {HomeStackParamList} from '../type/route.type';
import {ServerResponse, AnswerSubquestionTypes} from '../type/question.type';
// 컴포넌트
import AnswerModal from '../components/modals/AnswerModal';
import MemoGradient from '../components/Hooks/MemoGradient';
import {Header} from '../components/Header';
// 스타일, 폰트
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
// 네비게이션 타입
type AnswerScreenRouteProp = RouteProp<HomeStackParamList, 'Answer'>;
type AnswerScreenNavProp = NavigationProp<HomeStackParamList, 'Answer'>;

export default function AnswerScreen() {
  const route = useRoute<AnswerScreenRouteProp>();
  const navigation = useNavigation<AnswerScreenNavProp>();
  // question_id (라우트 파라미터)
  const question_id = route.params.question_id;
  // 서버에서 받은 데이터
  const [serverData, setServerData] = useState<ServerResponse | null>(null);
  // 사용자 입력 상태
  const [questions, setQuestions] = useState<AnswerSubquestionTypes>({
    question: '',
    responses: [],
  });

  // 모달 open/close
  const [isModalOpen, setIsModalOpen] = useState(false);

  // AsyncStorage Key
  const ANSWER_STORAGE_KEY = `userAnswers_${question_id}`;
  const ANSWER_EXPIRATION_KEY = `answersExpiration_${question_id}`;

  // -----------------------------------------------
  // 1. 서버에서 데이터 가져오기
  // -----------------------------------------------
  const fetchSubquestions = async () => {
    try {
      // 서버에서 { question, subquestions: [{id, subquestion}, ...] } 형태 받아옴
      const data: ServerResponse = await axiosGetSubquestions(question_id);
      setServerData(data);
      // subquestions 길이만큼 '' (빈 문자열) 할당
      const initialState: AnswerSubquestionTypes = {
        question: data.question,
        responses: Array(data.subquestions.length).fill(''),
      };
      setQuestions(initialState);
      // AsyncStorage에서 기존에 임시 저장된 답변이 있다면 불러오기
      await loadAnswersFromStorage(data.subquestions.length, data.question);
    } catch (err) {
      console.error('Failed to fetch subquestions:', err);
    }
  };
  const cleanUpExpiredKeys = async () => {
    try {
      const now = Date.now();
  
      const ALL_KEYS = await AsyncStorage.getAllKeys();
      const expirationKeys = ALL_KEYS.filter(key => key.startsWith('answersExpiration_'));

      if (expirationKeys.length === 0) return;

      const keyValuePairs = await AsyncStorage.multiGet(expirationKeys);
      const expiredKeys = [];
  
      for (const [key, value] of keyValuePairs) {
        if (value && parseInt(value, 10) < now) {
          const questionId = key.replace('answersExpiration_', '');
          expiredKeys.push(key); // answersExpiration_1
          expiredKeys.push(`userAnswers_${questionId}`);// userAnswers_1
        }
      }
      if (expiredKeys.length === 0) return ;
      await AsyncStorage.multiRemove(expiredKeys);
      console.log(`Removed expired keys: ${expiredKeys}`);
    } catch (err) {
      console.error('Failed to clean up expired keys:', err);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      await cleanUpExpiredKeys();
      await fetchSubquestions();
    };
    initialize();
  }, [question_id]);
  // -----------------------------------------------
  // 2. AsyncStorage: 임시 저장 & 불러오기
  // -----------------------------------------------
  const saveAnswersToStorage = async (answers: AnswerSubquestionTypes) => {
    try {
      const now = Date.now();
      await AsyncStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(answers));
      await AsyncStorage.setItem(
        ANSWER_EXPIRATION_KEY,
        (now + 24 * 60 * 60 * 1000).toString(), // 24시간
      );
    } catch (e) {
      console.error('Failed to save answers:', e);
    }
  };
  const loadAnswersFromStorage = async (
    count: number,
    mainQuestion: string,
  ) => {
    try {
      const saved = await AsyncStorage.getItem(ANSWER_STORAGE_KEY);
      // const expiration = await AsyncStorage.getItem(ANSWER_EXPIRATION_KEY);
      // const now = Date.now();
      // 여기서 길이랑 mainquestion으로 비교대조하는 로직이 왜필요함?----------------------------------------
      // 저장된 값이 있고 만료되지 않았다면
      // if (saved && expiration && parseInt(expiration, 10) > now) {
      if (saved) {
        const parsed: AnswerSubquestionTypes = JSON.parse(saved);
        // 메인 질문/배열 길이가 일치하면 로드
        if (
          parsed.question === mainQuestion &&
          parsed.responses.length === count
        ) {
          setQuestions(parsed);
          return;
        }
      }
      // 만료되었거나 구조가 안 맞으면 초기화
      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to load answers:', err);
    }
  };

  const handleDraft = async () => {
    await saveAnswersToStorage(questions);
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (questions.responses.some(ans => ans.trim() === '')) {
      Alert.alert('Please fill out all the answers before submitting');
      return;
    }
    setIsModalOpen(true);
  };

  // **핵심**: 서브질문 ID + 답변을 묶어서 객체 배열로 만들기
  const handleOnSubmit = async () => {
    try {
      if (!serverData) {
        Alert.alert('No question data loaded.');
        return;
      }

      // 1) subquestions (문자열들)과 serverData.subquestions (id 정보)를 매핑
      const payload = questions.responses.map((answer, index) => {
        const subquestionId = serverData.subquestions[index].id;
        return {
          subquestionId,
          answer,
        };
      });

      // 2) 이 payload를 백엔드로 전송
      // => BE는 createAnswers([{ subQuestionId, answer }, ...]) 로 받을 수 있음
      await axiosPostAnswers(payload);
      console.log('Submitted answers (with ID):', payload);

      // 3) 제출 성공 시 캐시 삭제
      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);
      await AsyncStorage.removeItem(ANSWER_EXPIRATION_KEY);

      // 4) 결과 화면으로 이동
      navigation.navigate('Result');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submission failed:', err);
      Alert.alert('Submission Failed', 'Please try again.');
    }
  };

  // -----------------------------------------------
  // 4. 렌더링
  // -----------------------------------------------
  return (
    <View style={styles.container}>
      <AnswerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <MemoGradient />

      <ScrollView style={styles.contentContainer}>
        <Header />
        {/* 메인 컨테이너 */}
        <View style={styles.mainContainer}>
          {/* 메인 질문 표시 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>{serverData?.question || ''}</Text>
          </View>

          {/* 서브질문 & 사용자 입력 필드 */}
          <View style={styles.answerContainer}>
            {serverData?.subquestions.map((subQ, index) => (
              <View style={styles.inputBlock} key={subQ.id}>
                {/* 서브질문 텍스트 표시 */}
                <Text style={styles.inputLabel}>{subQ.text}</Text>

                {/* 사용자 입력 (questions.subquestions[index]) */}
                <TextInput
                  style={styles.input}
                  placeholder="Start writing your thoughts..."
                  placeholderTextColor={colors.text_hint}
                  multiline
                  value={questions.responses[index] ?? ''}
                  onChangeText={text => {
                    if (text.length > 1000) return ;
                    setQuestions(prev => {
                      const updated = [...prev.responses];
                      updated[index] = text;
                      return {...prev, subquestions: updated};
                    });
                  }}
                />
              </View>
            ))}
          </View>

          {/* Draft / Submit 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.draftButton} onPress={handleDraft}>
              <Text style={styles.draftButtonText}>Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// -----------------------------------------------
// 스타일 정의
// -----------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
    gap: 25,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.white_80,
    opacity: 0.9,
    marginBottom: 40,
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    fontFamily: fonts.roboto_medium,
    color : colors.black,
    fontSize: 24,
  },
  question: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color : colors.black,
  },
  answerContainer: {
    gap: 16,
  },
  inputBlock: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 8,
    gap: 10,
    padding: 12,
  },
  inputLabel: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color : colors.black,
  },
  input: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color : colors.black,
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    lineHeight: 20,
    height: 80,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 46,
    paddingHorizontal: 10,
  },
  draftButton: {
    width: 120,
    backgroundColor: colors.gray_button,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftButtonText: {
    fontFamily: fonts.roboto_regular,
    color: colors.gray_button_text,
    fontSize: 18,
  },
  submitButton: {
    width: 120,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: fonts.roboto_regular,
    color: colors.green_button_text,
  },
});
