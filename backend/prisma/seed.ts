// import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// const dogRaces = [
//     'Labrador Retriever',
//     'German Shepherd',
//     'Golden Retriever',
//     'Bulldog',
//     'Beagle',
//     'Poodle',
//     'Rottweiler',
//     'Yorkshire Terrier',
//     'Boxer',
//     'Dachshund',
//     'Siberian Husky',
//     'Great Dane',
//     'Shih Tzu',
//     'Doberman Pinscher',
//     'Australian Shepherd',
//     'Cocker Spaniel',
//     'Border Collie',
//     'Basset Hound',
//     'Chihuahua',
//     'Pomeranian',
//   ];



// async function mainUsers() {
//     await prisma.user.deleteMany({})
//   for (let i = 0; i < 20; i++) {
//     await prisma.user.create({
//       data: {
//         email: faker.internet.email(),
//         name: faker.person.fullName(),
//       },
//     });
//   }
// }

// async function mainDogs() {
//     await prisma.dog.deleteMany({});
//     const users = await prisma.user.findMany();

//   const dogsData = Array.from({ length: 20 }, (_, i) => ({
//     name: faker.animal.dog(),
//     race: dogRaces[Math.floor(Math.random() * dogRaces.length)],
//     masterId: users[Math.floor(Math.random() * users.length)].id,
//   }));

//   for (const dog of dogsData) {
//     await prisma.dog.create({
//       data: dog,
//     });
//   }
// }

// mainUsers();

// mainDogs();

// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const dogRaces = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'Bulldog',
  'Beagle',
  'Poodle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Shih Tzu',
  'Doberman Pinscher',
  'Australian Shepherd',
  'Cocker Spaniel',
  'Border Collie',
  'Basset Hound',
  'Chihuahua',
  'Pomeranian',
];

async function main() {
  // Delete all dogs and users
  await prisma.dog.deleteMany({});
  await prisma.user.deleteMany({});

  // Create some users
  const usersData = Array.from({ length: 5 }, () => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
  }));

  await prisma.user.createMany({ data: usersData });

  const users = await prisma.user.findMany();

  // Create 20 dogs with realistic names and races
  const dogsData = Array.from({ length: 20 }, () => ({
    name: faker.animal.dog(),
    race: dogRaces[Math.floor(Math.random() * dogRaces.length)],
    masterId: users[Math.floor(Math.random() * users.length)].id,
  }));

  for (const dog of dogsData) {
    await prisma.dog.create({
      data: dog,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });