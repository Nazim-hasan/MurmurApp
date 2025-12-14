import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../../theme/Theme";
import { useForm } from "react-hook-form";

const Input = ({
  control,
  name,
  rules = [],
  leftIcon,
  placeholderText,
  onChangeText,
  rightIcon,
  containerStyle,
  secureTextEntry = false,
  title,
  renderEditIcon,
  onPressEditIcon,
  required,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title && (
              <>
                <Text
                  style={{
                    ...Theme.typography.medium_14,
                    color: Theme.colors.black300,
                    // paddingHorizontal: 20,
                    marginBottom: 10,
                  }}
                >
                  {title}
                  {required && (
                    <Text
                      style={{
                        color: Theme.colors.danger,
                      }}
                    >{` *`}</Text>
                  )}
                </Text>
              </>
            )}
            {renderEditIcon && onPressEditIcon && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderWidth: 0.8,
                  borderColor: Theme.colors.gray600,
                  padding: 5,
                  marginVertical: 5,
                  borderRadius: 10,
                }}
                onPress={onPressEditIcon}
              >
                <Text
                  style={{
                    ...Theme.typography.medium_12,
                    color: Theme.colors.gray800,
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
                borderColor: isFocused
                  ? Theme.colors.primary
                  : error
                  ? Theme.colors.danger
                  : "#ccc",
                backgroundColor: "#fff",
              },
              containerStyle,
            ]}
          >
            {leftIcon && leftIcon(isFocused)}
            <TextInput
              placeholder={placeholderText}
              placeholderTextColor={Theme.colors.gray800}
              value={value}
              onChangeText={(text) => {
                onChangeText && onChangeText(text);
                onChange(text);
              }}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              style={{
                flex: 1,
                // ...Theme.typography.medium_14,
                height: 50,
                marginLeft: leftIcon ? 5 : 0,
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={!isPasswordVisible}
              {...props}
            />
            {secureTextEntry ? (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {rightIcon ? isPasswordVisible
                  ? rightIcon(isFocused)
                  : rightIcon(isFocused) : null}
              </TouchableOpacity>
            ) : (
              rightIcon && (
                <TouchableOpacity onPress={() => {}}>
                  {rightIcon(isFocused)}
                </TouchableOpacity>
              )
            )}
          </View>
          {error && (
            <Text
              style={{
                color: Theme.colors.danger,
                marginTop: 5,
                marginLeft: 5,
              }}
            >
              {error?.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
