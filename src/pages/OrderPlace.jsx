import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinLoader } from "../components/SpinLoader";
import { setCartData, setCartDataIds } from "../redux/slice";

const OrderPlace = () => {
  const cartData = useSelector((state) => state.app.cartData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    const sum = cartData?.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    setTotalPrice(sum);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeOrder = () => {
    if (email === "") {
      setEmailError(true);
      return;
    }
    if (name === "") {
      setNameError(true);
      return;
    }
    if (phone === "") {
      setPhoneError(true);
      return;
    }
    if (address === "") {
      setAddressError(true);
      return;
    }

    const orderData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      rooms: cartData,
    };
    setLoader(true);
    axios
      .post("https://room-booking-api-beryl.vercel.app/place-order", orderData)
      .then((result) => {
        console.log(result);
        dispatch(setCartData([]));
        dispatch(setCartDataIds([]));
        setLoader(false);
        setStatusMessage("placed");
        setTimeout(() => {
          setStatusMessage("");
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" flex flex-col items-center pt-5 bg-[#282c34]">
      <div className=" bg-white w-11/12 p-3  lg:w-1/2 rounded overflow-hidden lg:p-5">
        {statusMessage === "" ? (
          <>
            {cartData.length > 0 ? (
              <div>
                {cartData?.map((item, index) => (
                  <div className="  ">
                    <p className=" font-semibold">
                      Your Item {index + 1} Price :{" "}
                      <span className=" font-normal">{item.price}</span>
                    </p>
                  </div>
                ))}
                <h3 className=" text-center w-full my-3  font-bold">
                  Total Price : ${totalPrice}
                </h3>
                <div className=" ">
                  <h2 className=" text-center">Enter Your Details</h2>
                  <div className=" px-10">
                    <div className=" mt-4 ">
                      <p className=" text-sm my-2">Email</p>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (e.target.value.length > 0) {
                            setEmailError(false);
                          }
                        }}
                        className={`outline-none bg-gray-300 w-full py-1 rounded pl-3 border ${
                          emailError ? "border-red-600" : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className=" mt-4 ">
                      <p className=" text-sm my-2">Name</p>
                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value.length > 0) {
                            setNameError(false);
                          }
                        }}
                        className={`outline-none bg-gray-300 w-full py-1 rounded pl-3 border ${
                          nameError ? "border-red-600" : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className=" mt-4 ">
                      <p className=" text-sm my-2">Phone Number</p>
                      <input
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (e.target.value.length > 0) {
                            setPhoneError(false);
                          }
                        }}
                        className={`outline-none bg-gray-300 w-full py-1 rounded pl-3 border ${
                          phoneError ? "border-red-600" : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className=" mt-4 ">
                      <p className=" text-sm my-2">Address</p>
                      <textarea
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (e.target.value.length > 0) {
                            setAddressError(false);
                          }
                        }}
                        className={`outline-none bg-gray-300 w-full py-1 rounded pl-3 border ${
                          addressError ? "border-red-600" : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                  {/* <div className=" py-4">
                <h1 className=" font-semibold">Payment Options</h1>
                <div className=" flex items-center">
                  <input type="radio" />
                  <p>Debit Card</p>
                </div>
                <div className=" flex items-center">
                  <input type="radio" />
                  <p>UPI</p>
                </div>
                <div className=" flex items-center">
                  <input type="radio" />
                  <p>Net Banking</p>
                </div>
              </div> */}
                  <div className=" flex justify-center pt-6">
                    <button
                      onClick={() => {
                        placeOrder();
                      }}
                      className={`  py-2 rounded-md text-white font-semibold border border-orange-500  px-24  my-6 ${
                        loader ? "bg-white " : "bg-orange-500"
                      }`}
                    >
                      {loader ? (
                        <SpinLoader className=" h-2 w-2" />
                      ) : (
                        <p> Order Place</p>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex items-center justify-center">
                <h2 className=" font-semibold text-gray-800 py-10">
                  Please First Select Rooms
                </h2>
              </div>
            )}
          </>
        ) : (
          <div className=" flex flex-col items-center justify-center ">
            <img
              alt="kfhd"
              src={require("../assets/booked.png")}
              className=" w-32 h-32"
            />
            <h3 className=" py-10 font-semibold">
              Your Room is Booked Pay at Hotel reception
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPlace;
