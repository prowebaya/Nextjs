import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; // for button color


import "font-awesome/css/font-awesome.min.css"; // ✅ Font Awesome


import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 🔥 Toast container */}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
