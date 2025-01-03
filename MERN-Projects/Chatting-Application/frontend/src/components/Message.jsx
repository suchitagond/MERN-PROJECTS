import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    //for left and right message
    const { authUser ,selectedUser} = useSelector(store => store.user);
    //
    //scorring to the end after a new message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    //
    return (
        //start and end message
        <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.ProfilePhoto:selectedUser?.ProfilePhoto} />
                </div>
            </div>
            {/* <div className="chat-header"> */}
                {/* <time className="text-xs opacity-50 text-black">12:45</time> */}
            {/* </div> */}
            <div className={`chat-bubble ${authUser?._id !== message?.senderId ? "chat-end bg-gray-300 text-black" : "chat-start"}`}>{message?.message}</div>
        </div>
    )
}

export default Message