import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeNav() {
    return (
        <div>
            <nav className='bg-gray-800 p-4 flex justify-between items-center'>
                <Link to={'/'} className='text-white text-xl font-semibold hover:bg-amber-500 py-2 px-5 rounded'>Nav Bar</Link>
                <div>
                    <Link
                        to={'/register'}
                        className='text-white hover:bg-amber-400 px-3 py-2 rounded-md text-sm font-medium'
                    >
                        Register
                    </Link>
                    <Link
                        to={'/login'}
                        className='text-white hover:bg-amber-400 px-3 py-2 rounded-md text-sm font-medium'
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </div>
    )
}


