import Footer from "./dashComponents/Footer";
import NavBar from "./dashComponents/Navbar";

export default function ({ children }){
    return(
        <div className="flex flex-col justify-between ">
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
}
