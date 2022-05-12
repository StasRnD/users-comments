import { useState } from 'react';
import { Box, Button, UnorderedList, Flex } from '@chakra-ui/react';
import { Comment } from './Comment';
import { FormAddComment } from './FormAddComment';

type CommentsProps = {
  comment: CommentProps[];
};

type CommentProps = {
  id: string;
  name: string;
  text: string;
};

const defaultComment: CommentsProps['comment'] = [];

export const Comments = () => {
  const [areAllCommentsShow, setAreAllCommentsShow] = useState(false);
  const [isAddCommentForm, setIsAddCommentForm] = useState(false);
  const [userComments, setUserComments] = useState(() => {
    return defaultComment;
  });

  const handkeButtonCommentsClick = () =>
    setAreAllCommentsShow((areAllCommentsShow) => !areAllCommentsShow);

  const onAddComment = () =>
    setIsAddCommentForm((isAddCommentForm) => !isAddCommentForm);

  return (
    <Box>
      <Flex marginBottom='20px' columnGap='10px'>
        <Button borderRadius='0' onClick={handkeButtonCommentsClick}>
          {areAllCommentsShow
            ? 'Показать 3 последних комментария'
            : 'Показать все комментарии'}
        </Button>

        <Button borderRadius='0' onClick={onAddComment}>
          Добавить комментарий
        </Button>
      </Flex>

      <UnorderedList listStyleType='none' p='0' m='0'>
        {(areAllCommentsShow ? userComments : userComments.slice(-3)).map(
          (comment: CommentProps) => {
            return (
              <Comment
                key={comment.id}
                name={comment.name}
                text={comment.text}
              />
            );
          }
        )}
      </UnorderedList>

      {isAddCommentForm ? (
        <FormAddComment
          onAddComment={onAddComment}
          userComments={userComments}
          setUserComments={setUserComments}
        />
      ) : null}
    </Box>
  );
};
