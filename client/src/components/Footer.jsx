import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 py-3 bg-dark text-light text-center">
      <p>
        &copy; {currentYear} Very Simple Task App | Created by Minggoy
      </p>
    </footer>
  );
};

export default Footer;
