import React, { useState } from 'react'
import UserNav from './UserNav'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function UserAddTask() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: false,
    });

    const userid = localStorage.getItem('userid');
    // console.log(`${userid}`)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/user/addtask',
                formData,
                {
                    headers: {
                        userid: userid,
                    }
                })
            if (res.status === 200) {
                toast.success(res.data.msg || 'Task Added')
            }
        } catch (error) {
            alert(error.response?.data?.msg || 'Task Failed to Add');
            console.error('Task Add Failed:', error);
        }
    }
    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-blue-100 to-white'>
                <UserNav />
                <ToastContainer className='mt-13' />
                <div className='p-10 flex items-center justify-center'>
                <div className='max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl'>
                    <h1 className='text-3xl text-left pb-3 font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-blue-50'>Add Task</h1>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <label className='block text-xl font-semibold'>Task Title</label>
                            <input type="text" className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                                name='title'
                                required
                                onChange={handleChange}
                                placeholder='Enter Task Title'
                            />

                            <label className='block text-xl font-semibold'>Task Decription</label>
                            <input type="text" className='mb-4 border w-full rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white'
                                name='description'
                                placeholder='Enter Task Decription'
                                onChange={handleChange}
                                required />

                            <button type="submit"
                                className='border rounded-sm py-2 px-2 bg-gradient-to-br from-slate-400 to-white text-black hover:bg-gradient-to-tl transition duration-500 '
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}
