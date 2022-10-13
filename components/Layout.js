import Navbar from "./Navbar";
import ScrollToTop from "react-scroll-to-top";

//Main Component with styles
export function Layout({children}) {
  return (
    <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto main-container">
            {children}
        </div>
        <ScrollToTop color="gray" width="40" height="30" />
    </div>
  )
}