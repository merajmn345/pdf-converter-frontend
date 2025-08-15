import { useState } from "react";
import FileUpload from "../components/FileUpload";
import Preview from "../components/Preview";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFilesAdded = (newFiles) => {
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleConvert = async () => {
        if (files.length === 0) return;
        setLoading(true);
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
        } finally {
            setLoading(false); // stop loading
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
                        disabled={loading}
                        className={`mt-4 px-4 py-2 rounded shadow text-white flex items-center gap-2
    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        aria-busy={loading}
                        aria-live="polite"
                    >
                        {loading && (
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                        {loading ? "Converting..." : "Convert to PDF"}
                    </button>
                </>
            )}
        </div>
    );
}
