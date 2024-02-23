import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 flex justify-center items-center h-10">
      <a
        href="https://github.com/FractalIceCream/SkySocial.git" 
        className=""
        target="_blank"
      >
        <i className="fa-brands fa-github text-black text-xl md:text-2xl lg:text-3xl cursor-pointer"></i> {/* GitHub icon */}
      </a>
    </footer>
  );
}

export default Footer;

