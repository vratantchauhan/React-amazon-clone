import React, {createContext,useContext,useReducer} from "react";

//prepares the data layer.
export const StateContext = createContext();

//wrap our app in index.js and provide the datalayer to every component of our app.
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

//pull information from our dataLayer
export const useStateValue = () => useContext(StateContext);