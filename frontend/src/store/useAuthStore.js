import {create} from "zustand";

export const useAuthStore = create((set , _) => ({
    authUser : {name : "Jhon" , _id : 123 , age : 25},
    isLoading : false,
    isLoggedIn : false,

    login : () => {
        console.log("We hjust logged In!!");
        set({isLoggedIn : true});
    }
}))