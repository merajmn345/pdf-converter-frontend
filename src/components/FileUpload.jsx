import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function FileUpload({ onFilesAdded }) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            onFilesAdded(acceptedFiles);
        },
        [onFilesAdded]
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        onDrop,
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
            <input {...getInputProps()} />
            <p className="text-gray-600">Drag & drop images here, or click to select</p>
        </div>
    );
}
