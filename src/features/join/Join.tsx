import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, ShieldAlert, CheckCircle } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../services/db';
import { Event } from '../../types';

export const Join: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const eventIdParam = searchParams.get('event_id') || '';

  // Options
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [occupation, setOccupation] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [bio, setBio] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load upcoming events for selection
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const all = await db.getEvents();
        const active = all.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
        setEvents(active);
        
        // Pre-select if param exists
        if (eventIdParam && active.some(e => e.id === eventIdParam)) {
          setSelectedEventId(eventIdParam);
        } else if (active.length > 0) {
          setSelectedEventId(active[0].id);
        }
      } catch (err) {
        console.error('Failed to load campaigns list', err);
      } finally {
        setLoadingEvents(false);
      }
    };
    loadEvents();
  }, [eventIdParam]);

  // Form Validate
  const handleValidate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Valid email is required';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!address.trim()) tempErrors.address = 'Living address is required';
    if (!occupation.trim()) tempErrors.occupation = 'Occupation status is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);
    try {
      // Register volunteer
      const vol = await db.registerVolunteer({
        name,
        email,
        phone,
        address_en: address,
        address_bn: address,
        blood_group: bloodGroup,
        occupation,
        bio
      });

      // If specific campaign was selected, link participation
      if (selectedEventId) {
        await db.logParticipation({
          volunteer_id: vol.id,
          event_id: selectedEventId,
          status: 'registered',
          role_en: 'General Volunteer',
          role_bn: 'সাধারণ স্বেচ্ছাসেবক'
        });
      }

      setIsSuccess(true);
      // Reset
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setOccupation('');
      setBio('');
    } catch (err) {
      console.error('Failed to register volunteer', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' }
  ];

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  const campaignOptions = [
    { value: '', label: '-- General Registration --' },
    ...events.map(e => ({ value: e.id, label: localizedText(e.title_en, e.title_bn) }))
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('join.title')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('join.subtitle')}</p>
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Why Volunteer? */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              {t('join.whyVolunteer')}
            </h3>
            
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('join.benefitsTitle')}</span>
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="flex items-start">
                  <span className="shrink-0 h-1.5 w-1.5 bg-primary rounded-full mt-1.5 mr-2.5" />
                  <span>{t('join.benefit1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 h-1.5 w-1.5 bg-primary rounded-full mt-1.5 mr-2.5" />
                  <span>{t('join.benefit2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 h-1.5 w-1.5 bg-primary rounded-full mt-1.5 mr-2.5" />
                  <span>{t('join.benefit3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 h-1.5 w-1.5 bg-primary rounded-full mt-1.5 mr-2.5" />
                  <span>{t('join.benefit4')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start space-x-2 text-[11px]">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <span>General applications are reviewed within 48 hours. Upon approval, your unique Volunteer ID will be generated and emailed.</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 font-heading border-b border-slate-100 pb-4 mb-6">
              {t('join.formTitle')}
            </h3>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h4 className="text-lg font-bold text-green-900 font-heading">Application Submitted!</h4>
                <p className="text-sm text-green-700 font-semibold max-w-sm mx-auto leading-relaxed">
                  {t('join.submitSuccess')}
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="primary" className="font-bold cursor-pointer">
                  Submit another application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('common.name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    placeholder="Enter full name"
                    required
                  />

                  <Input
                    label={t('common.email')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('common.phone')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    placeholder="e.g. 01700000000"
                    required
                  />

                  <Input
                    label={t('join.occupation')}
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    error={errors.occupation}
                    placeholder="e.g. Student / Job Holder"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label={t('join.bloodGroup')}
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    options={bloodGroupOptions}
                  />

                  {!loadingEvents && (
                    <Select
                      label="Select Campaign Event (Optional)"
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      options={campaignOptions}
                    />
                  )}
                </div>

                <Input
                  label={t('join.address')}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={errors.address}
                  placeholder="Street Address, City"
                  required
                />

                <Textarea
                  label={t('join.bio')}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your motivation..."
                  rows={4}
                />

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto font-bold cursor-pointer"
                    isLoading={isSubmitting}
                  >
                    {t('common.submit')}
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
export default Join;
