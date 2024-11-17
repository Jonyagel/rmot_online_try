"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  comments_ar: any[];
  setComments_ar: React.Dispatch<React.SetStateAction<any[]>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openModalFromChat: boolean;
  setOpenModalFromChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [comments_ar, setComments_ar] = useState<any[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openModalFromChat, setOpenModalFromChat] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ comments_ar, setComments_ar, isLogin, setIsLogin, openModalFromChat ,setOpenModalFromChat }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};





// "use client";

// import {createContext, useContext, useState} from "react";

// const AppContext = createContext({})

// export function ContextProvider({children}:any){
//   const [comments_ar, setComments_ar] = useState([]);

//   return (
//     <AppContext.Provider value={{comments_ar,setComments_ar}}>
//       {children}
//     </AppContext.Provider>
//   )
// }


// export const useAppCommentContext = ():any => {
//   return useContext(AppContext);
// }