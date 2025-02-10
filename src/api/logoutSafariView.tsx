
import SafariView from 'react-native-safari-view';
import {Linking} from 'react-native';

export async function googleLogout() {
  const googleLogoutUrl = 'https://accounts.google.com/logout';
  try {
    const isAvailable = await SafariView.isAvailable();

    if (isAvailable) {
      SafariView.show({
        url:googleLogoutUrl,
        fromBottom: true,
      });
      setTimeout(() => {
        SafariView.dismiss();
      }, 500);
    } else {
      Linking.openURL(googleLogoutUrl);
    }
  } catch (error) {
  }
}
