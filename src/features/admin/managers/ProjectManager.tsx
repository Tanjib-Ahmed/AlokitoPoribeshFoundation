import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Project, ProjectStatus } from '../../../types';
import { Button } from '../../../components/Button';
import { Input, Textarea, Select } from '../../../components/Input';
import { Badge } from '../../../components/Badge';
import { Alert } from '../../../components/Alert';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('planning');
  const [goal, setGoal] = useState('');
  const [raised, setRaised] = useState('');
  const [startDate, setStartDate] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadProjects = async () => {
    try {
      const data = await db.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects in manager', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleResetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitleEn('');
    setTitleBn('');
    setSlug('');
    setDescEn('');
    setDescBn('');
    setContentEn('');
    setContentBn('');
    setImageUrl('');
    setStatus('planning');
    setGoal('');
    setRaised('');
    setStartDate('');
    setError('');
  };

  const handleOpenEdit = (p: Project) => {
    setIsEditing(true);
    setEditId(p.id);
    setTitleEn(p.title_en);
    setTitleBn(p.title_bn);
    setSlug(p.slug);
    setDescEn(p.description_en);
    setDescBn(p.description_bn);
    setContentEn(p.content_en);
    setContentBn(p.content_bn);
    setImageUrl(p.image_url);
    setStatus(p.status);
    setGoal(p.goal_amount ? String(p.goal_amount) : '');
    setRaised(p.raised_amount ? String(p.raised_amount) : '');
    setStartDate(p.start_date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!titleEn.trim() || !titleBn.trim() || !slug.trim() || !startDate) {
      setError('Required: English Title, Bangla Title, Slug, and Start Date.');
      return;
    }

    const payload = {
      title_en: titleEn,
      title_bn: titleBn,
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      description_en: descEn,
      description_bn: descBn,
      content_en: contentEn,
      content_bn: contentBn,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=400&q=80',
      status: status,
      goal_amount: goal ? Number(goal) : undefined,
      raised_amount: raised ? Number(raised) : 0,
      start_date: startDate
    };

    try {
      if (editId) {
        await db.updateProject(editId, payload);
        await db.logAction('System Admin', 'UPDATE', 'Projects', editId, `Updated project ${titleEn}`);
        setSuccess('Project updated successfully.');
      } else {
        const newProj = await db.createProject(payload);
        await db.logAction('System Admin', 'CREATE', 'Projects', newProj.id, `Created project ${titleEn}`);
        setSuccess('Project created successfully.');
      }
      handleResetForm();
      loadProjects();
    } catch (err) {
      console.error('Failed to save project', err);
      setError('Failed to save project. Ensure slug is unique.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await db.deleteProject(id);
      await db.logAction('System Admin', 'DELETE', 'Projects', id, `Deleted project ${title}`);
      setSuccess('Project deleted.');
      loadProjects();
    } catch (err) {
      console.error('Failed to delete project', err);
      setError('Failed to delete project.');
    }
  };

  const statusOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          {isEditing ? 'Edit Project' : 'Projects List'}
        </h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm" className="font-bold cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Project
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Title (English)"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Save the Mangroves"
              required
            />
            <Input
              label="Title (Bangla)"
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              placeholder="e.g. ম্যানগ্রোভ বাঁচাও"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Slug (URL identifier)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. save-the-mangroves"
              required
            />
            <Input
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Unsplash / external image URL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              options={statusOptions}
            />
            <Input
              label="Goal Amount (৳ - BDT)"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. 100000"
            />
            <Input
              label="Raised Amount (৳ - BDT)"
              type="number"
              value={raised}
              onChange={(e) => setRaised(e.target.value)}
              placeholder="e.g. 25000"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Short Description (English)"
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Brief summary card description..."
              rows={2}
            />
            <Textarea
              label="Short Description (Bangla)"
              value={descBn}
              onChange={(e) => setDescBn(e.target.value)}
              placeholder="সংক্ষিপ্ত বিবরণ কার্ডের জন্য..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Full Description Content (English)"
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              placeholder="Detailed project content body..."
              rows={4}
            />
            <Textarea
              label="Full Description Content (Bangla)"
              value={contentBn}
              onChange={(e) => setContentBn(e.target.value)}
              placeholder="বিস্তারিত বিবরণ বডি..."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
            <Button type="button" onClick={handleResetForm} variant="outline" size="sm" className="font-bold cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
              Save Project
            </Button>
          </div>
        </form>
      ) : loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-center py-10 text-xs text-slate-400 font-semibold border border-dashed rounded-xl">No projects created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Goal / Raised</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">{p.title_en} / {p.title_bn}</td>
                  <td className="px-4 py-3 font-mono">{p.slug}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.status === 'active' ? 'success' : p.status === 'planning' ? 'info' : 'neutral'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    ৳{p.raised_amount || 0} / ৳{p.goal_amount || 'N/A'}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title_en)}
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
export default ProjectManager;
