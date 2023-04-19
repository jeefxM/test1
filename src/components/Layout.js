import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
const Layout = ({ children, avatar, changeAvatar,  }) => {


  //left navigation menu controls
  const [leftNav, showLeftNav] = useState('w-[66px]')
  const [navMobile, showNavMobile]= useState('hidden')
 
  return (
    <div className="dark:bg-main bg-white transition-all ease-in dark:text-white relative">
      <Header avatar={avatar} changeAvatar={changeAvatar} showLeftNav={showLeftNav} leftNavWidth={leftNav} mobileNav= {navMobile} showNavMobile={showNavMobile}  />

      <Nav leftNavWidth={leftNav} mobileNav= {navMobile} />
      
    {/* margin for left navbar to fit */}
    <div className={`ml-[66px]  sm:ml-0`}>
      {children}
      <Footer />
    </div>
    </div>
  );
};

export default Layout;
