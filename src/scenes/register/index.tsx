import { yupResolver } from '@hookform/resolvers/yup';
import { useRegister } from 'network/authorization';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForm } from './schema/RegisterForm';
import { registerSchema } from './schema/registerSchema';

interface RegisterScreenProps {
  
}
 
const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const { doFetch, isLoading } = useRegister()
  const formInitialValues = {
    username: '',
    email: '',
    password: '',
  }

  const formMethods = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: formInitialValues, 
    reValidateMode: 'onChange',
  })

  const {
    control,
    handleSubmit: handleFormSubmit,
  } = formMethods

  const handleRegister = (data: RegisterForm) => {
    doFetch(data).then((user) => {
      console.log(user)
    })
  }

  return ( 
    <SafeAreaView>
      <Text>Welcome to Register Page</Text>
      <Controller
        name='username'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput value={value} onChange={onChange} onBlur={onBlur} />
        )}
      />

      <Controller
        name='email'
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

      <Button title="Login" onPress={handleFormSubmit(handleRegister)} />
    </SafeAreaView>
   );
}
 
export default RegisterScreen;