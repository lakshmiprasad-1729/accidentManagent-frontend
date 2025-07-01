import axios ,{AxiosInstance,AxiosResponse} from 'axios';
import localStorageService, { JsonResponse } from '../manageLocalStorage/localStorage';
import { RegisterResponse } from '../pages/Register';

const api:AxiosInstance = axios.create({
    baseURL:'https://accidentmanagement-production.up.railway.app',
     timeout: 200000,
    withCredentials: true, 
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
})

//https://accidentmanagement-production.up.railway.app
//https://accidentmanagement-production.up.railway.app

api.interceptors.request.use(
    (config) => {
        const token = localStorageService.getData().userdata;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
       console.log(error)
        return Promise.reject(error);
    }
);

interface loginData{
    email: string;
    password: string;
}

export interface registerDataFromUser{
    name:string,
    email:string,
    password:string
}

export interface axiosLoginResponse{
    status:number,
    data:string
}


const RegisterUser=async(registerdata:registerDataFromUser):Promise<RegisterResponse | string >=>{
    try {
        const response:RegisterResponse = await api.post('/user/register',registerdata)
            return response;
    } catch (error:any) {
        console.log(error);
        if(error.response){
             if(error.response.data){
            if(error.response.data.message) return error.response.data.message;
         }
        }

         return "internal server error";
    }
}


const Login= async(loginData:loginData):Promise<axiosLoginResponse | string> => {
    try {
        const response:axiosLoginResponse = await api.post('/user/login',loginData)
        return response;
    } catch (error: unknown) {
       if (error instanceof Error) {
           return error.message;
       }
       return 'An unknown error occurred';
    }
}

const getUserDetails=async():Promise<AxiosResponse | undefined >=>{
   try {
    const userdetails:AxiosResponse = await api.get('/user/user-details/getUser');
    return userdetails;
   } catch (error) {
       if( error instanceof Error) 
        console.log(error.message);
   }
}

const createAPost=async(formdata:FormData)=>{
    try {
        const postDetails = await api.post("/posts/upload-post",formdata,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }});
        return postDetails;
    } catch (error) {
          if( error instanceof Error) 
        console.log(error.message);
    }
}

const getUserPosts=async()=>{
    try {
        const userPosts = await api.get("/posts/user-post/getall-userspost");
        return userPosts;
    } catch (error) {
        if( error instanceof Error) 
        console.log(error.message);
    }
}

const getAllPosts=async()=>{
try {
        const allposts = await api.get("/posts/all-posts");
        return allposts;
    } catch (error) {
        if( error instanceof Error) 
        console.log(error.message);
    }
}

const getPostById=async(id:string)=>{
    try {
        const post = await api.get(`/posts/user-post/${id}`);
        return post;
    } catch (error) {
        if( error instanceof Error) 
        console.log(error.message);
    }
}

const updateStatusByAdmin=async(id:string)=>{
    try {
        const post = await api.put(`/posts/user-post/update-status/${id}`);
        return post;
    } catch (error) {
          if( error instanceof Error) 
        console.log(error.message);
    }
}

const addAdmin=async(email:string)=>{
     try {
        const admin = await api.post(`/admin/add-admin/${email}`);
        return admin;
    } catch (error) {
          if( error instanceof Error) 
        console.log(error.message);
    }
}


export {
    RegisterUser,
    Login,
    getUserDetails,
    createAPost,
    getUserPosts,
    getAllPosts,
    getPostById,
    updateStatusByAdmin,
    addAdmin
}