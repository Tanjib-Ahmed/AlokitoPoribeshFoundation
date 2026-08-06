import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Certificate, Volunteer, Event } from '../../../types';
import { Button } from '../../../components/Button';
import { Select } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Plus, Award, Printer, Eye } from 'lucide-react';
import { Modal } from '../../../components/Modal';

export const CertificateManager: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [volunteerId, setVolunteerId] = useState('');
  const [eventId, setEventId] = useState('');
  const [isIssuing, setIsIssuing] = useState(false);

  // Lightbox print state
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    try {
      const [certs, vols, evs] = await Promise.all([
        db.getCertificates(),
        db.getVolunteers(),
        db.getEvents()
      ]);
      
      // Filter vols and evs to matching status
      const approvedVols = vols.filter(v => v.status === 'approved');
      setVolunteers(approvedVols);
      setEvents(evs);
      
      // Resolve joins for table list
      const resolvedCerts = certs.map(c => {
        const vol = vols.find(v => v.id === c.volunteer_id);
        const ev = evs.find(e => e.id === c.event_id);
        return {
          ...c,
          volunteer_name: vol ? vol.name : 'Unknown Volunteer',
          event_title_en: ev ? ev.title_en : 'Cleanup Drive',
          event_title_bn: ev ? ev.title_bn : 'পরিচ্ছন্নতা অভিযান'
        };
      });
      setCertificates(resolvedCerts);

      if (approvedVols.length > 0) setVolunteerId(approvedVols[0].id);
      if (evs.length > 0) setEventId(evs[0].id);
    } catch (err) {
      console.error('Failed to load certificates data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!volunteerId || !eventId) {
      setError('Select a volunteer and campaign event.');
      return;
    }

    // Check if certificate already exists for this vol-event pair
    const exists = certificates.some(c => c.volunteer_id === volunteerId && c.event_id === eventId);
    if (exists) {
      setError('A certificate has already been issued to this volunteer for this event.');
      return;
    }

    try {
      const count = certificates.length + 1;
      const serial = String(count).padStart(6, '0');
      const certId = `APF-CERT-2026-${serial}`;

      const newCert = await db.generateCertificate({
        certificate_id: certId,
        volunteer_id: volunteerId,
        event_id: eventId,
        template_id: 'temp-1'
      });

      await db.logAction('System Admin', 'GENERATE_CERTIFICATE', 'Certificates', newCert.id, `Generated certificate ${certId} for volunteer ID ${volunteerId}`);
      setSuccess(`Issued certificate ${certId} successfully.`);
      loadData();
      setIsIssuing(false);
    } catch (err) {
      console.error('Failed to issue certificate', err);
      setError('Failed to issue certificate.');
    }
  };

  const volunteerOptions = volunteers.map(v => ({ value: v.id, label: `${v.name} (${v.volunteer_id})` }));
  const eventOptions = events.map(e => ({ value: e.id, label: e.title_en }));

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          Issued Certificates
        </h3>
        {!isIssuing && (
          <Button onClick={() => setIsIssuing(true)} size="sm" className="font-bold cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Issue Certificate
          </Button>
        )}
      </div>

      {isIssuing ? (
        <form onSubmit={handleIssueCertificate} className="space-y-4 max-w-md bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
          <h4 className="text-sm font-bold text-slate-800 font-heading">Issue Recognition Certificate</h4>
          
          <Select
            label="Select Approved Volunteer"
            value={volunteerId}
            onChange={(e) => setVolunteerId(e.target.value)}
            options={volunteerOptions}
          />

          <Select
            label="Select Completed Campaign Event"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            options={eventOptions}
          />

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
            <Button type="button" onClick={() => setIsIssuing(false)} variant="outline" size="sm" className="font-bold cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
              Generate & Issue
            </Button>
          </div>
        </form>
      ) : loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p className="text-center py-10 text-xs text-slate-400 font-semibold border border-dashed rounded-xl">No certificates generated yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Certificate ID</th>
                <th className="px-4 py-3">Volunteer</th>
                <th className="px-4 py-3">Campaign Event</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
              {certificates.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-primary">{c.certificate_id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{c.volunteer_name}</td>
                  <td className="px-4 py-3">{c.event_title_en}</td>
                  <td className="px-4 py-3 font-mono">{c.issue_date}</td>
                  <td className="px-4 py-3 flex justify-center space-x-1.5">
                    <button
                      onClick={() => setSelectedCert(c)}
                      className="p-1.5 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Print / View"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <a
                      href={`/verify/${c.certificate_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Public Link"
                    >
                      <Award className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certificate Print Preview Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Certificate Print Preview"
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="print-area bg-white border-4 border-double border-primary p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between aspect-[1.414/1] min-h-[300px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full" />

              <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold tracking-wide uppercase text-slate-900 font-heading">
                    Certificate of Appreciation
                  </h2>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alokito Poribesh Foundation
                  </span>
                </div>

                <div className="space-y-2 max-w-sm mx-auto text-slate-600 text-xs">
                  <p className="italic font-semibold text-[10px] text-slate-400">This is to certify that</p>
                  <p className="text-base font-extrabold text-primary font-heading tracking-wide">
                    {selectedCert.volunteer_name}
                  </p>
                  <p className="leading-relaxed">
                    has successfully participated in the{' '}
                    <span className="font-bold text-slate-800">{selectedCert.event_title_en}</span>{' '}
                    environmental drive.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4">
                <div>
                  <span className="block text-[8px] text-slate-400">Cert ID</span>
                  <span className="text-slate-800 font-mono">{selectedCert.certificate_id}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400">Date</span>
                  <span className="text-slate-800">{selectedCert.issue_date}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 no-print">
              <Button onClick={() => setSelectedCert(null)} variant="outline" size="sm" className="font-bold cursor-pointer">
                Close
              </Button>
              <Button onClick={() => window.print()} variant="primary" size="sm" className="font-bold cursor-pointer">
                <Printer className="h-4 w-4 mr-2" />
                Print Certificate
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default CertificateManager;
