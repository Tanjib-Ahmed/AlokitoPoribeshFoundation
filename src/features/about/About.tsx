import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Target, Compass, Award, Shield, Users, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role_en: string;
  role_bn: string;
  image: string;
  email: string;
}

export const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  const mockTeam: TeamMember[] = [
    {
      name: 'Tanjib Ahmed',
      role_en: 'Founder & Executive Director',
      role_bn: 'প্রতিষ্ঠাতা ও নির্বাহী পরিচালক',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      email: 'tanjib.ahmed@alokitoporibesh.org'
    },
    {
      name: 'Sarah Chowdhury',
      role_en: 'Head of Afforestation Programs',
      role_bn: 'বনায়ন কর্মসূচি প্রধান',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      email: 'sarah.c@alokitoporibesh.org'
    },
    {
      name: 'Dr. Rafiqul Islam',
      role_en: 'Environmental Advisor',
      role_bn: 'পরিবেশ উপদেষ্টা',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      email: 'rafiqul.i@alokitoporibesh.org'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* 1. Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('about.title')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('about.subtitle')}</p>
      </section>

      {/* 2. Journey History */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5 text-primary">
            <Compass className="h-6 w-6" />
            <h2 className="text-2xl font-bold font-heading text-slate-900">{t('about.history')}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {t('about.historyText')}
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-80 bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
            alt="Tree plantation volunteer work" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 text-primary">
            <div className="bg-primary/5 p-2 rounded-xl">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">{t('about.mission')}</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('about.missionText')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 text-secondary">
            <div className="bg-secondary/5 p-2 rounded-xl">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">{t('about.vision')}</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('about.visionText')}
          </p>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="space-y-8 bg-slate-100/50 rounded-3xl p-8 md:p-12 border border-slate-200/40">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">How We Serve</span>
          </div>
          <h2 className="text-3xl font-bold font-heading text-slate-900">{t('about.values')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 space-y-3">
            <div className="bg-primary/5 text-primary p-2.5 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">{t('about.transparency')}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{t('about.transparencyDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 space-y-3">
            <div className="bg-primary/5 text-primary p-2.5 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
              <Compass className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">{t('about.sustainability')}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{t('about.sustainabilityDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 space-y-3">
            <div className="bg-primary/5 text-primary p-2.5 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">{t('about.youthAction')}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{t('about.youthActionDesc')}</p>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold font-heading text-slate-900">{t('about.team')}</h2>
          <p className="text-sm text-slate-500">{t('about.teamSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockTeam.map((member) => (
            <div key={member.name} className="bg-white p-6 rounded-3xl border border-slate-200/60 text-center space-y-4 hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading">{member.name}</h4>
                <span className="block text-xs font-semibold text-primary mt-1">
                  {i18n.language === 'bn' ? member.role_bn : member.role_en}
                </span>
              </div>
              
              <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-center space-x-1.5 text-xs text-slate-500 font-semibold">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{member.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default About;
