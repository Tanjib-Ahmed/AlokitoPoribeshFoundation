import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Event, EventStatus, Project } from '../../../types';
import { Button } from '../../../components/Button';
import { Input, Textarea, Select } from '../../../components/Input';
import { Badge } from '../../../components/Badge';
import { Alert } from '../../../components/Alert';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
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
  const [status, setStatus] = useState<EventStatus>('upcoming');
  const [locationEn, setLocationEn] = useState('');
  const [locationBn, setLocationBn] = useState('');
  const [date, setDate] = useState('');
  const [volunteerLimit, setVolunteerLimit] = useState('');
  const [projectId, setProjectId] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    try {
      const [evData, projData] = await Promise.all([
        db.getEvents(),
        db.getProjects()
      ]);
      setEvents(evData);
      setProjects(projData);
    } catch (err) {
      console.error('Failed to load event manager logs', err);
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
    setDescEn('');
    setDescBn('');
    setContentEn('');
    setContentBn('');
    setImageUrl('');
    setStatus('upcoming');
    setLocationEn('');
    setLocationBn('');
    setDate('');
    setVolunteerLimit('');
    setProjectId('');
    setError('');
  };

  const handleOpenEdit = (e: Event) => {
    setIsEditing(true);
    setEditId(e.id);
    setTitleEn(e.title_en);
    setTitleBn(e.title_bn);
    setSlug(e.slug);
    setDescEn(e.description_en);
    setDescBn(e.description_bn);
    setContentEn(e.content_en);
    setContentBn(e.content_bn);
    setImageUrl(e.image_url);
    setStatus(e.status);
    setLocationEn(e.location_en);
    setLocationBn(e.location_bn);
    
    // Format timestamp back to datetime-local
    const dt = e.date ? e.date.substring(0, 16) : '';
    setDate(dt);
    
    setVolunteerLimit(e.volunteer_limit ? String(e.volunteer_limit) : '');
    setProjectId(e.project_id || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!titleEn.trim() || !titleBn.trim() || !slug.trim() || !date || !locationEn.trim() || !locationBn.trim()) {
      setError('Required fields: English Title, Bangla Title, Slug, Date, and Location details.');
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
      location_en: locationEn,
      location_bn: locationBn,
      date: date,
      volunteer_limit: volunteerLimit ? Number(volunteerLimit) : undefined,
      project_id: projectId || undefined
    };

    try {
      if (editId) {
        await db.updateEvent(editId, payload);
        await db.logAction('System Admin', 'UPDATE', 'Events', editId, `Updated event ${titleEn}`);
        setSuccess('Event updated successfully.');
      } else {
        const newEv = await db.createEvent(payload);
        await db.logAction('System Admin', 'CREATE', 'Events', newEv.id, `Created event ${titleEn}`);
        setSuccess('Event scheduled successfully.');
      }
      handleResetForm();
      loadData();
    } catch (err) {
      console.error('Failed to save event', err);
      setError('Failed to save event. Ensure slug URL identifier is unique.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete event "${title}"?`)) return;
    try {
      await db.deleteEvent(id);
      await db.logAction('System Admin', 'DELETE', 'Events', id, `Deleted event ${title}`);
      setSuccess('Event deleted.');
      loadData();
    } catch (err) {
      console.error('Failed to delete event', err);
      setError('Failed to delete event.');
    }
  };

  const statusOptions = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const projectOptions = [
    { value: '', label: '-- None (Independent) --' },
    ...projects.map(p => ({ value: p.id, label: p.title_en }))
  ];

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          {isEditing ? 'Edit Event' : 'Scheduled Events'}
        </h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm" className="font-bold cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Schedule Event
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
              placeholder="e.g. Kuakata Planting Drive"
              required
            />
            <Input
              label="Title (Bangla)"
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              placeholder="e.g. কুয়াকাটা চারা রোপণ"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. kuakata-planting-drive"
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
              onChange={(e) => setStatus(e.target.value as EventStatus)}
              options={statusOptions}
            />
            <Input
              label="Volunteer Limit"
              type="number"
              value={volunteerLimit}
              onChange={(e) => setVolunteerLimit(e.target.value)}
              placeholder="e.g. 100"
            />
            <Select
              label="Associated Project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              options={projectOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date & Time"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location (English)"
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              placeholder="Cox's Bazar Beach, Chittagong"
              required
            />
            <Input
              label="Location (Bangla)"
              value={locationBn}
              onChange={(e) => setLocationBn(e.target.value)}
              placeholder="কক্সবাজার সমুদ্র সৈকত, চট্টগ্রাম"
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
              placeholder="সংক্ষিপ্ত বিবরণ..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Full Details (English)"
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              placeholder="Detailed schedule and requirements..."
              rows={4}
            />
            <Textarea
              label="Full Details (Bangla)"
              value={contentBn}
              onChange={(e) => setContentBn(e.target.value)}
              placeholder="বিস্তারিত সময়সূচী ও অন্যান্য বিবরণ..."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
            <Button type="button" onClick={handleResetForm} variant="outline" size="sm" className="font-bold cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
              Schedule Event
            </Button>
          </div>
        </form>
      ) : loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center py-10 text-xs text-slate-400 font-semibold border border-dashed rounded-xl">No events scheduled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Event Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">{ev.title_en} / {ev.title_bn}</td>
                  <td className="px-4 py-3 font-mono">{ev.date.split('T')[0]}</td>
                  <td className="px-4 py-3">{ev.location_en}</td>
                  <td className="px-4 py-3">
                    <Badge variant={ev.status === 'completed' ? 'neutral' : ev.status === 'upcoming' ? 'info' : 'success'}>
                      {ev.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(ev)}
                      className="p-1.5 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title_en)}
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
export default EventManager;
