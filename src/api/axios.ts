import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';
import {UserServey, PermissionTypes} from '../type/survey.type';
import {getToken, removeToken} from './secureStorage';
import {ProfileTypes} from '../type/profile.type';
// 서버 연결 테스트 함수

export const axiosTestJwt = async () => {
  try {
    const response = await axiosInstance.get('/test/jwt');
    console.log('서버 응답:', response.data);
    return true;
  } catch (error) {
    console.error('서버 요청 실패:', error);
    return false;
  }
};

const axiosSignoutURL = '/api/auth/logout';
export const axiosSignout = async () => {
  try {
    console.log('logoutdsds');
    const response = await axiosInstance.post(axiosSignoutURL);
    console.log('signout서버 응답: ', response.data);
  } catch (error) {
    Alert.alert('signoutError' + error);
  }
};

const axioxAccountDeleteURL = '/api/auth/delete';
export const axiosAccountDelete = async () => {
  try {
    const response = await axiosInstance.delete(axioxAccountDeleteURL);
    // 성공 시 Alert 표시
    Alert.alert('Success', 'your account has been deleted');
  } catch (error) {
    // 실패 시 Alert 표시
    Alert.alert('delete Error' + error);
  }
};

const axiosSurveySumbitURL = '/api/survey/save';
export const axiosSurveySumbit = async (answers: UserServey) => {
  try {
    console.log('answers', answers);
    const response = await axiosInstance.post(axiosSurveySumbitURL, {answers});
    console.log('Survey submitted:', response.data);
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

const axiosGetUserSurveyURL = '/api/survey/user';
export const axiosGetUserSurvey = async () => {
  try {
    const response = await axiosInstance.get(axiosGetUserSurveyURL);
    // 응답 데이터가 있는지 확인
    console.log('response.data', response.data);
    // console.log('response.data.length', response.data.length);

    if (response.data && response.data.hasSurvey === true) {
      return true;
    }
    return false; // 데이터가 비어있으면 false 반환
  } catch (error) {
    // console.error('Error getting user survey:', error);
    // return false;
    throw error; // 에러를 다시 던져서 외부 try/catch에서 처리하도록 함
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
    console.log('permisson submitted:', response.data);
  } catch (error) {
    console.error('Error submitting permisson:', error);
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
      prevXP: 0,
      level: 0,
      noti: false,
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
    console.log('response', response.data);
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

// TOD
// const axiosPostAnswersURL = '/api/answers/bulk';
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
    console.log('\n answer', answers);
    const response = await axiosInstance.post(axiosPostAnswersURL, {
      answers,
      questionName,
    });
    console.log('Answers saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving answers:', error);
    return;
  }
};

const axiosUpdateAnswersURL = '/api/answers/update';
export const axiosUpdateAnswers = async (
  //query: id, body : content
  subquestionId: number,
  answer: string,
) => {
  try {
    const response = await axiosInstance.put(
      `${axiosUpdateAnswersURL}/${subquestionId}`,
      {
        content: answer,
      },
    );
    console.log('1111Answers updated:', response.data);
  } catch (error) {
    console.error('1111Error updating answers:', error);
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
    console.error('Error getting subquestions: sub', error);
    // return [];
  }
};

const axiosGetResultURL = '/api/result';
export const axiosGetResult = async () => {
  try {
    const response = await axiosInstance.get(axiosGetResultURL);
    console.log('result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting subquestions: res', error);
    return [];
  }
};
