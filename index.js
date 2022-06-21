import { ApolloServer, gql, UserInputError } from "apollo-server";
import { v1 as uuid } from "uuid";

import axios from "axios";

const persons = [
  {
    name: "Alberto",
    phone: "42342423423",
    street: "Azabache",
    city: "Zapopan",
    id: "1",
  },
  {
    name: "Midu",
    phone: "23232323",
    street: "Calle frontend",
    city: "Madrid",
    id: "2",
  },
  {
    name: "Javier",
    street: "LA",
    city: "Madrid",
    id: "3",
  },
];

//Definiciones
const typeDefinitions = gql`
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    city: String!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

//Resolvers
// const resolvers = {
//   Query: {
//     personCount: () => persons.length,
//     allPersons: (root, args) => {
//       if (!args.phone) return persons;
//       return persons.filter((person) =>
//         args.phone === "YES" ? person.phone : !person.phone
//       );
//       //   const byPhone = (person) =>
//       //     args.phone === "YES" ? person.phone : !person.phone;
//     },
//     findPerson: (root, args) => {
//       const { name } = args;
//       return persons.find((person) => person.name === name);
//     },
//   },
//   Mutation: {
//     addPerson: (root, args) => {
//       if (persons.find((person) => person.name === args.name)) {
//         throw new UserInputError("Name must be unique", {
//           invalidArgs: args.name,
//         });
//       }
//       const person = { ...args, id: uuid() };
//       persons.push(person);
//       return person;
//     },
//     editNumber: (root, args) => {
//       const personIndex = persons.findIndex(
//         (person) => person.name === args.name
//       );
//       if (personIndex === -1) return null;

//       const person = persons[personIndex];

//       const updatedPerson = { ...person, phone: args.phone };

//       persons[personIndex] = updatedPerson;

//       return updatedPerson;
//     },
//   },
//   Person: {
//     address: (root) => {
//       return {
//         street: root.street,
//         city: root.city,
//       };
//     },
//   },
// };

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      //   const { data: persons } = await axios.get(
      //     "http://localhost:3000/persons"
      //   );
      if (!args.phone) return persons;
      return persons.filter((person) =>
        args.phone === "YES" ? person.phone : !person.phone
      );
      //   const byPhone = (person) =>
      //     args.phone === "YES" ? person.phone : !person.phone;
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((person) => person.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex(
        (person) => person.name === args.name
      );
      if (personIndex === -1) return null;

      const person = persons[personIndex];

      const updatedPerson = { ...person, phone: args.phone };

      persons[personIndex] = updatedPerson;

      return updatedPerson;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs: typeDefinitions, resolvers });

server.listen().then(({ url }) => {
  console.log("Server ready at " + url);
});
