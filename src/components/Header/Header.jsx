import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { auth, googleProvider } from "../../services/firebaseConfig";
import { useStateContext } from "../../../context/StateContext";
import Avatar from "./Avatar";

export default function Header() {
  const router = useLocation();
  const { user, setUser } = useStateContext();

  const links = [
    {
      name: "Saved Posts",
      href: "saved-posts",
    },
    {
      name: "Your Subreddit's",
      href: "saved-subreddits",
    },
  ];

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row items-center justify-center text-center sm:justify-between gap-5 lg:px-20 shadow-lg border-b border-white ">
      <Link to="/">
        <p className="text-3xl text-rose-600 font-semibold ">Scroll Wall</p>
      </Link>
      <nav className="flex flex-col sm:flex-row items-center gap-5">
        {user?.displayName ? (
          <Avatar user={user} />
        ) : (
          <button className="bg-rose-600  rounded-md flex items-center justify-center gap-3 p-2 px-3" onClick={handleGoogleLogin}>
            <i className="pi pi-google"></i>
            Login with Google
          </button>
        )}
        {links.map((link) => (
          <Link
            to={link.href}
            key={uuid()}
            className={` transition-all hover:scale-105 hover:underline underline-offset-4 ${
              router.pathname.includes(link.href) ? "underline" : ""
            } `}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
