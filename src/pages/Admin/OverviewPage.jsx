import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Header from '../../components/common/Header'
import { motion } from 'framer-motion'
import StatCard from '../../components/common/StatCard'
import { BarChart2, Users, Zap } from 'lucide-react'
import ArticlesOverviewCharts from '../../components/overview/ArticlesOverviewCharts'
import CategoryDistributionChart from '../../components/overview/CategoryDistributionChart'
import ArticlesChannelChart from '../../components/overview/ArticlesChannelChart'

function OverviewPage({ totalReads }) {
    return (
        <AdminLayout>
            <div className='flex-1 overflow-auto relative z-10'>
                <Header title={"Anasayfa"} />
                <main className='max-w-7xl mx-auto py-6 px-5 lg:px-8 '>
                    {/* STATS */}
                    <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <StatCard name="Toplam Makale" icon={Zap} value='25' color='#6366F1' />

                        <StatCard name="Yeni Kullanıcılar" icon={Users} value='12' color='#88CF6' />

                        <StatCard name="Toplam Okunma" icon={BarChart2} value='1244' color='#EC4899' />

                        <StatCard name="Toplam Çeyiz" icon={BarChart2} value='123' color='#10B981' />
                    </motion.div>


                    {/* CHARTS */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <ArticlesOverviewCharts />
                        <CategoryDistributionChart />
                        <ArticlesChannelChart />

                    </div>
                </main>
            </div>
        </AdminLayout>
    )
}

export default OverviewPage