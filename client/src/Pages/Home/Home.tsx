import { useQuery } from "@apollo/client";
import { getEvents } from "./../../Apollo/Query/queries";
import { itemTypes } from "../../Lib/types";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(getEvents);
  return (
    <div className="flex justify-center items-center">
      <ul>
        {data?.events?.map((item: itemTypes) => {
          return (
            <Link
              key={item.id}
              className="w-[300px] hover:opacity-60"
              to={`/detail/${item.id}`}
            >
              <li className="w-full border-2 m-2 p-2">
                <div className=" w-full text-center border-2 border-b-black p-2">
                  <p>{item.title}</p>
                </div>
                <p>{item.desc}</p>
                <div className="flex m-2">
                  <img
                    src="http://cdn.onlinewebfonts.com/svg/img_292122.png"
                    width={25}
                    alt=""
                  />
                  <p className="ml-2">
                    {item.from} - {item.to}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
