import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

interface detailType {
  id?: string;
  location_id?: string;
  email?: string;
  username?: string;
  lat: number;
  lng: number;
  user: [
    {
      email: string;
      username: string;
    }
  ];
}

const Detail = () => {
  const getSpecificEvent = gql`
    query getUser($id: ID!) {
      event(id: $id) {
        id
        title
        user {
          id
          username
          email
        }
        location {
          lat
          lng
        }
        participant {
          user_id
          user {
            username
            email
          }
        }
      }
    }
  `;
  const nav = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(getSpecificEvent, {
    variables: { id: id?.toString() },
  });

  if (error) {
    return (
      <h1 className="absolute left-[20%] top-1/2 text-5xl">{error.message}</h1>
    );
  } else if (loading) {
    return <h1 className="absolute left-[35%] top-1/2 text-8xl">Loading...</h1>;
  }
  console.table(data);
  return (
    <div className="absolute left-[32%] top-[40%] text-center border-4 p-2 border-[#b1b116] w-[650px] h-[300px]">
      <div
        className="fixed left-1 top-2 cursor-pointer text-black bg-gray-300 rounded-md p-4 hover:opacity-80"
        onClick={() => nav("/")}
      >
        Go Back
      </div>
      <div className="flex flex-row">
        <div className="flex-row w-[40%] border-r-2 h-full hover:bg-gray-300">
          <p className="border-b-2">Event Title</p>
          <h3>{data?.event.title}</h3>
        </div>
        <div className="flex-row w-[20%] border-r-2 h-full hover:bg-gray-300">
          <h2 className="border-b-2">User</h2>
          {data?.event.user.map((item: detailType) => (
            <h3 key={item.id}>{item.username}</h3>
          ))}
        </div>
        <div className="flex-row w-[30%] border-r-2 h-full hover:bg-gray-300">
          <h2 className="border-b-2">Coordinates</h2>
          {data?.event.location.map((item: detailType) => (
            <div key={crypto.randomUUID()}>
              <h3>lat:{item.lat}</h3>
              <h3>{item.lng}</h3>
            </div>
          ))}
        </div>
        <div className="flex-row w-[40%] border-2 h-full hover:bg-gray-300">
          <h2 className="border-b-2">Participants</h2>
          {data?.event.participant.map((item: detailType) =>
            item?.user.map((item) => {
              return (
                <div key={crypto.randomUUID()} className="border-4">
                  <h3>username:{item.username}</h3>
                  <h3>email:{item.email}</h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
