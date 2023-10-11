import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../app/api/agent";
import { router } from "../app/router/Routes";
import { toast } from "react-toastify";

const initialState = {
    users:[],
    status:"idle",
    updateUser:null
}

export const fetchUsersAsync = createAsyncThunk(
    "users/fetchUsersAsync",
    async (_, thunkAPI)=>{
        try{
            return await agent.Users.getAllUsers();
        }catch(error){
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const updateUserAsync = createAsyncThunk(
    "users/updateUserAsync",
    async (data, thunkAPI)=>{
        try{
            return await agent.Users.updateUser(data);
        }catch(error){
            thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const AddNewUserAsync = createAsyncThunk(
    "users/addNewUserAsync",
    async (data, thunkAPI)=>{
        try{
            return await agent.Users.addNewUser(data)
        }catch(error){
            thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const DeleteUserAsync = createAsyncThunk(
    "user/deleteUserAsync",
    async (id, thunkAPI)=>{
        try{
            return await agent.Users.deleteUser(id)
        }catch(error){
            thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const usersSlice = createSlice({
    name:"users",
    initialState: initialState,
    reducers:{
        setUsers:(state, action)=>{
            state.users = action.payload
        },
        clearUsers: (state)=>{
            state.users = null;
        },
        setUpdateUser:(state, action)=>{
            state.updateUser = action.payload
        },
        clearUpdateUser: (state)=>{
            state.updateUser = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUsersAsync.pending,(state, action)=>{
            state.status = "pendingFetchUsers"
        });
        builder.addCase(fetchUsersAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            console.log("fullfields", action.payload);
            state.users = action.payload;
        });
        builder.addCase(fetchUsersAsync.rejected, (state, action)=>{
            state.status="idle";
            console.log(action.payload);
        });
        builder.addCase(updateUserAsync.pending, (state, action)=>{
            state.status = "pendingUpdateUser"
        });
        builder.addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            //state.updateUser = null;
            router.navigate("/");
        });
        builder.addCase(updateUserAsync.rejected, (state, action)=>{
            state.status = "idle";
        });
        builder.addCase(AddNewUserAsync.pending, (state, action)=>{
            state.status = "pendingAddUser"
        });
        builder.addCase(AddNewUserAsync.fulfilled, (state, action)=>{
            state.status = "idle"
            state.users = [...state.users, action.payload];
            toast.success("User Added");
            router.navigate("/");
        });
        builder.addCase(AddNewUserAsync.rejected, (state)=>{
            state.status = "idle";
        });
        builder.addCase(DeleteUserAsync.pending, (state, action)=>{
            state.status = "pendingDeleteUser"
        });
        builder.addCase(DeleteUserAsync.fulfilled, (state, action)=>{
            state.status = "idle"
            state.users = state.users.filter(item=>item.id!=action.payload)
        })
    }
})

export const {setUsers, clearUsers, setUpdateUser, clearUpdateUser} = usersSlice.actions;
//export const selectAllUsers = (state)=>state.users;
//export const getAllUsersStatus = (state)=>state.status;
export default usersSlice.reducer;