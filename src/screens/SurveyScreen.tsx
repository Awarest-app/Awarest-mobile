import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import MemoGradient from '../components/Hooks/MemoGradient';
import {questions} from '../constant/questions';
import {axiosSurveySumbit} from '../api/axios';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {CustomDefaultAlert} from '../components/utils/CustomAlert';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';

export default function SurveyScreen() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    ageRange?: string;
    goal?: string;
    job?: string;
    how_hear?: string;
  }>({});
  // 알림 모달?
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const questionKeys = ['ageRange', 'goal', 'job', 'how_hear'];

  const handleOptionSelect = (option: string) => {
    const key = questionKeys[questionIndex];
    const updatedAnswers = {
      ...userAnswers,
      [key]: option,
    };

    setUserAnswers(updatedAnswers);

    if (questionIndex < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log('All questions answered: ', updatedAnswers);
      // 모든 설문 완료 후 처리 로직
    }
  };
  const platformCheck = (): boolean => {
    return Platform.OS === 'ios';
    // Platform.OS === 'android';
  };

  const navigationHome = (): void => {
    console.log('navigationHome=============');
      navigation.reset({ index: 0,
      routes: [{
        name: 'BottomStack',
        params: {
          screen: 'HomeStack',
          params: { screen: 'Home'},
        }}],
    });
  };
  //notification on/off 함수
  const requestNotificationPermission = async () => {
    const {status} = await requestNotifications(['alert', 'sound', 'badge']);
    if (status === RESULTS.GRANTED) {
      Alert.alert('Permission Granted', 'Notifications have been enabled.');
    } else {
      Alert.alert('Permission Denied', 'Notifications are not enabled.');
    }
  };
  const handleNoti = async () => {
    if (!platformCheck()) return;
    setIsEnabled(!isEnabled); // toggle 모양
    setIsDisabled(true);
    const {status} = await checkNotifications();

    switch (status) {
      case RESULTS.GRANTED:
        // navigationHome();
        break;
      case RESULTS.DENIED:
        await requestNotificationPermission();
        break;
        case RESULTS.BLOCKED:
          // navigationHome();
          CustomDefaultAlert({
            mainText: 'Permission Blocked',
            subText: 'Notifications are blocked. Please enable them in settings.',
          });
          break;
      case RESULTS.UNAVAILABLE:
        navigationHome();
        CustomDefaultAlert({
          mainText: 'Permission Unavailable',
          subText: 'Notifications are not available on this device.',
        });
        break;
      default:
        console.log('Unknown permission status:', status);
    }
    navigationHome();
    handleSurveySubmit();
  };
  // 뒤로가기 버튼 클릭 시 이전 질문으로 돌아가는 함수
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

  const handleSurveySubmit = async () => {
    try {
      const response = await axiosSurveySumbit({
        ...userAnswers,
        noti: isEnabled,
      });
      // navigation.navigate('HomeStack');
      navigation.navigate('BottomStack', {
        screen: 'HomeStack',
        params: {
          screen: 'Home',
        },
      });
      console.log(response);
    } catch (error: unknown) {
      // const {status, data} = error.response;
      console.error('survey submit Error response:');
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
                  trackColor={{false: colors.white, true: '#93C5FD'}}
                  ios_backgroundColor={colors.white}
                  thumbColor={'#0D9488'}
                  onValueChange={handleNoti}
                  value={isEnabled}
                />
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
    marginBottom: calculateDp(24),
  },
  logoText: {
    fontSize: 40,
    fontFamily: fonts.logo, // 로고 폰트
    color: colors.primary,
    marginBottom: -10,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
  },
  surveySection: {},
  questionSection: {
    marginBottom: 30,
    gap: 6,
  },
  questionOrder: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: colors.primary,
    letterSpacing: 1,
  },
  question: {
    fontSize: 24,
    fontFamily: fonts.lato_regular,
    color: '#000000',
  },
  scrollContainer: {
    width: '100%',
    height: '49%',
  },
  option: {
    height: 55,
    backgroundColor: colors.button_color,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  selectedOption: {
    backgroundColor: colors.selected,
  },
  optionText: {
    fontFamily: fonts.lato_regular,
    fontSize: 18,
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
    height: 100,
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
    fontSize: 20,
    color: colors.black,
  },
  permissonDiscription: {
    fontFamily: fonts.lato_regular,
    fontSize: 17,
    color: colors.input_ph,
  },
  backButton: {
    width: '100%',
    height: 48,
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
    fontSize: 20,
    color: colors.green_button_text,
  },
});
