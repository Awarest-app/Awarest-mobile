import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import MemoGradient from '../components/Hooks/MemoGradient';
import {Header} from '../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';

export default function AnswerScreen() {
  // 입력값을 저장하기 위한 state
  const [callParents, setCallParents] = useState('');
  const [selfCare, setSelfCare] = useState('');
  const [studyFocus, setStudyFocus] = useState('');

  const handleDraft = () => {
    // 임시 저장 로직
    console.log('Draft Saved:', {callParents, selfCare, studyFocus});
  };

  const handleSubmit = () => {
    // 게시 로직
    console.log('Submit:', {callParents, selfCare, studyFocus});
  };

  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <View style={styles.container}>
      <MemoGradient />
      <ScrollView style={styles.contentContainer}>
        <Header />
        {/* 메인 타이틀 */}
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>What made you feel proud today?</Text>
          </View>

          {/* 각 질문 + 입력 폼 */}
          <View style={styles.answerContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Did you call your parents?</Text>
              <TextInput
                style={styles.input}
                placeholder="Start writing your thoughts..."
                value={callParents}
                onChangeText={setCallParents}
                placeholderTextColor={colors.text_hint}
                multiline
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>
                Did you make time to take care of yourself?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Start writing your thoughts..."
                value={selfCare}
                onChangeText={setSelfCare}
                placeholderTextColor={colors.text_hint}
                multiline
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>
                Did you focus on your studying or working on a task?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Start writing your thoughts..."
                value={studyFocus}
                onChangeText={setStudyFocus}
                placeholderTextColor={colors.text_hint}
                multiline
              />
            </View>
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
              onPress={() => navigation.navigate('Result')}>
              <Text style={styles.submithButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 하단 탭바 예시 */}
    </View>
  );
}
const {width, height} = Dimensions.get('window');
const calculateDp = (px: number) => {
  return (px * width) / 320;
};
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
    // paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.9,
    marginBottom: 40,
  },
  titleContainer: {
    gap: 6,
  },
  // 메인 타이틀
  title: {
    fontFamily: fonts.roboto_medium,
    color: 'black',
    fontSize: 24,
  },
  // 서브 타이틀
  question: {
    fontFamily: fonts.roboto_regular,
    fontSize: 20,
    color: 'black',
  },
  answerContainer: {
    gap: 16,
  },
  // 질문 및 입력 영역
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
    // backgroundColor: 'white',
    lineHeight: 20,
    height: 80,
  },
  // 버튼 영역
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: calculateDp(36),
    paddingHorizontal: 10,
  },
  draftButton: {
    width: calculateDp(96),
    // height: '100%',
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
    width: calculateDp(96),
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
  // 하단 탭바
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#333',
    fontSize: 16,
  },
});
