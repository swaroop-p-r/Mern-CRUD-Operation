import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'

export default function UserViewTask() {
    const [formData, setFormData] = useState([]);

    const userid = localStorage.getItem('userid');
    // console.log(userid);

    const fetchTask = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/viewtask',
                {
                    headers: {
                        userid: userid,
                    }
                }
            )
            setFormData(res.data);
            // console.log(res.data);
        } catch (error) {
            alert(error.response?.data?.msg || 'Task View Failed')
            console.error('View Task Failed:', error)
        }
    }

    useEffect(() => {
        fetchTask();
    }, []);

    const handleStatus = async (id) => {
        // alert(id);
        try {
            const res = await axios.patch(`http://localhost:5000/api/user/statustask/${id}`,
                {},
            )
            if (res.status === 200) {
                toast.success(res.data.msg);
                fetchTask();
            }
        } catch (error) {
            console.error('Task Status Error:', error);
            alert(error.response?.data?.msg || 'Task Status Error');
        }
    }

    const handleDelete = async () => {
        alert('deleted');
    }

    const handleEdit = async () => {
        alert('updated');
    }

    return (
        <div className='min-h-screen w-full bg-amber-50'>
            <UserNav />
            <ToastContainer />
            <div className='p-4'>
                <h1 className='text-2xl md:text-3xl font-bold text-amber-700 mb-4'>
                    MERN : To-Do-List
                </h1>

                <div className='overflow-x-auto rounded-lg'>
                    <table className='w-full text-sm md:text-base text-amber-600 border border-black bg-gray-300 shadow-md'>
                        <thead className='text-amber-800 bg-gray-200'>
                            <tr className='text-left'>
                                <th className='py-2 px-2 border'>#</th>
                                <th className='py-2 px-2 border'>Title</th>
                                <th className='py-2 px-2 border'>Description</th>
                                <th className='py-2 px-2 border'>Status</th>
                                <th className='py-2 px-2 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData && formData.length > 0 ? (
                                formData.map((item, index) =>
                                    <tr key={item._id} className='transition duration-600 border-t border-black hover:bg-amber-700 hover:text-white'>
                                        <td className='border-l  py-1 px-2'>{index + 1}</td>
                                        <td className='border-l  py-1 px-2 text-lg'>{item.title}</td>
                                        <td className='border-l py-1 px-2 text-lg'>{item.description}</td>
                                        <td className='border-l py-1 px-2 text-sm'>{item.status ? 'Completed' : 'Incomplete'}</td>
                                        <td className='border-l py-1 px-2'>
                                            <div className='flex flex-wrap gap-0.5'>
                                                <button
                                                    onClick={() => handleStatus(item._id)}
                                                    className='text-sm transition duration-700 px-3 py-1 rounded-sm bg-amber-600 hover:bg-amber-500 text-white
'
                                                >
                                                    {item.status ? 'Marks as Done' : 'Marks as Not Done'}
                                                </button>
                                                <button
                                                    onClick={handleEdit}
                                                    className='text-sm transition duration-700 px-3 py-1 rounded-sm bg-amber-600 hover:bg-amber-500 text-white'
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    className='text-sm transition duration-700 px-3 py-1 rounded-sm bg-amber-600 hover:bg-amber-500 text-white'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan='5'
                                        className='text-center mx-auto text-lg text-red-600'
                                    >
                                        No Task Added
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
