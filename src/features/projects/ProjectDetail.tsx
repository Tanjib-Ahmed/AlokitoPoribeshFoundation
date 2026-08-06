import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Calendar, Heart, Clock } from 'lucide-react';
import { db } from '../../services/db';
import { Project, Event } from '../../types';
import { Button } from '../../components/Button';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!slug) return;
      try {
        const proj = await db.getProjectBySlug(slug);
        if (proj) {
          setProject(proj);
          const allEvents = await db.getEvents();
          const linked = allEvents.filter(e => e.project_id === proj.id);
          setEvents(linked);
        }
      } catch (err) {
        console.error('Failed to load project details', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjectData();
  }, [slug]);

  const localizedText = (en?: string, bn?: string) => {
    return i18n.language === 'bn' ? (bn || '') : (en || '');
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">{t('common.loading')}</div>;
  }

  if (!project) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Project Not Found</h2>
        <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
      </div>
    );
  }

  const progress = project.goal_amount 
    ? Math.min(100, Math.round(((project.raised_amount || 0) / project.goal_amount) * 100))
    : 0;

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
        <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/projects" className="hover:text-primary transition-colors">{t('nav.projects')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600 truncate max-w-[200px]">
          {localizedText(project.title_en, project.title_bn)}
        </span>
      </nav>

      {/* Main Cover Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cover + Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md">
            <img 
              src={project.image_url} 
              alt={project.title_en}
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200">
              {t(`projects.status.${project.status}`)}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
              {localizedText(project.title_en, project.title_bn)}
            </h1>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed">
              {localizedText(project.description_en, project.description_bn)}
            </p>
          </div>

          <div className="prose max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-6 whitespace-pre-line">
            {localizedText(project.content_en, project.content_bn)}
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
              {t('projects.details')}
            </h3>

            {/* Campaign numbers */}
            {project.goal_amount && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span>{t('projects.goal')}</span>
                  <span className="text-slate-900 font-bold">৳{project.goal_amount}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span>{t('projects.raised')}</span>
                  <span className="text-primary font-bold">৳{project.raised_amount}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <span className="block text-right text-[10px] font-bold text-slate-400 uppercase">
                  {progress}% Funded
                </span>
              </div>
            )}

            {/* Date duration info */}
            <div className="space-y-4 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-slate-400 mr-2.5 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Start Date</span>
                  <span className="text-slate-800">{project.start_date}</span>
                </div>
              </div>
              
              {project.end_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-slate-400 mr-2.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wide">End Date</span>
                    <span className="text-slate-800">{project.end_date}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Donate */}
            <Link to="/donate" className="block pt-2">
              <Button variant="primary" className="w-full font-bold cursor-pointer">
                <Heart className="h-4 w-4 mr-2 fill-white" />
                {t('home.ctaDonate')}
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* Campaign Events Grid */}
      <section className="border-t border-slate-200 pt-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">{t('projects.campaigns')}</h2>
          <p className="text-xs text-slate-500">Events organized under this project drive</p>
        </div>

        {events.length === 0 ? (
          <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-200 border-dashed text-slate-400 font-semibold text-xs">
            No active campaign events listed under this project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-200/50 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-full md:w-32 h-32 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                  <img src={ev.image_url} alt={ev.title_en} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1.5">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-200 uppercase">
                      {t(`events.status.${ev.status}`)}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-heading leading-tight line-clamp-1">
                      {localizedText(ev.title_en, ev.title_bn)}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {localizedText(ev.description_en, ev.description_bn)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {ev.date.split('T')[0]}
                    </span>
                    <Link to={`/events/${ev.slug}`} className="text-primary hover:underline flex items-center">
                      Details
                      <ChevronRight className="h-3 w-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default ProjectDetail;
