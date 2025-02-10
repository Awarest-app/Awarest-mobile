import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
interface LevelModalProps {
  isOpen: boolean;
  data: {
    levelXP: number;
    totalXP: number;
    prevXP:number;
    level: number;
  };
  onClose: () => void;
  onSubmit?: () => void;
}
const LevelModal = ({
  data,
  isOpen,
  onClose,
}: LevelModalProps ) => {
  const levelXP = data.levelXP - data.prevXP;
  const totalXP = data.totalXP - data.prevXP;
  const level = data.level;
  const progress = Math.min(totalXP / levelXP, 1);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  if (isOpen) {
    animatedWidth.stopAnimation();
    animatedWidth.setValue(0);
    Animated.timing(animatedWidth, {
      toValue: progress * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Level {level}</Text>
              <Text style={styles.modalSubText}>
                You need {levelXP - totalXP} XP to reach Level {level + 1}
              </Text>
              <View style={styles.expBar}>
                <View style={styles.barBackground}>
                  <Animated.View
                    style={[
                      styles.barProgress,
                      {
                        width: animatedWidth.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                        }),
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={['#0D9488', '#3ED2C4']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{flex: 1}}
                    />
                  </Animated.View>
                </View>
                <Text style={styles.text}>
                  {totalXP} / {levelXP} XP
                </Text>
              </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalContent: {
    width: '80%',
    height: 250,
    gap: 20,
    paddingVertical: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    fontFamily: fonts.roboto_medium,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubText: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  expBar: {
    width: '100%',
    alignItems: 'center',
  },
  barBackground: {
    width: '90%',
    height: 25,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  barProgress: {
    height: '100%',
  },
  text: {
    fontFamily: fonts.lato_regular,
    marginTop: 10,
    fontSize: 16,
    color: colors.black,
  },
});

export default LevelModal;