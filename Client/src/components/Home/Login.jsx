import React, { useState } from 'react'
import axios from 'axios'
import HomeNav from './HomeNav'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        // const {name, value} = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/user/login",
                formData
            )
            if (res.status === 200) {
                toast.success(res.data.msg);
                localStorage.setItem('userid',res.data.userid);
                setTimeout(() => {
                    navigate('/userhome');
                }, 1000);
            }
        } catch (error) {
            alert(error.response?.data?.msg || "Login Failed");
            console.error("Login Failed:", error);
        }
    }

    return (
        <>
            <HomeNav />
            <ToastContainer className={'mt-17'} />
            <div className="p-4 max-w-sm mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <label htmlFor="Email" className="block mb-1">Email</label>
                <input
                    type="text"
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-3"
                />


                <label htmlFor="Password" className="block mb-1">Password</label>
                <input
                    type="text"
                    id="Password"
                    name="password"
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-3"
                />

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </>
    )
}


