import React,{useState} from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import AppRoutes from './routes/AppRoutes';
import { useSelector } from 'react-redux';
import CustomModal from './components/CustomModal';
import { useNavigate } from 'react-router-dom';


const App = () => {
  //const [cartItems, setCartItems] = useState(["4", "5"]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false)
  const cartData = useSelector(state => state.app.cartData);

  const navigate  =  useNavigate()
  return (
    <div className=' bg-[#282c34] w-full h-screen'>
        <div className=" hidden md:block">
        <div className=" sticky top-0 bg-[#CBE4DE] p-3 px-10 flex justify-between  items-center z-20">
        <div className=" flex items-center">
            <img
              alt="logo"
              src={require("./assets/hotel.png")}
              className=" w-12 h-12"
            />
            <h3 className=" text-2xl font-bold mx-3 uppercase">Booking</h3>
          </div>
          <div className=" flex justify-around items-center">
            <div onClick={()=>navigate("/")} className=" mx-5  group cursor-pointer ">
              <div className=" flex justify-start">
                <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full" />
              </div>
              <h3 className=" mx-5 transition-all duration-500 ease-in-out font-semibold">
                Rooms
              </h3>
              <div className=" flex justify-end mt-1">
                <div className=" h-1 bg-orange-500  transition-all duration-500 ease-in-out w-0 group-hover:w-full " />
              </div>
            </div>
            <div className=" mx-5  group cursor-pointer ">
              <div className=" flex justify-start">
                <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full" />
              </div>
              <h3 className=" mx-5 transition-all duration-500 ease-in-out font-semibold">
                Feedback
              </h3>
              <div className=" flex justify-end mt-1">
                <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full " />
              </div>
            </div>
            <div onClick={()=>setOpenCart(!openCart)} className=" relative mx-5 px-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-700">
              <FaShoppingCart className=" text-2xl text-gray-800" />
              {cartData.length > 0 && (
                <>
                  <div className="px-1.5 py-0 bg-orange-500 animate-ping -top-3 right-0 h-5 w-5  rounded-full absolute"></div>
                  <p
                    className={` bg-orange-500 rounded-full h-5 w-5 px-1.5 py-0  absolute -top-3 right-0 text-white text-sm`}
                  >
                    {cartData.length}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <CustomModal isOpen={openCart} clickOutside={()=>setOpenCart(false)}/>
        <AppRoutes/>
      </div>
      <div className=" md:hidden relative">
        <div className=" sticky top-0 z-30 bg-[#CBE4DE] p-3 px-5 flex justify-between  items-center">
          <div className=" flex items-center">
            <img
              alt="logo"
              src={require("./assets/hotel.png")}
              className=" w-12 h-12"
            />
            <h3 className=" text-2xl font-bold mx-3 uppercase">Booking</h3>
          </div>
          <div onClick={()=>setOpenCart(!openCart)} className=" relative mx-5 px-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-700">
              <FaShoppingCart className=" text-2xl text-gray-800" />
              {cartData.length > 0 && (
                <>
                  <div className="px-1.5 py-0 bg-orange-500 animate-ping -top-3 right-0 h-5 w-5  rounded-full absolute"></div>
                  <p
                    className={` bg-orange-500 rounded-full h-5 w-5 px-1.5 py-0  absolute -top-3 right-0 text-white text-sm`}
                  >
                    {cartData.length}
                  </p>
                </>
              )}
            </div>
          <div>
            {openMenu ? (
              <CgClose
                onClick={() => setOpenMenu(false)}
                className=" text-3xl "
              />
            ) : (
              <HiMenu
                onClick={() => setOpenMenu(true)}
                className=" text-3xl "
              />
            )}
          </div>
          {openMenu && (
            <div className="bg-[#CBE4DE]  absolute left-0 right-0 bottom-0 top-16 h-screen ">
              <div className=" pr-64 pt-5">
                <div onClick={()=>navigate("/")} className=" mx-5  group cursor-pointer my-5 ">
                  <div className=" flex justify-start">
                    <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full" />
                  </div>
                  <h3 className=" mx-5 transition-all duration-500 ease-in-out font-semibold">
                    Rooms
                  </h3>
                  <div className=" flex justify-end mt-1">
                    <div className=" h-1 bg-orange-500  transition-all duration-500 ease-in-out w-0 group-hover:w-full " />
                  </div>
                </div>
                <div className=" mx-5  group cursor-pointer ">
                  <div className=" flex justify-start">
                    <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full" />
                  </div>
                  <h3 className=" mx-5 transition-all duration-500 ease-in-out font-semibold">
                    Feedback
                  </h3>
                  <div className=" flex justify-end mt-1">
                    <div className=" h-1 bg-orange-500 transition-all duration-500 ease-in-out w-0 group-hover:w-full " />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <CustomModal isOpen={openCart} clickOutside={()=>setOpenCart(false)} setOpen={setOpenCart}/>
        <AppRoutes/>
      </div>
    </div>
  )
}

export default App