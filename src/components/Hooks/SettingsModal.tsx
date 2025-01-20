import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import {forwardRef} from 'react';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
import SettingsGradient from './SettingsGradient';
import XIcon from '../../assets/svg/x-icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../type/route.type';
const {width, height} = Dimensions.get('window');

const SettingsModal = forwardRef<Modalize, {}>((props, ref) => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const modalizeRef = ref as React.MutableRefObject<Modalize | null>;

  const closeSettings = () => {
    modalizeRef.current?.close()
  };

  return (
    <Modalize
    modalStyle={styles.container}
    ref={ref}
    withHandle={false}
    modalHeight={height * 0.75}
    >
      <SettingsGradient/>
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
              onPress={() => navigation.navigate('SettingProfile')}
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
              onPress={() => navigation.navigate('Report')}
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
    </Modalize>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.settings_gradientStart,
    overflow: 'hidden',
    borderTopLeftRadius: 40, // 왼쪽 상단 모서리
    borderTopRightRadius: 40, // 오른쪽 상단 모서리
  },
  SettingsContainer: {
    gap: 30,
    padding: 40,
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

export default SettingsModal;