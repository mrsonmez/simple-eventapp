import { gql } from "@apollo/client";

export const getEvents = gql`
  query getEvents {
    events {
      id
      title
      desc
      date
      from
      to
      location_id
      location {
        name
        desc
        lat
        lng
      }
    }
  }
`;
