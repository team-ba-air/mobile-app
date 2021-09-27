import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text } from 'react-native';
import {SafeAreaView} from 'react-navigation';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './schema/loginSchema';
import { UserForm } from './schema/LoginForm';
import { TextInput } from 'react-native-gesture-handler';
import { useLogin } from 'network/authorization';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { doFetch, isLoading } = useLogin()
  const formInitialValues = {
    username: '',
    password: '',
  }

  const formMethods = useForm<UserForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: formInitialValues, 
    reValidateMode: 'onChange',
  })

  const {
    control,
    handleSubmit: handleFormSubmit,
  } = formMethods

  const handleLogin = (data: UserForm) => {
    doFetch(data).then((user) => {
      console.log(user)
    })
  }

  return <SafeAreaView>
    <Text>Welcome to Login Page</Text>
    <Controller
      name='username'
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput value={value} onChange={onChange} onBlur={onBlur} />
      )}
    />

    <Controller
      name='password'
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput value={value} onChange={onChange} onBlur={onBlur} />
      )}
    />

    <Button title="Login" onPress={handleFormSubmit(handleLogin)} />
  </SafeAreaView>;
};

export default LoginScreen;
