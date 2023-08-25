import { prisma } from '../src/config/database';

// clear database
// add two new categories and two new professors and two new courses
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

  await prisma.course.create({
    data: {
      name: 'Matematica 1',
      description: 'Curso de matematica 1',
      image: 'https://www.unifor.br/documents/20143/573160/foto-evento-iv-maratona-de-calculo-cct-unifor-800-getty-images.jpg/8cc80504-d5b1-5041-bed2-9f8cf2e7ba21?t=1636466788649',
      category: {
        connect: {
          name: 'Matematica',
        },
      },
      professor: {
        connect: {
          name: 'João Mesa',
        },
      },
    },
  });

  await prisma.course.create({
    data: {
      name: 'Biologia 1',
      description: 'Curso de biologia 1',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTh8XjKiXsvsdn3VrIYW81F6KW_lIu74Pfg&usqp=CAU',
      category: {
        connect: {
          name: 'Biologia',
        },
      },
      professor: {
        connect: {
          name: 'Maria Clara',
        },
      },
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
