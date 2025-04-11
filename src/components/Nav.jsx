import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useUser,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import { Heart, ShoppingCart } from "lucide-react";

const ADMIN_EMAILS = ["yadnesh2105@gmail.com", "goursheteatharva@gmail.com"];
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/sign-in" replace />; // Redirect to login if not authenticated
  }


  const email = user.primaryEmailAddress?.emailAddress.toLowerCase();
  const isAdmin = ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email);

  if (!isAdmin) {
    return <Navigate to="/access-denied" replace />; // Redirect to Access Denied
  }

  return children; // Render the protected component
};

function Nav() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress.toLowerCase();
      setIsAdmin(ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (search.get("sign-in")) setShowSignIn(true);
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setShowSignIn(false);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap"
        rel="stylesheet"
      />
      <div className="bg-white rounded-2xl mx-auto w-11/12 mt-4">
        <nav className="flex justify-between items-center px-6 py-4 md:px-20 bg-white ">
          {/* Logo */}
          <div className="mr-20">
          <div className="flex items-center">
            <Link to="/" className="text-4xl font-extrabold text-black">
              HOLMES
            </Link>
          </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <SignedOut>
              <Button
                variant="outline"
                onClick={() => setShowSignIn(true)}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 shadow-lg hover:shadow-2xl transition-duration-300 "
              >
                Login
              </Button>
            </SignedOut>

            <SignedIn>
              {isAdmin && (
                <Link to="/addpg">
                  <Button variant="destructive" className="rounded-xl text-purple-900 hover:bg-purple-200 shadow-lg transition">
                    
                    Add PG
                  </Button>
                </Link>
              )}
              <Link to="/aboutus">
                <Button className="rounded-xl text-purple-900 hover:bg-purple-200 shadow-lg transition">
                  About Us
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Favourite PGs"
                    labelIcon={<Heart size={15} className="text-purple-600" />}
                    href="/favourites-pgs"
                  />
                  <UserButton.Link
                    label="Cart"
                    labelIcon={<ShoppingCart size={15} className="text-purple-600" />}
                    href="/cart"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-center py-4">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 shadow-lg hover:shadow-2xl transition duration-300"
            >
              Login / Sign Up
            </Button>
          </SignedOut>
        </div>

        {/* Sign In Modal */}
        {showSignIn && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
            onClick={handleOverlayClick}
          >
            <SignIn signUpForceRedirectUrl="/" fallbackRedirectUrl="/" />
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
