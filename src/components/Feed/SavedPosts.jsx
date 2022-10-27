import { onValue, ref } from "firebase/database";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import { useStateContext } from "../../../context/StateContext";
import { db, writeFirebaseData } from "../../services/firebaseConfig";
import { useLocalStorage, useToggle } from "../../services/hooks/customHooks";
import { FeedCard } from "./FeedCard";

export default function SavedPosts() {
  const { user } = useStateContext();

  const [savedPostsFirebase, setSavedPostsFirebase] = useState([]);
  const [savedPostsLocal, setSavedPostsLocal] = useLocalStorage("savedPosts", []);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    document.title = "Saved Posts - Scroll";

    if (user?.uid && savedPostsFirebase.length > 0) {
      setSavedPosts(savedPostsFirebase);
    } else {
      setSavedPosts(savedPostsLocal);
    }
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      if (savedPostsFirebase.length === 0) {
        writeFirebaseData(user.uid, "savedPosts", savedPostsLocal);
      }
      const savedPostsRef = ref(db, "savedPosts/" + user.uid);
      onValue(savedPostsRef, (snapshot) => {
        const data = snapshot.val();
        setSavedPostsFirebase(data);
        setSavedPosts(data);
      });
    }
  }, [user, savedPostsLocal]);

  return (
    <div className="p-3 ">
      <h2 className="text-3xl my-5 ">Your Saved Posts</h2>
      <div className=" bg-[#212426] w-full h-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {savedPosts && savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <FeedCard key={uuid()} title={post.title} image={post.image} video={post.video} blur={post.nsfw} id={post.id} post={post} />
          ))
        ) : (
          <ProgressSpinner />
        )}
      </div>
    </div>
  );
}
