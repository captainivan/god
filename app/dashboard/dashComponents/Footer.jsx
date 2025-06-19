import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, NotebookPen } from "lucide-react";
import Link from "next/link";


const Footer = ()=> {
    return(
        <div className="w-full flex justify-around items-center border-black p-3">
            <Link href="/dashboard"><Button className="w-25 p-5"><ChartNoAxesCombined style={{ height: "25px", width: "25px"}} /></Button></Link>
            <Link href="/dashboard/addTaskDash"><Button className="w-25 p-5"><NotebookPen style={{ height: "25px", width: "25px"}} /></Button></Link>
        </div>
    );
}
export default Footer;