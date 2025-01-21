import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import {useState} from 'react';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import SettingsGradient from '../components/Hooks/SettingsGradient';
export default function SettingProfileScreen() {
  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  const name = 'John Doe'; // axios로 받아온 사용자 이름
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const handleNotification = () => {
    // setIsDisabled(true); 나중에 넣어야됨
    setIsEnabled(!isEnabled);
  };
  return (
      <View style={styles.container}>
        <SettingsGradient />
        <View style={styles.contentContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.ReportHeader}>
            <Text style={styles.ProfileTitle}>
              Profile
            </Text>
          </View>
          <View style={styles.imgContainer}>
            <View style={styles.img}>
            </View>
            <Text style={styles.editImg}>Edit</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.titles}>
              Name
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholderTextColor={colors.text_hint}
            >
              {name}
            </TextInput>
          </View>
          <TouchableOpacity
            style={styles.permissonContainer}
            onPress={handleNotification}
          >
            <View style={styles.permissonBox}>
              <Text style={styles.permissonTitle}>
                Notifications
              </Text>
              <Switch
                // style={styles.permissonSwitch}
                trackColor={{false: 'white', true: '#93C5FD'}}
                ios_backgroundColor={'white'}
                thumbColor={'#0D9488'}
                onValueChange={handleNotification}
                value={isEnabled}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Delete')}
          >
            <Text style={styles.buttonText}>Delete Account</Text>
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
  ProfileTitle: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 60,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#cccccc', // 회색 배경(임시)
  },
  editImg:{
    fontFamily: fonts.roboto_medium,
    fontSize: 14,
    color: colors.primary,
  },
  nameContainer: {
    gap: 14,
    marginBottom: 20,
  },
  titles: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: colors.primary,
  },
  nameInput: {
    fontFamily: fonts.lato_regular,
    fontSize: 20,
    width: '100%',
    height: 54,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  permissonContainer: {

  },
  permissonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 54,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  permissonTitle: {
    fontFamily: fonts.lato_regular,
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    backgroundColor: colors.delete_button,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color: colors.delete_text,
  },
});
