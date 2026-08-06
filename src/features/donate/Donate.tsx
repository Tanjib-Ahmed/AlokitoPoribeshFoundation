import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Landmark, Smartphone, FileText, CheckCircle } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../services/db';

export const Donate: React.FC = () => {
  const { t } = useTranslation();
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bkash');
  const [trxId, setTrxId] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate form
  const handleValidate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Valid email is required';
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) tempErrors.amount = 'Valid positive amount is required';
    if (!trxId.trim()) tempErrors.trxId = 'Transaction ID is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);
    try {
      await db.submitDonationProof({
        donor_name: name,
        donor_email: email,
        donor_phone: phone,
        amount: Number(amount),
        payment_method: method as any,
        transaction_id: trxId,
        message: message
      });
      setIsSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setAmount('');
      setTrxId('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit donation proof', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectTier = (value: number) => {
    setAmount(String(value));
  };

  const paymentOptions = [
    { value: 'bkash', label: 'bKash' },
    { value: 'nagad', label: 'Nagad' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('nav.donate')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('donate.subtitle')}</p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Tiers and info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Info Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center">
              <Heart className="h-6 w-6 text-red-500 mr-2 shrink-0 fill-red-500" />
              {t('donate.whyDonate')}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t('donate.whyDonateText')}
            </p>
          </div>

          {/* Donation Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 flex flex-col justify-between hover:border-primary/30 transition-colors">
              <div className="space-y-2">
                <span className="text-2xl font-bold text-primary font-heading">৳১,০০০</span>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{t('donate.tiers.plantTitle')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t('donate.tiers.plantDesc')}</p>
              </div>
              <Button onClick={() => handleSelectTier(1000)} variant="outline" size="sm" className="mt-4 font-bold cursor-pointer">
                Select
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 flex flex-col justify-between hover:border-primary/30 transition-colors">
              <div className="space-y-2">
                <span className="text-2xl font-bold text-primary font-heading">৳৫,০০০</span>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{t('donate.tiers.cleanupTitle')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t('donate.tiers.cleanupDesc')}</p>
              </div>
              <Button onClick={() => handleSelectTier(5000)} variant="outline" size="sm" className="mt-4 font-bold cursor-pointer">
                Select
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 flex flex-col justify-between hover:border-primary/30 transition-colors">
              <div className="space-y-2">
                <span className="text-2xl font-bold text-primary font-heading">৳১০,০০০</span>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{t('donate.tiers.workshopTitle')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t('donate.tiers.workshopDesc')}</p>
              </div>
              <Button onClick={() => handleSelectTier(10000)} variant="outline" size="sm" className="mt-4 font-bold cursor-pointer">
                Select
              </Button>
            </div>

          </div>

          {/* Payment info accounts details */}
          <div className="bg-slate-100/50 border border-slate-200/40 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 font-heading">{t('donate.methods')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3.5 bg-white p-5 rounded-2xl border border-slate-200/40">
                <Smartphone className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div className="text-xs font-semibold text-slate-600">
                  <span className="block text-slate-900 font-bold text-sm">Mobile Financial Services</span>
                  <span className="block mt-1">bKash (Payment): <span className="text-slate-800 font-bold">+880 1700 000 000</span></span>
                  <span className="block">Nagad (Send Money): <span className="text-slate-800 font-bold">+880 1888 888 888</span></span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 bg-white p-5 rounded-2xl border border-slate-200/40">
                <Landmark className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div className="text-xs font-semibold text-slate-600">
                  <span className="block text-slate-900 font-bold text-sm">Direct Bank Transfer</span>
                  <span className="block mt-1">A/C Name: <span className="text-slate-800 font-bold">Alokito Poribesh Foundation</span></span>
                  <span className="block">Bank Name: Bank Asia Ltd.</span>
                  <span className="block">A/C Number: 123456789012</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              {t('donate.manualForm')}
            </h3>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              {t('donate.manualFormHelp')}
            </p>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
                <h4 className="text-base font-bold text-green-900 font-heading">Thank You!</h4>
                <p className="text-xs text-green-700 font-medium leading-relaxed">{t('donate.submitSuccess')}</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" size="sm" className="font-bold cursor-pointer">
                  Submit another proof
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <Input
                  label={t('donate.donorName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  placeholder="e.g. John Doe"
                  required
                />
                
                <Input
                  label={t('common.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="e.g. john@example.com"
                  required
                />

                <Input
                  label={t('common.phone') + ' (Optional)'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01700000000"
                />

                <Input
                  label={t('donate.amount')}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={errors.amount}
                  placeholder="e.g. 2500"
                  required
                />

                <Select
                  label={t('donate.paymentMethod')}
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  options={paymentOptions}
                />

                <Input
                  label={t('donate.transactionId')}
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  error={errors.trxId}
                  placeholder="e.g. BKX12345Y"
                  required
                />

                <Textarea
                  label={t('donate.note')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  rows={3}
                />

                <Button 
                  type="submit"
                  variant="primary"
                  className="w-full font-bold cursor-pointer"
                  isLoading={isSubmitting}
                >
                  {t('common.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Donate;
