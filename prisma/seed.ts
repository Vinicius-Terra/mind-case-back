import { prisma } from '../src/config/database';

// clear database
// add two new categories and two new professors
async function main() {
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.professor.deleteMany();
  
  await prisma.category.create({
    data: {
      name: 'Matematica',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Biologia',
    },
  });

  await prisma.professor.create({
    data: {
      name: 'João Mesa',
    },
  });

  await prisma.professor.create({
    data: {
      name: 'Maria Clara',
    },
  });

}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
