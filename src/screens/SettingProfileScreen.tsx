import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import SettingsGradient from '../components/Hooks/SettingsGradient';
import {settingsTypes} from '../type/settings.type';
import DeleteScreen from './DeleteScreen';
import PrevIcon from '../assets/svg/setting-prev.svg';
import {CustomDefaultAlert} from '../components/utils/CustomAlert';
import {
  checkNotifications,RESULTS
} from 'react-native-permissions';
const {width, height} = Dimensions.get('window');
interface SettingProfileScreenProps {
  closeSettings: () => void;
  setPage: (page: settingsTypes) => void;
}

export default function SettingProfileScreen({
  closeSettings,
  setPage,
}: SettingProfileScreenProps) {

  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const name = 'John Doe'; // axios로 받아온 사용자 이름
  const [isEnabled, setIsEnabled] = useState(false);

  const handleDelete = () => {
     setIsDelete(!isDelete);
    // closeSettings(); // 모달 닫기
  };

  const handleNotification = () => {
    //todo 권한에 따라서 토글껐다켰다하기
    Linking.openSettings();
  };
   const platformCheck = (): boolean => {
      return Platform.OS === 'ios';
      // Platform.OS === 'android';
    };
    //notification on/off 함수
  const fetchNoti = async () => {
    if (!platformCheck()) return;
    const {status} = await checkNotifications();

    switch (status) {
      case RESULTS.GRANTED:
        setIsEnabled(true);
        break;
        case RESULTS.BLOCKED:
        setIsEnabled(false);
        break;
      case RESULTS.UNAVAILABLE:
        setIsEnabled(false);
        break;
      default:
        setIsEnabled(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchNoti(); // 화면 포커스 시 상태 업데이트
    }, [])
  );
  return (
      <View style={styles.container}>
        {isDelete && (
          <DeleteScreen
            // closeSettings={closeSettings}
            setIsDelete={setIsDelete}
          />
        )}
        {!isDelete && (
          <View style={styles.contentContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.prevIcon}
                onPress={() => {
                  console.log('profileprevIcon');
                  setPage('main')
                }}
              >
                <PrevIcon/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                Profile
              </Text>
            </View>
            <View style={styles.imgContainer}>
              <View style={styles.img}>
              </View>
              <Text style={styles.editImg}>Edit</Text>
            </View>
            <View style={styles.settingContainer}>
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
                activeOpacity={0.9}
                onPress={handleNotification}
              >
                <View style={styles.permissonBox}>
                  <Text style={styles.permissonTitle}>
                    Notifications
                  </Text>
                  <Switch
                    // style={styles.permissonSwitch}
                    trackColor={{false: colors.white, true: '#93C5FD'}}
                    ios_backgroundColor={colors.white}
                    thumbColor={'#0D9488'}
                    onValueChange={handleNotification}
                    value={isEnabled}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.7,
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
  settingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  nameContainer: {
    width: '100%',
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
    color: colors.black,
    fontSize: 20,
    width: '100%',
    height: 54,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: colors.white,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  permissonContainer: {
    width: '100%',
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
    backgroundColor: colors.white,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  permissonTitle: {
    fontFamily: fonts.lato_regular,
    fontSize: 20,
    color: colors.black,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 18,
    color: colors.delete_text,
  },
});
