import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { setCartData, setCartDataIds } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const CustomModal = (props) => {
  const [mounted, setMounted] = useState(false);
  const cartData = useSelector((state) => state.app.cartData);
  const cartDataIds = useSelector((state) => state.app.cartDataIDs);
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    const sum = cartData?.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
     setTotalPrice(sum)
    
  }, [navigate,cartData]);

  return (
    mounted &&
    createPortal(
      <>
        {props.isOpen && (
          <div className=" fixed top-0 left-0 bottom-0  shadow-xl right-0 z-40 ">
            <div className=" flex justify-between   h-full  ">
              <div
                onClick={props.clickOutside}
                className="w-1/4 lg:w-full bg-gray-400/70"
              ></div>
              <div
                className={` transition-all duration-500 ease-in-out w-full relative   lg:w-1/2  xl:w-1/3   py-5 bg-white `}
              >
                <div className=" w-full  ml-2 mr-7  rounded-md overflow-hidden  ">
                  <h1 className=" font-bold text-xl text-center">
                    Your Cart Items
                  </h1>
                  {cartData.length > 0 ? (
                    <>
                      {cartData?.map((item, index) => (
                        <div
                          key={index}
                          className=" relative flex my-10  shadow-boxShadow1 rounded-md overflow-hidden "
                        >
                          <img
                            alt={item.room_type}
                            src={item.images[0]}
                            className=" w-1/3 h-28"
                          />
                          <button
                            onClick={() => {
                              let f = cartData.filter(
                                (itm) => itm._id !== item._id
                              );
                              let ids = cartDataIds.filter(
                                (m) => m !== item._id
                              );
                              dispatch(setCartDataIds(ids));
                              dispatch(setCartData(f));
                            }}
                            className=" absolute top-2 right-5 hover:text-red-600"
                          >
                            <MdClose className=" text-xl" />
                          </button>
                          <div className=" px-5 py-3">
                            <p className=" font-semibold">
                              Room Type :{" "}
                              <span className=" font-normal">
                                {item.room_type}
                              </span>
                            </p>
                            <p className=" font-semibold">
                              Bed Type :{" "}
                              <span className=" font-normal capitalize">
                                {item.bed_type}
                              </span>
                            </p>
                            <h3 className=" text-center w-full my-3  font-bold">
                              Price : ${item.price}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className=" flex justify-center  items-center py-20">
                      <h5>No any Data in Your Cart</h5>
                    </div>
                  )}

                  {cartData.length > 0 ? (
                    <button onClick={()=>{
                      navigate('/order')
                      props.setOpen(false)

                    }} className=" bg-orange-500 absolute bottom-5 py-2 rounded-md text-white font-semibold left-10 right-10">
                      Procced with ${totalPrice}
                    </button>
                  ) : (
                    <button className=" bg-gray-200 absolute bottom-5 py-2 rounded-md text-white font-semibold left-10 right-10">
                     First Select Rooms
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>,
      document.getElementById("modal")
    )
  );
};

export default CustomModal;
