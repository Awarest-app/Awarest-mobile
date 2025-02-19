import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import {
  axiosNotificationPermisson,
  axiosUsersTimezone,
} from '../api/axios';
import {useProfileStore} from '../zustand/useProfileStore';
import {isToday} from '../components/utils/utils';
import {messaging} from '../firebase/setting'
import { useFocusEffect } from '@react-navigation/native';
import { analytics } from '../firebase/setting';
import { useId } from '../zustand/useId';
import QuestionsCard from '../components/home/QuestionsCard';
import HistoryContainer from '../components/home/HistoryContainer';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const fetchProfile = useProfileStore(state => state.fetchProfile);
  const isDayStreak = useProfileStore(state => state.isDayStreak);
  const profileLastStreakDate = useProfileStore(state => state.profile.lastStreakDate);
  const setId = useId(state => state.setId);
  const id = useId(state => state.id);

  const handleNotification = async () => {
    const status = await messaging.requestPermission();
    if (status == 1 || status == 2) {
      const token = await messaging.getToken();
      axiosNotificationPermisson(token);
    }
  }

  const handleTimezone = async () => {
    const timeoffset= new Date().getTimezoneOffset() / 60;
    axiosUsersTimezone(-timeoffset);
  }
  const initAnalytics = async () => {
    await setId();
    const { id: updatedId } = useId.getState();
    analytics.setUserId(updatedId);
    analytics.setUserProperties({user_id: updatedId});
  }

  // const handleTimezone = useCallback(async () => {
  //   const timeoffset = new Date().getTimezoneOffset() / 60;
  //   axiosUsersTimezone(-timeoffset);
  // }, []);
  
  // const handleNotification = useCallback(async () => {
  //   const status = await messaging.requestPermission();
  //   if (status === 1 || status === 2) {
  //     const token = await messaging.getToken();
  //     axiosNotificationPermisson(token);
  //   }
  // }, []);
  
  // const initAnalytics = useCallback(async () => {
  //   await setId();
  //   const { id: updatedId } = useId.getState();
  //   analytics.setUserId(updatedId);
  //   analytics.setUserProperties({ user_id: updatedId });
  // }, [setId]);
  useFocusEffect(() => {
    analytics.logScreenView({screen_name: 'Home', screen_class: 'HomeScreen'});
  });
  useEffect(() => {
    const init = async () => {
      await initAnalytics();
      handleTimezone();
      handleNotification();
      await fetchProfile();
    };
    init();
  }, [initAnalytics, handleTimezone, handleNotification, fetchProfile]);

  useEffect(() => {
    if (profileLastStreakDate) {
      isDayStreak(isToday(profileLastStreakDate));
    }
  }, [profileLastStreakDate, isDayStreak]);
  console.log('HomeScreen');
  return (
    <View style={styles.container}>
      <MemoGradient />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        ref={scrollRef}>
        <Header />

        <QuestionsCard />
        <HistoryContainer scrollRef={scrollRef} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
});
