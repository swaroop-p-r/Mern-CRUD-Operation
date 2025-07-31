import React, { useEffect } from 'react'
import UserNav from './UserNav'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function UserEditTask() {

    const { id } = useParams();
    // console.log(taskid);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    const navigate = useNavigate();

    const fetchTask = async () => {
        const res = await axios.get(`http://localhost:5000/api/user/taskbyid/${id}`)
        setFormData(res.data);
        // console.log(res.data);
    }

    useEffect(() => {
        fetchTask();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/user/edittask/${id}`,
                formData,
            )
            if (res.status === 200) {
                toast.success(res.data.msg);
                setTimeout(() => {
                    navigate('/viewtask');
                }, 1500);
            }
        } catch (error) {
            console.error('Task Updation Error', error);
            alert(error.reponse?.data?.msg || 'Task Updation Error');
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-100 to-whit'>
            <UserNav />
            <ToastContainer />
            <div className='p-10 flex items-center justify-center'>
                <div className='max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl'>
                    <h1 className='text-4xl text-left pb-3 font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-500 to-blue-50'>Edit Task</h1>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <label className='block text-xl font-semibold'>Task Title</label>
                            <input type="text" className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                                name='title'
                                value={formData.title}
                                required
                                onChange={handleChange}
                                placeholder='Enter Task Title'
                            />

                            <label className='block text-xl font-semibold'>Task Decription</label>
                            <input type="text" className='mb-4 border w-full rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white'
                                name='description'
                                value={formData.description}
                                placeholder='Enter Task Decription'
                                onChange={handleChange}
                                required />

                            <button type="submit"
                                className='border rounded-sm py-2 px-2 bg-gradient-to-br from-slate-400 to-blue-50 text-black hover:bg-gradient-to-tl transition duration-500'
                            >
                                Edit Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
