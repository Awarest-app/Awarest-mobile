import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import Mailer from 'react-native-mail';
import {settingsTypes} from '../type/settings.type';
import PrevIcon from '../assets/svg/setting-prev.svg';

interface ReportScreenProps {
  closeSettings: () => void;
  setPage: (page: settingsTypes) => void;
}

export default function ReportScreen({
  closeSettings,
  setPage,
}: ReportScreenProps) {
  const [contact, setContact] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const sendMail = () => {
    Mailer.mail({
        subject: 'Issue Report in App',
        recipients: ['team@getawarest.com'], // 실제 받는 이메일 주소로 교체하세요.
        body: `Contact: ${contact}\n\nMessage:\n${message}`,
        isHTML: false,
      },
      (error) => {
        if (error) {
          Alert.alert('Error', 'Could not send email. Please try again later.');
        } else {
          Alert.alert('Success', 'Email sent successfully!');
        }
        return ;
      }
    );
    setContact('');
    setMessage('');
  }
  const handleContact = (text: string) => {
    if (contact.length > 40) return;
    setContact(text);
  };
  const handleMessage = (text: string) => {
    if (message.length > 2000) return;
    setMessage(text);
  };
  const handleSend = () => {
    if (!isValidEmail(contact)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (contact.length > 40) return;
    if (!isValidMessage(message)) return;
    sendMail();
    //todo axios contact, message
  };
  const isValidMessage = (message: string): boolean => {
    if (message.length > 1500) {
      Alert.alert('Invalid Message', 'Please enter a message longer');
      return false;
    }
    return true;
  }
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.prevIcon}
              onPress={() => {
                console.log('reportprevIcon');
                setPage('main')
              }}
            >
              <PrevIcon/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Report
            </Text>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.titles}>
              Contact Email
            </Text>
            <TextInput
              style={styles.contactInput}
              placeholder="your email or anything"
              placeholderTextColor={colors.text_hint}
              value={contact}
              onChangeText={handleContact}
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
              value={message}
              onChangeText={handleMessage}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.button}
            onPress={handleSend}
          >
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
  },
  safeArea: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  prevIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 1,
    // padding: 8,
  },
  headerTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
    color: colors.primary,
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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
