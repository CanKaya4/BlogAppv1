import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import Header from '../../components/common/Header';
import StatCard from '../../components/common/StatCard';
import { CircleCheck, CircleIcon, Newspaper, TrendingUp, Zap } from 'lucide-react';
import ArticleAddForm from '../../components/articles/ArticleAddForm';

function ArticleAdd({ totalReads }) {
    const [articleData, setArticleData] = useState({
        title: '',
        category: '',
        tag: '',
        keyword: '',
        content: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setArticleData({
            ...articleData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Makale Eklendi:', articleData);
        // Burada form verilerini sunucuya gönderebilirsiniz
    };

    return (
        <AdminLayout>
            <div className='flex-1 overflow-auto relative z-10'>
                <Header title='Makale Ekle' />

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
                    <ArticleAddForm />

                    {/* Charts */}
                    <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>

                    </div>
                </main>
            </div>
        </AdminLayout>
    );
}

export default ArticleAdd;
