import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ArticleUpdateForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({
        id: 1, // ID'yi ekle
        title: '',
        categoryIds: [],
        tagId: 0,
        keyword: '',
        content: '',
        description: '',

    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`https://alikayablog.com.tr/api/Article/GetByIdArticle/${id}`);

                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching the article:', error);
            }
        };

        const fetchCategoriesAndTags = async () => {
            try {
                const [categoriesResponse, tagsResponse] = await Promise.all([
                    axios.get('https://alikayablog.com.tr/api/Category/GetAllCategories'),
                    axios.get('https://alikayablog.com.tr/api/Tag/GetAllTags')
                ]);
                setCategories(categoriesResponse.data);
                setTags(tagsResponse.data);
            } catch (error) {
                console.error('Error fetching categories or tags:', error);
            }
        };

        fetchArticle();
        fetchCategoriesAndTags();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'categoryIds') {
            const selectedOptions = value.split(',').map(Number); // Virgüllerle ayrılmış stringi diziye çevir
            setArticle(prev => ({
                ...prev,
                categoryIds: selectedOptions // Sayılar dizisini article.categoryIds'e ata
            }));
        } else {
            setArticle(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedArticle = {
                ...article,
                id: Number(id),
                categoryIds: article.categoryIds.map(Number), // categoryIds'i sayılar dizisine çevir
                tagId: Number(article.tagId) // Etiket ID'sini sayıya çevir
            };

            await axios.post(`https://alikayablog.com.tr/api/Article/UpdateArticle`, updatedArticle);
            alert('Makale güncellendi!');
            navigate('/admin/articles');
        } catch (error) {
            console.error('Error updating the article:', error);
            alert('Güncelleme sırasında bir hata oluştu.');
        }
    };

    console.log(article)
    return (
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Makale Güncelle</h2>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Makale başlığı girin"
                    />
                </div>

                {/* Category IDs */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Kategori ID'leri</label>
                    <input
                        type="text"
                        name="categoryIds"
                        value={article.categoryIds}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Kategori ID'lerini virgülle ayırarak girin (örneğin: 1,2,3)"
                    />
                </div>

                {/* Tag ID */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Etiket ID</label>
                    <input
                        type="text"
                        name="tagId"
                        value={article.tagId}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Etiket ID'sini girin (örneğin: 2)"
                    />
                </div>

                {/* Keyword */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Anahtar Kelimeler</label>
                    <input
                        type="text"
                        name="keyword"
                        value={article.keyword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Anahtar kelimeleri girin"
                    />
                </div>

                {/* description */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Açıklama</label>
                    <input
                        type="text"
                        name="description"
                        value={article.description}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Anahtar kelimeleri girin"
                    />
                </div>

                {/* Content */}
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">İçerik</label>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Makale içeriğini girin"
                    />
                </div>

                {/* Active
                <div className="mb-6 flex items-center">
                    <input
                        type="checkbox"
                        name="isDeleted"
                        checked={article.isDeleted}
                        onChange={(e) => setArticle((prev) => ({ ...prev, isDeleted: e.target.checked }))}
                        className="mr-2 h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-400">Aktif mi?</label>
                </div> */}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Makale Güncelle
                </button>
            </form>
        </div>
    );
}

export default ArticleUpdateForm;
