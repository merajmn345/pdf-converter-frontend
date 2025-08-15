import { useState } from "react";
import FileUpload from "../components/FileUpload";
import Preview from "../components/Preview";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
    const [files, setFiles] = useState([]);

    const handleFilesAdded = (newFiles) => {
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleConvert = async () => {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));

        try {
            const response = await axios.post("https://pdf-converter-backend-gk5c.onrender.com/convert", formData, {
                responseType: "blob",
            });

            // Download PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "converted.pdf");
            document.body.appendChild(link);
            link.click();
            setFiles([]);
            toast.success("Pdf converted successfully👋!", {
                position: "top-right",
            });
        } catch (error) {
            console.error("Error converting to PDF", error);
            toast.error("Error converting to PDF", {
                position: "top-right",
            });
        }
    };
    const handleDelete = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <FileUpload onFilesAdded={handleFilesAdded} />
            {files.length > 0 && (
                <>
                    <Preview files={files} onDelete={handleDelete} />
                    <button
                        onClick={handleConvert}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                    >
                        Convert to PDF
                    </button>
                </>
            )}
        </div>
    );
}
