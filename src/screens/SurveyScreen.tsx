import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import {GlobalStyle} from '../styles/global';

export default function SurveyScreen() {
  const ageGroups = [
    'Under 18',
    '18 - 22',
    '23 - 26',
    '27 - 34',
    '35 - 44',
    '45+',
  ];

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 상단(밝은색) -> 하단(어두운색) 그라디언트
      start={{x: 0, y: 0.4}} // 왼쪽 위
      end={{x: 0, y: 1}} // 오른쪽
      style={styles.gradientContainer}>
      <View style={styles.container}>
        {/* 상단 로고/타이틀 영역 */}
        <Text style={GlobalStyle.logo}>Coura</Text>
        <Text style={styles.subtitle}>Create your Own Aura</Text>

        {/* 질문 문구 */}
        <Text style={styles.question}>What is your age group?</Text>

        {/* 항목들은 개수가 많아 스크롤이 가능하도록 ScrollView 사용 예시 */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          {ageGroups.map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1, // 전체 화면을 그라디언트로
  },
  container: {
    flex: 1,
    // backgroundColor: '#C5E0D7', // 전체 배경색
    alignItems: 'center',
    paddingTop: 80, // 상단 여백
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 36,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    // 높이를 고정해도 되고, flexGrow 등을 사용해도 됩니다.
  },
  option: {
    width: '80%',
    backgroundColor: '#E3F2EE',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});
