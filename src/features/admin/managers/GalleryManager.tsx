import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Album, Media } from '../../../types';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

export const GalleryManager: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states - Albums
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [albumTitleEn, setAlbumTitleEn] = useState('');
  const [albumTitleBn, setAlbumTitleBn] = useState('');
  const [albumDescEn, setAlbumDescEn] = useState('');
  const [albumDescBn, setAlbumDescBn] = useState('');
  const [albumCoverUrl, setAlbumCoverUrl] = useState('');

  // Form states - Photos
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoName, setPhotoName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadAlbums = async () => {
    try {
      const data = await db.getAlbums();
      setAlbums(data);
    } catch (err) {
      console.error('Failed to load gallery albums in manager', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const handleSelectAlbum = async (alb: Album) => {
    setSelectedAlbum(alb);
    setLoading(true);
    try {
      const mediaList = await db.getMediaByAlbum(alb.id);
      setPhotos(mediaList);
    } catch (err) {
      console.error('Failed to load photos for album', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!albumTitleEn.trim() || !albumTitleBn.trim()) {
      setError('Album title is required.');
      return;
    }

    try {
      const newAlb = await db.createAlbum({
        title_en: albumTitleEn,
        title_bn: albumTitleBn,
        description_en: albumDescEn,
        description_bn: albumDescBn,
        cover_image_url: albumCoverUrl || 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=400&q=80'
      });
      
      await db.logAction('System Admin', 'CREATE', 'Albums', newAlb.id, `Created gallery album ${albumTitleEn}`);
      setSuccess('Album created.');
      
      // Reset
      setIsCreatingAlbum(false);
      setAlbumTitleEn('');
      setAlbumTitleBn('');
      setAlbumDescEn('');
      setAlbumDescBn('');
      setAlbumCoverUrl('');
      loadAlbums();
    } catch (err) {
      console.error('Failed to create album', err);
      setError('Failed to create album.');
    }
  };

  const handleDeleteAlbum = async (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete album "${title}" and all its photos?`)) return;
    try {
      await db.deleteAlbum(id);
      await db.logAction('System Admin', 'DELETE', 'Albums', id, `Deleted gallery album ${title}`);
      setSuccess('Album deleted.');
      loadAlbums();
    } catch (err) {
      console.error('Failed to delete album', err);
      setError('Failed to delete album.');
    }
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;
    setError('');
    setSuccess('');

    if (!photoUrl.trim() || !photoName.trim()) {
      setError('Photo URL and file name are required.');
      return;
    }

    try {
      const newMedia = await db.uploadMedia({
        album_id: selectedAlbum.id,
        file_url: photoUrl,
        file_name: photoName,
        file_size: 100000, // mock size
        mime_type: 'image/jpeg'
      });

      await db.logAction('System Admin', 'UPLOAD', 'Media', newMedia.id, `Uploaded photo ${photoName} to album ${selectedAlbum.title_en}`);
      setSuccess('Photo uploaded successfully.');
      
      // Reset
      setPhotoUrl('');
      setPhotoName('');
      
      // Reload photos
      const mediaList = await db.getMediaByAlbum(selectedAlbum.id);
      setPhotos(mediaList);
    } catch (err) {
      console.error('Failed to upload photo', err);
      setError('Failed to upload photo.');
    }
  };

  const handleDeletePhoto = async (id: string, name: string) => {
    if (!selectedAlbum || !window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await db.deleteMedia(id);
      await db.logAction('System Admin', 'DELETE', 'Media', id, `Deleted photo ${name} from album ${selectedAlbum.title_en}`);
      setSuccess('Photo deleted.');
      
      // Reload photos
      const mediaList = await db.getMediaByAlbum(selectedAlbum.id);
      setPhotos(mediaList);
    } catch (err) {
      console.error('Failed to delete photo', err);
      setError('Failed to delete photo.');
    }
  };

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      {/* Selected Album Subpanel View */}
      {selectedAlbum ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <button 
              onClick={() => setSelectedAlbum(null)}
              className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Manage Photos &rarr; {selectedAlbum.title_en}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upload Photo Form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleAddPhotoSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-4">
                <h4 className="text-sm font-bold text-slate-800 font-heading">Add Photo to Album</h4>
                
                <Input
                  label="Photo URL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Paste Unsplash / image link..."
                  required
                />
                <Input
                  label="File Name"
                  value={photoName}
                  onChange={(e) => setPhotoName(e.target.value)}
                  placeholder="e.g. planting_group.jpg"
                  required
                />

                <Button type="submit" variant="primary" size="sm" className="w-full font-bold cursor-pointer">
                  Upload Photo
                </Button>
              </form>
            </div>

            {/* Photos Grid */}
            <div className="lg:col-span-2">
              {loading ? (
                <p className="text-center py-6 text-xs font-semibold text-slate-500">Loading photos...</p>
              ) : photos.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-2xl text-slate-400 font-semibold text-xs">
                  No photos uploaded in this album yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200/50 shadow-xs">
                      <img src={photo.file_url} alt={photo.file_name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.file_name)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Albums Grid View */
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              {isCreatingAlbum ? 'Create New Album' : 'Photo Albums'}
            </h3>
            {!isCreatingAlbum && (
              <Button onClick={() => setIsCreatingAlbum(true)} size="sm" className="font-bold cursor-pointer">
                <Plus className="h-4 w-4 mr-1.5" />
                Create Album
              </Button>
            )}
          </div>

          {isCreatingAlbum ? (
            <form onSubmit={handleCreateAlbumSubmit} className="space-y-4 max-w-xl bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Album Title (English)"
                  value={albumTitleEn}
                  onChange={(e) => setAlbumTitleEn(e.target.value)}
                  placeholder="e.g. Cox's Bazar Drive"
                  required
                />
                <Input
                  label="Album Title (Bangla)"
                  value={albumTitleBn}
                  onChange={(e) => setAlbumTitleBn(e.target.value)}
                  placeholder="e.g. কক্সবাজার অভিযান"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Description (English)"
                  value={albumDescEn}
                  onChange={(e) => setAlbumDescEn(e.target.value)}
                  placeholder="English summary..."
                />
                <Input
                  label="Description (Bangla)"
                  value={albumDescBn}
                  onChange={(e) => setAlbumDescBn(e.target.value)}
                  placeholder="বাংলা বিবরণ..."
                />
              </div>

              <Input
                label="Cover Image URL"
                value={albumCoverUrl}
                onChange={(e) => setAlbumCoverUrl(e.target.value)}
                placeholder="Unsplash / external cover link"
              />

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <Button type="button" onClick={() => setIsCreatingAlbum(false)} variant="outline" size="sm" className="font-bold cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
                  Create Album
                </Button>
              </div>
            </form>
          ) : loading ? (
            <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading albums...</p>
          ) : albums.length === 0 ? (
            <p className="text-center py-10 text-xs text-slate-400 font-semibold border border-dashed rounded-xl">No albums created yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {albums.map((alb) => (
                <div 
                  key={alb.id} 
                  onClick={() => handleSelectAlbum(alb)}
                  className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md cursor-pointer transition-shadow duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-slate-200 overflow-hidden relative">
                      <img src={alb.cover_image_url} alt={alb.title_en} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-xs text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleDeleteAlbum(alb.id, alb.title_en, e)}
                          className="hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Album"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-slate-900 font-heading line-clamp-1">{alb.title_en} / {alb.title_bn}</h4>
                      <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{alb.description_en}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-[10px] font-bold text-primary tracking-wide uppercase">
                    Click to manage photos &rarr;
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default GalleryManager;
