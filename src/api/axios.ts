import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';
import {UserServey} from '../type/survey.type';
import {getToken} from './secureStorage';

// 서버 연결 테스트 함수
export const axiosTestServer = async () => {
  try {
    // GET 요청을 인스턴스를 사용해 실행
    const response = await axiosInstance.get('/test/server');
    console.log('서버 응답:', response.data);

    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('서버 요청 실패:', error);
    // 실패 시 Alert 표시
    Alert.alert('Error', '서버 요청 실패: ' + error);
  }
};

export const axiosTestJwt = async () => {
  try {
    console.log('jwt token', getToken());
    // GET 요청을 인스턴스를 사용해 실행
    const response = await axiosInstance.get('/test/jwt');
    console.log('서버 응답:', response.data);

    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('서버 요청 실패:', error);
    // 실패 시 Alert 표시
    Alert.alert('Error', '서버 요청 실패: ' + error);
  }
};

const axiosSurveySumbitURL = '/api/survey/save-survey';
export const axiosSurveySumbit = async (answers: UserServey) => {
  try {
    const response = await axiosInstance.post(axiosSurveySumbitURL, {answers});
    console.log('Survey submitted:', response.data);
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};
