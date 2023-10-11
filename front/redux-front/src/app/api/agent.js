import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "https://localhost:7263/api/";
axios.defaults.withCredentials = true;
const responseBody = (response)=>response.data;

axios.interceptors.response.use(async response=>{
    return response;
},(error)=>{
    const {data, status} = error.response;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error("You are not allowed to do this");
            break;
        case 500:
            router.navigate("/server-error",{state:{error:data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const request = {
    get:(url)=>axios.get(url).then(responseBody),
    post:(url, body)=>axios.post(url, body).then(responseBody),
    put:(url, body)=>axios.put(url, body).then(responseBody),
    delete:(url)=>axios.delete(url).then(responseBody)
}

const Users = {
    getAllUsers: ()=>request.get("User"),
    getUser: (id)=>request.get(`User/${id}`),
    deleteUser:(id)=>request.delete(`User/${id}`),
    updateUser: (userDto)=>request.put("User",userDto),
    addNewUser:(userDto)=>request.post("User/addUser", userDto)
}


const agent = {
    Users
}

export default agent;