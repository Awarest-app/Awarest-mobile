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
      .catch(error => {
        console.error('SafariView not available:', error);
        Linking.openURL(`${API_URL}/api/auth/google?prompt=select_account`);
      });
  } catch (error) {
    console.error('Failed to open Google OAuth:', error);
  }
};

export const handleAppleOauth = async () => {
  try {
    console.log('Oauthtest', API_URL);
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${API_URL}/api/auth/apple`,
          fromBottom: true,
        });
      })
      .catch(error => {
        console.error('SafariView not available:', error);
        Linking.openURL(`${API_URL}/api/auth/apple?prompt=select_account`);
      });
  } catch (error) {
    console.error('Failed to open Google OAuth:', error);
  }
};