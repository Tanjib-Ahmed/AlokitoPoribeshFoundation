import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trees, ArrowRight, Heart, Clock, User } from 'lucide-react';
import { db } from '../../services/db';
import { Project, Blog, Achievement } from '../../types';
import { Button } from '../../components/Button';
import IconHelper from '../../components/IconHelper';

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [achData, projData, blogData] = await Promise.all([
          db.getAchievements(),
          db.getProjects(),
          db.getBlogs()
        ]);
        setAchievements(achData);
        setProjects(projData.filter(p => p.status === 'active').slice(0, 3));
        setBlogs(blogData.filter(b => b.status === 'published').slice(0, 3));
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const localizedText = (en: string, bn: string) => {
    return i18n.language === 'bn' ? bn : en;
  };

  // Stats Counting animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-16 py-4">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 rounded-3xl overflow-hidden text-white py-20 px-8 md:px-16 shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 to-slate-900/90" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-primary-light/20 text-primary-light px-4 py-1.5 rounded-full border border-primary-light/35 text-xs font-bold uppercase tracking-wider"
          >
            <Trees className="h-4 w-4" />
            <span>{i18n.language === 'bn' ? 'আলোকিত পরিবেশ ফাউন্ডেশন' : 'Alokito Poribesh Foundation'}</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight font-heading"
          >
            {t('home.heroTitle')}
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium"
          >
            {t('home.heroSubtitle')}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button 
              onClick={() => navigate('/donate')}
              variant="primary" 
              size="lg"
              className="shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              <Heart className="h-5 w-5 mr-2 fill-white animate-pulse" />
              {t('home.ctaDonate')}
            </Button>
            
            <Button 
              onClick={() => navigate('/join')}
              variant="outline" 
              size="lg"
              className="border-white/50 text-white hover:bg-white/10 hover:border-white hover:scale-[1.02] cursor-pointer"
            >
              {t('home.ctaVolunteer')}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Achievements (Impact Statistics) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold font-heading text-slate-900">{t('home.statsTitle')}</h2>
          <p className="text-sm text-slate-500">{t('home.statsSubtitle')}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/60 text-center flex flex-col items-center hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="bg-primary/5 text-primary p-3 rounded-full mb-3 shrink-0 flex items-center justify-center">
                  <IconHelper name={ach.icon} className="h-6 w-6" />
                </div>
                <span className="block text-3xl font-extrabold text-slate-950 font-heading mb-1">{ach.value}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {localizedText(ach.title_en, ach.title_bn)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 3. Core Focus Pillars */}
      <section className="bg-warm-cream/50 rounded-3xl p-8 md:p-12 border border-primary/5 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold font-heading text-slate-900">{t('home.pillarsTitle')}</h2>
          <p className="text-sm text-slate-500">{t('home.pillarsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shrink-0">
              <Trees className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">{t('home.afforestation')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t('home.afforestationDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <div className="bg-amber-50 text-amber-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shrink-0">
              <Trees className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">{t('home.cleanup')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t('home.cleanupDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <div className="bg-blue-50 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shrink-0">
              <Trees className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">{t('home.awareness')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t('home.awarenessDesc')}</p>
          </div>
        </div>
      </section>

      {/* 4. Featured Campaigns */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('home.featuredProjects')}</h2>
            <p className="text-sm text-slate-500">Active campaigns making real field impacts</p>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" className="font-bold cursor-pointer">
              {t('home.viewAllProjects')}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const progress = proj.goal_amount 
                ? Math.min(100, Math.round(((proj.raised_amount || 0) / proj.goal_amount) * 100))
                : 0;
              return (
                <div key={proj.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col">
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <img 
                      src={proj.image_url} 
                      alt={proj.title_en}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/95 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                        {t(`projects.status.${proj.status}`)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug line-clamp-1">
                        {localizedText(proj.title_en, proj.title_bn)}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {localizedText(proj.description_en, proj.description_bn)}
                      </p>
                    </div>
                    
                    {/* Donation Progress bar */}
                    {proj.goal_amount && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                          <span>{t('projects.raised')}: ৳{proj.raised_amount}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    
                    <Link to={`/projects/${proj.slug}`} className="block">
                      <Button variant="outline" size="sm" className="w-full font-bold cursor-pointer">
                        {t('common.viewDetails')}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Latest Blogs */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('home.latestNews')}</h2>
            <p className="text-sm text-slate-500">Read stories from our field volunteers and campaign updates</p>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="sm" className="font-bold cursor-pointer">
              {t('home.viewAllBlogs')}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col">
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title_en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Meta info */}
                    <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
                      <span className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {blog.author_name}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {blog.published_at || 'Recent'}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug line-clamp-2">
                      {localizedText(blog.title_en, blog.title_bn)}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {localizedText(blog.content_en.substring(0, 150), blog.content_bn.substring(0, 150))}...
                    </p>
                  </div>

                  <Link to={`/blog/${blog.slug}`} className="block">
                    <span className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-light transition-colors cursor-pointer">
                      {t('common.readMore')}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Action Banner */}
      <section className="bg-linear-to-r from-primary to-primary-light text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-lg">
        <h2 className="text-3xl font-extrabold font-heading">{i18n.language === 'bn' ? 'আসুন আমরা আমাদের পরিবেশকে রক্ষা করি' : 'Join the Green Revolution'}</h2>
        <p className="text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
          {i18n.language === 'bn' 
            ? 'আপনার একটি ছোট অবদান বা গাছ রোপণের কয়েকটি ঘন্টা উপকূলীয় অঞ্চলের হাজারো মানুষের রক্ষাকবচ হিসেবে কাজ করতে পারে।' 
            : 'Sponsoring a single tree or volunteering for a cleanup session directly impacts habitats and safeguards communities. Let\'s work together.'
          }
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/donate')}
            variant="secondary"
            size="lg"
            className="hover:scale-105 cursor-pointer shadow-md bg-white text-slate-900 hover:bg-slate-50"
          >
            {t('home.ctaDonate')}
          </Button>
          <Button 
            onClick={() => navigate('/join')}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 hover:scale-105 cursor-pointer"
          >
            {t('home.ctaVolunteer')}
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Home;
