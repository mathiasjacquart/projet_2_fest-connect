import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Homepage from "./components/pages/Homepage/Homepage"
import About from "./components/pages/About/About"
import Account from "./components/pages/Account/Account"
import Register from "./components/pages/Register/Register"
import Error404 from "./components/pages/Error404/Error404"
import Services from "./components/pages/Services/Services"
import UserConnected from "./components/ProtectedRoutes/UserConnected"
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected"
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy"

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        // errorElement: <Error404/>,
        children: [
            
            {
                path: "/",
                element: <Homepage/>, 
            
                
            },
            {
                path:"/login",
                element: 
                <UserNotConnected>
                 <Homepage showConnexion={true}/>
                </UserNotConnected>
            },

            {
                path:"/about",
                element: <About/>
            },
            {
                path:"/register",
                element: 
                <UserNotConnected>
                    <Register/>
                </UserNotConnected>
                
            },
            {
                path:"/services",
                element: <Services/>
            },
            {
                path:"/politiques-de-confidentialité",
                element: <PrivacyPolicy/>
            },
            {
                path:"/my-account",
                element:
                 <UserConnected>
                    <Account/>
                </UserConnected>
            },

        ]

    }
])
