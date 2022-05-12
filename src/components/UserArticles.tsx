import { ListItem, Text, UnorderedList, Flex } from '@chakra-ui/react';
import { Comments } from './Comments';
import { RatingImage } from './RatingImage';
import { DateTime } from 'luxon';
import times from 'lodash/times';

type allArticles = {
  articles: Article[];
};

type Article = {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
};

export const UserArticles = ({ articles }: allArticles) => {
  const processedArticles = articles.map((article: Article) => {
    return {
      ...article,
      date: DateTime.fromISO(article.date).toFormat('dd.MM.y'),
    };
  });

  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='70%'>
      {processedArticles.map((article) => (
        <ListItem
          key={article.id}
          display='flex'
          flexDirection='column'
          marginBottom='10'
          rowGap='5px'
        >
          <Flex justifyContent='space-between'>
            <Text>Дата {article.date}</Text>
            <Text>{article.author}</Text>
          </Flex>
          <Text>{article.text}</Text>
          <Flex alignItems='center' columnGap='5px'>
            <Text>Рейтинг:</Text>
            <Flex>
              {times(5, (index) => (
                <RatingImage
                  isActiveRating={index < article.rating ? true : false}
                  key={index}
                />
              ))}
            </Flex>
          </Flex>
          <Comments />
        </ListItem>
      ))}
    </UnorderedList>
  );
};
