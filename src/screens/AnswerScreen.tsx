import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import MemoGradient from '../components/Hooks/MemoGradient';
import {Header} from '../components/Header';
import {useRoute, RouteProp, NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import AnswerModal from '../components/modals/AnswerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
//캐시
//이거 key를 중앙에서 관리를 해야할거같음
//todo: ALL_KEY(key): 값들(모든 ANSWER_STORAGE_KEY를 추가하기)
type AnswerScreenRouteProp = RouteProp<HomeStackParamList, 'Answer'>;

export default function AnswerScreen() {
  // 입력값을 저장하기 state
  const route = useRoute<AnswerScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const mainQuestion = route.params?.mainQuestion || 'Default Question'; // 기본값 제공
  const [answers, setAnswers] = useState(['','','']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState({
    sub: [
      {question: 'What made you feel proud today?', answer: ''},
      {question: 'Did you make time to take care of yourself?', answer: ''},
      {question: 'Did you focus on your studying or working on a task?',answer: ''},
    ]
  });
  const ANSWER_STORAGE_KEY = 'userAnswers' + mainQuestion;
  const ANSWER_EXPIRATION_KEY = 'answersExpiration' + mainQuestion;
  const saveAnswers = async () => {
    try {
      const now = new Date().getTime();
      await AsyncStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(answers));
      await AsyncStorage.setItem(ANSWER_EXPIRATION_KEY, (now + 24 * 60 * 60 * 1000).toString());
    } catch (e) {
      console.error(e);
    }
  };

  const loadAnswers = async () => {
    try {
      const savedAnswers = await AsyncStorage.getItem(ANSWER_STORAGE_KEY);
      const expiration = await AsyncStorage.getItem(ANSWER_EXPIRATION_KEY);

      const now = new Date().getTime();
      if (expiration && parseInt(expiration, 10) > now) {
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      } else {
        await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);
        await AsyncStorage.removeItem(ANSWER_EXPIRATION_KEY);
      }
    } catch (error) {
      console.error('Failed to load answers', error);
    }
  };
  // const handleBackPress = () => {
  //   Alert.alert(
  //     'Go Back?',
  //     'Are you sure you want to go back? Unsaved changes will be lost.',
  //     [
  //       { text: 'No', style: 'cancel' },
  //       { text: 'Yes', onPress: () => navigation.goBack() },
  //     ]
  //   );
  //   return true; // 기본 동작 막기
  // };
  // useEffect(() => {
  //   // BackHandler 이벤트 추가
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //   // 컴포넌트 언마운트 시 이벤트 제거
  //   return () => backHandler.remove();
  // }, []);
  useEffect(() => {
    loadAnswers();
  }, []);

  const handleDraft = () => {
    saveAnswers();
    navigation.goBack();
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    // 게시 로직
  };
  const handleOnSubmit = () => {
    //axios 백엔드로 answers날리기 
    navigation.navigate('Result');
    setIsModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <AnswerModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <MemoGradient />
      <ScrollView style={styles.contentContainer}>
        <Header />
        {/* 메인 타이틀 */}
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>{mainQuestion}</Text>
          </View>

          {/* 각 질문 + 입력 폼 */}
          <View style={styles.answerContainer}>
            {questions.sub.map((item, idx) => (
              <View style={styles.inputBlock}
                key={idx}
              >
                <Text style={styles.inputLabel}>{item.question}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Start writing your thoughts..."
                  value={answers[idx]}
                  onChangeText={(text) => {
                    const updatedAnswers = [...answers]; // 현재 상태의 복사본 생성
                    updatedAnswers[idx] = text; // 해당 인덱스에 새로운 값 설정
                    setAnswers(updatedAnswers); // 상태 업데이트
                  }}
                  placeholderTextColor={colors.text_hint}
                  multiline
                />
              </View>
            ))}
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.draftButton}
              onPress={handleDraft}>
              <Text style={styles.draftButtonText}>Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submithButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  },
  mainContainer: {
    flex: 1,
    gap: 25,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.9,
    marginBottom: 40,
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    fontFamily: fonts.roboto_medium,
    color: 'black',
    fontSize: 24,
  },
  question: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color: 'black',
  },
  answerContainer: {
    gap: 16,
  },
  inputBlock: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 8,
    gap: 10,
    padding: 12,
    // elevation: 2,
  },
  inputLabel: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
  },
  input: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: 'black',
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    lineHeight: 20,
    height: 80,
  },
  // 버튼 영역
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
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  draftButtonText: {
    fontFamily: fonts.roboto_regular,
    color: colors.grey_button_text,
    fontSize: 18,
  },
  submitButton: {
    width: 120,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  submithButtonText: {
    fontSize: 18,
    fontFamily: fonts.roboto_regular,
    color: colors.green_button_text,
  },
});
