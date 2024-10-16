import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const readingArticles = [
    { month: "Jan", reading: 4200 },
    { month: "Feb", reading: 3800 },
    { month: "Mar", reading: 5100 },
    { month: "Apr", reading: 4600 },
    { month: "May", reading: 5400 },
    { month: "Jun", reading: 750 },
    { month: "Aug", reading: 6100 },
    { month: "Sep", reading: 5900 },
    { month: "Oct", reading: 6300 },
    { month: "Nov", reading: 7560 },
    { month: "De", reading: 2300 },
]

function ArticlesOverviewCharts() {
    return (
        <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Toplam Okunma</h2>

            <div className='h-80'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={readingArticles}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                        <XAxis dataKey={"month"} stroke='#9ca3af' />
                        <YAxis stroke='#9ca3af' />
                        <Tooltip contectStyle={{
                            backgroundColor: "rgba(31,41,55,0.8)",
                            borderColor: "#4B5563"
                        }}
                            itemStyle={{ color: "black" }} />

                        <Line type='monotone'
                            dataKey='reading'
                            stroke='#6366F1' strokeWidth={3}
                            dat={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, strokeWidth: 2 }} />


                    </LineChart>

                </ResponsiveContainer>

            </div>

        </motion.div>
    )
}

export default ArticlesOverviewCharts