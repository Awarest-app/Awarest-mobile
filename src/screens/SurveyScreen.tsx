import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import MemoGradient from '../components/Hooks/MemoGradient';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../styles/fonts'
import colors from '../styles/colors';
import {globalStyle} from '../styles/global';
export default function SurveyScreen() {
  // 설문에 사용할 옵션들
  const ageGroups = [
    'Under 18',
    '18 - 22',
    '23 - 26',
    '27 - 34',
    '35 - 44',
    '45+',
  ];
  const goalOptions = [
    'Understand myself better',
    'Find life direction',
    'No specific purpose',
    'Discover my purpose',
    'Build strong habits',
    'Other',
  ];
  const heardFromOptions = [
    'Friends',
    'Google search',
    'Appstore',
    'Reddit',
    'Social media',
    'Other',
  ];
  const workWordsOptions = [
    'Student',
    'Retired',
    'Engineer',
    'Developer',
    'Sales',
    'Founder',
    'Artist',
    'Founder',
    'Designer',
    'Investor',
    'Teacher',
    'Other',
  ];

  // 설문 질문들을 순서대로 배열에 담기
  const questions = [
    {
      title: 'What is your age group?',
      options: ageGroups,
    },
    {
      title: 'What is your goal?',
      options: goalOptions,
    },
    {
      title: 'What words can describe your work?',
      options: workWordsOptions,
    },
    {
      title: 'How did you hear about us?',
      options: heardFromOptions,
    },
  ];

  // 현재 어떤 질문을 보여줄지 인덱스로 관리
  const [questionIndex, setQuestionIndex] = useState(0);
  // 사용자가 선택한 답변들을 저장
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 옵션을 선택했을 때(답변했을 때) 호출되는 함수
  const handleOptionSelect = (option: string) => {
    // 기존 답변 복사
    const updatedAnswers = [...userAnswers];
    // 현재 설문 인덱스 위치에 사용자 선택값 저장
    updatedAnswers[questionIndex] = option;
    setUserAnswers(updatedAnswers);

    // 마지막 질문이 아니라면 다음 질문으로 넘어감
    if (questionIndex < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // 모든 설문이 끝났을 때 로직 (예: 서버 전송, 다음 화면 이동 등)
      console.log('All questions answered: ', updatedAnswers);
      // 예: 설문 완료 페이지로 이동하거나 알람을 띄울 수 있습니다.
    }
  };

  //notification on/off 함수
  const handleNoti = () => {
    setIsDisabled(true);
    console.log('notification: ', isEnabled);
    console.log('disable: ', isDisabled);
    setIsEnabled(!isEnabled);
  };
  // 뒤로가기 버튼 클릭 시 이전 질문으로 돌아가는 함수
  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  
  return (
    <View style={styles.container}>
      <MemoGradient />
      <View style={styles.contentContainer}>
        {/* 상단 로고/타이틀 영역 */}
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>Coura</Text>
          <Text style={styles.subTitle}>Create your Own Aura</Text>
        </View>
        {/* 현재 질문 표시 */}
        <View style={styles.surveySection}>
          <View style={styles.questionSection}>
            <Text style={styles.questionOrder}>{questionIndex+1}/5</Text>
            <Text style={styles.question}>
              {questionIndex < 4 && questions[questionIndex].title}
              {questionIndex == 4 && 'We need permisson for some features'}
            </Text>
          </View>

          {questionIndex < 4 ? (
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {questions[questionIndex].options.map((item, index) => (
              <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
            ) : (
            <ScrollView style={styles.permissonSection} scrollEnabled={false}
              >
              <TouchableOpacity style={styles.permissonNoti}
                disabled={isDisabled}
                onPress={handleNoti}
                activeOpacity={0.9}
              >
                <Switch style={styles.permissonSwitch}
                  disabled={isDisabled}
                  trackColor={{false: 'white', true: '#93C5FD'}}
                  ios_backgroundColor={'white'}
                  thumbColor={'#0D9488'}
                  onValueChange={handleNoti}
                  value={isEnabled}
                >
                </Switch>
                <View style={styles.permissonContent}>
                  <Text style={styles.permissonName}>Notifications</Text>
                  <Text style={styles.permissonDiscription}>necessary to send motivational notifications</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
        {/* 뒤로가기 버튼 (첫 번째 질문에서는 숨길 수도 있음) */}
        {questionIndex > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to previous</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const calculateDp = (px: number) => {
  const {width, height} = Dimensions.get('window');
  return ((px * width) / 320);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '80%',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: calculateDp(60),
    marginBottom: calculateDp(20),
  },
  logoText: {
    fontSize: calculateDp(34),
    fontFamily: fonts.logo_font, // 로고 폰트
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: -10,
  },
  subTitle: {
    fontSize: calculateDp(12),
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
  },
  surveySection: {
  },
  questionSection: {
    marginBottom: calculateDp(20),
    gap: calculateDp(6),
  },
  questionOrder: {
    fontFamily: fonts.roboto_medium,
    fontSize: calculateDp(14),
    color: colors.primary,
    letterSpacing: 1,
  },
  question: {
    fontSize: calculateDp(18),
    fontFamily: fonts.lato_regular,
    color: '#000000',
  },
  scrollContainer: {
    width: '100%',
    height: '48%',
  },
  option: {
    height: calculateDp(44),
    backgroundColor: colors.button_color,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  optionText: {
    fontFamily: fonts.lato_regular,
    fontSize: calculateDp(14),
    color: '#000000',
  },
  permissonSection: {
    height: '30%',
    marginTop: 40,
    borderRadius: 8,
    // boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  permissonNoti: {
    flexDirection: 'row',
    width: '100%',
    height: calculateDp(80),
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.card_border,
  },
  permissonSwitch: {
    width: '20%',
    height: '100%',
  },
  permissonContent: {
    width: '80%',
    gap: 5,
    flexDirection: 'column',
  },
  permissonName: {
    fontFamily: fonts.roboto_medium,
    fontSize: calculateDp(16),
    color: 'black'
  },
  permissonDiscription: {
    fontFamily: fonts.lato_regular,
    fontSize: calculateDp(14),
    color: colors.input_ph,
  },
  backButton: {
    width: '100%',
    height: calculateDp(38),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: calculateDp(60),
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: calculateDp(16),
    color: colors.green_button_text,
  },
});
