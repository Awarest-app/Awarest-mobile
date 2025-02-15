import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {
  useRoute,
  RouteProp,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosGetSubquestions, axiosPostAnswers} from '../api/axios';
import {HomeStackParamList} from '../type/route.type';
import {ServerResponse, AnswerSubquestionTypes} from '../type/question.type';
import AnswerModal from '../components/modals/AnswerModal';
import MemoGradient from '../components/Hooks/MemoGradient';
import {Header} from '../components/Header';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import { analytics } from '../firebase/setting';
type AnswerScreenRouteProp = RouteProp<HomeStackParamList, 'Answer'>;
type AnswerScreenNavProp = NavigationProp<HomeStackParamList, 'Answer'>;

export default function AnswerScreen() {
  const route = useRoute<AnswerScreenRouteProp>();
  const navigation = useNavigation<AnswerScreenNavProp>();
  const question_id = route.params.question_id;
  const [serverData, setServerData] = useState<ServerResponse | null>(null);
  const subquestions = serverData?.subquestions || [];
  const [questions, setQuestions] = useState<AnswerSubquestionTypes>({
    question: '',
    responses: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ANSWER_ALL_KEYS = 'answer_all_keys';
  const ANSWER_STORAGE_KEY = `userAnswers_${question_id}`;
  const ANSWER_EXPIRATION_KEY = `answersExpiration_${question_id}`;

  useFocusEffect(() => {
    analytics.logScreenView({screen_name: 'Answer', screen_class: 'AnswerScreen'});
  });
  const removeKeyFromAnswerAllKeys = async (keyToRemove: string) => {
    try {
      const existingKeys = await AsyncStorage.getItem(ANSWER_ALL_KEYS);
      if (existingKeys) {
        let keysArray: string[] = JSON.parse(existingKeys);
        const index = keysArray.indexOf(keyToRemove);
        if (index !== -1) {
          keysArray.splice(index, 1);
          await AsyncStorage.setItem(
            ANSWER_ALL_KEYS,
            JSON.stringify(keysArray),
          );
        }
      }
    } catch (error) {
    }
  };
  const fetchSubquestions = async () => {
    try {
      const data: ServerResponse = await axiosGetSubquestions(question_id);
      setServerData(data);
      const initialState: AnswerSubquestionTypes = {
        question: data.question,
        responses: Array(data.subquestions.length).fill(''),
      };
      setQuestions(initialState);
      await loadAnswersFromStorage(data.question);
    } catch (err) {
    }
  };
  const cleanUpExpiredKeys = async () => {
    try {
      const now = Date.now();
      const answerAllKeys = await AsyncStorage.getItem(ANSWER_ALL_KEYS);
      const ALL_KEYS: string[] = answerAllKeys ? JSON.parse(answerAllKeys) : [];
      const expirationKeys = ALL_KEYS.filter(key =>
        key.startsWith('answersExpiration_'),
      );
      if (expirationKeys.length === 0) return;

      const keyValuePairs = await AsyncStorage.multiGet(expirationKeys);
      const expiredKeys = [];

      for (const [key, value] of keyValuePairs) {
        if (value && parseInt(value, 10) < now) {
          const questionId = key.replace('answersExpiration_', '');
          expiredKeys.push(key);
          expiredKeys.push(`userAnswers_${questionId}`);
        }
      }
      if (expiredKeys.length === 0) return;
      await AsyncStorage.multiRemove(expiredKeys);
    } catch (err) {
    }
  };
  useEffect(() => {
    const initialize = async () => {
      await cleanUpExpiredKeys();
      await fetchSubquestions();
    };
    initialize();
  }, [question_id]);
  const addKeyToAnswerAllKeys = async (newKey: string) => {
    try {
      const existingKeys = await AsyncStorage.getItem(ANSWER_ALL_KEYS);
      let keysArray: string[] = [];
      if (existingKeys) {
        try {
          const parsed = JSON.parse(existingKeys);
          keysArray = Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          keysArray = [];
        }
      }

      if (!keysArray.includes(newKey)) {
        keysArray.push(newKey);
        await AsyncStorage.setItem(ANSWER_ALL_KEYS, JSON.stringify(keysArray));
        await AsyncStorage.getItem(ANSWER_ALL_KEYS);
      }
    } catch (error) {
    }
  };
  const saveAnswersToStorage = async (answers: AnswerSubquestionTypes) => {
    try {
      const now = Date.now();
      await AsyncStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(answers));
      await AsyncStorage.setItem(
        ANSWER_EXPIRATION_KEY,
        (now + 24 * 60 * 60 * 1000).toString(),
      );
      await addKeyToAnswerAllKeys(ANSWER_STORAGE_KEY);
      await addKeyToAnswerAllKeys(ANSWER_EXPIRATION_KEY);
    } catch (e) {
      Alert.alert('Failed to draft answers');
    }
  };
  const loadAnswersFromStorage = async (
    mainQuestion: string,
  ) => {
    try {
      const saved = await AsyncStorage.getItem(ANSWER_STORAGE_KEY);
      if (saved) {
        const parsed: AnswerSubquestionTypes = JSON.parse(saved);
        if (
          parsed.question === mainQuestion
        ) {
          setQuestions(parsed);
          return;
        }
      }
      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);
    } catch (err) {
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

  const handleOnSubmit = async () => {
    try {
      if (!serverData) {
        Alert.alert('No question data loaded.');
        return;
      }
      const payload =
        questions.responses.length > 0 &&
        questions.responses.map((answer, index) => {
          const subquestionId = serverData.subquestions[index].id;
          return {
            subquestionId,
            answer,
          };
        });
      const resultProps = await axiosPostAnswers(payload, serverData?.question);
      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);
      await AsyncStorage.removeItem(ANSWER_EXPIRATION_KEY);
      await removeKeyFromAnswerAllKeys(ANSWER_STORAGE_KEY);
      await removeKeyFromAnswerAllKeys(ANSWER_EXPIRATION_KEY);
      navigation.navigate('Result', {question_xp: resultProps.xpAdded});
      setIsModalOpen(false);
    } catch (err) {
      Alert.alert('Submission Failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <AnswerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <MemoGradient />

      <KeyboardAvoidingView behavior='padding'>
      <ScrollView style={styles.contentContainer}>
        <Header />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>{serverData?.question || ''}</Text>
          </View>

          <View style={styles.answerContainer}>
            {subquestions.length > 0 &&
              subquestions.map((subQ, index) => (
                <View style={styles.inputBlock} key={subQ.id}>
                  <Text style={styles.inputLabel}>{subQ.text}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Start writing your thoughts..."
                    placeholderTextColor={colors.text_hint}
                    multiline
                    value={questions.responses[index] ?? ''}
                    onChangeText={text => {
                      if (text.length > 1000) return;
                      setQuestions(prev => {
                        const updated = [...prev.responses];
                        updated[index] = text;
                        return {...prev, responses: updated};
                      });
                    }}
                  />
                </View>
              ))}
          </View>
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
      </KeyboardAvoidingView>
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
    backgroundColor: colors.white_80,
    opacity: 0.9,
    marginBottom: 100,
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    fontFamily: fonts.roboto_medium,
    color: colors.black,
    fontSize: 24,
  },
  question: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color: colors.black,
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
    color: colors.black,
  },
  input: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: colors.black,
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
