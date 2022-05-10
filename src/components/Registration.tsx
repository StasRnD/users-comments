import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Input, Button, FormLabel, Flex, Heading } from '@chakra-ui/react';

export const Registration = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      sirname: '',
      email: '',
      password: '',
      replayPassword: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 1));
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Поле обязательно для заполнения')
        .min(2, 'Слишком короткое имя'),
      sirname: Yup.string()
        .required('Поле обязательно для заполнения')
        .min(2, 'Слишком короткая фамилия'),
      email: Yup.string()
        .required('Поле обязательно для заполнения')
        .email('Ожидаемый формат email: Ivan@mail.ru'),
      password: Yup.string()
        .required('Поле обязательно для заполнения')
        .min(8, 'Пароль должен содержать не менее 8 символов'),
      replayPassword: Yup.string()
        .required('Поле обязательно для заполнения')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
    }),
  });

  return (
    <Box m='0' w='70%'>
      <Heading textAlign='center' marginBottom='10px'>
        Регистрация
      </Heading>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Flex flexDirection='column' w='50%' mx='auto' rowGap='15px'>
          <Box>
            <FormLabel htmlFor='name' m='0'>
              Введите имя
            </FormLabel>
            <Input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='name'
              name='name'
              type='text'
              placeholder='Имя'
            />
            {formik.touched.name && formik.errors.name ? (
              <Box color='red'>{formik.errors.name}</Box>
            ) : null}
          </Box>
          <Box>
            <FormLabel htmlFor='sirname' m='0'>
              Введите фамилию
            </FormLabel>
            <Input
              value={formik.values.sirname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='sirname'
              name='sirname'
              type='text'
              placeholder='Фамилия'
            />
            {formik.touched.sirname && formik.errors.sirname ? (
              <Box color='red'>{formik.errors.sirname}</Box>
            ) : null}
          </Box>
          <Box>
            <FormLabel htmlFor='email' m='0'>
              Введите e-mail
            </FormLabel>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='email'
              name='email'
              type='email'
              placeholder='e-mail'
            />
            {formik.touched.email && formik.errors.email ? (
              <Box color='red'>{formik.errors.email}</Box>
            ) : null}
          </Box>
          <Box>
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
              <Box color='red'>{formik.errors.password}</Box>
            ) : null}
          </Box>
          <Box>
            <FormLabel htmlFor='replayPassword' m='0'>
              Повторите пароль
            </FormLabel>
            <Input
              value={formik.values.replayPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='replayPassword'
              name='replayPassword'
              type='password'
              placeholder='Пароль'
            />
            {formik.touched.replayPassword && formik.errors.replayPassword ? (
              <Box color='red'>{formik.errors.replayPassword}</Box>
            ) : null}
          </Box>
          <Button type='submit' w='80%' mx='auto' marginTop='50px'>
            Зарегистрироваться
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
