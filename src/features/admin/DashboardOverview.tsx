import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, Heart, Award, Calendar, Check, X, Activity 
} from 'lucide-react';
import { db } from '../../services/db';
import { Volunteer, Donation, AuditLog } from '../../types';
import { Badge } from '../../components/Badge';

export const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();
  
  // Dashboard stats
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalVolunteers: 0,
    totalApprovedDonations: 0,
    issuedCertificates: 0
  });

  const [pendingVols, setPendingVols] = useState<Volunteer[]>([]);
  const [pendingDons, setPendingDons] = useState<Donation[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const [sumStats, vols, dons, logs] = await Promise.all([
        db.getStats(),
        db.getVolunteers(),
        db.getDonations(),
        db.getAuditLogs()
      ]);
      
      setStats(sumStats);
      setPendingVols(vols.filter(v => v.status === 'pending'));
      setPendingDons(dons.filter(d => d.status === 'pending'));
      setAuditLogs(logs.slice(0, 5)); // recent 5 logs
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleApproveVolunteer = async (id: string, name: string) => {
    try {
      await db.updateVolunteer(id, { status: 'approved' });
      await db.logAction('System Admin', 'APPROVE', 'Volunteers', id, `Approved volunteer application for ${name}`);
      loadDashboardData();
    } catch (err) {
      console.error('Failed to approve volunteer', err);
    }
  };

  const handleRejectVolunteer = async (id: string, name: string) => {
    try {
      await db.updateVolunteer(id, { status: 'rejected' });
      await db.logAction('System Admin', 'REJECT', 'Volunteers', id, `Rejected volunteer application for ${name}`);
      loadDashboardData();
    } catch (err) {
      console.error('Failed to reject volunteer', err);
    }
  };

  const handleApproveDonation = async (id: string, donor: string, amount: number) => {
    try {
      await db.updateDonationStatus(id, 'approved');
      await db.logAction('System Admin', 'APPROVE', 'Donations', id, `Approved donation of ৳${amount} from ${donor}`);
      loadDashboardData();
    } catch (err) {
      console.error('Failed to approve donation', err);
    }
  };

  const handleRejectDonation = async (id: string, donor: string, amount: number) => {
    try {
      await db.updateDonationStatus(id, 'rejected');
      await db.logAction('System Admin', 'REJECT', 'Donations', id, `Rejected donation proof of ৳${amount} from ${donor}`);
      loadDashboardData();
    } catch (err) {
      console.error('Failed to reject donation', err);
    }
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. Statistics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center space-x-4">
          <div className="bg-emerald-500 text-white p-3.5 rounded-xl shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {t('adminPanel.totalVolunteers')}
            </span>
            <span className="block text-2xl font-bold text-slate-900 font-heading">{stats.totalVolunteers}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center space-x-4">
          <div className="bg-red-500 text-white p-3.5 rounded-xl shrink-0">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {t('adminPanel.totalDonations')}
            </span>
            <span className="block text-2xl font-bold text-slate-900 font-heading">৳{stats.totalApprovedDonations}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center space-x-4">
          <div className="bg-blue-500 text-white p-3.5 rounded-xl shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {t('adminPanel.activeCampaigns')}
            </span>
            <span className="block text-2xl font-bold text-slate-900 font-heading">{stats.activeCampaigns}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center space-x-4">
          <div className="bg-amber-500 text-white p-3.5 rounded-xl shrink-0">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {t('adminPanel.issuedCertificates')}
            </span>
            <span className="block text-2xl font-bold text-slate-900 font-heading">{stats.issuedCertificates}</span>
          </div>
        </div>

      </section>

      {/* 2. Pending Actions Split Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Volunteer applications queue */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex justify-between items-center">
            <span>{t('adminPanel.recentApplications')}</span>
            <Badge variant={pendingVols.length > 0 ? 'warning' : 'neutral'}>
              {pendingVols.length} Pending
            </Badge>
          </h3>

          {pendingVols.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs font-semibold">
              No pending volunteer applications.
            </div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {pendingVols.map((v) => (
                <div key={v.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 flex justify-between items-start gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="block font-bold text-slate-900">{v.name}</span>
                    <span className="block text-slate-500">{v.email} | {v.phone}</span>
                    <span className="block text-slate-500">Blood Group: <span className="text-slate-800 font-bold">{v.blood_group}</span></span>
                    {v.bio && <span className="block text-[11px] italic text-slate-400 mt-1">"{v.bio}"</span>}
                  </div>
                  <div className="flex space-x-1 shrink-0">
                    <button 
                      onClick={() => handleApproveVolunteer(v.id, v.name)}
                      className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-lg cursor-pointer transition-colors"
                      title="Approve"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleRejectVolunteer(v.id, v.name)}
                      className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg cursor-pointer transition-colors"
                      title="Reject"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Donation proof approval queue */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex justify-between items-center">
            <span>{t('adminPanel.recentDonations')}</span>
            <Badge variant={pendingDons.length > 0 ? 'warning' : 'neutral'}>
              {pendingDons.length} Pending
            </Badge>
          </h3>

          {pendingDons.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs font-semibold">
              No pending donation proof reports.
            </div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {pendingDons.map((d) => (
                <div key={d.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 flex justify-between items-start gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="block font-bold text-slate-900">{d.donor_name}</span>
                    <span className="block text-primary font-bold text-sm">৳{d.amount}</span>
                    <span className="block text-slate-500">Method: {d.payment_method.toUpperCase()}</span>
                    <span className="block text-slate-500">TrxID: <span className="font-mono text-slate-800 font-bold">{d.transaction_id}</span></span>
                  </div>
                  <div className="flex space-x-1 shrink-0">
                    <button 
                      onClick={() => handleApproveDonation(d.id, d.donor_name, d.amount)}
                      className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-lg cursor-pointer transition-colors"
                      title="Verify & Approve"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleRejectDonation(d.id, d.donor_name, d.amount)}
                      className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg cursor-pointer transition-colors"
                      title="Reject"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      {/* 3. Recent Audit Logs Trail */}
      <section className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center">
          <Activity className="h-5 w-5 text-primary mr-2" />
          Recent Administrator Actions (Audit Trail)
        </h3>

        <div className="space-y-3.5 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-b-0">
              <div className="flex items-center space-x-3">
                <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md uppercase text-[10px]">
                  {log.action}
                </span>
                <span className="text-slate-600 font-medium">{log.details}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold font-mono">
                {log.created_at.split('T')[0]} {log.created_at.split('T')[1]?.substring(0, 5) || ''}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default DashboardOverview;
