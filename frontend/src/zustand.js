import { create } from 'zustand'

const userStore = create(set=>({
    isLoggedIn:false,
    login: ()=>set({isLoggedIn:true}),
    logout: ()=>set({isLoggedIn:false}),
    user:{},
    setUser: (user)=>set({user}),
}));

export {userStore};
