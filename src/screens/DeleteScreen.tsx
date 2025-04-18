import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useState} from 'react';
import {removeToken} from '../api/secureStorage';
import {axiosAccountDelete} from '../api/axios';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';
import PrevIcon from '../assets/svg/setting-prev.svg';
import DeleteModal from '../components/modals/DeleteModal';
import { googleLogout } from '../api/logoutSafariView';

interface DeleteScreenProps {
  setIsDelete: (isDelete: boolean) => void;
}

export default function DeleteScreen({
  setIsDelete,
}: DeleteScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleOnSubmit = async () => {
    try {
      await axiosAccountDelete();
      await googleLogout();
      removeToken();
      setIsModalOpen(false);
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
    <View style={styles.container}>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.prevIcon}
              onPress={() => {
                setIsDelete(false);
              }}>
              <PrevIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Delete Account</Text>
          </View>
          <View style={styles.deleteInfo}>
            <Text style={styles.deleteHelp}>
                Your account will be deleted in 7 days.
                If you wish to keep your account, simply sign in again within 7 days.
            </Text>
            <Text style={styles.deleteHelp}>
              Thank you, and we hope to see you again!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsModalOpen(true)}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
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
  },
  safeArea: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    color: colors.delete_text,
  },
  deleteInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deleteHelp: {
    fontFamily: fonts.lato_bold,
    fontSize: 18,
    color: colors.black,
    marginBottom: 20,
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
    backgroundColor: colors.white,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  permissonContainer: {},
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
