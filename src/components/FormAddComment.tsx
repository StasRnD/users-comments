import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationObj = Yup.object({
  name: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(2, 'Имя должно быть не менне ем из 2 букв'),
  text: Yup.string()
    .min(5, 'Комментарий должен состоять минимум из 5 букв')
    .required('Поле обязательно для заполнения'),
});

type CommentProps = {
  id: string;
  name: string;
  text: string;
};

type CommentsProps = {
  onAddComment: () => void;
  userComments: CommentProps[];
  setUserComments: (userComments: CommentProps[]) => void;
};

export const FormAddComment = ({
  onAddComment,
  userComments,
  setUserComments,
}: CommentsProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
    },
    onSubmit: (values, { resetForm }) => {
      setUserComments([
        ...userComments,
        {
          id: (userComments.length - 1).toString(),
          name: values.name,
          text: values.text,
        },
      ]);

      onAddComment();
      resetForm();
    },

    validationSchema: validationObj,
  });

  return (
    <Box w='70%'>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Flex flexDirection='column' mx='auto'>
          <FormLabel htmlFor='name' m='0'>
            Введите Ваше имя
          </FormLabel>
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id='name'
            name='name'
            type='text'
          />
          {formik.touched.name && formik.errors.name ? (
            <Box color='red' marginBottom='20px'>
              {formik.errors.name}
            </Box>
          ) : null}

          <FormLabel htmlFor='text' m='0'>
            Ваш комментарий
          </FormLabel>
          <Textarea
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id='text'
            name='text'
          />
          {formik.touched.text && formik.errors.text ? (
            <Box color='red' marginBottom='20px'>
              {formik.errors.text}
            </Box>
          ) : null}
          <Button type='submit' w='80%' mx='auto' marginTop='50px'>
            Отправить комментарий
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
