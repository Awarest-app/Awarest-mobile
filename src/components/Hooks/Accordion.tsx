import React, {useRef, useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import {fonts} from '../../styles/fonts';
import colors from '../../styles/colors';

interface AccordionProps {
  title: string;
  collapseOnStart?: boolean;
  children: React.ReactNode;
  forceClose?: boolean;
}

interface MemoizedContentProps {
  children: React.ReactNode;
}

interface AccordionTitleProps {
  title: string;
  onPress: () => void;
}
const AccordionTitle = memo(({title, onPress}: AccordionTitleProps) => (
  <TouchableOpacity onPress={onPress} style={styles.titleContainer}>
    <Text style={styles.titleText}>{title}</Text>
  </TouchableOpacity>
));

const Accordion = memo(
  ({collapseOnStart = true, title, forceClose, children}: AccordionProps) => {
    const [collapsed, setCollapsed] = useState(collapseOnStart);
    const [contentHeight, setContentHeight] = useState(0);
    const contentHeightRef = useRef(0);
    const contentContainerPadding = 20;
    const animeValue = useRef(
      new Animated.Value(collapseOnStart ? 0 : 1),
    ).current;
    useEffect(() => {
      if (forceClose && !collapsed) {
        setCollapsed(true);
      }
    }, [forceClose, collapsed]);

    useEffect(() => {
      Animated.timing(animeValue, {
        toValue: collapsed ? 0 : 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }, [collapsed, animeValue]);

    const MemoizedContent = memo(({children}: MemoizedContentProps) => (
      <View style={styles.contentContainer}>{children}</View>
    ));
    const height = animeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentContainerPadding + contentHeight],
    });
    const opacity = animeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const handleContentLayout = useCallback((e: any) => {
      const newHeight = e.nativeEvent.layout.height;
      if (contentHeightRef.current !== newHeight) {
        contentHeightRef.current = newHeight;
        setContentHeight(newHeight);
      }
    }, []);
    const toggleAccordion = useCallback(() => {
      setCollapsed(prev => !prev);
    }, []);

    return (
      <View style={styles.container}>
        <AccordionTitle title={title} onPress={toggleAccordion} />
        <View
          style={styles.hiddenContent}
          onLayout={handleContentLayout}
          pointerEvents="none">
          {children}
        </View>
        <Animated.View
          style={[
            styles.animateContainer,
            {
              height,
              opacity,
            },
          ]}>
          <MemoizedContent>{children}</MemoizedContent>
        </Animated.View>
      </View>
    );
  },
);

export default Accordion;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.white_75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.card_border,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: 60,
    backgroundColor: colors.white_80,
    height: 'auto',
  },
  titleText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
    color: colors.black,
  },
  hiddenContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  animateContainer: {
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.white_80,
  },
});
