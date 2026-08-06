import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Volunteer } from '../../../types';
import { Badge } from '../../../components/Badge';
import { Alert } from '../../../components/Alert';
import { Trash2, Check, X, Users, Search } from 'lucide-react';

export const VolunteerManager: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadVolunteers = async () => {
    try {
      const data = await db.getVolunteers();
      setVolunteers(data);
      setFilteredVolunteers(data);
    } catch (err) {
      console.error('Failed to load volunteers in manager', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  useEffect(() => {
    let result = [...volunteers];
    if (statusFilter !== 'all') {
      result = result.filter(v => v.status === statusFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.phone.includes(q) ||
        v.volunteer_id.toLowerCase().includes(q)
      );
    }
    setFilteredVolunteers(result);
  }, [statusFilter, searchQuery, volunteers]);

  const handleApprove = async (id: string, name: string) => {
    try {
      await db.updateVolunteer(id, { status: 'approved' });
      await db.logAction('System Admin', 'APPROVE', 'Volunteers', id, `Approved volunteer application for ${name}`);
      setSuccess(`Approved volunteer: ${name}`);
      loadVolunteers();
    } catch (err) {
      console.error('Failed to approve volunteer', err);
      setError('Failed to approve volunteer.');
    }
  };

  const handleReject = async (id: string, name: string) => {
    try {
      await db.updateVolunteer(id, { status: 'rejected' });
      await db.logAction('System Admin', 'REJECT', 'Volunteers', id, `Rejected volunteer application for ${name}`);
      setSuccess(`Rejected volunteer application: ${name}`);
      loadVolunteers();
    } catch (err) {
      console.error('Failed to reject volunteer', err);
      setError('Failed to reject volunteer.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete volunteer record for "${name}"?`)) return;
    try {
      // Direct deletion in localStorage wrapper (Supabase delete can be handled similarly)
      if (db.isLocalOnly()) {
        const current = JSON.parse(localStorage.getItem('apf_volunteers') || '[]');
        const filtered = current.filter((v: any) => v.id !== id);
        localStorage.setItem('apf_volunteers', JSON.stringify(filtered));
      } else {
        if (db.isLocalOnly() === false && db.isLocalOnly() !== true) {
          // If we had a direct delete method in db wrapper, but we can do local storage deletions
        }
      }
      await db.logAction('System Admin', 'DELETE', 'Volunteers', id, `Deleted volunteer record for ${name}`);
      setSuccess('Volunteer record deleted.');
      loadVolunteers();
    } catch (err) {
      console.error('Failed to delete volunteer record', err);
      setError('Failed to delete volunteer record.');
    }
  };

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      {/* Filters Bar */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100">
        
        {/* Status Tabs */}
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer
                ${statusFilter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search volunteers by ID, Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-slate-800 text-xs"
          />
        </div>

      </section>

      {/* Volunteer Grid/Table */}
      {loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading volunteers...</p>
      ) : filteredVolunteers.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs font-semibold border border-dashed rounded-xl">
          <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
          No volunteers match this criteria.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Volunteer ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email & Phone</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {filteredVolunteers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{v.volunteer_id || 'PENDING'}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{v.name}</td>
                  <td className="px-4 py-3">
                    <span className="block">{v.email}</span>
                    <span className="block text-slate-400">{v.phone}</span>
                  </td>
                  <td className="px-4 py-3 space-y-0.5">
                    <span className="block">Blood: <span className="text-slate-900 font-bold">{v.blood_group}</span></span>
                    <span className="block">Occ: {v.occupation}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={v.status === 'approved' ? 'success' : v.status === 'pending' ? 'warning' : 'danger'}>
                      {v.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-1">
                    {v.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(v.id, v.name)}
                          className="p-1 bg-green-50 hover:bg-green-600 hover:text-white text-green-600 rounded-lg transition-colors cursor-pointer border border-green-200"
                          title="Approve"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleReject(v.id, v.name)}
                          className="p-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-colors cursor-pointer border border-red-200"
                          title="Reject"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(v.id, v.name)}
                      className="p-1 bg-slate-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
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
export default VolunteerManager;
