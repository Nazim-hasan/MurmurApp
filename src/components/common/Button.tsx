import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import React, { ReactNode } from "react";
import { Theme } from "../../theme/Theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton,
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      {isLoading ? <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
      }}>
        
        <ActivityIndicator size="small" color={Theme.colors.white} />
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>Loading...</Text>
        
      </View> : <>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
        {title}
      </Text>
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </>}
      
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: Theme.colors.gray500,
    borderRadius: 50,
    minHeight: 56,
  },
  text: {
    // ...Theme.typography.regular_16,
  },
  icon: {
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: Theme.colors.gray300,
    borderColor: Theme.colors.black100,
  },
  disabledText: {
    color: "#A0A0A0",
  },
});