import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import {forwardRef} from 'react';
import colors from '../../styles/colors';
import {globalStyle} from '../../styles/global';
import SettingsGradient from './SettingsGradient';
import ReportScreen from '../../screens/ReportScreen';
import SettingsMain from '../../screens/SettingsMain';
import {settingsTypes} from '../../type/settings.type';
import SettingProfileScreen from '../../screens/SettingProfileScreen';
import {RootStackParamList} from '../../type/route.type';
import {NavigationProp, useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

const SettingsModal = forwardRef<Modalize, {}>((props, ref) => {
  const modalizeRef = ref as React.MutableRefObject<Modalize | null>;
  const [page, setPage] = useState<settingsTypes>('main');

  const translateX = useRef(new Animated.Value(0)).current;
  const handlePage = (page: settingsTypes) => {
    setPage(page);
  }
  const closeSettings = () => {
    modalizeRef.current?.close()
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Modalize
    modalStyle={styles.container}
    ref={ref}
    withHandle={false}
    modalHeight={height * 0.86}
    panGestureEnabled={false}
    onClose={() => {
      setPage('main');
      navigation.getParent()?.setOptions({
        tabBarStyle: globalStyle.defaultTabBarStyle,
      });
    }}
    onOpen={() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
    }}
    >
      <SettingsGradient/>
      <View style={styles.SettingsContainer}>
        {page === 'main' && (
          <SettingsMain
          closeSettings={closeSettings}
          setPage={handlePage}
        />
      )}
      {page === 'profile' && (
        <SettingProfileScreen
        closeSettings={closeSettings}
        setPage={handlePage}
        />
      )}
      {page === 'report' && (
        <ReportScreen
        closeSettings={closeSettings}
        setPage={handlePage}
      />
      )}
      </View>
    </Modalize>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.settings_gradientStart,
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  SettingsContainer: {
    padding: 40,
  },
});

export default SettingsModal;