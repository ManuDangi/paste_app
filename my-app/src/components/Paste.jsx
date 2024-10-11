import React, { useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);  
    const [searchTerm, setSearchTerm] = useState("");  
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (pasteId) => {
        dispatch(removeFromPastes(pasteId));
    };

    // Shear (share) the content of a specific paste using Web Share API
    const handleShareClick = async (content, title) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: content,
                });
                toast.success("Content shared successfully!");
            } catch (error) {
                toast.error("Failed to share content.");
            }
        } else {
            toast.error("Sharing not supported on this browser.");
        }
    };

    return (
        <div>
            <input
                className='p-2 rounded-2xl min-w-[600px] mt-5'
                type='search'
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-5 mt-5">
                {filteredData.length > 0 &&
                    filteredData.map((paste) => {
                        return (
                            <div key={paste._id} className="border">
                                <div>
                                    {paste.title}
                                </div>
                                <div>
                                    {paste.content}
                                </div>
                                <div className="flex flax-row gap-4 place-content-evenly">
                                    <button>
                                        <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                    </button>

                                    <button>
                                        <a href={`/pastes/${paste?._id}`}>View</a>
                                    </button>

                                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>

                                    <button onClick={() => {
                                        navigator.clipboard.writeText(paste?.content);
                                        toast.success("Copied to clipboard");
                                    }}>
                                        Copy
                                    </button>

                                    {/* Share button using Web Share API */}
                                    <button onClick={() => handleShareClick(paste.content, paste.title)}>Shear (Share)</button>
                                </div>

                                <div>{paste.createdAt}</div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Paste;
