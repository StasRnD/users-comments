import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Input, Button, FormLabel, Flex, Heading } from '@chakra-ui/react';

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 1));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Поле обязательно для заполнения')
        .email('Ожидаемый формат email: Ivan@mail.ru'),
      password: Yup.string()
        .min(8, 'Пароль должен содержать не менее 8 символов')
        .required('Поле обязательно для заполнения'),
    }),
  });

  return (
    <Box m='0' w='70%'>
      <Heading textAlign='center' marginBottom='10px'>
        Авторизация
      </Heading>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Flex flexDirection='column' w='50%' mx='auto'>
          <FormLabel htmlFor='email' m='0'>
            Введите email
          </FormLabel>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id='email'
            name='email'
            type='email'
            placeholder='email'
          />
          {formik.touched.email && formik.errors.email ? (
            <Box color='red' marginBottom='20px'>
              {formik.errors.email}
            </Box>
          ) : null}

          <FormLabel htmlFor='password' m='0'>
            Введите пароль
          </FormLabel>
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id='password'
            name='password'
            type='password'
            placeholder='Пароль'
          />
          {formik.touched.password && formik.errors.password ? (
            <Box color='red' marginBottom='20px'>
              {formik.errors.password}
            </Box>
          ) : null}
          <Button type='submit' w='80%' mx='auto' marginTop='50px'>
            Войти
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
