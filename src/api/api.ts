import {Alert} from 'react-native';
import {supabase} from '../lib/supabase';

export const getQuestions = async () => {
  try {
    const {data, error} = await supabase.from('questions').select('*');
    if (error) throw error;
    if (data != null) return data;
  } catch (error: any) {
    Alert.alert('getQuestions api 오류 : ' + error.message);
  }
};
