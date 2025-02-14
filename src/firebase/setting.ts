import { getApp } from "@react-native-firebase/app";
import { getMessaging } from "@react-native-firebase/messaging";
import { getAnalytics } from "@react-native-firebase/analytics";

export const app = getApp();
export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);