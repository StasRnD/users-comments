import { useState } from 'react';
import { Box, Input, Button, FormLabel, Flex, Heading } from '@chakra-ui/react';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

type UserInfo = {
  email: string;
  password: string;
};

type UserInfoProps = {
  userInfo: UserInfo;
  onChange: (value: string, inputName: string) => void;
};

const defaultUserInfo: UserInfo = {
  email: '',
  password: '',
};

export const Login = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const userRegistration = (evt: any) => {
    evt.preventDefault();
    console.log(userInfo);
    setUserInfo(defaultUserInfo);
  };

  const onChange: UserInfoProps['onChange'] = (value, filterName) => {
    setUserInfo((oldFilters) => set(cloneDeep(oldFilters), filterName, value));
  };

  const onChangeInputEmail: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    onChange(evt.target.value, 'email');
  };

  const onChangeInputPassword: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    onChange(evt.target.value, 'password');
  };

  return (
    <Box m='0' w='70%'>
      <Heading textAlign='center' marginBottom='10px'>
        Регистрация
      </Heading>
      <form onSubmit={userRegistration}>
        <Flex flexDirection='column' w='50%' mx='auto'>
          <FormLabel htmlFor='email' m='0'>
            Введите email
          </FormLabel>
          <Input
            value={userInfo.email}
            onChange={onChangeInputEmail}
            id='email'
            type='email'
            placeholder='email'
            marginBottom='20px'
          />
          <FormLabel htmlFor='password' m='0'>
            Введите пароль
          </FormLabel>
          <Input
            value={userInfo.password}
            onChange={onChangeInputPassword}
            id='password'
            type='password'
            placeholder='password'
            marginBottom='20px'
          />
          <Button type='submit' w='80%' mx='auto' marginTop='50px'>
            Зарегестрироваться
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
