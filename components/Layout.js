import Navbar from "./Navbar";

//Main Component with styles
export function Layout({children}) {
  return (
    <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto">
            {children}
        </div>
    </div>
  )
}