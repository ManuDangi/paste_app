import React, { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateTOPastes } from "../redux/pasteSlice";

import {  } from "../redux/pasteSlice";

const Home = () => {
    const [title, setTitle] = useState("");  // Initialize to empty string
    const [value, setValue] = useState("");  // Initialize to empty string
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

 const allpastes = useSelector((state) => state.paste.pastes);
   

    useEffect(()=>{
        console.log('inside use effect');
        if(pasteId){
            const paste = allpastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
      
    },[pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || new Date().toISOString(),  // Ensure both _id and createdAt are properly assigned
            createdAt: new Date().toISOString(),
        };


        if (pasteId) {
            dispatch(updateTOPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle("");
        setValue("");
        setSearchParams({});
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input 
                    className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
                    type="text" 
                    placeholder="Enter title here"  // Fixed typo
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button 
                    className="p-2 rounded-2xl mt-2"
                    onClick={createPaste}  // Add onClick to trigger createPaste
                >
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>

            <div className="mt-8">
                <textarea
                    className="rounded-2xl mt-4 min-w-[500px] p-4"
                    value={value}
                    placeholder="Enter content here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default Home;


