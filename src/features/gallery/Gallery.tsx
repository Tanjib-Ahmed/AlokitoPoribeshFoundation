import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Eye } from 'lucide-react';
import { db } from '../../services/db';
import { Album } from '../../types';
import { Button } from '../../components/Button';

export const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await db.getAlbums();
        setAlbums(data);
      } catch (err) {
        console.error('Failed to load gallery albums', err);
      } finally {
        setLoading(false);
      }
    };
    loadAlbums();
  }, []);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('nav.gallery')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('gallery.subtitle')}</p>
      </section>

      {/* Grid listing */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-72 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : albums.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/50">
          <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">No albums found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {albums.map((alb) => (
            <div key={alb.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md hover:border-primary/10 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-200 overflow-hidden relative group">
                  <img 
                    src={alb.cover_image_url} 
                    alt={alb.title_en} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug line-clamp-1">
                    {localizedText(alb.title_en, alb.title_bn)}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {localizedText(alb.description_en, alb.description_bn)}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <Link to={`/gallery/${alb.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full font-bold cursor-pointer">
                    {t('common.viewDetails')}
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
export default Gallery;
