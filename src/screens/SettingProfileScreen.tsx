import React, {useState, useEffect, useCallback} from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import {settingsTypes} from '../type/settings.type';
import DeleteScreen from './DeleteScreen';
import PrevIcon from '../assets/svg/setting-prev.svg';
import {checkNotifications, RESULTS} from 'react-native-permissions';
import {useProfileStore} from '../zustand/useProfileStore';
import {axiosPermissonSubmit, axiosUpdateUsername} from '../api/axios';
const {height} = Dimensions.get('window');
interface SettingProfileScreenProps {
  closeSettings?: () => void;
  setPage: (page: settingsTypes) => void;
}

export default function SettingProfileScreen({
  setPage,
}: SettingProfileScreenProps) {
  const {updateProfile, profile} = useProfileStore();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(true);
  const [name, setName] = useState<string>(profile.userName);
  const [isNoti, setIsNoti] = useState(profile.noti);

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  const handleNotification = () => {
    Linking.openSettings();
  };
  const platformCheck = (): boolean => {
    return Platform.OS === 'ios';
  };
  const handleName = (name: string) => {
    if (name.length > 20) return;
    setName(name);
  };
  const fetchNoti = async () => {
    if (!platformCheck()) return;
    const {status} = await checkNotifications();

    const newNotiState = (status === RESULTS.GRANTED);

    if (newNotiState !== isNoti) setIsNoti(newNotiState)
  };
  useEffect(() => {
    if (profile.noti === isNoti) return;
    axiosPermissonSubmit(isNoti);
    updateProfile({ noti: isNoti });
  }, [isNoti]);

  useFocusEffect(
    useCallback(() => {
      fetchNoti();
    }, [])
  );

  const handleSubmit = async () => {
    setEditable(false);
    try {
      await axiosUpdateUsername(name);
      updateProfile({ userName: name });
      setTimeout(() => {
        setEditable(true);
      }, 1000);
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating username.");
      setEditable(true);
    }
  };

  return (
    <View style={styles.container}>
      {isDelete && <DeleteScreen setIsDelete={setIsDelete} />}
      {!isDelete && (
        <View style={styles.contentContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.prevIcon}
                onPress={() => {
                  setPage('main');
                }}>
                <PrevIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.settingContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.titles}>Name</Text>
                <TextInput
                  style={[
                    styles.nameInput,
                    !editable && {backgroundColor: 'gray'},
                  ]}
                  value={name}
                  onChangeText={handleName}
                  editable={editable}
                  onSubmitEditing={handleSubmit}
                  returnKeyType="done"
                />
              </View>
              <TouchableOpacity
                style={styles.permissonContainer}
                activeOpacity={0.9}
                onPress={handleNotification}>
                <View style={styles.permissonBox}>
                  <Text style={styles.permissonTitle}>Notifications</Text>
                  <Switch
                    trackColor={{false: colors.white, true: '#93C5FD'}}
                    ios_backgroundColor={colors.white}
                    thumbColor={'#0D9488'}
                    onValueChange={handleNotification}
                    value={isNoti}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDelete}>
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
    backgroundColor: '#cccccc',
  },
  editImg: {
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
  disabledInput: {
    backgroundColor: colors.disabled,
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
