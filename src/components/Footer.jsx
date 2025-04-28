import React from "react";
import ClickSpark from "./ui/ClickSpark/ClickSpark";

function Footer() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      <div className="h-auto text-white w-full">
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
      </ClickSpark>
    </>
  );
}

export default Footer;
