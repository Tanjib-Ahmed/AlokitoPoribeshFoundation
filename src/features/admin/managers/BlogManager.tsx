import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Blog, BlogCategory, BlogStatus } from '../../../types';
import { Button } from '../../../components/Button';
import { Input, Textarea, Select } from '../../../components/Input';
import { Badge } from '../../../components/Badge';
import { Alert } from '../../../components/Alert';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<BlogStatus>('draft');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    try {
      const [blogData, catData] = await Promise.all([
        db.getBlogs(),
        db.getCategories()
      ]);
      setBlogs(blogData);
      setCategories(catData);
      if (catData.length > 0) setCategoryId(catData[0].id);
    } catch (err) {
      console.error('Failed to load blog managers logs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitleEn('');
    setTitleBn('');
    setSlug('');
    setContentEn('');
    setContentBn('');
    setImageUrl('');
    setAuthorName('');
    if (categories.length > 0) setCategoryId(categories[0].id);
    setTagsInput('');
    setStatus('draft');
    setError('');
  };

  const handleOpenEdit = (b: Blog) => {
    setIsEditing(true);
    setEditId(b.id);
    setTitleEn(b.title_en);
    setTitleBn(b.title_bn);
    setSlug(b.slug);
    setContentEn(b.content_en);
    setContentBn(b.content_bn);
    setImageUrl(b.image_url);
    setAuthorName(b.author_name);
    setCategoryId(b.category_id);
    setTagsInput(b.tags ? b.tags.join(', ') : '');
    setStatus(b.status);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!titleEn.trim() || !titleBn.trim() || !slug.trim() || !authorName.trim() || !contentEn.trim() || !contentBn.trim()) {
      setError('Required fields: English Title, Bangla Title, Slug, Author, and Content details.');
      return;
    }

    // Parse comma-separated tags
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');

    const payload = {
      title_en: titleEn,
      title_bn: titleBn,
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      content_en: contentEn,
      content_bn: contentBn,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1526951914846-7a95961d7438?auto=format&fit=crop&w=400&q=80',
      author_name: authorName,
      category_id: categoryId,
      tags: tagsArray,
      status: status,
      published_at: status === 'published' ? new Date().toISOString().split('T')[0] : undefined
    };

    try {
      if (editId) {
        await db.updateBlog(editId, payload);
        await db.logAction('System Admin', 'UPDATE', 'Blogs', editId, `Updated blog article ${titleEn}`);
        setSuccess('Blog updated successfully.');
      } else {
        const newBlog = await db.createBlog(payload);
        await db.logAction('System Admin', 'CREATE', 'Blogs', newBlog.id, `Created blog article ${titleEn}`);
        setSuccess('Blog published/drafted successfully.');
      }
      handleResetForm();
      loadData();
    } catch (err) {
      console.error('Failed to save blog', err);
      setError('Failed to save blog. Ensure slug URL identifier is unique.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete blog "${title}"?`)) return;
    try {
      await db.deleteBlog(id);
      await db.logAction('System Admin', 'DELETE', 'Blogs', id, `Deleted blog ${title}`);
      setSuccess('Blog deleted.');
      loadData();
    } catch (err) {
      console.error('Failed to delete blog', err);
      setError('Failed to delete blog.');
    }
  };

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name_en }));

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          {isEditing ? 'Write / Edit Blog' : 'Published Articles'}
        </h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm" className="font-bold cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Write Article
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Article Title (English)"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Importance of Mangroves"
              required
            />
            <Input
              label="Article Title (Bangla)"
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              placeholder="e.g. ম্যানগ্রোভের গুরুত্ব"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. importance-of-mangroves"
              required
            />
            <Input
              label="Cover Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Unsplash image URL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Writer name"
              required
            />
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={categoryOptions}
            />
            <Select
              label="Publish Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as BlogStatus)}
              options={statusOptions}
            />
          </div>

          <Input
            label="Tags (Comma separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. Eco, Trees, ClimateChange"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Article Content Body (English)"
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              placeholder="Write English text here..."
              rows={6}
              required
            />
            <Textarea
              label="Article Content Body (Bangla)"
              value={contentBn}
              onChange={(e) => setContentBn(e.target.value)}
              placeholder="বাংলা বিষয়বস্তু এখানে লিখুন..."
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
            <Button type="button" onClick={handleResetForm} variant="outline" size="sm" className="font-bold cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
              Save Article
            </Button>
          </div>
        </form>
      ) : loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center py-10 text-xs text-slate-400 font-semibold border border-dashed rounded-xl">No articles created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Article Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Published Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">{b.title_en}</td>
                  <td className="px-4 py-3">{b.author_name}</td>
                  <td className="px-4 py-3">{b.published_at || 'Draft'}</td>
                  <td className="px-4 py-3">
                    <Badge variant={b.status === 'published' ? 'success' : 'neutral'}>
                      {b.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title_en)}
                      className="p-1.5 bg-slate-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default BlogManager;
