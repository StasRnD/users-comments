import { useState } from 'react';
import {
  Box,
  Button,
  UnorderedList,
  Flex,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Comment } from './Comment';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const defaultComment = [
  {
    name: 'Стас',
    text: 'Хорошо',
  },
];

export const Comments = () => {
  const [isComments, setIsComments] = useState(false);
  const [isAddCommentForm, setIsAddCommentForm] = useState(false);
  const [userComments, setUserComments] = useState(() => {
    return defaultComment;
  });

  const handkeButtonCommentsClick = () => {
    setIsComments(!isComments);
  };

  const handleButtonAddCommentClick = () => {
    setIsAddCommentForm(!isAddCommentForm);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
    },
    onSubmit: (values, { resetForm }) => {
      setUserComments([
        ...userComments,
        {
          name: values.name,
          text: values.text,
        },
      ]);

      handleButtonAddCommentClick();
      resetForm();
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Поле обязательно для заполнения')
        .min(2, 'Имя должно быть не менне ем из 2 букв'),
      text: Yup.string()
        .min(5, 'Комментарий должен состоять минимум из 5 букв')
        .required('Поле обязательно для заполнения'),
    }),
  });

  return (
    <Box>
      <Flex marginBottom='20px' columnGap='10px'>
        <Button borderRadius='0' onClick={handkeButtonCommentsClick}>
          Комментарии
        </Button>

        <Button borderRadius='0' onClick={handleButtonAddCommentClick}>
          Добавить комментарий
        </Button>
      </Flex>
      {isComments && userComments.length > 0 ? (
        <UnorderedList listStyleType='none' p='0' m='0'>
          {userComments.map((comment) => {
            return (
              <Comment
                key={userComments.indexOf(comment)}
                name={comment.name}
                text={comment.text}
              />
            );
          })}
        </UnorderedList>
      ) : null}
      {isAddCommentForm ? (
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
              <textarea
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='text'
                name='text'
                style={{
                  border: '1px solid rgba(128,128,128, .2)',
                }}
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
      ) : null}
    </Box>
  );
};
