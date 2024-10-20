import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';

function ArticleAddForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const [isDeleted, setİsDeleted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Kategorileri almak için useEffect
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://alikayablog.com.tr/api/Category/GetAllCategories'); // Kategorileri çeken API
                setCategories(response.data); // Kategorileri state'e atıyoruz

            } catch (error) {
                console.error("Kategoriler alınırken bir hata oluştu:", error);
            }
        };

        fetchCategories();

    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('https://alikayablog.com.tr/api/Tag/GetAllTags'); // Kategorileri çeken
                console.log(response.data)
                setTags(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTags()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const articleData = {
                title,
                content,
                tagId: parseInt(tag), // Eğer tagId sayısal bir değer bekliyorsa, parseInt ile sayıya dönüştürülmesi gerekebilir.
                keyword,
                description, // Açıklama için içerik kullanılabilir veya başka bir state ekleyebilirsiniz.
                categoryIds: category.split(',').map(id => parseInt(id.trim())) // Kategoriler, virgülle ayrılmış bir string olarak girişi kabul edebilir.
            };
            console.log(articleData)
            let response = await axios.post("https://alikayablog.com.tr/api/Article/CreateArticle", articleData);
            console.log("Article created:", response.data);

            // Clear the form (optional)
            setTitle('');
            setCategory('');
            setTag('');
            setKeyword('');
            setContent('');
            setİsDeleted(false); // Reset checkbox
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-6'>Yeni Makale Ekle</h2>
            <form onSubmit={handleSubmit}>
                {/* Başlık */}
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>Başlık</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder="Makale başlığı girin"
                    />
                </div>

                {/* Kategori */}
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>Kategori</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Kategori Seçin</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option> // Kategorileri burada gösteriyoruz
                        ))}
                    </select>
                </div>

                {/* Etiket */}
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>Etiket</label>
                    <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Kategori Seçin</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option> // Kategorileri burada gösteriyoruz
                        ))}
                    </select>
                </div>

                {/* Anahtar Kelimeler */}
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>Anahtar Kelimeler</label>
                    <input
                        type="text"
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder="Anahtar kelimeleri girin"
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>Açıklama</label>
                    <input
                        type="text"
                        name="keyword"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder="Açıklama giriniz."
                    />
                </div>

                {/* İçerik */}
                <div className='mb-4'>
                    <label className='block text-gray-400 mb-2'>İçerik</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder="Makale içeriğini girin"
                    />
                </div>

                {/* Aktif mi */}
                <div className='mb-6 flex items-center'>
                    <input
                        type="checkbox"
                        name="isActive"
                        value={isDeleted}
                        onChange={(e) => setİsDeleted(e.target.checked)}
                        className='mr-2 h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500'
                    />
                    <label className='text-gray-400'>Aktif mi?</label>
                </div>

                {/* Submit Button */}
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Makale Ekle
                </button>
            </form>
        </motion.div>
    )
}

export default ArticleAddForm