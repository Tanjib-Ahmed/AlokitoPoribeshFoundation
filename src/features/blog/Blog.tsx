import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, User, Clock, Search, Tag } from 'lucide-react';
import { db } from '../../services/db';
import { Blog, BlogCategory } from '../../types';
import { Button } from '../../components/Button';

export const BlogList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const [blogData, catData] = await Promise.all([
          db.getBlogs(),
          db.getCategories()
        ]);
        setBlogs(blogData);
        setCategories(catData);
        setFilteredBlogs(blogData);
      } catch (err) {
        console.error('Failed to load blog listings', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogData();
  }, []);

  // Filter application
  useEffect(() => {
    let result = blogs.filter(b => b.status === 'published');

    // Category
    if (activeCategory !== 'all') {
      result = result.filter(b => b.category_id === activeCategory);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title_en.toLowerCase().includes(q) ||
        b.title_bn.includes(q) ||
        b.content_en.toLowerCase().includes(q) ||
        b.content_bn.includes(q)
      );
    }

    setFilteredBlogs(result);
  }, [activeCategory, searchQuery, blogs]);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  // Estimate reading time helper
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return i18n.language === 'bn' ? `${minutes} মিনিট পঠন` : `${minutes} min read`;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('blog.title')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('blog.subtitle')}</p>
      </section>

      {/* Filter panel */}
      <section className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
              ${activeCategory === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            {i18n.language === 'bn' ? 'সব' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${activeCategory === cat.id 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              {localizedText(cat.name_en, cat.name_bn)}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-slate-800"
          />
        </div>

      </section>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/50">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">{t('blog.noBlogs')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md hover:border-primary/10 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title_en} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-4">
                  {/* Meta items */}
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1" />
                      {blog.author_name}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {getReadingTime(localizedText(blog.content_en, blog.content_bn))}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${blog.slug}`}>{localizedText(blog.title_en, blog.title_bn)}</Link>
                  </h3>
                  
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {localizedText(blog.content_en.substring(0, 150), blog.content_bn.substring(0, 150))}...
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="inline-flex items-center text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                        <Tag className="h-2.5 w-2.5 mr-0.5 text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link to={`/blog/${blog.slug}`} className="block">
                  <Button variant="outline" size="sm" className="w-full font-bold cursor-pointer">
                    {t('common.readMore')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BlogList;
