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
            <UserNav />
            <ToastContainer className='mt-13' />
            <h1 className='text-4xl text-center p-3'>Add Task</h1>
            <div className='max-w-md mx-auto p-6 bg-amber-600 shadow-md rounded-md'>
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        <label className='block text-xl font-bold'>Task Title</label>
                        <input type="text" className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                            name='title'
                            required
                            onChange={handleChange}
                            placeholder='Enter Task Title'
                        />

                        <label className='block text-xl font-bold'>Task Decription</label>
                        <input type="text" className='mb-4 border w-full rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white'
                            name='description'
                            placeholder='Enter Task Decription'
                            onChange={handleChange}
                            required />

                        <button type="submit"
                            className='border rounded-sm py-2 px-2 bg-amber-700 text-black hover:bg-amber-700 hover:text-white transition duration-600'
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
