import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
  Platform,
} from 'react-native';
import MemoGradient from '../components/Hooks/MemoGradient';
import {questions} from '../constant/questions';
import {
  axiosPermissonSubmit,
  axiosSurveySumbit,
  axiosNotificationPermisson,
} from '../api/axios';
import {UserServey} from '../type/survey.type';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';
import {getToken} from '../api/secureStorage';
import Logo from '../components/Logo';
import {analytics, messaging} from '../firebase/setting'

export default function SurveyScreen() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserServey>({});
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
    }
  };
  const platformCheck = (): boolean => {
    return Platform.OS === 'ios';
  };

  const navigationHome = (): void => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'BottomStack',
          params: {
            screen: 'HomeStack',
            params: {screen: 'Home'},
          },
        },
      ],
    });
  };

  const handleNoti = async () => {
    if (!platformCheck()) return;
    setIsEnabled(!isEnabled);
    setIsDisabled(true);
    const status = await messaging.requestPermission();
    if (status == 1 || status == 2) {
      const token = await messaging.getToken();
      axiosNotificationPermisson(token);
    }
    await getToken();
    await surveySubmit();
    await permissonSubmit(status);
    await analytics.logEvent('sign_up');
    navigationHome();
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      const keyToRemove = questionKeys[
        questionIndex
      ] as keyof typeof userAnswers;
      setUserAnswers(prevAnswers => {
        const updatedAnswers = {...prevAnswers};
        delete updatedAnswers[keyToRemove];
        return updatedAnswers;
      });
      setQuestionIndex(questionIndex - 1);
    }
  };

  const surveySubmit = async () => {
    try {
        await axiosSurveySumbit({
        ...userAnswers,
      });
    } catch (error: unknown) {
    }
  };
  const permissonSubmit = async (permisson: number) => {
    const DENIED = 0;
    const NOT_DETERMINED = -1;
    const status = !(permisson === DENIED || permisson === NOT_DETERMINED);
  
    try {
      await axiosPermissonSubmit(status);
    } catch (error: unknown) {
    }
  };

  return (
    <View style={styles.container}>
      <MemoGradient />
      <View style={styles.contentContainer}>
        <View style={styles.logoSection}>
          <Logo />
        </View>
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
                style={styles.notificationButton}
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
    marginTop: height * 0.06,
    marginBottom: calculateDp(24),
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
  },
  notificationButton: {
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
    bottom: height * 0.04,
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
