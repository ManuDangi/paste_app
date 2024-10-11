import React from "react";
import { useParams } from "react-router-dom"; // Make sure this is imported
import { useSelector } from "react-redux";

const ViewPaste = () => {
    const { id } = useParams(); // Now useParams is properly imported
    const allpastes = useSelector((state) => state.paste.pastes);

    console.log(allpastes);
    // Find the paste with the matching ID
    const paste = allpastes.find((p) => p._id === id);

    // If the paste doesn't exist, return a fallback message
    if (!paste) {
        return <div>Paste not found</div>;
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input 
                    className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
                    type="text" 
                    placeholder="Enter title here"
                    value={paste.title}
                    disabled
                />
            </div>

            <div className="mt-8">
                <textarea
                    className="rounded-2xl mt-4 min-w-[500px] p-4"
                    value={paste.content}
                    placeholder="Enter content here"
                    disabled
                    rows={20}
                />
            </div>
        </div>
    );
};

export default ViewPaste;

