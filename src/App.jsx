import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

function App() {
    return (
        <div>
            <Helmet>
                <title>Free Image to PDF Converter | JPG, PNG to PDF Online</title>
                <meta
                    name="description"
                    content="Convert images (JPG, PNG) to PDF online for free. Works on mobile. No signup required. Fast, secure, and easy to use."
                />
                <meta
                    name="keywords"
                    content="image to pdf, jpg to pdf, png to pdf, online pdf converter, free pdf tool, india pdf converter"
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Your Name or Brand" />

                {/* Open Graph (Social Media) */}
                <meta property="og:title" content="Free Image to PDF Converter Online" />
                <meta
                    property="og:description"
                    content="Convert images to PDF instantly without signup. 100% free & secure."
                />
                <meta property="og:image" content="https://yourdomain.com/preview.jpg" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <ToastContainer />
            <Navbar />
            <Home />
        </div>
    );
}

export default App;
