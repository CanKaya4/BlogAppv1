import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Header from '../../components/common/Header'
import StatCard from '../../components/common/StatCard'
import { motion } from 'framer-motion'
import { CircleCheck, Newspaper, TrendingUp, Zap } from 'lucide-react'
import ArticleUpdateForm from '../../components/articles/ArticleUpdateForm'

function ArticleUpdate() {
    return (
        <AdminLayout>
            <div className='flex-1 overflow-auto relative z-10'>
                <Header title='Makale Düzenle' />

                <main className='max-w-7xl mx-auto py-6 px-5 lg:px-8 '>
                    {/* STATS */}
                    <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <StatCard name="Toplam Makale" icon={Zap} value='25' color='#6366F1' />

                        <StatCard name="En Çok Okunan" icon={TrendingUp} value='12' color='#88CF6' />

                        <StatCard name="Toplam Okunma" icon={CircleCheck} value='1244' color='#EC4899' />

                        <StatCard name="Yeni Makale" icon={Newspaper} value='123' color='#10B981' />
                    </motion.div>
                    <ArticleUpdateForm />

                    {/* Charts */}
                    <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>

                    </div>
                </main>
            </div>
        </AdminLayout>
    )
}

export default ArticleUpdate