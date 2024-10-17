import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import OverviewPage from "./pages/Admin/OverviewPage"
import ArticleList from "./pages/Admin/ArticleList,"
import ArticleAdd from "./pages/Admin/ArticleAdd"
import ArticleUpdate from "./pages/Admin/ArticleUpdate"
import Login from "./pages/Login/Login"


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />} />
      <Route path="/admin/overview" element={<OverviewPage />} />
      <Route path="/admin/articles" element={<ArticleList />} />
      <Route path="/admin/articleadd" element={<ArticleAdd />} />
      <Route path="/admin/articleupdate/:id" element={<ArticleUpdate />} />
    </Routes>
  )
}

export default App
