import connectDB from "@/lib/connectDB";
import Login from "./newComonents/Login";

const Page = async()=> {
    return(
      <div>
        <Login/>
      </div>
    );
}
export default Page;