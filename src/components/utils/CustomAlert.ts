import {
  Alert,
} from 'react-native';

interface CustomDefaultAlertProps {
  onPress?: () => void;
  mainText: string;
  subText: string;
};

export const CustomDefaultAlert = ({
  onPress,
  mainText,
  subText,
} : CustomDefaultAlertProps) => {
    Alert.alert(mainText, subText, [
      {
        text: 'OK',
        onPress: (onPress),
      },
    ],
  )
};
