import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';
import {UserServey, PermissionTypes} from '../type/survey.type';
import {getToken, removeToken} from './secureStorage';
import {ProfileTypes} from '../type/profile.type';
// 서버 연결 테스트 함수
export const axiosTestServer = async () => {
  try {
    // GET 요청을 인스턴스를 사용해 실행
    const response = await axiosInstance.get('/test/server', {
      headers: {
        'Skip-Auth': true, // 이 요청에서는 토큰을 포함하지 않음
      },
    });
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

const axiosSignoutURL = '/api/auth/logout';
export const axiosSignout = async () => {
  try {
    // console.log('jwt token', getToken());
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
    const response = await axiosInstance.delete(axioxAccountDeleteURL);
    // 성공 시 Alert 표시
    Alert.alert('Success', `서버 응답: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('signout서버 요청 실패:', error);
    // 실패 시 Alert 표시
    Alert.alert('signoutError', '서버 요청 실패: ' + error);
  }
};

const axiosSurveySumbitURL = '/api/survey/save';
// const axiosSurveySumbitURL = '/api/survey/save-survey';
export const axiosSurveySumbit = async (answers: UserServey) => {
  try {
    console.log('answers', answers);
    const response = await axiosInstance.post(axiosSurveySumbitURL, {answers});
    console.log('Survey submitted:', response.data);
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

// 알림 저장
const axiosPermissonSubmitURL = '/api/profile/noti-permission';
export const axiosPermissonSubmit = async (permissons: boolean) => {
  try {
    // console.log('permissons', permissons);
    const response = await axiosInstance.post(axiosPermissonSubmitURL, {
      permissons,
    });
    console.log('Survey submitted:', response.data);
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

const axiosGetProfileURL = '/api/profile/me';
export const axiosGetProfile = async (): Promise<ProfileTypes> => {
  try {
    const response = await axiosInstance.get<ProfileTypes>(axiosGetProfileURL);
    return response.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    return {
      profileImg: '',
      userName: '',
      memberSince: '',
      dayStreak: 0,
      totalXP: 0,
      levelXP: 0,
      level: 0,
      totalAnswers: 0,
      lastStreakDate: '',
    };
  }
};

const axiosUpdateUsernameURL = '/api/profile/username';
export const axiosUpdateUsername = async (newUsername: string) => {
  try {
    const response = await axiosInstance.patch(axiosUpdateUsernameURL, {
      newUsername,
    });
    console.log('response', response);
  } catch (error) {
    console.log(error);
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

const axiosPostAnswersURL = '/api/questions/answer';
export const axiosPostAnswers = async (answers: any, questionName: string) => {
  try {
    console.log('answer', answers);
    const response = await axiosInstance.post(axiosPostAnswersURL, {
      answers,
      questionName,
    });
    console.log('Answers saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving answers:', error);
  }
};

const axiosUpdateAnswersURL = '/api/answers/update';
export const axiosUpdateAnswers = async (
  //query: id, body : content
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

const axiosGetResultURL = '/api/result';
export const axiosGetResult = async () => {
  try {
    const response = await axiosInstance.get(axiosGetResultURL);
    console.log('result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting subquestions:', error);
    return [];
  }
};
