const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const andy = await prisma.user.upsert({
    where: { email: "andy@testemail.io" },
    update: {
      profile: {
        create: {
          bio: null,
        },
      },
    },
    create: {
      email: "andy@testemail.io",
      name: "Andy",
      posts: {
        create: [
          {
            title: "Andy's First Testimony",
            content: "<p>Andy's content</p>",
            published: true,
          },
          {
            title: "Andy's Second Testimony",
            content: "Hello content 2.",
            published: true,
          },
          {
            title: "Andy's Third Testimony",
            content: "Hello content 3.",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: null,
        },
      },
    },
  });
  const drew = await prisma.user.upsert({
    where: { email: "drew@testemail.io" },
    update: {
      profile: {
        create: {
          bio: null,
        },
      },
    },
    create: {
      email: "drew@testemail.io",
      name: "Drew",
      posts: {
        create: [
          {
            title: "Hey Guys! How's everyone?",
            content: "<div><h1>Some Content</h1></div>",
            published: true,
          },
          {
            title: "God is good always!",
            content: "<p>God is good always content.</p>",
            published: true,
          },
          {
            title: "Drew's Third Testimony",
            content: "Hello content 3.",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: null,
        },
      },
    },
  });
  console.log("Complete!");
  console.log({ drew, andy });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
