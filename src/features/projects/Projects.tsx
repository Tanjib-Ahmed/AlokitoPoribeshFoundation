import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FolderGit, Search } from 'lucide-react';
import { db } from '../../services/db';
import { Project, ProjectStatus } from '../../types';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';

export const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await db.getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error('Failed to load projects list', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Filter application logic
  useEffect(() => {
    let result = [...projects];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title_en.toLowerCase().includes(q) || 
        p.title_bn.includes(q) || 
        p.description_en.toLowerCase().includes(q) || 
        p.description_bn.includes(q)
      );
    }

    setFilteredProjects(result);
  }, [statusFilter, searchQuery, projects]);

  const localizedText = (en: string, bn: string) => {
    return i18n.language === 'bn' ? bn : en;
  };

  const getStatusBadge = (status: ProjectStatus) => {
    const map = {
      active: { text: t('projects.status.active'), variant: 'success' as const },
      planning: { text: t('projects.status.planning'), variant: 'info' as const },
      completed: { text: t('projects.status.completed'), variant: 'neutral' as const },
      archived: { text: t('projects.status.archived'), variant: 'danger' as const }
    };
    const details = map[status] || { text: status, variant: 'neutral' as const };
    return <Badge variant={details.variant}>{details.text}</Badge>;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">{t('nav.projects')}</h1>
        <p className="text-base text-slate-500 font-medium">{t('projects.subtitle')}</p>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'active', 'planning', 'completed'].map((status) => (
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
              {status === 'all' ? (i18n.language === 'bn' ? 'সব' : 'All') : t(`projects.status.${status}`)}
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

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/50">
          <FolderGit className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">{t('projects.noProjects')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const progress = proj.goal_amount 
              ? Math.min(100, Math.round(((proj.raised_amount || 0) / proj.goal_amount) * 100))
              : 0;

            return (
              <div key={proj.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md hover:border-primary/10 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <img 
                      src={proj.image_url} 
                      alt={proj.title_en} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(proj.status)}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug line-clamp-1">
                      {localizedText(proj.title_en, proj.title_bn)}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {localizedText(proj.description_en, proj.description_bn)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-4">
                  {/* Progress info */}
                  {proj.goal_amount && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                        <span>{t('projects.raised')}: ৳{proj.raised_amount}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}

                  <Link to={`/projects/${proj.slug}`} className="block">
                    <Button variant="outline" size="sm" className="w-full font-bold cursor-pointer">
                      {t('common.viewDetails')}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Projects;
