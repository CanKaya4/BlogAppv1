import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import axios from 'axios';

function AdminLayout({ children }) {
    const [totalReads, setTotalReads] = useState(0);

    useEffect(() => {
        const fetchTotalReads = async () => {
            try {
                const response = await axios.get("https://alikayablog.com.tr/api/Article/GetTotalReadCount");
                setTotalReads(response.data); // response.data kullanarak veriyi ayarlayın
            } catch (error) {
                console.log(error);
            }
        };
        fetchTotalReads();
    }, []);
    return (


        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">

            {/* Bg */}
            <div className='fixed inset-0 z-0' />
            <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
            <div className='absolute inset-0 backdrop-blur-sm' />
            <Sidebar />
            {children}

        </div>
    )
}

export default AdminLayout