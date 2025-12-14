import React, { Fragment, ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WillroContainerProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
  scroll?: boolean;
}

const Container: React.FC<WillroContainerProps> = ({
  children,
  containerStyle,
  scroll = false,
}) => {
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <SafeAreaView style={containerStyle}>
        {scroll ? (
          <ScrollView
            style={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </SafeAreaView>
    </Fragment>
  );
};

export default Container;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
