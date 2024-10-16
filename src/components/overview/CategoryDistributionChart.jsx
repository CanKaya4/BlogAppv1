import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const categoryData = [
    { name: "C# 6.0", value: 4500 },
    { name: "ASP.NET WEB APİ", value: 2300 },
    { name: "ASP.NET MVC", value: 1400 },
    { name: "SQL", value: 3500 },
    { name: "WPF", value: 2340 },
]
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"]
function CategoryDistributionChart() {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'
            >Kategori Dağılımı</h2>
            <div className='h-80'>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}>
                    <PieChart>
                        <Pie data={categoryData} cx={'50%'} cy={'%50'} labelLine={false} outerRadius={80} fill='#8884d8' label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {categoryData.map((item, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]}></Cell>
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(31,41,55,08)',
                                borderColor: '#4B5563'
                            }}
                            itemStyle={{ color: '#E5E7EB' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default CategoryDistributionChart