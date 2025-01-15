import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ResultScreen() {
  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  const xpEarned = 50;
  const timeSpent = '3m 21s';

  const handleContinue = () => {
    // ‘Continue’ 버튼 클릭 시 동작(예: 홈 화면으로 이동 등)
    console.log('Continue clicked');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상단 상태 표시 영역 */}

      {/* 가운데 메인 카드(파란색 테두리 박스) */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Response Complete!</Text>

        {/* 체크 아이콘 예시(단순 텍스트 이모지 사용) */}
        <View style={styles.checkIconWrapper}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <Text style={styles.mainMessage}>Great Reflection!</Text>
        <Text style={styles.subMessage}>You’ve earned</Text>
        <Text style={styles.xpText}>+ {xpEarned} XP</Text>
        <Text style={styles.subMessage}>Time spent: {timeSpent}</Text>

        {/* Continue 버튼 */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 탭바 */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  /* -----------------------
     상단 상태 표시 영역 
  ------------------------*/
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16, // SafeAreaView 외에 추가 여백
    paddingBottom: 12,
    backgroundColor: '#f8fafc',
  },
  headerItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  /* -----------------------
     메인 카드 컨테이너 
  ------------------------*/
  cardContainer: {
    margin: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#2979FF', // 파란 테두리
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  checkIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d3f8dd', // 연한 초록색 배경
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIcon: {
    fontSize: 28,
    color: '#4CAF50', // 초록색 체크
    fontWeight: 'bold',
  },
  mainMessage: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    color: '#333',
  },
  subMessage: {
    fontSize: 16,
    color: '#777',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  continueButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  /* -----------------------
     하단 탭바
  ------------------------*/
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
