import React, { useEffect, useState } from 'react';
import { db } from '../../../services/db';
import { Button } from '../../../components/Button';
import { Input, Textarea } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Save, Settings } from 'lucide-react';

export const SettingManager: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressEn, setAddressEn] = useState('');
  const [addressBn, setAddressBn] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await db.getSettings();
        
        const emailVal = settings.find(s => s.key === 'email')?.value || '';
        const phoneVal = settings.find(s => s.key === 'phone')?.value || '';
        const addEnVal = settings.find(s => s.key === 'address_en')?.value || '';
        const addBnVal = settings.find(s => s.key === 'address_bn')?.value || '';
        const fbVal = settings.find(s => s.key === 'facebook_url')?.value || '';
        const ytVal = settings.find(s => s.key === 'youtube_url')?.value || '';
        const igVal = settings.find(s => s.key === 'instagram_url')?.value || '';

        setEmail(emailVal);
        setPhone(phoneVal);
        setAddressEn(addEnVal);
        setAddressBn(addBnVal);
        setFacebook(fbVal);
        setYoutube(ytVal);
        setInstagram(igVal);
      } catch (err) {
        console.error('Failed to load system settings', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        email,
        phone,
        address_en: addressEn,
        address_bn: addressBn,
        facebook_url: facebook,
        youtube_url: youtube,
        instagram_url: instagram
      };

      await db.updateSettings(payload);
      await db.logAction('System Admin', 'UPDATE_SETTINGS', 'Settings', 'global', 'Updated contact and branding settings');
      setSuccess('Settings updated successfully.');
    } catch (err) {
      console.error('Failed to save settings', err);
      setError('Failed to save settings.');
    }
  };

  if (loading) {
    return <p className="text-center py-6 text-xs text-slate-500 font-semibold">Loading settings...</p>;
  }

  return (
    <div className="space-y-6">
      {success && <Alert type="success" description={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" description={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 font-heading border-b border-slate-200 pb-2 flex items-center">
            <Settings className="h-4.5 w-4.5 text-primary mr-2" />
            Contact Specifications
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. info@alokitoporibesh.org"
              required
            />
            <Input
              label="Contact Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +880 1700 000 000"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Office Address (English)"
              value={addressEn}
              onChange={(e) => setAddressEn(e.target.value)}
              placeholder="Full address in English..."
              rows={2}
              required
            />
            <Textarea
              label="Office Address (Bangla)"
              value={addressBn}
              onChange={(e) => setAddressBn(e.target.value)}
              placeholder="সম্পূর্ণ ঠিকানা বাংলায়..."
              rows={2}
              required
            />
          </div>
        </div>

        {/* Social URLs */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 font-heading border-b border-slate-200 pb-2 flex items-center">
            <Settings className="h-4.5 w-4.5 text-primary mr-2" />
            Social Platform Coordinates
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Facebook Page URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/..."
            />
            <Input
              label="YouTube Channel URL"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>

      </form>
    </div>
  );
};
export default SettingManager;
