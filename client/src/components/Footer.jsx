import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 py-3 bg-dark text-light text-center">
      <div className="container">
        <p className="mb-0">
          &copy; {currentYear} Very Simple Task App | Created by Minggoy
        </p>
      </div>
    </footer>
  );
};

export default Footer;