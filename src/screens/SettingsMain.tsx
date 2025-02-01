import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {axiosSignout} from '../api/axios';
import {removeToken} from '../api/secureStorage';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import XIcon from '../assets/svg/x-icon.svg';
const {width, height} = Dimensions.get('window');
import {settingsTypes} from '../type/settings.type';
import InAppReview from 'react-native-in-app-review';
import {ABOUT_PAGE_URL} from '@env';
import {RootStackParamList} from '../type/route.type';
import {googleLogout} from '../api/logoutSafariView';

interface SettingsMainProps {
  closeSettings: () => void;
  setPage: (page: settingsTypes) => void;
}

const SettingsMain = ({closeSettings, setPage}: SettingsMainProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const aboutPage = () => {
    Linking.openURL(ABOUT_PAGE_URL);
  };
  const handleLeaveReview = () => {
    if (!InAppReview.isAvailable()) return;
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        console.log(
          'In-app review flow finished:',
          hasFlowFinishedSuccessfully,
        );
        // `hasFlowFinishedSuccessfully`가 true면 리뷰를 성공적으로 요청했음을 의미
      })
      .catch(error => {
        console.log('In-app review error:', error);
      });
  };
  const handleSignOut = async () => {
    //todo axios sign outa
    try {
      await axiosSignout();
      await googleLogout();
      removeToken();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoginStack',
            params: {
              screen: 'Welcome',
            },
          },
        ],
      });
    } catch (error) {
      console.log('logout error', error);
    }
  };
  return (
    <View style={styles.SettingsContainer}>
      <View style={styles.SettingsHeader}>
        <Text style={styles.SettingsTitle}>Settings</Text>
        <TouchableOpacity style={{padding: 10}} onPress={closeSettings}>
          <XIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingGroups}>
          <Text style={styles.settingOptionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => setPage('profile')}>
            <Text style={styles.settingOption}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingOption}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroups}>
          <Text style={styles.settingOptionTitle}>Help</Text>
          <TouchableOpacity style={styles.settingButton} onPress={aboutPage}>
            <Text style={styles.settingOption}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => setPage('report')}>
            <Text style={styles.settingOption}>Report a bug</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingGroups, {borderBottomWidth: 0}]}>
          <Text style={styles.settingOptionTitle}>More</Text>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={handleLeaveReview}>
            <Text style={styles.settingOption}>Leave a review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={handleSignOut}>
            <Text style={styles.settingOption}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  SettingsContainer: {
    gap: 30,
  },
  SettingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SettingsTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 16,
  },
  settingsContainer: {
    gap: 28,
  },
  settingGroups: {
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.settings_border,
    paddingBottom: 20,
  },
  settingOptionTitle: {
    fontFamily: fonts.roboto_medium,
    fontSize: 14,
    color: colors.primary,
  },
  settingButton: {},
  settingOption: {
    fontFamily: fonts.lato_regular,
    fontSize: 20,
    color: colors.black,
  },
});
export default SettingsMain;
