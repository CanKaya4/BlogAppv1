import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    selectedArticle: null,
}

export const getArticles = createAsyncThunk("getArticles", async () => {
    const response = await axios.get("https://alikayablog.com.tr/api/Article/GetAllArticles");
    console.log(response.data)
    return response.data
})

export const getArticleById = createAsyncThunk("getArticleById", async (id) => {
    const response = await axios.get(`https://alikayablog.com.tr/Article/GetArticleById/${id}`)
    return response.data;
});

export const updateArticle = createAsyncThunk("updateArticle", async ({ id, articleData }) => {
    const response = await axios.put(`https://alikayablog.com.tr/api/Article/UpdateArticle/${id}`, articleData);
    return response.data;
});

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.selectedArticle = action.payload; // Seçilen makaleyi state'e ekleyin
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                // Güncellenen makalenin verilerini state'teki mevcut verilerle güncelleyin
                const index = state.data.findIndex(article => article.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Güncellenen makaleyi listeye geri ekleyin
                }
            });
    },

})
export default articleSlice.reducer;