import Provider from "./Provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "GODS PLAN",
  description: "AIM STRIKE CONQUER",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          theme="dark"
        />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
