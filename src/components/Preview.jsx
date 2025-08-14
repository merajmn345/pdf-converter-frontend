export default function Preview({ files, onDelete }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {files.map((file, index) => (
                <div key={index} className="border p-2 rounded shadow">
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-32 object-cover rounded" />
                    <p className="text-xs mt-1 truncate">{file.name}</p>
                    <button
                        onClick={() => onDelete(index)}
                        className="absolute top-40 right-20 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
