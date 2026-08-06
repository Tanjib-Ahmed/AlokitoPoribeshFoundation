import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, User, Calendar, Tag, BookOpen, Clock } from 'lucide-react';
import { db } from '../../services/db';
import { Blog } from '../../types';
import { Button } from '../../components/Button';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      if (!slug) return;
      try {
        const article = await db.getBlogBySlug(slug);
        if (article) {
          setBlog(article);
          
          // Load other recent blogs
          const all = await db.getBlogs();
          setRecentBlogs(all.filter(b => b.id !== article.id && b.status === 'published').slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load blog article details', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogData();
  }, [slug]);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return i18n.language === 'bn' ? `${minutes} মিনিট পঠন` : `${minutes} min read`;
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">{t('common.loading')}</div>;
  }

  if (!blog) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Article Not Found</h2>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
        <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600 truncate max-w-[200px]">
          {localizedText(blog.title_en, blog.title_bn)}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Article Block */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md">
            <img 
              src={blog.image_url} 
              alt={blog.title_en}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Meta headers */}
          <div className="flex flex-wrap gap-4 items-center text-xs text-slate-400 font-semibold border-b border-slate-100 pb-4">
            <span className="flex items-center text-slate-700 font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
              <User className="h-4 w-4 mr-1.5 text-slate-500" />
              {blog.author_name}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-slate-400" />
              {blog.published_at || 'Recent'}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
              {getReadingTime(localizedText(blog.content_en, blog.content_bn))}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
            {localizedText(blog.title_en, blog.title_bn)}
          </h1>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {localizedText(blog.content_en, blog.content_bn)}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              {blog.tags.map(tag => (
                <span key={tag} className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-200">
                  <Tag className="h-3 w-3 mr-1 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Articles */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Recent Articles
            </h3>
            
            <div className="space-y-4">
              {recentBlogs.length === 0 ? (
                <p className="text-xs text-slate-400">No other articles available.</p>
              ) : (
                recentBlogs.map((b) => (
                  <Link key={b.id} to={`/blog/${b.slug}`} className="flex gap-3 group">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                      <img src={b.image_url} alt={b.title_en} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-950 font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {localizedText(b.title_en, b.title_bn)}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-1">{b.published_at || 'Recent'}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default BlogDetail;
