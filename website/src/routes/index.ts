import { createBrowserRouter } from "react-router-dom";
import Faq from "../component/Faq/Faq";
import Footer from "../component/Footer/Footer";
import Home from "../component/Home/Home";
import Menus from "../component/Menus/Menus";
import Navbar from "../component/Navbar/NavbarComponent";

const router = createBrowserRouter([
    {
        path: "/",
        element: Faq(),
    },
    {
        path: "/",
        element: Footer(),
    },
    {
        path: "/",
        element: Home(),
    },
    {
        path: "/",
        element: Menus(),
    },
    {
        path: "/",
        element: Navbar(),
    }
]);

export { router };
