const mongoose = require('mongoose')

const user1Id = mongoose.Types.ObjectId()
const user2Id = mongoose.Types.ObjectId()
const user3Id = mongoose.Types.ObjectId()

exports.users = [
  {
    _id: user1Id,
    email: 'test@gmail.com',
    firstName: 'Testy',
    lastName: 'Tester',
    password: 'testtest1',
  },
  {
    _id: user2Id,
    email: 'test2@gmail.com',
    firstName: 'Two',
    lastName: 'Testing',
    password: 'testtest2',
  },
  {
    _id: user3Id,
    email: 'test3@gmail.com',
    firstName: 'Three',
    lastName: 'Tested',
    password: 'testtest3',
  },
]

exports.nannies = [
  {
    name: 'Becky Babysitter',
    city: 'boca raton',
    address1: '123 Palm Drive',
    state: 'FL',
    zip: '34110',
    phone: '1234567890',
    image:
      'https://mommybites.com/newyork/files/2018/05/100316794_s-768x512.jpg',
    email: 'beckybabysitter@gmail.com',
    headline: 'My name says it all!',
    description:
      "I've been babysitting since I was 15. I love what I do and the children I babysit seem to really like me. I always make sure they have fun and bring games with me.",
    hourlyRate: 18.0,
    milesRadius: 10,
    owner: user1Id,
  },
  {
    name: 'Audrey Aupair',
    city: 'naples',
    address1: '7898 Willow St',
    state: 'FL',
    zip: '34109',
    phone: '0987654321',
    image: 'https://engage.dss.gov.au/wp-content/uploads/2015/07/nannies.jpg',
    email: 'audreyaupair@gmail.com',
    headline: 'Many years with the finest families',
    description:
      "I have worked for some of the wealthiest families with some of the brattiest kids in Europe. It was no Sound of Music, I'll tell you that, but boy did I learn.",
    hourlyRate: 30.0,
    milesRadius: 20,
    owner: user2Id,
  },
  {
    name: 'Nancy Nanny',
    city: 'boca raton',
    address1: '234 Beach Rd.',
    address2: 'Unit 222',
    state: 'FL',
    zip: '34110',
    phone: '5555555555',
    image:
      'https://www.educatednannies.com/wp-content/uploads/2018/04/Educated-Nannies-job-photo-14.jpg',
    email: 'nancynanny@gmail.com',
    headline: 'Nannying is what I do.',
    description:
      "I'm firm but fair. Your children will have fun with me, but they will also learn. My hope is that their time with me will be educational for them.",
    hourlyRate: 20.0,
    milesRadius: 15,
    owner: user3Id,
  },
]
