import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';
import {UserServey, Permissions} from '../type/survey.type';
import {getToken, removeToken} from './secureStorage';

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

const axiosSignoutURL = '/api/auth/signout';
export const axiosSignout = async () => {
  try {
    console.log('jwt token', getToken());
    // GET 요청을 인스턴스를 사용해 실행
    const response = await axiosInstance.get(axiosSignoutURL);
    console.log('signout서버 응답: ', response.data);

    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('signout서버 요청 실패:', error);
    // 실패 시 Alert 표시
    Alert.alert('signoutError', '서버 요청 실패: ' + error);
  }
};

const axioxAccountDeleteURL = '/api/auth/delete';
export const axiosAccountDelete = async () => {
  try {
    const response = await axiosInstance.get(axioxAccountDeleteURL);
    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('signout서버 요청 실패:', error);
    // 실패 시 Alert 표시
    Alert.alert('signoutError', '서버 요청 실패: ' + error);
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

const axiosPermissonSubmitURL = '/api/survey/save-permisson';
export const axiosPermissonSubmit = async (permissons: Permissions) => {
  try {
    const response = await axiosInstance.post(axiosPermissonSubmitURL, {permissons});
    console.log('Survey submitted:', response.data);
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

const axiosGetQuestionsURL = '/api/questions/me';
export const axiosGetQuestions = async () => {
  try {
    const response = await axiosInstance.get(axiosGetQuestionsURL);
    // console.log('Questions:', response.data);
    return response;
  } catch (error) {
    console.error('Error getting questions:', error);
    return [];
  }
};

// answers
const axiosGetAnswersURL = 'api/answers/me';
export const axiosGetAnswers = async () => {
  try {
    const response = await axiosInstance.get(axiosGetAnswersURL);
    // console.log('Answers:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting answers:', error);
    return [];
  }
};

const axiosLogoutURL = '/api/auth/logout';
export const axiosLogout = async () => {
  try {
    await removeToken();
    const response = await axiosInstance.post(axiosLogoutURL);
    console.log('Logout:', response.data);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const axiosPostAnswersURL = '/api/answers/bulk';
export const axiosPostAnswers = async (answers: any) => {
  try {
    const response = await axiosInstance.post(axiosPostAnswersURL, answers);
    console.log('Answers saved:', response.data);
  } catch (error) {
    console.error('Error saving answers:', error);
  }
};

const axiosUpdateAnswersURL = '/api/answers/update';
export const axiosUpdateAnswers = async (
  subQuestionId: number,
  answer: string,
) => {
  try {
    const response = await axiosInstance.put(
      `${axiosUpdateAnswersURL}/${subQuestionId}`,
      {
        content: answer,
      },
    );
    console.log('Answers updated:', response.data);
  } catch (error) {
    console.error('Error updating answers:', error);
  }
};

// subquestions
const axiosGetSubquestionsURL = '/api/subquestions';
export const axiosGetSubquestions = async (questionId: number) => {
  try {
    const response = await axiosInstance.get(
      `${axiosGetSubquestionsURL}/${questionId}`,
    );
    console.log('Subquestions:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting subquestions:', error);
    return [];
  }
};
