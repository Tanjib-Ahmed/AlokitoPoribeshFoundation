import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input, Textarea } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../services/db';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValidate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Valid email is required';
    if (!subject.trim()) tempErrors.subject = 'Subject is required';
    if (!message.trim()) tempErrors.message = 'Message details are required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);
    try {
      await db.submitContactMessage({
        name,
        email,
        subject,
        message
      });
      setIsSuccess(true);
      // Reset
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Failed to send contact message', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('nav.contact')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('contact.subtitle')}</p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
              {t('contact.info')}
            </h3>

            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3.5 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Email Us</span>
                  <span className="text-slate-800 break-all">info@alokitoporibesh.org</span>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3.5 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Call Us</span>
                  <span className="text-slate-800">+880 1700 000 000</span>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3.5 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Head Office</span>
                  <span className="text-slate-800 leading-relaxed">
                    House 12, Road 4, Dhanmondi, Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-xs">
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h4 className="text-lg font-bold text-green-900 font-heading">Message Sent!</h4>
                <p className="text-sm text-green-700 font-semibold max-w-sm mx-auto leading-relaxed">
                  {t('contact.successMsg')}
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="primary" className="font-bold cursor-pointer">
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('common.name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    placeholder="Your Name"
                    required
                  />

                  <Input
                    label={t('common.email')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    placeholder="Your Email"
                    required
                  />
                </div>

                <Input
                  label={t('contact.subject')}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  error={errors.subject}
                  placeholder="Subject of inquiry"
                  required
                />

                <Textarea
                  label={t('common.message')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={errors.message}
                  placeholder="Type your message details here..."
                  rows={4}
                  required
                />

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full md:w-auto font-bold cursor-pointer"
                    isLoading={isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.send')}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Contact;
