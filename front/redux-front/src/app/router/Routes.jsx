import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../features/Home";
import CreateUser from "../../features/CreateUser";
import UpdateUser from "../../features/UpdateUser";
export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children:[
            {path:"", element:<Home />},
            {path:"create", element:<CreateUser />},
            {path:"update", element:<UpdateUser />}
        ]
    }
])