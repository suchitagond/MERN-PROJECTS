import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";

const SideBar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
            console.log(res);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmithandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.FullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        }
        else {
            toast.error("User not found!");
        }
    }
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <form onSubmit={searchSubmithandler} action="" className="flex items-center gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered rounded-md"
                    type="text"
                    placeholder="Search..." />
                <button type="submit" className="btn bg-zinc-400 text-white hover:text-black ">
                    <ImSearch size="20px" />
                </button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
            <div className="mt-2">
                <button onClick={logOutHandler} className="btn btn-sm">Logout</button>
            </div>
        </div>
    )
}

export default SideBar