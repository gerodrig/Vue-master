import { JournalState } from '@interfaces/journal';


export default (): JournalState => ({
   isLoading: true,
   entries: [],
})



  //  {
  //       id: new Date().getTime(),
  //       date: new Date().toDateString(),
  //       text: 'My chinchilla loves to play with wooden toys and run on her exercise wheel. She always makes me laugh with her silly antics!',
  //       picture: null
  //     },


  // {
  //   id: '1',
  //   date: new Date().toDateString(),
  //   text: 'My chinchilla loves to play with wooden toys and run on her exercise wheel. She always makes me laugh with her silly antics!',
  //   picture: null
  // },
  
  // {
  //   id: '2',
  //   date: new Date('2019-02-19').toDateString(),
  //   text: 'I recently adopted a new chinchilla and she\'s been adjusting really well to her new home. She\'s so cute when she pops her head out of her hidey-house!',
  //   picture: null
  // },
  
  // {
  //   id: '3',
  //   date: new Date('2021-05-10').toDateString(),
  //   text: 'Chinchillas are such interesting pets. Did you know that they have incredibly dense fur and can jump up to 6 feet in the air?',
  //   picture: null
  // },
  
  // {
  //   id: '4',
  //   date: new Date('2022-07-17').toDateString(),
  //   text: 'I\'ve been trying out new chinchilla treat recipes lately and my pets are loving them. Their favorite so far is a mixture of rolled oats, raisins, and shredded coconut!',
  //   picture: null
  // },
  
  // {
  //   id: '5',
  //   date: new Date('2021-02-10').toDateString(),
  //   text: 'My chinchilla has been shedding a lot lately, so I\'ve been giving her extra dust baths to help keep her fur clean and healthy. She seems to enjoy them!',
  //   picture: null
  // }