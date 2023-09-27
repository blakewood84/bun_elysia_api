const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {
      profile: {
        update: {
          bio: "Alice's Profile!",
        },
      },
    },
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      posts: {
        create: [
          {
            title: "My First Testimony",
            content: "Hello content 1.",
            published: true,
          },
          {
            title: "My Second Testimony",
            content: "Hello content 2.",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "Hello!",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {
      profile: {
        update: {
          bio: "Bob's profile!",
        },
      },
    },
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: "<div><h1>Some Content</h1></div>",
            published: true,
          },
          {
            title: "Follow Nexus on Twitter",
            content:
              "<p><a href='https://twitter.com/nexusgql' target='_blank'>https://twitter.com/nexusgql</a></p>",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "This is my bio",
        },
      },
    },
  });
  console.log("Complete!");
  console.log({ alice, bob });
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
