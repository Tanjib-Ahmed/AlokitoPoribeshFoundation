import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Award, ShieldCheck, AlertCircle, Printer } from 'lucide-react';
import { db } from '../../services/db';
import { Certificate } from '../../types';
import { Button } from '../../components/Button';

export const Verify: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Search input state
  const [inputVal, setInputVal] = useState('');
  
  // Results
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load from url path param if present
  useEffect(() => {
    const checkId = certificateId || searchParams.get('id') || '';
    if (checkId) {
      setInputVal(checkId);
      handleVerification(checkId);
    }
  }, [certificateId, searchParams]);

  const handleVerification = async (certId: string) => {
    if (!certId.trim()) return;
    setLoading(true);
    setSearched(false);
    setCertificate(null);
    try {
      const match = await db.getCertificateById(certId.trim());
      setCertificate(match);
    } catch (err) {
      console.error('Failed to verify certificate', err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/verify/${inputVal.trim()}`);
    }
  };

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3 no-print">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('verify.title')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('verify.subtitle')}</p>
      </section>

      {/* Search Input box */}
      <section className="max-w-xl mx-auto no-print">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('verify.placeholder')}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-slate-800 text-sm"
              required
            />
          </div>
          <Button type="submit" variant="primary" isLoading={loading} className="font-bold cursor-pointer shrink-0">
            {t('verify.btnVerify')}
          </Button>
        </form>
      </section>

      {/* Results details panel */}
      {loading && (
        <div className="text-center py-10 font-semibold no-print">{t('common.loading')}</div>
      )}

      {!loading && searched && (
        <section className="max-w-2xl mx-auto">
          {certificate ? (
            <div className="space-y-6">
              {/* Printable Certificate Area */}
              <div className="print-area bg-white border-8 border-double border-primary p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between aspect-[1.414/1] min-h-[400px]">
                
                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full pointer-events-none" />
                
                <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                  
                  {/* Badge Seal */}
                  <div className="flex justify-center">
                    <div className="bg-primary/5 p-3.5 rounded-full border border-primary/25 shrink-0 flex items-center justify-center">
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide uppercase text-slate-900 font-heading">
                      Certificate of Appreciation
                    </h2>
                    <span className="block text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Alokito Poribesh Foundation
                    </span>
                  </div>

                  {/* Content body */}
                  <div className="space-y-2.5 max-w-lg mx-auto">
                    <p className="text-xs text-slate-500 italic font-semibold">
                      This is to officially certify that
                    </p>
                    <p className="text-xl sm:text-2xl font-extrabold text-primary font-heading tracking-wide">
                      {certificate.volunteer_name}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                      has successfully volunteered and completed their duties as a{' '}
                      <span className="font-bold text-slate-900">General Volunteer</span>{' '}
                      for the{' '}
                      <span className="font-bold text-slate-900">
                        {localizedText(certificate.event_title_en, certificate.event_title_bn)}
                      </span>{' '}
                      campaign. We deeply appreciate their contribution to protecting the environment.
                    </p>
                  </div>
                </div>

                {/* Footer Signature and Serial codes */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-4 mt-6">
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Certificate ID</span>
                    <span className="text-slate-800 font-mono font-bold">{certificate.certificate_id}</span>
                  </div>

                  {/* Verified Seal badge */}
                  <div className="flex items-center text-emerald-600 space-x-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Officially Verified</span>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Issue Date</span>
                    <span className="text-slate-800">{certificate.issue_date}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 no-print">
                <Button 
                  onClick={() => window.print()}
                  variant="outline" 
                  size="sm"
                  className="font-bold cursor-pointer"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print / Save PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex items-start space-x-3 text-red-800 no-print">
              <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900 font-heading">Invalid Certificate ID</h4>
                <p className="text-xs text-red-700 font-medium mt-1">
                  {t('verify.invalidId')}
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
export default Verify;
