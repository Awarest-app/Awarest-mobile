import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {axiosSignout} from '../api/axios';
import {removeToken} from '../api/secureStorage';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import XIcon from '../assets/svg/x-icon.svg';
import {settingsTypes} from '../type/settings.type';
import InAppReview from 'react-native-in-app-review';
import {
  ABOUT_PAGE_URL,
  PRIVACY_POLICY_URL,
  TERMS_URL,
  VERSION,
} from '@env';
import {RootStackParamList} from '../type/route.type';
import {googleLogout} from '../api/logoutSafariView';
import SafariView from 'react-native-safari-view';

interface SettingsMainProps {
  closeSettings: () => void;
  setPage: (page: settingsTypes) => void;
}

export default function SettingsMain({
  closeSettings,
  setPage,
}: SettingsMainProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const clickLink = (url: string) => {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: url,
          fromBottom: true,
        });
      })
  }
  const handleLeaveReview = () => {
    if (!InAppReview.isAvailable()) return;
    InAppReview.RequestInAppReview()
      .catch();
  };
  const handleSignOut = async () => {
    try {
      axiosSignout();
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
          <TouchableOpacity style={styles.settingButton}
            onPress={() => {Alert.alert('Coming soon!', 'This feature is not available yet. Please try again later. Thank you!')}}
          >
            <Text style={styles.settingOption}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroups}>
          <Text style={styles.settingOptionTitle}>Help</Text>
          <TouchableOpacity style={styles.settingButton}
            onPress={() => clickLink(ABOUT_PAGE_URL)}
          >
            <Text style={styles.settingOption}>
              About us
            </Text>
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
      <View style={styles.settingsFooter}>
        <View style={styles.footerLinks}>
          <TouchableOpacity
            onPress={() => clickLink(PRIVACY_POLICY_URL)}
          >
            <Text>
              privacy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => clickLink(TERMS_URL)}
          >
            <Text>
              terms
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.version}>{VERSION}</Text>
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
  settingsFooter: {
    width: '100%',
    marginTop: 100,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  footerLinks: {
    fontFamily: fonts.roboto_regular,
    fontSize: 14,
    flexDirection: 'row',
    gap: 25,
  },
  version: {
    fontFamily: fonts.roboto_regular,
    fontSize: 14,
  },
});
