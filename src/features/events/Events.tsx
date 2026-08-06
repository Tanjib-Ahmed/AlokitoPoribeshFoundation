import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';
import { db } from '../../services/db';
import { Event, EventStatus } from '../../types';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';

export const Events: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await db.getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        console.error('Failed to load events list', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Filter application logic
  useEffect(() => {
    let result = [...events];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(e => e.status === statusFilter);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title_en.toLowerCase().includes(q) || 
        e.title_bn.includes(q) || 
        e.description_en.toLowerCase().includes(q) || 
        e.description_bn.includes(q) ||
        e.location_en.toLowerCase().includes(q) ||
        e.location_bn.includes(q)
      );
    }

    setFilteredEvents(result);
  }, [statusFilter, searchQuery, events]);

  const localizedText = (en: string, bn: string) => {
    return i18n.language === 'bn' ? bn : en;
  };

  const getStatusBadge = (status: EventStatus) => {
    const map = {
      upcoming: { text: t('events.status.upcoming'), variant: 'info' as const },
      ongoing: { text: t('events.status.ongoing'), variant: 'success' as const },
      completed: { text: t('events.status.completed'), variant: 'neutral' as const },
      cancelled: { text: t('events.status.cancelled'), variant: 'danger' as const }
    };
    const details = map[status] || { text: status, variant: 'neutral' as const };
    return <Badge variant={details.variant}>{details.text}</Badge>;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('nav.events')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('events.subtitle')}</p>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'upcoming', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${statusFilter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              {status === 'all' ? (i18n.language === 'bn' ? 'সব' : 'All') : t(`events.status.${status}`)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-slate-800"
          />
        </div>

      </section>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/50">
          <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">{t('events.noEvents')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md hover:border-primary/10 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img 
                    src={ev.image_url} 
                    alt={ev.title_en} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(ev.status)}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug line-clamp-1">
                    {localizedText(ev.title_en, ev.title_bn)}
                  </h3>
                  
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {localizedText(ev.description_en, ev.description_bn)}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {/* Meta details list */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" />
                    <span>{ev.date.split('T')[0]} ({ev.date.split('T')[1]?.substring(0, 5) || ''})</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{localizedText(ev.location_en, ev.location_bn)}</span>
                  </div>
                </div>

                <Link to={`/events/${ev.slug}`} className="block">
                  <Button variant="outline" size="sm" className="w-full font-bold cursor-pointer">
                    {t('common.viewDetails')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Events;
