import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CirclePlus, Edit, Search, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/admin/articleSlice';

function ArticlesTable() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.data)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;
    const [filteredArticles, setFilteredArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);
    useEffect(() => {
        setFilteredArticles(articles)
    }, [articles])
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = articles.filter(item => item.name?.toLowerCase().includes(term) || item.category?.toLocaleLowerCase().includes(term));
        setFilteredArticles(filtered);
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Makale Listesi</h2>

                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>

                        <button className='text-indigo-400 hover:text-indigo-300 mr-5'>
                            <Link to='/admin/articleadd'> <CirclePlus size={25} /></Link>

                        </button>
                    </div>

                    <div className='relative'>
                        <input type="text" placeholder='Makale Ara' className='bg-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleSearch} value={searchTerm} />
                        <Search className='absolute left-3 top-3 text-gray-400' size={18} />
                    </div>
                </div>


            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Başlık
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Kategori
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Etiket
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Okunma Sayısı
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Anahtar Kelimeler
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Aktif mi ?
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {currentArticles.map(item => (
                            <motion.tr key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                                    {item.title}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {item.categoryNames + " "}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {item.tag.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    asd
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {item.keyword}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {!item.isDeleted ? "Aktif" : "Aktif Değil"}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => navigate(`/admin/articleupdate/${item.id}`)}>
                                        <Edit size={18} />
                                    </button>
                                    <button className='text-red-400 hover:text-red-300 mr-2'><Trash2 size={18} /></button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className='flex justify-end mt-4'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ArticlesTable;
