// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import colors from '../styles/colors';
// import {globalStyle} from '../styles/global';

// export default function SurveyScreen() {
//   const ageGroups = [
//     'Under 18',
//     '18 - 22',
//     '23 - 26',
//     '27 - 34',
//     '35 - 44',
//     '45+',
//   ];

//   const heardFromOptions = [
//     'Friends',
//     'Google search',
//     'Appstore',
//     'Reddit',
//     'Social media',
//     'Other',
//   ];
//   const workWordsOptions = [
//     'Creative',
//     'Analytical',
//     'Teamwork',
//     'Leadership',
//     'Self-driven',
//     'Other',
//   ];

//   return (
//     <LinearGradient
//       colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 상단(밝은색) -> 하단(어두운색) 그라디언트
//       start={{x: 0, y: 0.4}} // 왼쪽 위
//       end={{x: 0, y: 1}} // 오른쪽
//       style={styles.gradientContainer}>
//       <View style={styles.container}>
//         {/* 상단 로고/타이틀 영역 */}
//         <Text style={globalStyle.logo}>Coura</Text>
//         <Text style={styles.subtitle}>Create your Own Aura</Text>

//         {/* 질문 문구 */}
//         <Text style={styles.question}>What is your age group?</Text>

//         {/* 항목들은 개수가 많아 스크롤이 가능하도록 ScrollView 사용 예시 */}
//         <ScrollView
//           style={styles.scrollContainer}
//           contentContainerStyle={{alignItems: 'center'}}
//           showsVerticalScrollIndicator={false}>
//           {ageGroups.map((item, index) => (
//             <TouchableOpacity key={index} style={styles.option}>
//               <Text style={styles.optionText}>{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradientContainer: {
//     flex: 1, // 전체 화면을 그라디언트로
//   },
//   container: {
//     flex: 1,
//     // backgroundColor: '#C5E0D7', // 전체 배경색
//     alignItems: 'center',
//     paddingTop: 80, // 상단 여백
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//     marginBottom: 36,
//   },
//   question: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   scrollContainer: {
//     width: '100%',
//     // 높이를 고정해도 되고, flexGrow 등을 사용해도 됩니다.
//   },
//   option: {
//     width: '80%',
//     backgroundColor: '#E3F2EE',
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   optionText: {
//     fontSize: 18,
//     color: '#333',
//     fontWeight: '500',
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
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
    {
      title: 'We need permisson for some features ',
      options: heardFromOptions,
    },
  ];

  // 현재 어떤 질문을 보여줄지 인덱스로 관리
  const [questionIndex, setQuestionIndex] = useState(0);
  // 사용자가 선택한 답변들을 저장
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // 옵션을 선택했을 때(답변했을 때) 호출되는 함수
  const handleOptionSelect = (option: string) => {
    // 기존 답변 복사
    const updatedAnswers = [...userAnswers];
    // 현재 설문 인덱스 위치에 사용자 선택값 저장
    updatedAnswers[questionIndex] = option;
    setUserAnswers(updatedAnswers);

    // 마지막 질문이 아니라면 다음 질문으로 넘어감
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // 모든 설문이 끝났을 때 로직 (예: 서버 전송, 다음 화면 이동 등)
      console.log('All questions answered: ', updatedAnswers);
      // 예: 설문 완료 페이지로 이동하거나 알람을 띄울 수 있습니다.
    }
  };

  // 뒤로가기 버튼 클릭 시 이전 질문으로 돌아가는 함수
  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  
  return (
    <LinearGradient
    colors={[colors.green_gradientStart, colors.green_gradientEnd]}
    start={{x: 0, y: 0.4}}
    end={{x: 0, y: 1}}
    style={styles.gradientContainer}>
      <View style={styles.container}>
        {/* 상단 로고/타이틀 영역 */}
       <View style={styles.logoSection}>
          <Text style={styles.logoText}>Coura</Text>
          <Text style={styles.subTitle}>Create your Own Aura</Text>
        </View>
        {/* 현재 질문 표시 */}
        <View style={styles.surveySection}>
          <View style={styles.questionSection}>
            <Text style={styles.questionOrder}>{questionIndex+1}/5</Text>
            <Text style={styles.question}>{questions[questionIndex].title}</Text>
          </View>

          {questionIndex < 4 ? (
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {questions[questionIndex].options.map((item, index) => (
              <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <Text>{questionIndex}</Text>
            </ScrollView>
            ) : (
              <View style={styles.permissonSection}>
              <Text>Aasdaassdasddsllow</Text>
            </View>
          )}
        </View>
        {/* 뒤로가기 버튼 (첫 번째 질문에서는 숨길 수도 있음) */}
        {questionIndex > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to previous</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const calculateDp = (px: number) => {
  const {width, height} = Dimensions.get('window');
  return ((px * width) / 320);
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
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
    width: '80%',
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
    height: '48%',
    backgroundColor: 'red',
    zIndex: 999,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    width: '80%',
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
