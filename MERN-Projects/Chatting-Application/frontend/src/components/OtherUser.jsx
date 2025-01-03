import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, /* onlineUsers */} = useSelector(store => store.user);
    // const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        // console.log(user);
        dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-4 items-center hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                {/* <div className={`avatar ${isOnline ? 'online' : ''}`}> */}
                <div className="avtar">
                    <div className="w-12 rounded-full">
                        <img src={user?.ProfilePhoto} alt="user profile" />
                    </div>
                </div>
                <div>
                    <p>{user?.FullName}</p>
                </div>
            </div>
            <div className="divider my-0 h-1"></div>
        </>
    )
}

export default OtherUser