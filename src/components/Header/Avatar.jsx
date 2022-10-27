import React from "react";

export default function Avatar({ user }) {
  return (
    <div className="flex items-center space-x-4">
      <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
      <div className="font-medium dark:text-white flex  flex-col justify-center items-start">
        <div>{user?.displayName ? user?.displayName : "Hello,"}</div>
        {user?.email && <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>}
      </div>
    </div>
  );
}
