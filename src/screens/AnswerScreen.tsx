import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';

export default function AnswerScreen() {
  // 입력값을 저장하기 위한 state
  const [callParents, setCallParents] = useState('');
  const [selfCare, setSelfCare] = useState('');
  const [studyFocus, setStudyFocus] = useState('');

  const handleSaveDraft = () => {
    // 임시 저장 로직
    console.log('Draft Saved:', {callParents, selfCare, studyFocus});
  };

  const handlePublish = () => {
    // 게시 로직
    console.log('Published:', {callParents, selfCare, studyFocus});
  };

  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0.4}} // 그라디언트 시작점
      end={{x: 0, y: 1}} // 그라디언트 종료점
      style={globalStyle.gradientContainer} // 전체 배경 적용
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Header />
          {/* 메인 타이틀 */}
          <Text style={styles.title}>What made you feel proud today?</Text>

          {/* 각 질문 + 입력 폼 */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Did you call your parents?</Text>
            <TextInput
              style={styles.input}
              placeholder="start writing your thoughts..."
              value={callParents}
              onChangeText={setCallParents}
              multiline
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>
              Did you make time to take care of yourself?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="start writing your thoughts..."
              value={selfCare}
              onChangeText={setSelfCare}
              multiline
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>
              Did you focus on your studying or working on a task?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="start writing your thoughts..."
              value={studyFocus}
              onChangeText={setStudyFocus}
              multiline
            />
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveDraft}>
              <Text style={styles.saveButtonText}>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.publishButton}
              onPress={() => navigation.navigate('Result')}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* 하단 탭바 예시 */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 20,
  },
  // 메인 타이틀
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  // 질문 및 입력 영역
  inputBlock: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  // 버튼 영역
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#444',
    fontWeight: '600',
    fontSize: 16,
  },
  publishButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
