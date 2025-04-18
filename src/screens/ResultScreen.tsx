import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import CheckIcon from '../assets/svg/check-icon.svg';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import {
  StackActions,
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import {useProfileStore} from '../zustand/useProfileStore';
import {isToday} from '../components/utils/utils';
type AnswerScreenRouteProp = RouteProp<HomeStackParamList, 'Result'>;

export default function ResultScreen() {
  const route = useRoute<AnswerScreenRouteProp>();
  const xp = route.params.question_xp;
  const {fetchProfile, isDayStreak, profile} = useProfileStore();
  const datas = profile;
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const handleContinue = () => {
    navigation.dispatch(StackActions.pop(2));
  };
  useEffect(() => {
    fetchProfile();
    isDayStreak(isToday(datas.lastStreakDate));
  }, []);
  return (
    <View style={styles.container}>
      <MemoGradient />
      <View style={styles.contentContainer}>
        <Header />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Response complete !</Text>
            <View style={styles.resultContainer}>
              <View style={styles.checkIconContainer}>
                <CheckIcon />
              </View>
              <Text style={styles.evalutionMessage}>Great Reflection !</Text>
              <Text style={styles.subMessage}>You've earned</Text>
              <Text style={styles.gainXp}>+ {xp} XP</Text>
              <Text style={styles.subMessage}></Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '75%',
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginBottom: 40,
    gap: 40,
  },
  cardTitle: {
    fontFamily: fonts.roboto_medium,
    fontSize: 24,
    color: colors.black,
  },
  checkIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    marginBottom: 16,
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  evalutionMessage: {
    fontFamily: fonts.roboto_medium,
    fontSize: 22,
    color: colors.black,
  },
  subMessage: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: colors.sub_mesasage,
  },
  gainXp: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    fontFamily: fonts.roboto_regular,
    color: colors.green_button_text,
    fontSize: 18,
  },
});
