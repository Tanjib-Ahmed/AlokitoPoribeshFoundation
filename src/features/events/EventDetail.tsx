import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, MapPin, Clock, Users, Award } from 'lucide-react';
import { db } from '../../services/db';
import { Event } from '../../types';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';

export const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<Event | null>(null);
  const [parentProjectName, setParentProjectName] = useState<string>('');
  const [registeredCount, setRegisteredCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventData = async () => {
      if (!slug) return;
      try {
        const ev = await db.getEventBySlug(slug);
        if (ev) {
          setEvent(ev);
          
          // Get registered volunteer count
          const parts = await db.getParticipationsByEvent(ev.id);
          setRegisteredCount(parts.length);

          // Get parent project name if exists
          if (ev.project_id) {
            const projects = await db.getProjects();
            const proj = projects.find(p => p.id === ev.project_id);
            if (proj) {
              setParentProjectName(i18n.language === 'bn' ? proj.title_bn : proj.title_en);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    };
    loadEventData();
  }, [slug, i18n.language]);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">{t('common.loading')}</div>;
  }

  if (!event) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Event Not Found</h2>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const map: Record<string, { text: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
      upcoming: { text: t('events.status.upcoming'), variant: 'info' },
      ongoing: { text: t('events.status.ongoing'), variant: 'success' },
      completed: { text: t('events.status.completed'), variant: 'neutral' },
      cancelled: { text: t('events.status.cancelled'), variant: 'danger' }
    };
    const details = map[status] || { text: status, variant: 'neutral' };
    return <Badge variant={details.variant}>{details.text}</Badge>;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
        <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/events" className="hover:text-primary transition-colors">{t('nav.events')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600 truncate max-w-[200px]">
          {localizedText(event.title_en, event.title_bn)}
        </span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md">
            <img 
              src={event.image_url} 
              alt={event.title_en}
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 right-4">
              {getStatusBadge(event.status)}
            </div>
          </div>

          <div className="space-y-3">
            {parentProjectName && (
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                Project: {parentProjectName}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
              {localizedText(event.title_en, event.title_bn)}
            </h1>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed">
              {localizedText(event.description_en, event.description_bn)}
            </p>
          </div>

          <div className="prose max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-6 whitespace-pre-line">
            {localizedText(event.content_en, event.content_bn)}
          </div>
        </div>

        {/* Right sidebar info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
              Campaign Info
            </h3>

            {/* Timings */}
            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="flex items-start">
                <Clock className="h-4.5 w-4.5 text-slate-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Date & Time</span>
                  <span className="text-slate-800">{event.date.split('T')[0]} ({event.date.split('T')[1]?.substring(0, 5) || ''})</span>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-4.5 w-4.5 text-slate-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Location</span>
                  <span className="text-slate-800">{localizedText(event.location_en, event.location_bn)}</span>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-4.5 w-4.5 text-slate-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">{t('events.volunteerCount')}</span>
                  <span className="text-slate-800">{registeredCount} {event.volunteer_limit ? `/ ${event.volunteer_limit}` : ''}</span>
                </div>
              </div>
            </div>

            {/* Conditional actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {(event.status === 'upcoming' || event.status === 'ongoing') ? (
                <Link to={`/join?event_id=${event.id}`} className="block">
                  <Button variant="primary" className="w-full font-bold cursor-pointer">
                    {t('events.joinCta')}
                  </Button>
                </Link>
              ) : event.status === 'completed' ? (
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-2 text-[11px] text-slate-500">
                    <Award className="h-5 w-5 text-primary shrink-0" />
                    <span>This campaign has successfully completed! Certificates have been generated.</span>
                  </div>
                  <Link to="/verify" className="block">
                    <Button variant="outline" className="w-full font-bold cursor-pointer">
                      {t('verify.title')}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-center text-xs font-semibold">
                  This campaign was cancelled.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default EventDetail;
