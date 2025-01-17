import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import colors from '../../styles/colors';

interface CustomInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  multiline?: boolean; // 멀티라인 여부
  containerStyle?: object;
  inputStyle?: object;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  errorMessage,
  multiline, // 여러 줄 입력 가능 여부
  containerStyle,
  inputStyle,
  ...props
}: CustomInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* 라벨이 존재하면 표시 */}
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        style={[
          styles.input,
          errorMessage && styles.errorInput,
          multiline && styles.multiline,
          inputStyle,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        placeholderTextColor={colors.input_ph}
        {...props}
      />

      {/* 에러 메시지가 있으면 표시 */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  input: {
    // maxWidth: '80%',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 14,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top', // 안드로이드에서 위쪽 정렬
  },
});

export default CustomInput;
