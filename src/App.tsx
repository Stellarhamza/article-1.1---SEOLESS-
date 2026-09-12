import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ArticlesPage } from './pages/ArticlesPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { GameProductPage } from './pages/GameProductPage'
import { ReviewsPage } from './pages/ReviewsPage'
import { SupportPage } from './pages/SupportPage'
import { FaqPage } from './pages/FaqPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/:guideSlug" element={<GameProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
