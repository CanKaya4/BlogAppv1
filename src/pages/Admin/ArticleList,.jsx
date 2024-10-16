import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Header from '../../components/common/Header'
import { motion } from 'framer-motion'
import { AlertTriangle, BarChart2, CircleArrowOutDownLeft, Construction, Newspaper, TrendingUp, Zap } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import ArticlesTable from '../../components/articles/ArticlesTable'
import CategoryDistributionChart from '../../components/overview/CategoryDistributionChart'
import ArticlesChannelChart from '../../components/overview/ArticlesChannelChart'
import ArticlesOverviewCharts from '../../components/overview/ArticlesOverviewCharts'
import axios from 'axios'
function ArticleList() {
    const [totalReads, setTotalReads] = useState(0);
    const [totalCountArticle, setTotalCountArticle] = useState(0);
    useEffect(() => {
        const fetchTotalReads = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/Article/GetTotalReadCount");
                setTotalReads(response.data); // response.data kullanarak veriyi ayarlayın

                const totalCount = await axios.get("http://localhost:5000/api/Article/GetTotalArticleCount");
                setTotalCountArticle(totalCount.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTotalReads();
    }, []);
    console.log(totalReads)
    return (
        <AdminLayout>
            <div className='flex-1 overflow-auto relative z-10'>
                <Header title='Makeleler' />

                <main className='max-w-7xl mx-auto py-6 px-5 lg:px-8 '>
                    {/* STATS */}
                    <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <StatCard name="Toplam Makale" icon={Zap} value={totalCountArticle} color='#6366F1' />

                        <StatCard name="En Çok Okunan" icon={TrendingUp} value='12' color='#88CF6' />

                        <StatCard name="Toplam Okunma" icon={CircleArrowOutDownLeft} value={totalReads} color='#EC4899' />

                        <StatCard name="Yeni Makale" icon={Newspaper} value='123' color='#10B981' />
                    </motion.div>
                    <ArticlesTable />

                    {/* Charts */}
                    <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                        <ArticlesOverviewCharts />
                        <CategoryDistributionChart />
                    </div>
                </main>
            </div>
        </AdminLayout>
    )
}

export default ArticleList