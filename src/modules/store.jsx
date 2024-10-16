import { configureStore } from "@reduxjs/toolkit";
import articleSlice from '../redux/admin/articleSlice'

export const store = configureStore({
    reducer: {
        articles: articleSlice
    }
})