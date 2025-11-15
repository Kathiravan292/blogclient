import React, { createContext, useEffect, useReducer } from "react";

const initialState = {
  user:
    localStorage.getItem("user") &&
      localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          profilepic: action.payload.profilepic, 
          role : action.payload.role,
          phoneNumber:action.payload.phoneNumber,
        },
        token: action.token,
        role: action.role,
      };

    case "LOGOUT_SUCCESS":
      return {
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthC = createContext(initialState);

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <AuthC.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthC.Provider>
  );
};

export default AuthContext;
