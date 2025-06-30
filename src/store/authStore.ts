import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface User{
    name:string,
    email:string,
    role:string,
}


interface counterState{
    userStatus:boolean,
    user:User | undefined,
    darkMode:boolean
}

const initialState:counterState={
   userStatus:false,
   user:undefined,
   darkMode:false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin:(state,action:PayloadAction<User>)=>{
            state.user=action.payload;
            state.userStatus=true;
        },
        authLogout:(state)=>{
            state.user = undefined;
            state.userStatus=false;
        },
        toggleMode:(state)=>{
            state.darkMode = !state.darkMode;
        }
    },
  })

export const { authLogin , authLogout ,toggleMode} = authSlice.actions;

export default authSlice.reducer;