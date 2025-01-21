import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import { fonts } from '../../styles/fonts';
import colors from '../../styles/colors';

interface AccordionProps {
  title: string;
  collapseOnStart?: boolean;
  children: React.ReactNode;
}

interface MemoizedContentProps {
  children: React.ReactNode;
}

interface AccordionTitleProps {
  title: string;
  onPress: () => void;
}
const AccordionTitle = memo(({
    title,
    onPress,
  }: AccordionTitleProps) => (
    <TouchableOpacity onPress={onPress} style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  )
);

const Accordion = memo(
  ({
    collapseOnStart = true,
    title,
    children,
  }: AccordionProps) => {
    // 접힘/펼침 상태
    const [collapsed, setCollapsed] = useState(collapseOnStart);
    const [contentHeight, setContentHeight] = useState(0);
    const contentHeightRef = useRef(0);
    const contentContainerPadding = 20;

    // 하나의 Animated.Value로 높이 / 투명도
    const animeValue = useRef(new Animated.Value(collapseOnStart ? 0 : 1)).current;

    // 접힘/펼침 상태가 바뀔 때마다 애니메이션 실행
    useEffect(() => {
      Animated.timing(animeValue, {
        toValue: collapsed ? 0 : 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false, // 높이 애니메이션은 native driver 불가
      }).start();
    }, [collapsed, animeValue]);

    const MemoizedContent = memo(({ children }: MemoizedContentProps) => (
      <View style={styles.contentContainer}>{children}</View>
    ));


    // 높이 애니메이션
    const height = animeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentContainerPadding + contentHeight],
    });

    // 투명도 애니메이션
    const opacity = animeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    // 실제 컨텐츠 높이 측정 (onLayout)
    const handleContentLayout = useCallback((e: any) => {
      const newHeight = e.nativeEvent.layout.height;
      // 1px 이하 차이도 모두 반영하도록 단순 비교
      if (contentHeightRef.current !== newHeight) {
        contentHeightRef.current = newHeight;
        setContentHeight(newHeight);
      }
    }, []);
    // 토글 함수
    const toggleAccordion = useCallback(() => {
      setCollapsed((prev) => !prev);
    }, []);

    return (
      <View style={styles.container}>
        <AccordionTitle
          title={title}
          onPress={toggleAccordion}
        />
        <View
          style={styles.hiddenContent}
          onLayout={handleContentLayout}
          pointerEvents="none"
        >
          {children}
        </View>
        <Animated.View
          style={[
            styles.animateContainer,
            {
              height,
              opacity,
            },
          ]}
        >
          <MemoizedContent>{children}</MemoizedContent>
        </Animated.View>
      </View>
    );
  }
);

export default Accordion;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.card_border,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    minHeight: 60,
    height: 'auto',
  },
  titleText: {
    fontFamily: fonts.roboto_medium,
    fontSize: 20,
  },
  hiddenContent: {
    position: 'absolute',
    right: 0,
    opacity: 0, // 보이지 않게 처리
  },
  animateContainer: {
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
});
