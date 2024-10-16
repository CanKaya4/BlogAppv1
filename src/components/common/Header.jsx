import React from 'react'

function Header({ title }) {
    return (
        <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b boder-gray-700'>
            <div className='max-w-7xl mx-auto py-4 sm:px-6 lg:px-8'>
                <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>

            </div>
        </header>
    )
}

export default Header