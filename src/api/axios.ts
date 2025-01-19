import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';

// 서버 연결 테스트 함수
export const testServerConnection = async () => {
  try {
    // GET 요청을 인스턴스를 사용해 실행
    const response = await axiosInstance.get('/test');
    console.log('서버 응답:', response.data);

    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('서버 요청 실패:', error);

    // 실패 시 Alert 표시
    Alert.alert('Error', '서버 요청 실패: ' + error);
  }
};
