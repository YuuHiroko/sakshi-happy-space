export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  author: string;
  date: string;
  tags: string[];
}

export const memories: Memory[] = [
  {
    id: 'snowman-challenge',
    imageUrl: '/images/memories/1.jpg',
    caption: 'The great snowman-building challenge of winter '22. We nearly froze, but our snowman was a masterpiece!',
    author: 'Alex',
    date: '2022-12-25',
    tags: ['winter', 'fun', 'creative'],
  },
  {
    id: 'beach-adventure',
    imageUrl: '/images/memories/2.jpg',
    caption: 'Our epic beach adventure. The water was icy, but the laughter and good times were warmer than the sun.',
    author: 'Ben',
    date: '2023-07-15',
    tags: ['summer', 'beach', 'adventure'],
  },
  {
    id: 'mountain-conquest',
    imageUrl: '/images/memories/3.jpg',
    caption: 'That time we conquered a mountain! The breathtaking view was the perfect reward for our tired legs.',
    author: 'Chloe',
    date: '2023-05-20',
    tags: ['hiking', 'nature', 'achievement'],
  },
  {
    id: 'surprise-party-heist',
    imageUrl: '/images/memories/4.jpg',
    caption: 'The surprise party heist was a total success! Her priceless reaction is a memory I'll cherish forever.',
    author: 'David',
    date: '2023-03-10',
    tags: ['party', 'friends', 'surprise'],
  },
  {
    id: 'unforgettable-concert',
    imageUrl: '/images/memories/5.jpg',
    caption: 'Our first concert together. The energy, the music, the crowd... an absolutely unforgettable night.',
    author: 'Emily',
    date: '2022-11-05',
    tags: ['music', 'concert', 'nightlife'],
  },
  {
    id: 'graduation-milestone',
    imageUrl: '/images/memories/6.jpg',
    caption: 'A milestone moment! So incredibly proud of her on graduation day. The future is bright!',
    author: 'Frank',
    date: '2023-06-18',
    tags: ['graduation', 'milestone', 'proud'],
  },
];
