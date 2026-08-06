import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Image as ImageIcon, X, ChevronLeft } from 'lucide-react';
import { db } from '../../services/db';
import { Album, Media } from '../../types';

export const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [album, setAlbum] = useState<Album | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadAlbumData = async () => {
      if (!albumId) return;
      try {
        const alb = await db.getAlbumById(albumId);
        if (alb) {
          setAlbum(alb);
          const photos = await db.getMediaByAlbum(albumId);
          setMedia(photos);
        }
      } catch (err) {
        console.error('Failed to load album data', err);
      } finally {
        setLoading(false);
      }
    };
    loadAlbumData();
  }, [albumId]);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex(activePhotoIndex === 0 ? media.length - 1 : activePhotoIndex - 1);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex(activePhotoIndex === media.length - 1 ? 0 : activePhotoIndex + 1);
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">{t('common.loading')}</div>;
  }

  if (!album) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Album Not Found</h2>
        <button onClick={() => navigate('/gallery')} className="text-primary hover:underline font-bold">&larr; Back to Gallery</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
        <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/gallery" className="hover:text-primary transition-colors">{t('nav.gallery')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600 truncate max-w-[200px]">
          {localizedText(album.title_en, album.title_bn)}
        </span>
      </nav>

      {/* Album Header */}
      <section className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">
          {localizedText(album.title_en, album.title_bn)}
        </h1>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">
          {localizedText(album.description_en, album.description_bn)}
        </p>
      </section>

      {/* Photo Grid */}
      {media.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/50">
          <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">{t('gallery.noMedia')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((photo, index) => (
            <div 
              key={photo.id} 
              onClick={() => setActivePhotoIndex(index)}
              className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-md border border-slate-200/40"
            >
              <img 
                src={photo.file_url} 
                alt={photo.file_name} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-200" />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div 
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          {/* Close button */}
          <button 
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={handlePrevPhoto}
            className="absolute left-4 p-3 bg-white/10 text-white hover:bg-white/20 rounded-full hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div className="max-w-4xl max-h-[85vh] flex items-center justify-center pointer-events-none">
            <img 
              src={media[activePhotoIndex]?.file_url} 
              alt={media[activePhotoIndex]?.file_name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
            />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNextPhoto}
            className="absolute right-4 p-3 bg-white/10 text-white hover:bg-white/20 rounded-full hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Label Counter */}
          <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-bold font-heading">
            {activePhotoIndex + 1} / {media.length}
          </span>
        </div>
      )}
    </div>
  );
};
export default AlbumDetail;
