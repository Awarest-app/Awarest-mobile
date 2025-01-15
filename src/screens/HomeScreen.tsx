// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {RootStackParamList} from '../type/route.type';
// import {Header} from '../components/Header';
// import LinearGradient from 'react-native-linear-gradient';
// import colors from '../styles/colors';

// const HomeScreen = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   // 예시로 하드코딩된 데이터
//   const todayQuestions = [
//     {id: 1, title: 'What made you feel proud today?'},
//     {id: 2, title: "What's one thing you learned?"},
//     {id: 3, title: 'How did you take care of yourself?'},
//   ];

//   const previousAnswers = [
//     {
//       question: 'What made you feel proud today?',
//       answers: [
//         {
//           text: 'I completed a challenging project at work ahead of schedule.',
//           date: '2025-01-24 10:20 AM',
//         },
//         {
//           text: 'I completed a challenging project at work ahead of schedule.',
//           date: '2025-01-24 10:20 AM',
//         },
//       ],
//     },
//     {
//       question: "What's one thing you learned?",
//       answers: [
//         {
//           text: 'React Native styling techniques',
//           date: '2025-01-24 10:25 AM',
//         },
//       ],
//     },
//     {
//       question: 'How did you take care of yourself?',
//       answers: [
//         {
//           text: 'Went for a short walk during lunch break',
//           date: '2025-01-24 10:30 AM',
//         },
//       ],
//     },
//   ];

//   return (
//     <LinearGradient
//       colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
//       start={{x: 0, y: 0}} // 그라디언트 시작점 (왼쪽 위)
//       end={{x: 1, y: 0}} // 그라디언트 종료점 (오른쪽)
//       style={[
//         styles.gradientContainer,
//         // {paddingTop: insets.top}, // 상태 바 높이만큼 padding 추가
//       ]}>
//       <View style={styles.container}>
//         <Header />
//         <ScrollView contentContainerStyle={styles.contentContainer}>
//           {/* 오늘의 질문 섹션 */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Today's Questions</Text>
//             {todayQuestions.map(question => (
//               <TouchableOpacity
//                 key={question.id}
//                 style={styles.questionBox}
//                 onPress={() => {
//                   navigation.navigate('Anwser');
//                 }}>
//                 <Text style={styles.questionText}>{question.title}</Text>
//                 <Text style={styles.tapToReflect}>Tap to reflect</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* 이전 답변 섹션 */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Your previous Answers</Text>

//             {previousAnswers.map((item, index) => (
//               <View key={index} style={styles.previousAnswerBlock}>
//                 <Text style={[styles.questionText, styles.previousQuestion]}>
//                   {item.question}
//                 </Text>
//                 {item.answers.map((answer, ansIndex) => (
//                   <View key={ansIndex} style={styles.answerContainer}>
//                     <Text style={styles.answerText}>{answer.text}</Text>
//                     <Text style={styles.answerDate}>{answer.date}</Text>
//                     <View style={styles.actions}>
//                       <TouchableOpacity
//                         style={styles.editButton}
//                         onPress={() => {
//                           // 편집 아이콘 클릭 시
//                           console.log('Edit answer');
//                         }}>
//                         <Text style={styles.actionText}>✏️</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={styles.deleteButton}
//                         onPress={() => {
//                           // 삭제 아이콘 클릭 시
//                           console.log('Delete answer');
//                         }}>
//                         <Text style={styles.actionText}>🗑️</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </ScrollView>

//         {/* 하단 탭 (예시) */}
//         {/* <View style={styles.tabBar}>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text>Profile</Text>
//         </TouchableOpacity>
//       </View> */}
//       </View>
//     </LinearGradient>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   gradientContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     height: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f4f7',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     elevation: 3,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 16,
//     padding: 16,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   questionBox: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#fafafa',
//   },
//   questionText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   tapToReflect: {
//     fontSize: 14,
//     color: '#888',
//   },
//   previousAnswerBlock: {
//     marginBottom: 16,
//   },
//   previousQuestion: {
//     marginBottom: 6,
//     fontWeight: 'bold',
//   },
//   answerContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: 8,
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   answerText: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   answerDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   actions: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   editButton: {
//     marginRight: 16,
//   },
//   deleteButton: {},
//   actionText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     height: 56,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     backgroundColor: '#fff',
//     elevation: 4,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';
import {Header} from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const todayQuestions = [
    {id: 1, title: 'What made you feel proud today?'},
    {id: 2, title: "What's one thing you learned?"},
    {id: 3, title: 'How did you take care of yourself?'},
  ];

  const previousAnswers = [
    {
      question: 'What made you feel proud today?',
      answers: [
        {
          text: 'I completed a challenging project at work ahead of schedule.',
          date: '2025-01-24 10:20 AM',
        },
      ],
    },
    {
      question: "What's one thing you learned?",
      answers: [
        {
          text: 'React Native styling techniques',
          date: '2025-01-24 10:25 AM',
        },
      ],
    },
  ];

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0}} // 그라디언트 시작점
      end={{x: 1, y: 1}} // 그라디언트 종료점
      style={styles.gradientBackground} // 전체 배경 적용
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Header />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Questions</Text>
            {todayQuestions.map(question => (
              <TouchableOpacity
                key={question.id}
                style={styles.questionBox}
                onPress={() => {
                  navigation.navigate('Anwser');
                }}>
                <Text style={styles.questionText}>{question.title}</Text>
                <Text style={styles.tapToReflect}>Tap to reflect</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Answers</Text>
            {previousAnswers.map((item, index) => (
              <View key={index} style={styles.previousAnswerBlock}>
                <Text style={[styles.questionText, styles.previousQuestion]}>
                  {item.question}
                </Text>
                {item.answers.map((answer, ansIndex) => (
                  <View key={ansIndex} style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer.text}</Text>
                    <Text style={styles.answerDate}>{answer.date}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* 나중에 제외 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your previous Answers</Text>
            {previousAnswers.map((item, index) => (
              <View key={index} style={styles.previousAnswerBlock}>
                <Text style={[styles.questionText, styles.previousQuestion]}>
                  {item.question}
                </Text>
                {item.answers.map((answer, ansIndex) => (
                  <View key={ansIndex} style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer.text}</Text>
                    <Text style={styles.answerDate}>{answer.date}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, // 화면 전체를 채우기 위해 flex: 1 설정
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // 배경 투명 설정
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  questionBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  tapToReflect: {
    fontSize: 14,
    color: '#888',
  },
  previousAnswerBlock: {
    marginBottom: 16,
  },
  previousQuestion: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  answerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  answerDate: {
    fontSize: 12,
    color: '#888',
  },
});
