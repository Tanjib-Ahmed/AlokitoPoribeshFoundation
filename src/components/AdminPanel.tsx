import React, { useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import type { Activity } from '../context/CMSContext';
import { Settings, Image as ImageIcon, Plus, Trash2, LogOut, Info, Activity as ActivityIcon, Grid, Upload, Heart } from 'lucide-react';
import { optimizeImage } from '../lib/imageOptimizer';

const ImageUploadInput = ({
    value,
    onChange,
    placeholder
}: {
    value: string,
    onChange: (val: string) => void,
    placeholder: string
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // 800px max width to aggressively save LocalStorage space
            const base64 = await optimizeImage(file, 800, 0.6);
            onChange(base64);
        } catch (error) {
            console.error("Failed to optimize image", error);
            alert("ছবি আপলোড বা অপ্টিমাইজ করতে সমস্যা হয়েছে।");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="shrink-0 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <Upload className="w-5 h-5" />
                {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};

const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
    const {
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
        updateImpactStats
    } = useCMS();

    // Tab State
    const [activeTab, setActiveTab] = useState<'branding' | 'about' | 'activities' | 'impact' | 'gallery' | 'blogs' | 'events'>('branding');

    // New Blog form state
    const [newBlog, setNewBlog] = useState({ title: '', date: '', image: '', excerpt: '' });

    // New Event form state
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });

    // New Gallery Image form state
    const [newGalleryImg, setNewGalleryImg] = useState({ src: '', captionBn: '', captionEn: '' });

    const handleAddBlog = (e: React.FormEvent) => {
        e.preventDefault();
        addBlogPost(newBlog);
        setNewBlog({ title: '', date: '', image: '', excerpt: '' });
    };

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        addEvent(newEvent);
        setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
    };

    const handleAddGalleryImage = (e: React.FormEvent) => {
        e.preventDefault();
        addGalleryImage(newGalleryImg);
        setNewGalleryImg({ src: '', captionBn: '', captionEn: '' });
    };

    const handleUpdateActivity = (index: number, field: keyof Activity, value: string) => {
        const newActivities = [...state.activities];
        newActivities[index] = { ...newActivities[index], [field]: value };
        updateActivities(newActivities);
    };

    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden font-sans flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-white shrink-0 p-6 flex flex-col h-auto md:h-screen sticky top-0 md:static">
                <h2 className="text-2xl font-bold mb-8 text-brand-400">অ্যাডমিন প্যানেল</h2>

                <nav className="flex flex-col gap-2 flex-1">
                    <button
                        onClick={() => setActiveTab('branding')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'branding' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <Settings className="w-5 h-5" />
                        ব্র্যান্ডিং ও লোগো
                    </button>

                    <button
                        onClick={() => setActiveTab('about')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'about' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <Info className="w-5 h-5" />
                        আমাদের সম্পর্কে
                    </button>

                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'activities' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <ActivityIcon className="w-5 h-5" />
                        কার্যক্রম ম্যানেজ
                    </button>

                    <button
                        onClick={() => setActiveTab('impact')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'impact' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <Heart className="w-5 h-5" />
                        ইমপ্যাক্ট (Trust Stats)
                    </button>

                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'gallery' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <Grid className="w-5 h-5" />
                        গ্যালারি ম্যানেজ
                    </button>

                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'blogs' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <ImageIcon className="w-5 h-5" />
                        ব্লগ ম্যানেজ
                    </button>

                    <button
                        onClick={() => setActiveTab('events')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'events' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <Plus className="w-5 h-5" />
                        ইভেন্ট ম্যানেজ
                    </button>
                </nav>

                <button
                    onClick={onLogout}
                    className="mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                >
                    <LogOut className="w-5 h-5" /> লগ আউট
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 h-screen overflow-y-auto p-6 md:p-10">
                <div className="max-w-4xl mx-auto">

                    {/* BRANDING TAB */}
                    {activeTab === 'branding' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">ব্র্যান্ডিং ও লোগো</h1>
                                <p className="text-gray-500">ওয়েবসাইটের মূল লোগো এবং ডিজাইন পরিবর্তন করুন।</p>
                            </div>

                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">লোগো ইউআরএল (Logo URL)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-2 block">লোগো (বাংলা)</label>
                                        <ImageUploadInput
                                            value={state.branding.logoUrlBn}
                                            onChange={(val) => updateBranding({ logoUrlBn: val })}
                                            placeholder="e.g., /logo-bn.png"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-2 block">Logo (English)</label>
                                        <ImageUploadInput
                                            value={state.branding.logoUrlEn}
                                            onChange={(val) => updateBranding({ logoUrlEn: val })}
                                            placeholder="e.g., /logo-en.png"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-6 mt-4">লোগো ফাঁকা থাকলে ডিফল্ট 'Leaf' আইকন দেখাবে। ফাইল আপলোড করুন অথবা ইউআরএল দিন।</p>

                                <h3 className="text-lg font-bold text-gray-900 mb-4">হিরো সেকশন ব্যাকগ্রাউন্ড (CSS)</h3>
                                <input
                                    type="text"
                                    value={state.branding.heroImageUrl}
                                    onChange={(e) => updateBranding({ heroImageUrl: e.target.value })}
                                    placeholder="e.g., url('/images/hero.jpg') or linear-gradient(...)"
                                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* ABOUT TAB */}
                    {activeTab === 'about' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">আমাদের সম্পর্কে (About Us)</h1>
                                <p className="text-gray-500">অ্যাবাউট সেকশনের ছবি আপডেট করুন।</p>
                            </div>

                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">অ্যাবাউট ফোকাস ছবি (About Image URL)</h3>
                                <ImageUploadInput
                                    value={state.about.imageUrl}
                                    onChange={(val) => updateAbout({ imageUrl: val })}
                                    placeholder="e.g., https://example.com/about.jpg"
                                />
                                {state.about.imageUrl && (
                                    <img src={state.about.imageUrl} alt="About preview" className="h-48 rounded-xl object-cover mt-2" />
                                )}
                            </div>
                        </div>
                    )}

                    {/* ACTIVITIES TAB */}
                    {activeTab === 'activities' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">কার্যক্রম ম্যানেজমেন্ট (Activities)</h1>
                                <p className="text-gray-500">৫টি মূল কার্যক্রমের আইকন আপডেট করুন।</p>
                            </div>

                            <div className="space-y-4">
                                {state.activities.map((activity, index) => (
                                    <div key={activity.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">Activity ID (Static)</label>
                                            <input disabled value={activity.id} className="w-full px-4 py-2 bg-slate-100 text-gray-500 border border-gray-200 rounded-xl outline-none" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">লুসাইড আইকন নাম (e.g. TreePine)</label>
                                            <input
                                                value={activity.icon}
                                                onChange={(e) => handleUpdateActivity(index, 'icon', e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* IMPACT TAB */}
                    {activeTab === 'impact' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">ইমপ্যাক্ট স্ট্যাটাস (Impact Stats)</h1>
                                <p className="text-gray-500">ওয়েবসাইটের ট্রাস্ট সিগন্যাল বা ইমপ্যাক্ট নাম্বারগুলো পরিবর্তন করুন।</p>
                            </div>

                            <div className="space-y-6">
                                {state.impactStats.map((stat, index) => (
                                    <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 block">লেবেল (বাংলা)</label>
                                                <input
                                                    value={stat.labelBn}
                                                    onChange={(e) => {
                                                        const newStats = [...state.impactStats];
                                                        newStats[index] = { ...newStats[index], labelBn: e.target.value };
                                                        updateImpactStats(newStats);
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 block">Label (English)</label>
                                                <input
                                                    value={stat.labelEn}
                                                    onChange={(e) => {
                                                        const newStats = [...state.impactStats];
                                                        newStats[index] = { ...newStats[index], labelEn: e.target.value };
                                                        updateImpactStats(newStats);
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 block">ভ্যালু (e.g. ৫০০+)</label>
                                                <input
                                                    value={stat.value}
                                                    onChange={(e) => {
                                                        const newStats = [...state.impactStats];
                                                        newStats[index] = { ...newStats[index], value: e.target.value };
                                                        updateImpactStats(newStats);
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 block">আইকন (Leaf, Users, Heart, CheckCircle)</label>
                                                <input
                                                    value={stat.icon}
                                                    onChange={(e) => {
                                                        const newStats = [...state.impactStats];
                                                        newStats[index] = { ...newStats[index], icon: e.target.value };
                                                        updateImpactStats(newStats);
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GALLERY TAB */}
                    {activeTab === 'gallery' && (

                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">গ্যালারি ম্যানেজমেন্ট (Gallery)</h1>
                                <p className="text-gray-500">গ্যালারিতে নতুন ছবি যোগ করুন বা পুরোনো ছবি বাদ দিন।</p>
                            </div>

                            {/* Add New Gallery Image */}
                            <form onSubmit={handleAddGalleryImage} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-brand-600" /> নতুন ছবি যোগ করুন</h3>

                                <div className="mb-4">
                                    <ImageUploadInput
                                        value={newGalleryImg.src}
                                        onChange={val => setNewGalleryImg({ ...newGalleryImg, src: val })}
                                        placeholder="ছবির ইউআরএল (Image URL)"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required placeholder="ক্যাপশন (বাংলা)" value={newGalleryImg.captionBn} onChange={e => setNewGalleryImg({ ...newGalleryImg, captionBn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                    <input required placeholder="Caption (English)" value={newGalleryImg.captionEn} onChange={e => setNewGalleryImg({ ...newGalleryImg, captionEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                </div>

                                <button type="submit" className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors w-full sm:w-auto">ছবি যোগ করুন</button>
                            </form>

                            {/* Gallery List */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                                {state.gallery.map(img => (
                                    <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white">
                                        <img src={img.src} alt={img.captionBn} className="w-full aspect-square object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                                            <p className="text-white font-bold text-sm mb-2">{img.captionBn}</p>
                                            <button onClick={() => deleteGalleryImage(img.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BLOGS TAB */}
                    {activeTab === 'blogs' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">ব্লগ পোস্ট ম্যানেজমেন্ট</h1>
                                <p className="text-gray-500">নতুন ব্লগ পোস্ট যোগ করুন অথবা পুরোনো পোস্ট ডিলিট করুন।</p>
                            </div>

                            {/* Add New Blog Form */}
                            <form onSubmit={handleAddBlog} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-brand-600" /> নতুন ব্লগ যোগ করুন</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required placeholder="শিরোনাম (Title)" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                    <input required placeholder="তারিখ (e.g., 20 March 2026)" value={newBlog.date} onChange={e => setNewBlog({ ...newBlog, date: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                </div>

                                <div className="mb-4">
                                    <ImageUploadInput
                                        value={newBlog.image}
                                        onChange={val => setNewBlog({ ...newBlog, image: val })}
                                        placeholder="ছবির ইউআরএল (Image URL. e.g. /images/blog1.jpg)"
                                    />
                                </div>
                                <textarea required placeholder="বিস্তারিত অংশ (Excerpt)" rows={4} value={newBlog.excerpt} onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 resize-none" />

                                <button type="submit" className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors w-full sm:w-auto">পাবলিশ করুন</button>
                            </form>

                            {/* Blog List */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">সব ব্লগ পোস্ট:</h3>
                                {state.blogPosts.map(post => (
                                    <div key={post.id} className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <img src={post.image} alt="" className="w-16 h-16 object-cover rounded-lg shrink-0 bg-slate-100" />
                                            <div>
                                                <h4 className="font-bold text-gray-900">{post.title}</h4>
                                                <p className="text-sm text-gray-500">{post.date}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteBlogPost(post.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">ইভেন্ট ম্যানেজমেন্ট</h1>
                                <p className="text-gray-500">ভবিষ্যতের কার্যক্রম ও ইভেন্ট শিডিউল যোগ করুন।</p>
                            </div>

                            {/* Add New Event Form */}
                            <form onSubmit={handleAddEvent} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-brand-600" /> নতুন ইভেন্ট যোগ করুন</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required placeholder="শিরোনাম (Title)" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                    <input required placeholder="তারিখ (e.g., 05 June 2026)" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required placeholder="সময় (e.g., 10:00 AM)" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                    <input required placeholder="লোকেশন (Location)" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500" />
                                </div>

                                <textarea required placeholder="বিস্তারিত অংশ (Description)" rows={4} value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 resize-none" />

                                <button type="submit" className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors w-full sm:w-auto">ইভেন্ট সেভ করুন</button>
                            </form>

                            {/* Event List */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">সব আসন্ন ইভেন্ট:</h3>
                                {state.events.map(event => (
                                    <div key={event.id} className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">{event.title}</h4>
                                            <p className="text-sm text-gray-500">{event.date} • {event.time} • {event.location}</p>
                                        </div>
                                        <button onClick={() => deleteEvent(event.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
