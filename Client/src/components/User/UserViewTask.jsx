import React from 'react'
import UserNav from './UserNav'

export default function UserViewTask() {
    return (
        <>
        <UserNav/>
            <div className='text-amber-700 text-2xl p-4 font-bold'>
                MERN : To-Do-List

                <table className='w-full mt-3 text-xl text-amber-600 border border-black bg-gray-300 rounded-lg shadow-md'>
                    <thead className='text-amber-800 '>
                        <tr className='text-left'>
                            <th className='py-2 px-2 border'>#</th>
                            <th className='py-2 px-2 border'>Title</th>
                            <th className='py-2 px-2 border'>Decription</th>
                            <th className='py-2 px-2 border'>Status</th>
                            <th className='py-2 px-2 border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=' border-t border-black hover:bg-amber-900 hover:text-white'>
                            <td className='border-l'>1</td>
                            <td className='border-l'>title1</td>
                            <td className='border-l'>Des1</td>
                            <td className='border-l'>ssss</td>
                            <td className='border-l'><button className='px-3 py-1 bg-amber-700 text-amber-300 hover:bg-amber-400  hover:text-amber-900'>Done</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
