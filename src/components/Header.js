import React, { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaBars, FaLightbulb, FaMoon } from "react-icons/fa";
import { Avatar, Modal } from "@geist-ui/core";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useShoppingCart } from "@/context/ShoppingCartProviderJeefx";
import Cart from "./Productpage/Cart";
import { useCart } from "@shopify/hydrogen-react";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";




const Header = ({ avatar,showLeftNav, leftNavWidth, mobileNav, showNavMobile }) => {

  const router = useRouter()


  const {data : session } = useSession();

  //popover animation
  const ref = useRef();
  const [showPop, changeShowPop] = useState("hidden");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        changeShowPop("hidden");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const modalOrDropdown = () => {

    if (session != null) {
      changeShowPop("visible");
    } else {
      router.push('/login')

    }

  };

  //dark & white mode
  const [theme, changeTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };


  //cart
    
  const {cart, openCart,} = useShoppingCart()
  const { lines} = useCart()



  const [cartQuantity, setCartQuantity] = useState(0)



  // Update cartQuantity when cartItems changes
  useEffect(() => {
    const quantity = lines.reduce((total, item) => total + item.quantity, 0)
    setCartQuantity(quantity)

  }, [lines,])

  //left menu functiosns

  const showLeftMenu = () => {

    if(window.innerWidth <= 640){
      showNavMobile(mobileNav === 'hidden' ? 'unset' : 'hidden')

    }else{

    showLeftNav(leftNavWidth === 'w-[66px]' ? 'w-[216px]' : 'w-[66px]' )
    }
  }


  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-main ">
      <nav className="flex justify-between items-center  font-semibold text-lg  px-4 h-16 border-b-2 border-black dark:border-white border-solid">
        {/*navigations */}
         <div className=" border-r-2 sm:border-r-0 border-solid border-black dark:border-white h-full flex items-center pr-2 w-[50px]  hover:text-hover">

<FaBars size={30} onClick={showLeftMenu}/>

<div className=" left-20 absolute border-r-2 sm:border-r-0 border-solid px-2 border-black dark:border-white h-full flex items-center  hover:text-hover">
         
         
                     <Link href="/"><h2 className="logo  font-bold ">THIRDMERCH</h2></Link>

</div>
     
        </div>
        <div className="w-1/3 sm:hidden  ">
        <SearchBar />
        </div>


        <ul className="flex flex-row gap-2 h-full">
          {/*cart & avatar */}
          <li className="flex items-center h-full border-x-2 border-solid border-black dark:border-white px-3 hover:text-hover" >
            <FaShoppingCart size={30} onClick={() =>openCart(true)} />
            <div className="text-whgite rounded-full bg-[#CE031A] w-4 text-sm text-center text-white">{cartQuantity}</div>
            <Cart  />
          </li>
          <li
            className="flex items-center border-r-2  border-black  dark:border-white pr-2"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <FaMoon size={30} className="hover:text-hover" />
            ) : (
              <FaLightbulb size={30} className="hover:text-hover" />
            )}
          </li>
          <li className="flex items-center h-full  border-solid border-black dark:border-white pl-3 relative">
            {/*Login Modal */}
            <button onClick={modalOrDropdown}>
              <Avatar scale={1.2} src={avatar} />
            </button>{" "}
            {session ?   (
              <div
                ref={ref}
                className={`absolute bg-white h-[auto] w-22 top-16 right-2 rounded-md p-2 transition-all  ${showPop}`}
              >
                <ul className="whitespace-nowrap ">
                  <li className="border-b-2 border-black dark:border-white w-full hover:text-hover text-black  ">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="border-b-2 border-black dark:border-white w-full hover:text-hover text-black  ">
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li
                    className=" w-full  hover:text-hover cursor-pointer text-black "
                    onClick={signOut}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            ) :
            ("")}
          </li>

         
        </ul>
      </nav>
    </div>
  );
};

export default Header;
