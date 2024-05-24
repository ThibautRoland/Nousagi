import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();

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

  const password_key = process.env.PASSWORD_SECRET_KEY;

  const password = "password"

//   const encryptedPasswordResult = await prisma.$queryRaw`SELECT pgp_sym_encrypt(${password}, ${password_key}) AS encrypted`;
//   const encryptedPasswordBytes = encryptedPasswordResult[0].encrypted;
//   const encryptedPassword = Buffer.from(encryptedPasswordBytes).toString('base64');

  // Create some users
//   const usersData = Array.from({ length: 5 }, () => ({
//     email: faker.internet.email(),
//     name: faker.person.fullName(),
//     password: encryptedPassword,
//   }));
    const usersData = await Promise.all(Array.from({ length: 5 }, async () => {
        const email = faker.internet.email();
        const name = faker.person.fullName();
        const password = "password";

        // Encrypt the password using pgcrypto's pgp_sym_encrypt function
        const encryptedPasswordResult = await prisma.$queryRaw`SELECT pgp_sym_encrypt(${password}, ${password_key}) AS encrypted`;
        const encryptedPasswordBytes = encryptedPasswordResult[0].encrypted;

        // Convert encrypted password bytes to a Base64 string
        const encryptedPassword = Buffer.from(encryptedPasswordBytes).toString('base64');

        return {
        email,
        name,
        password: encryptedPassword,
        };
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