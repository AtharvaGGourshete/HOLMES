import React from "react";

function Footer() {
  return (
    <div className="h-auto text-white  ">
      <footer className="bg-purple-600 border-t-white shadow p-4 md:p-4 dark:bg-gray-800 text-white ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between ">
          <span className="text-sm text-white sm:text-center dark:text-gray-400 m-auto">
            © 2025{" "}
            <a href="/" className="hover:underline  ">
              HOLMES™
            </a>
            . All Rights Reserved .
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
