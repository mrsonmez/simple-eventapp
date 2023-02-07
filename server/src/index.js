import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { events, locations, participants, users } from "./data.js";

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      //Event
      events: (_, __) => events,
      event: (_, { id }) => {
        const item = events.filter((item) => item.id == id);
        return item[0];
      },
      //User
      users: (_, __) => {
        return users;
      },
      user: (_, { id }) => {
        const findex = users.findIndex((item) => item.id == id);
        return users[findex];
      },
      //Locations
      locations: (_, __) => {
        return locations;
      },
      location: (_, { id }) => {
        const findex = locations.findIndex((item) => item.id == id);
        return locations[findex];
      },
      //Participants
      participants: (_, __) => {
        return participants;
      },
      participant: (_, { id }) => {
        const findex = participants.findIndex((item) => item.id == id);
        return participants[findex];
      },
    },
    Event: {
      location: (parent, __) =>
        locations.filter((item) => item.id == parent.location_id),
      user: (parent, __) => users.filter((item) => item.id == parent.user_id),
      participant: (parent, __) =>
        participants.filter((item) => item.event_id == parent.id),
    },
    Participant: {
      user: (parent, args) => users.filter((item) => item.id == parent.user_id),
    },
  },
});

const yoga = createYoga({ schema, graphqlEndpoint: "/" });
const server = createServer(yoga);
server.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
