// prisma/seed.ts
import prisma from "@/lib/db";

// define the sample data
const samplePersons = [
  {
    name: "Ada Lovelace",
    birthDate: new Date("1815-12-10"),
    deathDate: new Date("1852-11-27"),
    description: "Mathematician and first computer programmer",
    events: [
      {
        title: "Born in London",
        date: new Date("1815-12-10"),
        description: "Daughter of Lord Byron",
      },
      {
        title: "Met Charles Babbage",
        date: new Date("1833-06-05"),
        description: "Introduction to the Analytical Engine",
      },
      {
        title: "Published Notes on the Analytical Engine",
        date: new Date("1843-01-01"),
        description:
          "Including the first algorithm, making her the first programmer",
      },
      {
        title: "Died of uterine cancer",
        date: new Date("1852-11-27"),
        description: "At age 36 in London",
      },
    ],
  },
  {
    name: "Alan Turing",
    birthDate: new Date("1912-06-23"),
    deathDate: new Date("1954-06-07"),
    description: "Father of computer science and artificial intelligence",
    events: [
      {
        title: "Born in London",
        date: new Date("1912-06-23"),
        description: null,
      },
      {
        title: 'Published "On Computable Numbers"',
        date: new Date("1936-11-12"),
        description: "Introduced the concept of the Turing machine",
      },
      {
        title: "Joined Bletchley Park",
        date: new Date("1939-09-04"),
        description: "Worked on breaking the Enigma code during WWII",
      },
      {
        title: "Proposed the Turing Test",
        date: new Date("1950-01-01"),
        description: "Test of machine intelligence",
      },
      {
        title: "Died in Wilmslow",
        date: new Date("1954-06-07"),
        description: null,
      },
    ],
  },
  {
    name: "Grace Hopper",
    birthDate: new Date("1906-12-09"),
    deathDate: new Date("1992-01-01"),
    description: "Computer scientist and creator of COBOL",
    events: [
      {
        title: "Born in New York City",
        date: new Date("1906-12-09"),
        description: null,
      },
      {
        title: "Joined US Navy Reserve",
        date: new Date("1943-12-01"),
        description: null,
      },
      {
        title: "Worked on Harvard Mark I",
        date: new Date("1944-01-01"),
        description: "One of the first programmable computers",
      },
      {
        title: "Developed first compiler",
        date: new Date("1952-01-01"),
        description: "A-0 System compiler",
      },
      {
        title: "Led development of COBOL",
        date: new Date("1959-01-01"),
        description: null,
      },
      {
        title: "Retired from Navy as Rear Admiral",
        date: new Date("1986-08-14"),
        description: null,
      },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.event.deleteMany();
  await prisma.person.deleteMany();
  console.log("Deleted existing data.");

  for (const personData of samplePersons) {
    const person = await prisma.person.create({
      data: {
        name: personData.name,
        birthDate: personData.birthDate,
        deathDate: personData.deathDate,
        description: personData.description,
        // Use a nested 'create' to create related events
        events: {
          create: personData.events.map((event) => ({
            title: event.title,
            date: event.date,
            description: event.description,
          })),
        },
      },
    });
    console.log(`Created person with id: ${person.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
