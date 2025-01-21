import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import SettingsGradient from '../components/Hooks/SettingsGradient';
export default function ReportScreen() {
  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  return (
      <View style={styles.container}>
        <SettingsGradient />
        <View style={styles.contentContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.ReportHeader}>
            <Text style={styles.ReportTitle}>
              Report
            </Text>
            {/* <TouchableOpacity
              style={{padding: 10}}
            >
            </TouchableOpacity> */}
          </View>

          <View style={styles.contactContainer}>
            <Text style={styles.titles}>
              Contact Email
            </Text>
            <TextInput
              style={styles.contactInput}
              placeholder="Youremail@example.com"
              placeholderTextColor={colors.text_hint}
            />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.titles}>
              Message
            </Text>
            <TextInput
              style={styles.messageInput}
              placeholder="report bug or issue"
              placeholderTextColor={colors.text_hint}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Report</Text>
          </TouchableOpacity>
        </SafeAreaView>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  safeArea: {
    flex: 1,
  },
  ReportHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ReportTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 16,
  },
  contactContainer: {
    gap: 14,
    marginBottom: 20,
  },
  titles: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: colors.primary,
  },
  contactInput: {
    fontFamily: fonts.lato_regular,
    fontSize: 18,
    letterSpacing: 1,
    width: '100%',
    height: 54,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  messageContainer: {
    gap: 14,
    marginBottom: 80,
  },
  messageInput: {
    fontFamily: fonts.lato_regular,
    fontSize: 18,
    letterSpacing: 1,
    width: '100%',
    height: 240,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color: colors.green_button_text,
  },
});
