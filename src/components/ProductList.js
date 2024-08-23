
import Moment from "react-moment";
import "moment-timezone";
import { MdLocationOn } from "react-icons/md";
import { MdExitToApp, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductList({ item, id, Edit, Delete }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${item.type}/${id}`}>
        <img
          className="h-[180px] w-full object-cover hover:scale-110 transition-scale duration-300 ease-in"
          alt=""
          loading="lazy"
          src={item.imgUrls[0]}
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {item.timestamp?.toDate()}
        </Moment>

        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {item.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{item.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            €
            {item.offer
              ? item.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : item.realPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {item.type === "new"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {item.seats > 2 ? `${item.seats} Seats` : "2 Seats"}
              </p>
            </div>

            {item.type !== "new" && (
              <div className="flex items-center space-x-1">
                <p className="font-bold text-xs">
                  {item.previousOwners > 1
                    ? `${item.previousOwners} Owners`
                    : "1 Previous Owner"}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {Delete && (
        <MdDelete
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => Delete(item.id)}
        />
      )}
      
      {Edit && (
        <MdExitToApp
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => Edit(item.id)}
        />
      )}
    </li>
  );
}


