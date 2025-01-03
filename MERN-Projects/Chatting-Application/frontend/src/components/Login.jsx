import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
    const [user, setUser] = useState({
        UserName: "",
        Password: "",
    });
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(user);
        try {
            // console.log(user);
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            navigate("/");
            // console.log(res.data);
            dispatch(setAuthUser(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setUser({
            UserName: "",
            Password: "",
        })
    }

    return (
        <div className="min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">User Name</span>
                        </label>
                        <input
                            value={user.UserName}
                            onChange={(e) => setUser({ ...user, UserName: e.target.value })}
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter User Name" />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            value={user.Password}
                            onChange={(e) => setUser({ ...user, Password: e.target.value })}
                            className="w-full input input-bordered h-10"
                            type="password"
                            placeholder="Enter Password" />
                    </div>

                    <p className="text-center my-2">
                        Don't have an account?
                        <Link to="/register">Signup</Link>
                    </p>

                    <div>
                        <button type="submit" className="btn btn-block btn-md mt-2 border border-slate-700">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login