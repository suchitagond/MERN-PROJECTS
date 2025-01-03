import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser } = useSelector(store => store.user);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className="md:min-w-[550px] flex flex-col">
                        <div className="flex gap-4 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={selectedUser?.ProfilePhoto} alt="user profile" />
                                </div>
                            </div>
                            <div>
                                <p>{selectedUser?.FullName}</p>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className="md:min-w-[550px] flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold text-white">Hi,{authUser?.FullName}</h1>
                        <h1 className="text-1xl text-white">Let's start conversation</h1>
                    </div>

                )
            }
        </>
    )
}

export default MessageContainer