import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for the Nature-Themed NGO Site
export interface BlogPost {
    id: string;
    title: string;
    date: string;
    cover: string;
    excerpt: string;
    body: string;
}

export interface GalleryItem {
    id: string;
    image: string;
    captionBn: string;
    captionEn: string;
}

export interface AboutContent {
    titleBn: string;
    titleEn: string;
    descriptionBn: string;
    descriptionEn: string;
    missionBn: string;
    missionEn: string;
    visionBn: string;
    visionEn: string;
}

export interface Activity {
    id: string;
    icon: string;
    titleBn: string;
    titleEn: string;
    descriptionBn: string;
    descriptionEn: string;
}

export interface ImpactStat {
    id: string;
    labelBn: string;
    labelEn: string;
    value: string;
    icon: string;
}

export interface CMSState {
    branding: {
        nameBn: string;
        nameEn: string;
        taglineBn: string;
        taglineEn: string;
        logo: string;
    };
    about: AboutContent;
    activities: Activity[];
    gallery: GalleryItem[];
    blogPosts: BlogPost[];
    impactStats: ImpactStat[];
    contact: {
        phone: string;
        email: string;
        address: string;
        facebookUrl: string;
    };
}

interface CMSContextType {
    state: CMSState;
    updateState: (newState: Partial<CMSState>) => void;
}

const defaultState: CMSState = {
    branding: {
        nameBn: "আলোকিত পরিবেশ ফাউন্ডেশন",
        nameEn: "Alokito Poribesh Foundation",
        taglineBn: "একটি সবুজ, পরিচ্ছন্ন ও মানবিক সমাজ গড়ার লক্ষ্যে",
        taglineEn: "Building a green, clean and humane society together",
        logo: "Leaf"
    },
    about: {
        titleBn: "আলোকিত পরিবেশ ফাউন্ডেশন সম্পর্কে",
        titleEn: "About Us",
        descriptionBn: "আমরা আলোকিত পরিবেশ ফাউন্ডেশন একটি অরাজনৈতিক, সেবামূলক ও জনকল্যাণমুখী প্রতিষ্ঠান। একটি সবুজ, পরিচ্ছন্ন ও মানবিক সমাজ গড়ার লক্ষ্যে আমাদের নিরন্তর পথচলা।",
        descriptionEn: "We are Alokito Poribesh Foundation, a non-political, service-oriented, and public welfare institution. Our continuous journey aims towards building a green, clean, and humane society.",
        missionBn: "পরিবেশ রক্ষা এবং জলবায়ু পরিবর্তনের প্রভাব মোকাবেলায় সচেতনতা বৃদ্ধি এবং বৃক্ষরোপণ কর্মসূচি পালন করা।",
        missionEn: "Raising awareness and conducting tree plantation programs to protect the environment and combat climate change impacts.",
        visionBn: "একটি বাসযোগ্য এবং ভারসাম্যপূর্ণ প্রাকৃতিক পরিবেশ সম্বলিত বাংলাদেশ গড়ে তোলা।",
        visionEn: "Building a Bangladesh with a livable and balanced natural environment."
    },
    activities: [
        {
            id: '1',
            icon: 'Leaf',
            titleBn: 'বৃক্ষরোপণ কর্মসূচি',
            titleEn: 'Tree Plantation',
            descriptionBn: 'পরিবেশের ভারসাম্য রক্ষায় আমরা নিয়মিত বৃক্ষরোপণ অভিযান পরিচালনা করি।',
            descriptionEn: 'We regularly conduct tree plantation drives to maintain environmental balance.'
        },
        {
            id: '2',
            icon: 'Trash2',
            titleBn: 'পরিচ্ছন্নতা অভিযান',
            titleEn: 'Environment Cleaning',
            descriptionBn: 'শহর ও গ্রামকে পরিচ্ছন্ন রাখতে আমরা বিভিন্ন পরিচ্ছন্নতা কার্যক্রম চালাই।',
            descriptionEn: 'We run various cleaning activities to keep cities and villages clean.'
        },
        {
            id: '3',
            icon: 'Shirt',
            titleBn: 'শীতবস্ত্র বিতরণ',
            titleEn: 'Winter Clothes Distribution',
            descriptionBn: 'অসহায় মানুষের মাঝে আমরা প্রতি বছর শীতবস্ত্র বিতরণ করি।',
            descriptionEn: 'Every year we distribute winter clothes among helpless people.'
        },
        {
            id: '4',
            icon: 'BookOpen',
            titleBn: 'সচেতনামূলক কার্যক্রম',
            titleEn: 'Awareness Programs',
            descriptionBn: 'পরিবেশ রক্ষায় সাধারণ মানুষের মাঝে সচেতনতা তৈরিতে আমরা কাজ করি।',
            descriptionEn: 'We work to create awareness among common people to protect environment.'
        },
    ],
    gallery: [
        { id: '1', image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&fit=crop', captionBn: 'শীতবস্ত্র বিতরণ', captionEn: 'Winter Clothes Distribution' },
        { id: '2', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop', captionBn: 'বৃক্ষরোপণ কর্মসূচি', captionEn: 'Tree Plantation' },
        { id: '3', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&fit=crop', captionBn: 'অসহায় মানুষের সহায়তা', captionEn: 'Helping the Poor' },
    ],
    blogPosts: [
        {
            id: '1',
            title: 'আমাদের বৃক্ষরোপণ অভিযান ২০২৬',
            date: '2026-03-20',
            cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&fit=crop',
            excerpt: 'সম্প্রতি আমরা মিরপুর এলাকায় ৫০০১টির বেশি বৃক্ষরোপণ করেছি। আমাদের এই উদ্যোগের বিস্তারিত জানুন এই ব্লগে।',
            body: 'পরিবেশ রক্ষায় আমাদের এই উদ্যোগের বিস্তারিত...'
        }
    ],
    impactStats: [
        { id: '1', labelBn: 'রোপিত বৃক্ষ', labelEn: 'Trees Planted', value: '৫০০১+', icon: 'Leaf' },
        { id: '2', labelBn: 'স্বেচ্ছাসেবক', labelEn: 'Volunteers', value: '১২০+', icon: 'Users' },
        { id: '3', labelBn: 'পরিবার উপকৃত', labelEn: 'Families Helped', value: '২৫০+', icon: 'Heart' },
        { id: '4', labelBn: 'প্রকল্প সম্পন্ন', labelEn: 'Projects Done', value: '১৫+', icon: 'CheckCircle' },
    ],
    contact: {
        phone: "+৮৮০ ১৭১২-৩৪৫৬৭৮",
        email: "info@alokitoporibesh.org",
        address: "মিরপুর ১, ঢাকা ১২১৬, বাংলাদেশ",
        facebookUrl: "https://facebook.com/alokitoporibesh"
    }
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<CMSState>(() => {
        const saved = localStorage.getItem('alokito_cms_data_nature');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return { ...defaultState, ...parsed };
            } catch (e) {
                return defaultState;
            }
        }
        return defaultState;
    });

    useEffect(() => {
        localStorage.setItem('alokito_cms_data_nature', JSON.stringify(state));
    }, [state]);

    const updateState = (newState: Partial<CMSState>) => {
        setState(prev => ({ ...prev, ...newState }));
    };

    return (
        <CMSContext.Provider value={{ state, updateState }}>
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
