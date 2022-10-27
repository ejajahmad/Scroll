import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [postAfter, setPostAfter] = useState("");
  const [postBefore, setPostBefore] = useState("");
  const [user, setUser] = useState();

  return (
    <Context.Provider
      value={{
        postAfter,
        setPostAfter,
        postBefore,
        setPostBefore,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
