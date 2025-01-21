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
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {questions} from '../constant/questions';

export default function SurveyScreen() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    ageRange?: string;
    goal?: string;
    job?: string;
    how_hear?: string;
  }>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const questionKeys = ['ageRange', 'goal', 'job', 'how_hear'];

  const handleOptionSelect = (option: string) => {
    const key = questionKeys[questionIndex];
    const updatedAnswers = {
      ...userAnswers,
      [key]: option,
    };

    // console.log('updatedAnswers', updatedAnswers);
    setUserAnswers(updatedAnswers);

    if (questionIndex < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log('All questions answered: ', updatedAnswers);
      // 모든 설문 완료 후 처리 로직
    }
  };

  //notification on/off 함수
  const handleNoti = () => {
    // setIsDisabled(true); 나중에 넣어야됨
    setIsEnabled(!isEnabled);
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      const keyToRemove = questionKeys[
        questionIndex
      ] as keyof typeof userAnswers;

      setUserAnswers(prevAnswers => {
        const updatedAnswers = {...prevAnswers};
        delete updatedAnswers[keyToRemove];
        // console.log('뒤로가기 버튼 후', updatedAnswers);
        return updatedAnswers;
      });

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
            <Text style={styles.questionOrder}>{questionIndex + 1}/5</Text>
            <Text style={styles.question}>
              {questionIndex < 4 && questions[questionIndex].title}
              {questionIndex == 4 && 'We need permisson for some features'}
            </Text>
          </View>

          {questionIndex < 4 ? (
            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              {/* {questions[questionIndex].options.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))} */}
              {questions[questionIndex].options.map((item, index) => {
                const currentKey = questionKeys[
                  questionIndex
                ] as keyof typeof userAnswers;

                const selectedValue = userAnswers[currentKey];
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      // 선택된 값과 일치하면 배경 스타일 적용
                      selectedValue === item ? styles.selectedOption : null,
                    ]}
                    onPress={() => handleOptionSelect(item)}>
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                style={{width: 50, height: 50, backgroundColor: 'skyblue'}}
                onPress={() => navigation.navigate('Login')}>
                <Text>Go to Login</Text>
              </TouchableOpacity> */}
            </ScrollView>
          ) : (
            <ScrollView style={styles.permissonSection} scrollEnabled={false}>
              <TouchableOpacity
                style={styles.permissonNoti}
                disabled={isDisabled}
                onPress={handleNoti}
                activeOpacity={0.9}>
                <Switch
                  style={styles.permissonSwitch}
                  disabled={isDisabled}
                  trackColor={{false: 'white', true: '#93C5FD'}}
                  ios_backgroundColor={'white'}
                  thumbColor={'#0D9488'}
                  onValueChange={handleNoti}
                  value={isEnabled}></Switch>
                <View style={styles.permissonContent}>
                  <Text style={styles.permissonName}>Notifications</Text>
                  <Text style={styles.permissonDiscription}>
                    necessary to send motivational notifications
                  </Text>
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

const {width, height} = Dimensions.get('window');
const calculateDp = (px: number) => {
  return (px * width) / 320;
};

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
    fontFamily: fonts.logo, // 로고 폰트
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: -10,
  },
  subTitle: {
    fontSize: calculateDp(12),
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
  },
  surveySection: {},
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
  selectedOption: {
    backgroundColor: '#D3D3D3',
    // 원하는 배경색으로 변경
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
    color: 'black',
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
