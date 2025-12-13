import React from "react";
import logo from "../../../public/gvanto_papeteria_logo.png"; 

const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto", 
    lg: "h-16 w-auto",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={logo}
        alt="GVANTO Papeterie - Office, School & Digital Services in Rwanda"
        className={`${sizes[size]} object-contain`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;