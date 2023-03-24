import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinLoader } from "../components/SpinLoader";
import { setCartData, setCartDataIds } from "../redux/slice";

const Home = () => {
  const menu = ["All", "Standard", "Premiume"];
  const [slectedMenu, setSlectedMenu] = useState("All");
  const [roomData, setRoomData] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [cartData, setCartData] = useState([])
  const cartData = useSelector((state) => state.app.cartData);
  const cartDataIDs = useSelector((state) => state.app.cartDataIDs);

  const dispatch = useDispatch();

  const navigation = useNavigate()

  //console.log(cartDataIDs,"cartIds");

  const getRoomData = async () => {
    setLoader(true);
    axios
      .get("https://room-booking-api-beryl.vercel.app/rooms")
      .then((result) => {
        // console.log(result.data);
        setRoomData(result.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (slectedMenu==="All") {
      getRoomData();
    }
    if (slectedMenu==="Standard") {
      filterStandard()
    }
    if (slectedMenu==="Premiume") {
      filterPremium()
    }
  }, []);

  // const addCart = (item)=>{
  //     setCartData([...cartData,item])
  // }

  const filterStandard = async () => {
    setLoader(true);
    axios
      .get("https://room-booking-api-beryl.vercel.app/rooms")
      .then((result) => {
        console.log(result.data);
        const filtered = result.data.filter(
          (item) => item.room_type === "Standard"
        );
        console.log(filtered, "filtered");
        setRoomData(filtered);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterPremium = () => {
    setLoader(true);
    axios
      .get("https://room-booking-api-beryl.vercel.app/rooms")
      .then((result) => {
        console.log(result.data);
        const filtered = result.data.filter(
          (item) => item.room_type === "Premium"
        );
        setRoomData(filtered);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(roomData,"room");

  return (
    <div className=" bg-[#282c34] ">
      <div className=" flex  sticky top-[4.5rem] py-7 bg-[#282c34] z-20 ">
        {menu?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSlectedMenu(item);
              if (item === "Standard") {
                filterStandard();
              }
              if (item === "Premiume") {
                filterPremium();
              }
              if (item === "All") {
                getRoomData();
              }
            }}
            className={`border-2 border-[#CBE4DE] mx-4 px-5 rounded-md py-1 text-[#CBE4DE] cursor-pointer hover:bg-[#CBE4DE] hover:text-gray-900 ${
              slectedMenu === item ? "bg-[#CBE4DE] text-gray-900" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div>
        {loader ? (
          <div className=" w-full max-h-screen flex justify-center items-center py-32">
            <SpinLoader/>
          </div>
        ) : (
          <div className=" p-8 grid md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {roomData?.map((item, index) => (
              <div key={index} className=" rounded-md overflow-hidden  group ">
                <div className=" bg-red-200 overflow-hidden">
                  <img
                    alt={item.room_type}
                    src={item.images[0]}
                    className=" transition-all duration-500 ease-in-out object-cover group-hover:scale-110"
                  />
                </div>
                <div className=" bg-white">
                  <div className=" grid grid-cols-2 gap-x-3 py-2 px-2 ">
                    <p className=" font-semibold">
                      Room Type :{" "}
                      <span className=" font-normal">{item.room_type}</span>
                    </p>
                    <p className=" font-semibold">
                      Bed Type :{" "}
                      <span className=" font-normal capitalize">
                        {item.bed_type}
                      </span>
                    </p>
                    <p className=" font-semibold">
                      Occupancy :{" "}
                      <span className=" font-normal capitalize">
                        {item.occupancy}
                      </span>
                    </p>
                    <p className=" font-semibold">
                      Floor :{" "}
                      <span className=" font-normal capitalize">
                        {item.floor}
                      </span>
                    </p>
                    <p className=" font-semibold">
                      Beds :{" "}
                      <span className=" font-normal capitalize">
                        {item.beds}
                      </span>
                    </p>
                    <p className=" font-semibold">
                      Availability :{" "}
                      <span className=" font-normal capitalize">
                        {item.availability ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                  <h3 className=" text-center w-full my-3  font-bold">
                    Price : ${item.price}
                  </h3>
                  <div className=" grid grid-cols-2">
                    
                    {cartDataIDs.includes(item._id)?<button 
                    onClick={() => {
                        navigation('/order')
                      }}
                     className=" bg-orange-500 text-white font-semibold py-2 transition-all duration-500 ease-in-out peer-hover:text-lg">
                      Place Order
                    </button>:<button 
                    onClick={() => {
                         dispatch(setCartDataIds([...cartDataIDs,item._id]))
                        dispatch(setCartData([...cartData, item]));
                        navigation('/order')
                      }}
                     className=" bg-orange-500 text-white font-semibold py-2 transition-all duration-500 ease-in-out peer-hover:text-lg">
                      Book Now
                    </button>}
                    {cartDataIDs.includes(item._id)?<button
                      // onClick={() => {
                      //    dispatch(setCartDataIds([...cartDataIDs,item._id]))
                      //   dispatch(setCartData([...cartData, item]));
                      // }}
                      className=" bg-[#FFF2CC] text-gray-800 font-semibold py-2"
                    >
                      Go to Cart
                    </button>:<button
                      onClick={() => {
                         dispatch(setCartDataIds([...cartDataIDs,item._id]))
                        dispatch(setCartData([...cartData, item]));
                      }}
                      className=" bg-[#FFF2CC] text-gray-800 font-semibold py-2"
                    >
                     Add to Cart
                    </button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
