import React, { createContext, useContext, ReactNode } from 'react';
import { branding, about, contact } from '../data/config';
import { impactStats } from '../data/impact';
import { activities, gallery } from '../data/projects';
import { blogPosts } from '../data/blog';

interface CMSState {
    branding: typeof branding;
    about: typeof about;
    impactStats: typeof impactStats;
    activities: typeof activities;
    gallery: typeof gallery;
    blogPosts: typeof blogPosts;
    contact: typeof contact;
}

const initialState: CMSState = {
    branding,
    about,
    impactStats,
    activities,
    gallery,
    blogPosts,
    contact
};

interface CMSContextType {
    state: CMSState;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Content is now purely static and managed through code edits (src/data/*)
    // This removes the need for an admin panel and localStorage persistence.
    const value = {
        state: initialState
    };

    return (
        <CMSContext.Provider value={value}>
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
