import { JournalState } from "@/interfaces/journal";

export default {
  isLoading: true,
  entries: [
    {
      id: '-NTjmJFqzTb23OCUVF3z',
      date: 1645204752204,
      text: 'Today was a great day! I went on a hike and saw some amazing views.',
    },

    {
      id: 'u9h3g3h3u3',
      date: 1645204844436,
      text: 'I visited the beach today and saw some beautiful sunsets. Here is a picture I took:',
      picture: 'https://picsum.photos/200/300?random=1',
    },
    {
        id: 'y5n5j5n5j5',
        date: 1645204953565,
        text: 'I had a great time at the new Italian restaurant in downtown. The pizza was amazing!',
        picture: 'https://picsum.photos/200/300?random=1'
    },
    {
        id: 't4y4t4y4t4',
        date: 1645205025769,
        text: 'I went to the zoo today and saw some really cool animals. including a chinchilla #zoo #animals #fun',
    },
    {
        id: 'p7o7p7o7p7',
        date: 1645205135998,
        text: 'I went to a concert last night and it was amazing! Here is a video I took:',
        picture: 'https://picsum.photos/200/300?random=1'
    },
  ],
} as JournalState;
