import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import XIcon from '../assets/svg/x-icon.svg';
const {width, height} = Dimensions.get('window');
import {settingsTypes} from '../type/settings.type';

interface SettingsMainProps {
  closeSettings: () => void;
  setPage: (page: settingsTypes) => void;
}

const SettingsMain = ({
  closeSettings,
  setPage,
}:SettingsMainProps) => {
  return (
    <View style={styles.SettingsContainer}>
      <View style={styles.SettingsHeader}>
        <Text style={styles.SettingsTitle}>
          Settings
        </Text>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={closeSettings}
        >
          <XIcon/>
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingGroups}>
          <Text style={styles.settingOptionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingButton}
            onPress={() => setPage('profile')}
          >
            <Text style={styles.settingOption}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingOption}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroups}>
          <Text style={styles.settingOptionTitle}>Help</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingOption}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}
            onPress={() => setPage('report')}
          >
            <Text style={styles.settingOption}>Report a bug</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingGroups, {borderBottomWidth: 0}]}>
          <Text style={styles.settingOptionTitle}>More</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingOption}>Leave a review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingOption}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
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
  settingButton: {
    
  },
  settingOption: {
    fontFamily: fonts.lato_regular,
    fontSize: 20,
    color: 'black',
  },
});
export default SettingsMain;