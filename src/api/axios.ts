import {Alert} from 'react-native';
import {axiosInstance} from './axios.instance';
import {UserServey} from '../type/survey.type';
import {removeToken} from './secureStorage';
import {ProfileTypes} from '../type/profile.type';

export const axiosTestJwt = async () => {
  try {
    await axiosInstance.get('/test/jwt');
    return true;
  } catch (error) {
    return false;
  }
};

const axiosSignoutURL = '/api/auth/logout';
export const axiosSignout = async () => {
  try {
    await axiosInstance.post(axiosSignoutURL);
  } catch (error) {
    Alert.alert('signoutError' + error);
  }
};

const axioxAccountDeleteURL = '/api/auth/delete';
export const axiosAccountDelete = async () => {
  try {
    await axiosInstance.delete(axioxAccountDeleteURL);
    Alert.alert('Success', 'your account has been deleted');
  } catch (error) {
    Alert.alert('delete Error' + error);
  }
};

const axiosSurveySumbitURL = '/api/survey/save';
export const axiosSurveySumbit = async (answers: UserServey) => {
  try {
    await axiosInstance.post(axiosSurveySumbitURL, {answers});
  } catch (error) {
  }
};

const axiosGetUserSurveyURL = '/api/survey/user';
export const axiosGetUserSurvey = async () => {
  try {
    const response = await axiosInstance.get(axiosGetUserSurveyURL);
    if (response.data && response.data.hasSurvey === true) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const axiosPermissonSubmitURL = '/api/profile/noti-permission';
export const axiosPermissonSubmit = async (permissons: boolean) => {
  try {
      await axiosInstance.post(axiosPermissonSubmitURL, {
      permissons,
    });
  } catch (error) {
  }
};

const axiosGetProfileURL = '/api/profile/me';
export const axiosGetProfile = async (): Promise<ProfileTypes> => {
  try {
    const response = await axiosInstance.get<ProfileTypes>(axiosGetProfileURL);
    return response.data;
  } catch (error) {
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
      await axiosInstance.patch(axiosUpdateUsernameURL, {
      newUsername,
    });
  } catch (error) {
  }
};

const axiosGetQuestionsURL = '/api/questions/me';
export const axiosGetQuestions = async () => {
  try {
    const response = await axiosInstance.get(axiosGetQuestionsURL);
    return response;
  } catch (error) {
    return [];
  }
};

const axiosGetAnswersURL = 'api/questions/history';
export const axiosGetAnswers = async () => {
  try {
    const response = await axiosInstance.get(axiosGetAnswersURL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const axiosLogoutURL = '/api/auth/logout';
export const axiosLogout = async () => {
  try {
    await removeToken();
    await axiosInstance.post(axiosLogoutURL);
  } catch (error) {
  }
};

const axiosPostAnswersURL = '/api/questions/answer';
export const axiosPostAnswers = async (answers: any, questionName: string) => {
  try {
    const response = await axiosInstance.post(axiosPostAnswersURL, {
      answers,
      questionName,
    });
    return response.data;
  } catch (error) {
    return;
  }
};

const axiosUpdateAnswersURL = '/api/answers/update';
export const axiosUpdateAnswers = async (
  subquestionId: number,
  answer: string,
) => {
  try {
      await axiosInstance.put(
      `${axiosUpdateAnswersURL}/${subquestionId}`,
      {
        content: answer,
      },
    );
  } catch (error) {
  }
};

const axiosGetSubquestionsURL = '/api/subquestions';
export const axiosGetSubquestions = async (questionId: number) => {
  try {
    const response = await axiosInstance.get(
      `${axiosGetSubquestionsURL}/${questionId}`,
    );
    return response.data;
  } catch (error) {
  }
};

const axiosGetResultURL = '/api/result';
export const axiosGetResult = async () => {
  try {
    const response = await axiosInstance.get(axiosGetResultURL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const axiosNotificationPermissonURL = 'api/notifications/send';
export const axiosNotificationPermisson = async (token: string) => {
  try {
    await axiosInstance.post(axiosNotificationPermissonURL, {
      token
    });
  } catch (error) {
  }
};

const axiosUsersTimezoneURL = 'api/users/time';
export const axiosUsersTimezone = async (localTime: number) => {
  try {
    await axiosInstance.post(axiosUsersTimezoneURL, {
      localTime
    });
  } catch (error) {
  }
};
