import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogPosts as initialBlogPosts } from '../data/blogPosts';

// Define Data Types
export interface BlogPost {
    id: number | string;
    title: string;
    date: string;
    image: string;
    excerpt: string;
}

export interface Event {
    id: number | string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export interface Branding {
    logoUrlBn: string;
    logoUrlEn: string;
    heroImageUrl: string;
}

export interface AboutSection {
    imageUrl: string;
}

export interface Activity {
    id: string;
    icon: string; // Storing icon name for Lucide or static class
    colorClass: string;
}

export interface GalleryImage {
    id: number | string;
    src: string;
    captionBn: string;
    captionEn: string;
}

export interface ImpactStat {
    id: string;
    labelBn: string;
    labelEn: string;
    value: string;
    icon: string;
}

interface CMSState {
    branding: Branding;
    about: AboutSection;
    activities: Activity[];
    gallery: GalleryImage[];
    blogPosts: BlogPost[];
    events: Event[];
    impactStats: ImpactStat[];
}

interface CMSContextType {
    state: CMSState;
    updateBranding: (branding: Partial<Branding>) => void;
    updateAbout: (about: Partial<AboutSection>) => void;
    updateActivities: (activities: Activity[]) => void;

    addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
    deleteGalleryImage: (id: string | number) => void;

    addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
    deleteBlogPost: (id: string | number) => void;

    addEvent: (event: Omit<Event, 'id'>) => void;
    deleteEvent: (id: string | number) => void;
    updateImpactStats: (stats: ImpactStat[]) => void;
    resetToDefaults: () => void;
}

const defaultBranding: Branding = {
    logoUrlBn: '',
    logoUrlEn: '',
    heroImageUrl: 'linear-gradient(135deg, #1F4E79 0%, #3F8BC4 50%, #7FB5DA 100%)',
};

const defaultAbout: AboutSection = {
    imageUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070&auto=format&fit=crop'
};

const defaultActivities: Activity[] = [
    { id: 'tree', icon: 'Leaf', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'cleaning', icon: 'Trash2', colorClass: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'winter', icon: 'Snowflake', colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
    { id: 'helping', icon: 'HandHeart', colorClass: 'bg-rose-50 text-rose-600 border-rose-100' },
    { id: 'education', icon: 'BookOpen', colorClass: 'bg-amber-50 text-amber-600 border-amber-100' },
];

const defaultGallery: GalleryImage[] = [
    { id: 1, src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&auto=format&fit=crop', captionBn: 'শীতবস্ত্র বিতরণ', captionEn: 'Winter Clothes Distribution' },
    { id: 2, src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop', captionBn: 'বৃক্ষরোপণ কর্মসূচি', captionEn: 'Tree Plantation' },
    { id: 3, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop', captionBn: 'অসহায় মানুষের সহায়তা', captionEn: 'Helping the Poor' },
    { id: 4, src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop', captionBn: 'পরিচ্ছন্নতা অভিযান', captionEn: 'Cleanliness Drive' },
    { id: 5, src: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop', captionBn: 'শিক্ষামূলক কার্যক্রম', captionEn: 'Educational Programs' },
    { id: 6, src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop', captionBn: 'সচেতনতা বৃদ্ধি', captionEn: 'Awareness Campaigns' },
];

const defaultEvents: Event[] = [
    {
        id: 1,
        title: 'বিশ্ব পরিবেশ দিবস উদযাপন ২০২৬',
        date: '05 June 2026',
        time: '10:00 AM',
        location: 'জাতীয় সংসদ ভবন এলাকা, ঢাকা',
        description: 'পরিবেশ রক্ষায় সচেতনতা বাড়াতে আমাদের বিশেষ র্যালি ও বৃক্ষরোপণ কর্মসূচি।'
    }
];

const defaultImpactStats: ImpactStat[] = [
    { id: '1', labelBn: 'রোপিত বৃক্ষ', labelEn: 'Trees Planted', value: '৫০০+', icon: 'Leaf' },
    { id: '2', labelBn: 'স্বেচ্ছাসেবক', labelEn: 'Volunteers', value: '১২০+', icon: 'Users' },
    { id: '3', labelBn: 'পরিবার উপকৃত', labelEn: 'Families Helped', value: '৫০+', icon: 'Heart' },
    { id: '4', labelBn: 'প্রকল্প সম্পন্ন', labelEn: 'Projects Done', value: '১০+', icon: 'CheckCircle' },
];

// Initial State Setup
const initialState: CMSState = {
    branding: defaultBranding,
    about: defaultAbout,
    activities: defaultActivities,
    gallery: defaultGallery,
    blogPosts: initialBlogPosts,
    events: defaultEvents,
    impactStats: defaultImpactStats,
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<CMSState>(() => {
        // Load from Local Storage if available
        const saved = localStorage.getItem('alokito_cms_data');
        if (saved) {
            try {
                // Merge with defaults to ensure missing properties fallback properly in older caches
                const parsed = JSON.parse(saved);
                return {
                    ...initialState,
                    ...parsed,
                    branding: { ...initialState.branding, ...parsed.branding },
                    about: { ...initialState.about, ...parsed.about },
                    // Add safe fallbacks for newly added arrays if missing
                    activities: parsed.activities || initialState.activities,
                    gallery: parsed.gallery || initialState.gallery,
                    impactStats: parsed.impactStats || initialState.impactStats
                };
            } catch (e) {
                console.error("Failed to parse CMS data", e);
            }
        }
        return initialState;
    });

    // Save to Local Storage whenever state changes
    useEffect(() => {
        localStorage.setItem('alokito_cms_data', JSON.stringify(state));
    }, [state]);

    const updateBranding = (updates: Partial<Branding>) => {
        setState(prev => ({
            ...prev,
            branding: { ...prev.branding, ...updates }
        }));
    };

    const updateAbout = (updates: Partial<AboutSection>) => {
        setState(prev => ({
            ...prev,
            about: { ...prev.about, ...updates }
        }));
    };

    const updateActivities = (activities: Activity[]) => {
        setState(prev => ({ ...prev, activities }));
    };

    const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
        const newImg = { ...image, id: Date.now() };
        setState(prev => ({ ...prev, gallery: [newImg, ...prev.gallery] }));
    };

    const deleteGalleryImage = (id: string | number) => {
        setState(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
    };

    const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
        const newPost = { ...post, id: Date.now() };
        setState(prev => ({
            ...prev,
            blogPosts: [newPost, ...prev.blogPosts]
        }));
    };

    const deleteBlogPost = (id: string | number) => {
        setState(prev => ({
            ...prev,
            blogPosts: prev.blogPosts.filter(p => p.id !== id)
        }));
    };

    const addEvent = (event: Omit<Event, 'id'>) => {
        const newEvent = { ...event, id: Date.now() };
        setState(prev => ({
            ...prev,
            events: [newEvent, ...prev.events]
        }));
    };

    const deleteEvent = (id: string | number) => {
        setState(prev => ({
            ...prev,
            events: prev.events.filter(e => e.id !== id)
        }));
    };

    const updateImpactStats = (impactStats: ImpactStat[]) => {
        setState(prev => ({ ...prev, impactStats }));
    };

    const resetToDefaults = () => {
        setState(initialState);
    };

    return (
        <CMSContext.Provider value={{
            state,
            updateBranding,
            updateAbout,
            updateActivities,
            addGalleryImage,
            deleteGalleryImage,
            addBlogPost,
            deleteBlogPost,
            addEvent,
            deleteEvent,
            updateImpactStats,
            resetToDefaults
        }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => {
    const context = useContext(CMSContext);
    if (context === undefined) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
};
