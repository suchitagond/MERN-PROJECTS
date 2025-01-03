import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const [user, setUser] = useState({
        FullName: "",
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        Gender: "",
    });
    const navigate=useNavigate();
    const handleCheckBox = (Gender) => {
        setUser({ ...user, Gender })
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            // console.log(user);
            const res =await axios.post(`http://localhost:8080/api/v1/user/register`,user,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            // console.log(res);
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setUser({
            FullName: "",
            UserName: "",
            Password: "",
            ConfirmPassword: "",
            Gender: "",
        })
    }

    return (
        <div className="min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center">Signup</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            value={user.FullName}
                            onChange={(e) => setUser({ ...user, FullName: e.target.value })}
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter Full Name" />
                    </div>
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
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            value={user.ConfirmPassword}
                            onChange={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}
                            className="w-full input input-bordered h-10"
                            type="password"
                            placeholder="Re-enter Password" />
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex items-center">
                            <p>Male</p>
                            <input
                                type="checkbox"
                                checked={user.Gender === "Male"}
                                onChange={() => handleCheckBox("Male")}
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                        <div className="flex items-center">
                            <p>Female</p>
                            <input
                                type="checkbox"
                                checked={user.Gender === "Female"}
                                onChange={() => handleCheckBox("Female")}
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                    </div>

                    <p className="text-center my-2">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p>

                    <div>
                        <button type="submit" className="btn btn-block btn-md mt-2 border border-slate-700">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup