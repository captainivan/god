import "@/app/globals.css"
import PushNotificationClient from "./components/PushNotificationClient";

const Provider = ({ children }) => {
    return (
        <div>

            <PushNotificationClient />
            {children}
        </div>
    );
}
export default Provider;