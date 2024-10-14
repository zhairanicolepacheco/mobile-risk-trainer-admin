import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SignOutScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  return (
    <View>
      <Text>Signing Out...</Text> 
    </View> 
  );
};

export default SignOutScreen;
