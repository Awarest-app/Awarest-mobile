import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';
import {API_URL} from '@env';
export const handleGoogleOauth = async () => {
  try {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${API_URL}/api/auth/google`,
          fromBottom: true,
        });
      })
      .catch(() => {
        Linking.openURL(`${API_URL}/api/auth/google?prompt=select_account`);
      });
  } catch (error) {
  }
};

export const handleAppleOauth = async () => {
  try {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${API_URL}/api/auth/apple`,
          fromBottom: true,
        });
      })
      .catch(() => {
        Linking.openURL(`${API_URL}/api/auth/apple?prompt=select_account`);
      });
  } catch (error) {
  }
};