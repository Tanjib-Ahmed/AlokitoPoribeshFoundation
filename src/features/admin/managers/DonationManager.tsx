import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Donation } from '../../../types';
import { Badge } from '../../../components/Badge';
import { Alert } from '../../../components/Alert';
import { Check, X, Heart, Search } from 'lucide-react';

export const DonationManager: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadDonations = async () => {
    try {
      const data = await db.getDonations();
      setDonations(data);
      setFilteredDonations(data);
    } catch (err) {
      console.error('Failed to load donations in manager', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  useEffect(() => {
    let result = [...donations];
    if (statusFilter !== 'all') {
      result = result.filter(d => d.status === statusFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.donor_name.toLowerCase().includes(q) ||
        d.donor_email.toLowerCase().includes(q) ||
        d.transaction_id.toLowerCase().includes(q)
      );
    }
    setFilteredVolunteers(result);
  }, [statusFilter, searchQuery, donations]);

  const [_, setFilteredVolunteers] = useState<Donation[]>([]);

  const handleApprove = async (id: string, donor: string, amount: number) => {
    try {
      await db.updateDonationStatus(id, 'approved');
      await db.logAction('System Admin', 'APPROVE', 'Donations', id, `Approved donation of ৳${amount} from ${donor}`);
      setSuccess(`Approved donation from: ${donor}`);
      loadDonations();
    } catch (err) {
      console.error('Failed to approve donation', err);
      setError('Failed to approve donation.');
    }
  };

  const handleReject = async (id: string, donor: string, amount: number) => {
    try {
      await db.updateDonationStatus(id, 'rejected');
      await db.logAction('System Admin', 'REJECT', 'Donations', id, `Rejected donation proof of ৳${amount} from ${donor}`);
      setSuccess(`Rejected donation proof from: ${donor}`);
      loadDonations();
    } catch (err) {
      console.error('Failed to reject donation', err);
      setError('Failed to reject donation.');
    }
  };

  const totalApproved = donations
    .filter(d => d.status === 'approved')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      {/* Summary Banner */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 flex justify-between items-center">
        <div>
          <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Verified Income</span>
          <span className="text-2xl font-extrabold text-primary font-heading">৳{totalApproved} BDT</span>
        </div>
        <div className="bg-red-500 text-white p-3 rounded-xl">
          <Heart className="h-6 w-6 fill-white" />
        </div>
      </div>

      {/* Filters */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100">
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

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Donor or TrxID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-slate-800 text-xs"
          />
        </div>
      </section>

      {/* Table */}
      {loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading donations...</p>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs font-semibold border border-dashed rounded-xl">
          <Heart className="h-10 w-10 text-slate-300 mx-auto mb-2" />
          No donations found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Donor Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method & TrxID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {filteredDonations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    <span className="block">{d.donor_name}</span>
                    <span className="block text-slate-400 text-[10px]">{d.donor_email}</span>
                  </td>
                  <td className="px-4 py-3 text-primary font-bold text-sm">৳{d.amount}</td>
                  <td className="px-4 py-3">
                    <span className="block font-bold">{d.payment_method.toUpperCase()}</span>
                    <span className="block text-slate-400 font-mono text-[10px]">{d.transaction_id}</span>
                  </td>
                  <td className="px-4 py-3 font-mono">{d.created_at.split('T')[0]}</td>
                  <td className="px-4 py-3">
                    <Badge variant={d.status === 'approved' ? 'success' : d.status === 'pending' ? 'warning' : 'danger'}>
                      {d.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-1.5">
                    {d.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(d.id, d.donor_name, d.amount)}
                          className="p-1 bg-green-50 hover:bg-green-600 hover:text-white text-green-600 rounded-lg transition-colors cursor-pointer border border-green-200"
                          title="Verify & Approve"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleReject(d.id, d.donor_name, d.amount)}
                          className="p-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-colors cursor-pointer border border-red-200"
                          title="Reject"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
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
export default DonationManager;
