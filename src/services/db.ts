import { createClient } from '@supabase/supabase-js';
import { 
  Project, Event, Volunteer, VolunteerParticipation, Certificate, 
  Blog, BlogCategory, Album, Media, Achievement, Donation, DonationStatus,
  ContactMessage, AuditLog, Setting 
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase only if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ==========================================
// SEED MOCK DATA FOR LOCAL STORAGE FALLBACK
// ==========================================

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title_en: 'Coastal Mangrove Afforestation',
    title_bn: 'উপকূলীয় ম্যানগ্রোভ বনায়ন',
    slug: 'coastal-mangrove-afforestation',
    description_en: 'Restoring damaged coastal ecosystems in Cox\'s Bazar and Kuakata by planting native mangrove saplings.',
    description_bn: 'কক্সবাজার এবং কুয়াকাটায় দেশীয় ম্যানগ্রোভ চারা রোপণের মাধ্যমে ক্ষতিগ্রস্ত উপকূলীয় বাস্তুসংস্থান পুনরুদ্ধার করা।',
    content_en: 'The coastal belt of Bangladesh is highly vulnerable to cyclones, tidal surges, and soil erosion. Mangrove forests act as natural shields, safeguarding local communities while serving as rich carbon sinks. Our goal is to plant 20,000 saplings (Sundari, Keora, Gewa) along the coastal muddy soils, involving local schools and volunteers.',
    content_bn: 'বাংলাদেশের উপকূলীয় অঞ্চল ঘূর্ণিঝড়, জলোচ্ছ্বাস এবং নদী ভাঙনের জন্য অত্যন্ত ঝুঁকিপূর্ণ। ম্যানগ্রোভ বন প্রাকৃতিক ঢাল হিসেবে কাজ করে, যা কার্বন শোষণের পাশাপাশি স্থানীয় জনগণকে রক্ষা করে। আমাদের লক্ষ্য উপকূলীয় কর্দমাক্ত মাটিতে ২০,০০০ চারা (সুন্দরী, কেওড়া, গেওয়া) রোপণ করা, যার মধ্যে স্থানীয় স্কুল ও স্বেচ্ছাসেবকদের সম্পৃক্ত করা হবে।',
    image_url: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    start_date: '2026-01-10',
    goal_amount: 150000,
    raised_amount: 95000,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z'
  },
  {
    id: 'proj-2',
    title_en: 'Plastic-Free Campuses',
    title_bn: 'প্লাস্টিক-মুক্ত ক্যাম্পাস',
    slug: 'plastic-free-campuses',
    description_en: 'Encouraging educational institutions to reduce single-use plastic through recycling campaigns and dynamic awareness workshops.',
    description_bn: 'রিসাইক্লিং ক্যাম্পেইন এবং সচেতনতা কর্মশালার মাধ্যমে শিক্ষাপ্রতিষ্ঠানগুলোকে একবার ব্যবহারযোগ্য প্লাস্টিক বর্জনের জন্য উৎসাহিত করা।',
    content_en: 'Plastic pollution is choking our soil and waterways. This project establishes waste separation bins, banishes single-use plastic straws and cups from school cafeterias, and organizes student eco-clubs. We conduct interactive training workshops to make young minds active protectors of the environment.',
    content_bn: 'প্লাস্টিক দূষণ আমাদের মাটি ও জলাশয়কে ধ্বংস করছে। এই প্রকল্প ক্যাম্পাসে বর্জ্য বিভাজন বিন স্থাপন করে, স্কুল ক্যাফেটেরিয়া থেকে একবার ব্যবহারযোগ্য প্লাস্টিক স্ট্র ও কাপ বর্জন করে এবং শিক্ষার্থীদের ইকো-ক্লাব গঠন করে। তরুণ সমাজকে পরিবেশের সক্রিয় রক্ষক হিসেবে গড়ে তুলতে আমরা প্রশিক্ষণ পরিচালনা করি।',
    image_url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    start_date: '2026-03-01',
    goal_amount: 80000,
    raised_amount: 45000,
    created_at: '2026-03-01T00:00:00Z',
    updated_at: '2026-03-01T00:00:00Z'
  },
  {
    id: 'proj-3',
    title_en: 'Urban Green Spaces',
    title_bn: 'নগর সবুজায়ন প্রকল্প',
    slug: 'urban-green-spaces',
    description_en: 'Developing rooftop gardening models and vertical green setups in densely populated cities to improve air quality.',
    description_bn: 'ঘনবসতিপূর্ণ শহরগুলিতে বায়ু মান উন্নত করতে ছাদবাগান মডেল এবং উলম্ব সবুজ বাগান স্থাপন করা।',
    content_en: 'Urban heat islands are making major cities unlivable. By promoting rooftop farming, home gardening, and planting trees on vacant roadsides, we can bring back oxygen and cool down the concrete jungles. This project offers training, free saplings, and designs for urban families.',
    content_bn: 'শহুরে তাপমাত্রার বৃদ্ধি আমাদের শহরগুলোকে বসবাসের অযোগ্য করে তুলছে। ছাদবাগান, গৃহস্থালি বাগান এবং ফাঁকা রাস্তার পাশে গাছ রোপণের মাধ্যমে আমরা শহুরে তাপমাত্রা কমাতে পারি। এই প্রকল্প নগরবাসীদের বিনামূল্যে চারা বিতরণ, ডিজাইন প্রদান ও প্রশিক্ষণ দিয়ে থাকে।',
    image_url: 'https://images.unsplash.com/photo-1530741929650-ab7dec98a93e?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    start_date: '2025-05-01',
    end_date: '2025-12-15',
    goal_amount: 100000,
    raised_amount: 100000,
    created_at: '2025-05-01T00:00:00Z',
    updated_at: '2025-12-15T00:00:00Z'
  }
];

const INITIAL_EVENTS: Event[] = [
  {
    id: 'ev-1',
    project_id: 'proj-1',
    title_en: 'Kuakata Beach Mangrove Planting Drive',
    title_bn: 'কুয়াকাটা সৈকত ম্যানগ্রোভ রোপণ অভিযান',
    slug: 'kuakata-beach-mangrove-planting',
    description_en: 'Planting 2,000 Keora and Kankra saplings in the mudflats near Kuakata beach.',
    description_bn: 'কুয়াকাটা সমুদ্র সৈকতের নিকটবর্তী কর্দমাক্ত চরে ২,০০০ কেওড়া ও কাঁকড়া গাছের চারা রোপণ।',
    content_en: 'Join us for our largest planting drive of the season. We will assemble at Kuakata Zero Point at 7:00 AM. Refreshments, gloves, boots, and planting equipment will be provided to all registered volunteers.',
    content_bn: 'এই মৌসুমের আমাদের সবচেয়ে বড় বৃক্ষরোপণ অভিযানে অংশ নিন। আমরা সকাল ৭:০০ টায় কুয়াকাটা জিরো পয়েন্টে সমবেত হব। সকল নিবন্ধিত স্বেচ্ছাসেবককে দুপুরের খাবার, গ্লাভস, বুট এবং রোপণ সরঞ্জাম সরবরাহ করা হবে।',
    date: '2026-08-25T07:00:00',
    location_en: 'Kuakata Beach Coastal Area, Patuakhali',
    location_bn: 'কুয়াকাটা সৈকত সংলগ্ন উপকূলীয় অঞ্চল, পটুয়াখালী',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
    volunteer_limit: 100,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'ev-2',
    project_id: 'proj-2',
    title_en: 'Dhaka University Cleanup Campaign',
    title_bn: 'ঢাকা বিশ্ববিদ্যালয় পরিচ্ছন্নতা অভিযান',
    slug: 'dhaka-university-cleanup',
    description_en: 'A mass waste collection and awareness drive inside the University of Dhaka campus.',
    description_bn: 'ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাসের অভ্যন্তরে গণবর্জ্য সংগ্রহ এবং সচেতনতামূলক অভিযান।',
    content_en: 'We are organizing a comprehensive campus cleanup focusing on single-use plastic waste around TSC, Curzon Hall, and Mall Area. We aim to show students how separation of organic and plastic waste works at source.',
    content_bn: 'টিএসসি, কার্জন হল এবং মল চত্বরের আশেপাশে একবার ব্যবহারযোগ্য প্লাস্টিক বর্জ্যের প্রতি মনোযোগ দিয়ে ক্যাম্পাস পরিচ্ছন্নতা অভিযান আয়োজন করছি। আমরা শিক্ষার্থীদের দেখাব কীভাবে উৎস থেকে জৈব ও প্লাস্টিক বর্জ্য আলাদা করতে হয়।',
    date: '2026-07-15T09:00:00',
    location_en: 'TSC, Dhaka University, Dhaka',
    location_bn: 'টিএসসি, ঢাকা বিশ্ববিদ্যালয়, ঢাকা',
    image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    volunteer_limit: 50,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-15T18:00:00Z'
  },
  {
    id: 'ev-3',
    project_id: 'proj-1',
    title_en: 'Sundarbans Boundary Restoration',
    title_bn: 'সুন্দরবন সীমানা বনায়ন কর্মসূচি',
    slug: 'sundarbans-boundary-restoration',
    description_en: 'Planting buffer-zone trees along the villages adjacent to the Sundarbans forest.',
    description_bn: 'সুন্দরবনের পাশ্ববর্তী গ্রামের সীমানা বরাবর বাফার-জোনে চারা রোপণ কর্মসূচি।',
    content_en: 'Protecting the edges of the world\'s largest mangrove forest. By creating a green belt in local villages, we reduce soil salinity, safeguard embankment banks, and provide local community support.',
    content_bn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বনের সীমানা রক্ষা। স্থানীয় গ্রামগুলিতে সবুজ বেষ্টনী তৈরি করার মাধ্যমে আমরা মাটির লবণাক্ততা কমাই, বেড়িবাঁধ রক্ষা করি এবং স্থানীয় সম্প্রদায়ের জন্য কর্মসংস্থান সৃষ্টি করি।',
    date: '2026-06-05T08:00:00',
    location_en: 'Bagerhat Coastal Embankment, Bagerhat',
    location_bn: 'বাগেরহাট উপকূলীয় বেড়িবাঁধ, বাগেরহাট',
    image_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    volunteer_limit: 80,
    created_at: '2026-05-15T00:00:00Z',
    updated_at: '2026-06-05T18:00:00Z'
  }
];

const INITIAL_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name_en: 'Ecology', name_bn: 'বাস্তুসংস্থান', slug: 'ecology' },
  { id: 'cat-2', name_en: 'Waste Management', name_bn: 'বর্জ্য ব্যবস্থাপনা', slug: 'waste-management' },
  { id: 'cat-3', name_en: 'Campaign Updates', name_bn: 'অভিযান আপডেট', slug: 'campaign-updates' }
];

const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title_en: 'The Vital Shield: Why Mangroves Matter',
    title_bn: 'প্রাকৃতিক ঢাল: কেন ম্যানগ্রোভ বনায়ন জরুরি',
    slug: 'vital-shield-why-mangroves-matter',
    content_en: 'Mangroves are unique trees that grow in saltwater environments along coastal shorelines. Despite representing less than 0.5% of the world\'s tropical forests, they play an incredibly vital role in stabilizing shorelines, preventing erosion, and protecting land and people from hurricanes and storm surges. \n\nFurthermore, mangroves are champions in carbon storage. They can sequestrate up to 4 times more carbon than terrestrial rainforests. In Bangladesh, the Sundarbans and coastal plantations protect millions of lives. Supporting coastal reforestation is not just an option—it is key to survival against climate change.',
    content_bn: 'ম্যানগ্রোভ হল এমন অনন্য উদ্ভিদ যা উপকূলবর্তী লবণাক্ত জলে জন্মায়। বিশ্বের ক্রান্তীয় বনাঞ্চলের মাত্র ০.৫% এর কম ম্যানগ্রোভ হলেও এটি উপকূল রক্ষা, নদী ভাঙন রোধ এবং মানুষকে ঘূর্ণিঝড় ও জলোচ্ছ্বাস থেকে রক্ষা করতে অসাধারণ ভূমিকা পালন করে।\n\nএছাড়াও, কার্বন নিয়ন্ত্রণে ম্যানগ্রোভ অনন্য। তারা সাধারণ বনাঞ্চলের চেয়ে ৪ গুণ বেশি কার্বন ধরে রাখতে সক্ষম। বাংলাদেশে সুন্দরবন ও আমাদের উপকূলীয় বনায়ন লক্ষ লক্ষ মানুষের জীবন রক্ষা করে। তাই উপকূলীয় বনায়ন রক্ষা করা আমাদের জলবায়ু পরিবর্তনের বিরুদ্ধে টিকে থাকার প্রধান হাতিয়ার।',
    image_url: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    author_name: 'Dr. Rafiqul Islam',
    category_id: 'cat-1',
    tags: ['Mangroves', 'ClimateChange', 'CoastalShield'],
    status: 'published',
    published_at: '2026-08-01',
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'blog-2',
    title_en: '5 Simple Steps to Ban Single-Use Plastic',
    title_bn: 'একবার ব্যবহারযোগ্য প্লাস্টিক বর্জনের ৫টি সহজ ধাপ',
    slug: '5-steps-ban-single-use-plastic',
    content_en: 'Plastic pollution is one of the greatest environmental challenges of our generation. Every year, millions of tons of plastic enter our rivers and oceans, harming marine life and contaminating the food chain. Here are five actionable steps you can implement today to eliminate single-use plastics: \n\n1. Carry a reusable water bottle. \n2. Switch to jute or cotton bags for shopping. \n3. Say no to plastic straws and disposable cutlery. \n4. Buy dry goods in bulk to minimize packaging. \n5. Recycle plastic materials responsibly at home.',
    content_bn: 'প্লাস্টিক দূষণ আমাদের প্রজন্মের সবচেয়ে বড় পরিবেশগত চ্যালেঞ্জগুলির একটি। প্রতি বছর লক্ষ লক্ষ টন প্লাস্টিক নদী ও মহাসাগরে প্রবেশ করে সামুদ্রিক জীবনকে হুমকির মুখে ফেলছে। প্লাস্টিক বর্জন করার জন্য ৫টি সহজ পদক্ষেপ যা আপনি আজই নিতে পারেন:\n\n১. একটি পুনর্ব্যবহারযোগ্য জলের বোতল সাথে রাখুন।\n২. কেনাকাটার জন্য চটের ব্যাগ ব্যবহার করুন।\n৩. প্লাস্টিকের স্ট্র এবং ওয়ান-টাইম চামচ ব্যবহার থেকে বিরত থাকুন।\n৪. মোড়কের ব্যবহার কমাতে পাইকারি জিনিসপত্র কিনুন।\n৫. বাসাবাড়ির প্লাস্টিক বর্জ্য সঠিক স্থানে ফেলুন।',
    image_url: 'https://images.unsplash.com/photo-1526951914846-7a95961d7438?auto=format&fit=crop&w=800&q=80',
    author_name: 'Sadia Chowdhury',
    category_id: 'cat-2',
    tags: ['PlasticFree', 'ZeroWaste', 'EcoTips'],
    status: 'published',
    published_at: '2026-07-20',
    created_at: '2026-07-20T00:00:00Z',
    updated_at: '2026-07-20T00:00:00Z'
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', title_en: 'Trees Planted', title_bn: 'গাছ রোপণ করা হয়েছে', value: '12,500+', icon: 'Trees', order_index: 1 },
  { id: 'ach-2', title_en: 'Cleanup Campaigns', title_bn: 'পরিচ্ছন্নতা অভিযান', value: '45+', icon: 'Trash2', order_index: 2 },
  { id: 'ach-3', title_en: 'Active Volunteers', title_bn: 'সক্রিয় স্বেচ্ছাসেবক', value: '2,500+', icon: 'Users', order_index: 3 },
  { id: 'ach-4', title_en: 'District Coverage', title_bn: 'জেলাসমূহ', value: '12+', icon: 'MapPin', order_index: 4 }
];

const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-1',
    volunteer_id: 'VOL-2026-0001',
    name: 'Tanjib Ahmed',
    email: 'tanjib@example.com',
    phone: '01712345678',
    address_en: 'Dhanmondi, Dhaka',
    address_bn: 'ধানমণ্ডি, ঢাকা',
    blood_group: 'A+',
    occupation: 'Student',
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    bio: 'Environmental enthusiast willing to lead planting drives.',
    status: 'approved',
    joined_at: '2026-01-15T00:00:00Z',
    created_at: '2026-01-15T00:00:00Z'
  },
  {
    id: 'vol-2',
    volunteer_id: 'VOL-2026-0002',
    name: 'Rahim Uddin',
    email: 'rahim@example.com',
    phone: '01887654321',
    address_en: 'Chittagong',
    address_bn: 'চট্টগ্রাম',
    blood_group: 'O+',
    occupation: 'Software Engineer',
    bio: 'Wants to support green technology efforts.',
    status: 'approved',
    joined_at: '2026-03-10T00:00:00Z',
    created_at: '2026-03-10T00:00:00Z'
  },
  {
    id: 'vol-3',
    volunteer_id: '',
    name: 'Anika Rahman',
    email: 'anika@example.com',
    phone: '01511223344',
    address_en: 'Mirpur, Dhaka',
    address_bn: 'মিরপুর, ঢাকা',
    blood_group: 'B+',
    occupation: 'Student',
    bio: 'Passionate about coastal protection and recycling.',
    status: 'pending',
    joined_at: '',
    created_at: '2026-08-05T12:00:00Z'
  }
];

const INITIAL_PARTICIPATION: VolunteerParticipation[] = [
  {
    id: 'part-1',
    volunteer_id: 'vol-1',
    event_id: 'ev-2',
    status: 'attended',
    role_en: 'Team Lead',
    role_bn: 'দলনেতা',
    performance_notes: 'Led the TSC waste separation team wonderfully.'
  },
  {
    id: 'part-2',
    volunteer_id: 'vol-2',
    event_id: 'ev-2',
    status: 'attended',
    role_en: 'Area Coordinator',
    role_bn: 'এলাকা সমন্বয়ক',
    performance_notes: 'Excellent coordination of bags and supplies.'
  }
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificate_id: 'APF-CERT-2026-000101',
    volunteer_id: 'vol-1',
    event_id: 'ev-2',
    issue_date: '2026-07-16',
    template_id: 'temp-1',
    verify_code: 'VERIFY-101',
    volunteer_name: 'Tanjib Ahmed',
    event_title_en: 'Dhaka University Cleanup Campaign',
    event_title_bn: 'ঢাকা বিশ্ববিদ্যালয় পরিচ্ছন্নতা অভিযান'
  }
];

const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    donor_name: 'Imtiaz Khan',
    donor_email: 'imtiaz@example.com',
    donor_phone: '01912345678',
    amount: 5000,
    payment_method: 'bkash',
    transaction_id: 'BK123456XYZ',
    status: 'approved',
    message: 'Best wishes for the mangrove reforestation program!',
    created_at: '2026-07-28T14:30:00Z',
    approved_at: '2026-07-29T10:00:00Z'
  },
  {
    id: 'don-2',
    donor_name: 'Anonymous',
    donor_email: 'anon@example.com',
    amount: 1500,
    payment_method: 'nagad',
    transaction_id: 'NG987654AAA',
    status: 'pending',
    created_at: '2026-08-05T16:00:00Z'
  }
];

const INITIAL_ALBUMS: Album[] = [
  {
    id: 'alb-1',
    title_en: 'Kuakata Beach Plantation',
    title_bn: 'কুয়াকাটা সৈকত বনায়ন',
    description_en: 'Photos of mangrove sapling plantation near Kuakata sea shore.',
    description_bn: 'কুয়াকাটা সমুদ্র সৈকত এলাকায় ম্যানগ্রোভ চারা রোপণের স্থিরচিত্র।',
    cover_image_url: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=400&q=80',
    event_id: 'ev-1',
    created_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'alb-2',
    title_en: 'TSC Cleanup Campaign',
    title_bn: 'টিএসসি পরিচ্ছন্নতা অভিযান',
    description_en: 'Students collecting plastic wastes around Dhaka University TSC.',
    description_bn: 'ঢাকা বিশ্ববিদ্যালয় টিএসসি চত্বরে প্লাস্টিক বর্জ্য সংগ্রহ কর্মসূচি।',
    cover_image_url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80',
    event_id: 'ev-2',
    created_at: '2026-07-15T00:00:00Z'
  }
];

const INITIAL_MEDIA: Media[] = [
  {
    id: 'med-1',
    album_id: 'alb-1',
    file_url: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    file_name: 'plantation_1.jpg',
    file_size: 154200,
    mime_type: 'image/jpeg',
    created_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'med-2',
    album_id: 'alb-1',
    file_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    file_name: 'plantation_2.jpg',
    file_size: 184500,
    mime_type: 'image/jpeg',
    created_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'med-3',
    album_id: 'alb-2',
    file_url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    file_name: 'cleanup_1.jpg',
    file_size: 120500,
    mime_type: 'image/jpeg',
    created_at: '2026-07-15T00:00:00Z'
  },
  {
    id: 'med-4',
    album_id: 'alb-2',
    file_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    file_name: 'cleanup_2.jpg',
    file_size: 140000,
    mime_type: 'image/jpeg',
    created_at: '2026-07-15T00:00:00Z'
  }
];

const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Karimul Haq',
    email: 'karim@example.com',
    subject: 'School Awareness Partnerships',
    message: 'Hello, we would like to organize an environmental workshop in our high school. Please let us know the process.',
    status: 'unread',
    created_at: '2026-08-04T09:00:00Z'
  }
];

const INITIAL_SETTINGS: Setting[] = [
  { key: 'org_name_en', value: 'Alokito Poribesh Foundation' },
  { key: 'org_name_bn', value: 'আলোকিত পরিবেশ ফাউন্ডেশন' },
  { key: 'mission_en', value: 'Enlightened Environment for a Greener Tomorrow' },
  { key: 'mission_bn', value: 'সবুজ আগামী গড়তে পরিবেশের আলো' },
  { key: 'email', value: 'info@alokitoporibesh.org' },
  { key: 'phone', value: '+880 1700 000 000' },
  { key: 'address_en', value: 'House 12, Road 4, Dhanmondi, Dhaka, Bangladesh' },
  { key: 'address_bn', value: 'বাসা ১২, রোড ৪, ধানমণ্ডি, ঢাকা, বাংলাদেশ' },
  { key: 'facebook_url', value: 'https://facebook.com/AlokitoPoribesh' },
  { key: 'youtube_url', value: 'https://youtube.com/AlokitoPoribesh' },
  { key: 'logo_url', value: '' }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    admin_id: 'admin',
    admin_name: 'System Admin',
    action: 'INITIALIZE',
    target_table: 'Settings',
    target_id: 'system',
    details: 'Initial system workspace seeded successfully.',
    created_at: '2026-08-06T12:00:00Z'
  }
];

// LocalStorage helpers
const getLocal = <T>(key: string, initial: T): T => {
  const data = localStorage.getItem(`apf_${key}`);
  if (!data) {
    localStorage.setItem(`apf_${key}`, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

const setLocal = <T>(key: string, data: T): void => {
  localStorage.setItem(`apf_${key}`, JSON.stringify(data));
};

// ==========================================
// UNIFIED DATA SERVICE (SUPABASE OR LOCAL)
// ==========================================

export const db = {
  // Sync Status
  isLocalOnly: () => !supabase,

  // Projects
  getProjects: async (): Promise<Project[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Project[]>('projects', INITIAL_PROJECTS);
  },

  getProjectBySlug: async (slug: string): Promise<Project | null> => {
    if (supabase) {
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (!error && data) return data;
    }
    const projects = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    return projects.find(p => p.slug === slug) || null;
  },

  createProject: async (proj: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
    const timestamp = new Date().toISOString();
    const newProj: Project = {
      ...proj,
      id: `proj-${Date.now()}`,
      created_at: timestamp,
      updated_at: timestamp
    };
    if (supabase) {
      const { data, error } = await supabase.from('projects').insert([newProj]).select().single();
      if (!error && data) return data;
    }
    const projects = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    projects.unshift(newProj);
    setLocal('projects', projects);
    return newProj;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const timestamp = new Date().toISOString();
    if (supabase) {
      const { data, error } = await supabase.from('projects').update({ ...updates, updated_at: timestamp }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const projects = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    const updated = { ...projects[index], ...updates, updated_at: timestamp };
    projects[index] = updated;
    setLocal('projects', projects);
    return updated;
  },

  deleteProject: async (id: string): Promise<void> => {
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
      return;
    }
    const projects = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    const filtered = projects.filter(p => p.id !== id);
    setLocal('projects', filtered);
  },

  // Events
  getEvents: async (): Promise<Event[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (!error && data) return data;
    }
    return getLocal<Event[]>('events', INITIAL_EVENTS);
  },

  getEventBySlug: async (slug: string): Promise<Event | null> => {
    if (supabase) {
      const { data, error } = await supabase.from('events').select('*').eq('slug', slug).single();
      if (!error && data) return data;
    }
    const events = getLocal<Event[]>('events', INITIAL_EVENTS);
    return events.find(e => e.slug === slug) || null;
  },

  createEvent: async (ev: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> => {
    const timestamp = new Date().toISOString();
    const newEvent: Event = {
      ...ev,
      id: `ev-${Date.now()}`,
      created_at: timestamp,
      updated_at: timestamp
    };
    if (supabase) {
      const { data, error } = await supabase.from('events').insert([newEvent]).select().single();
      if (!error && data) return data;
    }
    const events = getLocal<Event[]>('events', INITIAL_EVENTS);
    events.unshift(newEvent);
    setLocal('events', events);
    return newEvent;
  },

  updateEvent: async (id: string, updates: Partial<Event>): Promise<Event> => {
    const timestamp = new Date().toISOString();
    if (supabase) {
      const { data, error } = await supabase.from('events').update({ ...updates, updated_at: timestamp }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const events = getLocal<Event[]>('events', INITIAL_EVENTS);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');
    const updated = { ...events[index], ...updates, updated_at: timestamp };
    events[index] = updated;
    setLocal('events', events);
    return updated;
  },

  deleteEvent: async (id: string): Promise<void> => {
    if (supabase) {
      await supabase.from('events').delete().eq('id', id);
      return;
    }
    const events = getLocal<Event[]>('events', INITIAL_EVENTS);
    const filtered = events.filter(e => e.id !== id);
    setLocal('events', filtered);
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Blog[]>('blogs', INITIAL_BLOGS);
  },

  getBlogBySlug: async (slug: string): Promise<Blog | null> => {
    if (supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (!error && data) return data;
    }
    const blogs = getLocal<Blog[]>('blogs', INITIAL_BLOGS);
    return blogs.find(b => b.slug === slug) || null;
  },

  createBlog: async (bl: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> => {
    const timestamp = new Date().toISOString();
    const newBlog: Blog = {
      ...bl,
      id: `blog-${Date.now()}`,
      created_at: timestamp,
      updated_at: timestamp
    };
    if (supabase) {
      const { data, error } = await supabase.from('blogs').insert([newBlog]).select().single();
      if (!error && data) return data;
    }
    const blogs = getLocal<Blog[]>('blogs', INITIAL_BLOGS);
    blogs.unshift(newBlog);
    setLocal('blogs', blogs);
    return newBlog;
  },

  updateBlog: async (id: string, updates: Partial<Blog>): Promise<Blog> => {
    const timestamp = new Date().toISOString();
    if (supabase) {
      const { data, error } = await supabase.from('blogs').update({ ...updates, updated_at: timestamp }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const blogs = getLocal<Blog[]>('blogs', INITIAL_BLOGS);
    const index = blogs.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Blog not found');
    const updated = { ...blogs[index], ...updates, updated_at: timestamp };
    blogs[index] = updated;
    setLocal('blogs', blogs);
    return updated;
  },

  deleteBlog: async (id: string): Promise<void> => {
    if (supabase) {
      await supabase.from('blogs').delete().eq('id', id);
      return;
    }
    const blogs = getLocal<Blog[]>('blogs', INITIAL_BLOGS);
    const filtered = blogs.filter(b => b.id !== id);
    setLocal('blogs', filtered);
  },

  // Albums
  getAlbums: async (): Promise<Album[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('albums').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Album[]>('albums', INITIAL_ALBUMS);
  },

  getAlbumById: async (id: string): Promise<Album | null> => {
    if (supabase) {
      const { data, error } = await supabase.from('albums').select('*').eq('id', id).single();
      if (!error && data) return data;
    }
    const albums = getLocal<Album[]>('albums', INITIAL_ALBUMS);
    return albums.find(a => a.id === id) || null;
  },

  createAlbum: async (album: Omit<Album, 'id' | 'created_at'>): Promise<Album> => {
    const newAlbum: Album = {
      ...album,
      id: `album-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('albums').insert([newAlbum]).select().single();
      if (!error && data) return data;
    }
    const albums = getLocal<Album[]>('albums', INITIAL_ALBUMS);
    albums.unshift(newAlbum);
    setLocal('albums', albums);
    return newAlbum;
  },

  deleteAlbum: async (id: string): Promise<void> => {
    if (supabase) {
      await supabase.from('albums').delete().eq('id', id);
      return;
    }
    const albums = getLocal<Album[]>('albums', INITIAL_ALBUMS);
    const filtered = albums.filter(a => a.id !== id);
    setLocal('albums', filtered);
  },

  // Media
  getMediaByAlbum: async (albumId: string): Promise<Media[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('media').select('*').eq('album_id', albumId);
      if (!error && data) return data;
    }
    const allMedia = getLocal<Media[]>('media', INITIAL_MEDIA);
    return allMedia.filter(m => m.album_id === albumId);
  },

  uploadMedia: async (media: Omit<Media, 'id' | 'created_at'>): Promise<Media> => {
    const newMedia: Media = {
      ...media,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('media').insert([newMedia]).select().single();
      if (!error && data) return data;
    }
    const allMedia = getLocal<Media[]>('media', INITIAL_MEDIA);
    allMedia.push(newMedia);
    setLocal('media', allMedia);
    return newMedia;
  },

  deleteMedia: async (id: string): Promise<void> => {
    if (supabase) {
      await supabase.from('media').delete().eq('id', id);
      return;
    }
    const allMedia = getLocal<Media[]>('media', INITIAL_MEDIA);
    const filtered = allMedia.filter(m => m.id !== id);
    setLocal('media', filtered);
  },

  getCategories: async (): Promise<BlogCategory[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('blog_categories').select('*');
      if (!error && data) return data;
    }
    return getLocal<BlogCategory[]>('blog_categories', INITIAL_CATEGORIES);
  },

  // Volunteers
  getVolunteers: async (): Promise<Volunteer[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Volunteer[]>('volunteers', INITIAL_VOLUNTEERS);
  },

  registerVolunteer: async (v: Omit<Volunteer, 'id' | 'volunteer_id' | 'status' | 'joined_at' | 'created_at'>): Promise<Volunteer> => {
    const newVol: Volunteer = {
      ...v,
      id: `vol-${Date.now()}`,
      volunteer_id: '',
      status: 'pending',
      joined_at: '',
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('volunteers').insert([newVol]).select().single();
      if (!error && data) return data;
    }
    const volunteers = getLocal<Volunteer[]>('volunteers', INITIAL_VOLUNTEERS);
    volunteers.unshift(newVol);
    setLocal('volunteers', volunteers);
    return newVol;
  },

  updateVolunteer: async (id: string, updates: Partial<Volunteer>): Promise<Volunteer> => {
    // Auto-generate volunteer_id if approved and empty
    const modifiedUpdates = { ...updates };
    if (modifiedUpdates.status === 'approved' && (!modifiedUpdates.volunteer_id || modifiedUpdates.volunteer_id === '')) {
      const count = getLocal<Volunteer[]>('volunteers', INITIAL_VOLUNTEERS).filter(v => v.volunteer_id !== '').length + 1;
      const serial = String(count).padStart(4, '0');
      modifiedUpdates.volunteer_id = `VOL-2026-${serial}`;
      modifiedUpdates.joined_at = new Date().toISOString();
    }

    if (supabase) {
      const { data, error } = await supabase.from('volunteers').update(modifiedUpdates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const volunteers = getLocal<Volunteer[]>('volunteers', INITIAL_VOLUNTEERS);
    const index = volunteers.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Volunteer not found');
    const updated = { ...volunteers[index], ...modifiedUpdates };
    volunteers[index] = updated;
    setLocal('volunteers', volunteers);
    return updated;
  },

  // Volunteer Participations
  getParticipationsByEvent: async (eventId: string): Promise<VolunteerParticipation[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('volunteer_participation').select('*').eq('event_id', eventId);
      if (!error && data) return data;
    }
    const all = getLocal<VolunteerParticipation[]>('participation', INITIAL_PARTICIPATION);
    return all.filter(p => p.event_id === eventId);
  },

  logParticipation: async (part: Omit<VolunteerParticipation, 'id'>): Promise<VolunteerParticipation> => {
    const newPart: VolunteerParticipation = {
      ...part,
      id: `part-${Date.now()}`
    };
    if (supabase) {
      const { data, error } = await supabase.from('volunteer_participation').insert([newPart]).select().single();
      if (!error && data) return data;
    }
    const participations = getLocal<VolunteerParticipation[]>('participation', INITIAL_PARTICIPATION);
    participations.push(newPart);
    setLocal('participation', participations);
    return newPart;
  },

  // Certificates
  getCertificates: async (): Promise<Certificate[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('certificates').select('*').order('issue_date', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
  },

  getCertificateById: async (certId: string): Promise<Certificate | null> => {
    if (supabase) {
      const { data, error } = await supabase.from('certificates').select('*').eq('certificate_id', certId).single();
      if (!error && data) return data;
    }
    const certs = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    const cert = certs.find(c => c.certificate_id.toUpperCase() === certId.toUpperCase()) || null;
    if (cert) {
      // Resolve joins for mock
      const vols = getLocal<Volunteer[]>('volunteers', INITIAL_VOLUNTEERS);
      const evs = getLocal<Event[]>('events', INITIAL_EVENTS);
      const vol = vols.find(v => v.id === cert.volunteer_id);
      const ev = evs.find(e => e.id === cert.event_id);
      return {
        ...cert,
        volunteer_name: vol ? vol.name : 'Unknown Volunteer',
        event_title_en: ev ? ev.title_en : 'Cleanup Drive',
        event_title_bn: ev ? ev.title_bn : 'পরিচ্ছন্নতা অভিযান'
      };
    }
    return null;
  },

  generateCertificate: async (cert: Omit<Certificate, 'id' | 'issue_date' | 'verify_code'>): Promise<Certificate> => {
    const issueDate = new Date().toISOString().split('T')[0];
    const verifyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      issue_date: issueDate,
      verify_code: `VERIFY-${verifyCode}`
    };

    if (supabase) {
      const { data, error } = await supabase.from('certificates').insert([newCert]).select().single();
      if (!error && data) return data;
    }

    const certs = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    certs.unshift(newCert);
    setLocal('certificates', certs);
    return newCert;
  },

  // Donations
  getDonations: async (): Promise<Donation[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Donation[]>('donations', INITIAL_DONATIONS);
  },

  submitDonationProof: async (d: Omit<Donation, 'id' | 'status' | 'created_at'>): Promise<Donation> => {
    const newDon: Donation = {
      ...d,
      id: `don-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('donations').insert([newDon]).select().single();
      if (!error && data) return data;
    }
    const donations = getLocal<Donation[]>('donations', INITIAL_DONATIONS);
    donations.unshift(newDon);
    setLocal('donations', donations);
    return newDon;
  },

  updateDonationStatus: async (id: string, status: DonationStatus): Promise<Donation> => {
    const approvedAt = status === 'approved' ? new Date().toISOString() : undefined;
    if (supabase) {
      const { data, error } = await supabase.from('donations').update({ status, approved_at: approvedAt }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const donations = getLocal<Donation[]>('donations', INITIAL_DONATIONS);
    const index = donations.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Donation record not found');
    const updated = { ...donations[index], status, approved_at: approvedAt };
    donations[index] = updated;
    setLocal('donations', donations);
    return updated;
  },

  // Achievements / Stats
  getAchievements: async (): Promise<Achievement[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('achievements').select('*').order('order_index', { ascending: true });
      if (!error && data) return data;
    }
    return getLocal<Achievement[]>('achievements', INITIAL_ACHIEVEMENTS);
  },

  updateAchievement: async (id: string, value: string): Promise<Achievement> => {
    if (supabase) {
      const { data, error } = await supabase.from('achievements').update({ value }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const achievements = getLocal<Achievement[]>('achievements', INITIAL_ACHIEVEMENTS);
    const index = achievements.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Achievement not found');
    const updated = { ...achievements[index], value };
    achievements[index] = updated;
    setLocal('achievements', achievements);
    return updated;
  },

  // Contact Messages
  getContactMessages: async (): Promise<ContactMessage[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<ContactMessage[]>('contact_messages', INITIAL_CONTACT_MESSAGES);
  },

  submitContactMessage: async (msg: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<ContactMessage> => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'unread',
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('contact_messages').insert([newMsg]).select().single();
      if (!error && data) return data;
    }
    const messages = getLocal<ContactMessage[]>('contact_messages', INITIAL_CONTACT_MESSAGES);
    messages.unshift(newMsg);
    setLocal('contact_messages', messages);
    return newMsg;
  },

  updateContactMessage: async (id: string, status: 'unread' | 'read' | 'replied' | 'archived'): Promise<ContactMessage> => {
    if (supabase) {
      const { data, error } = await supabase.from('contact_messages').update({ status }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const messages = getLocal<ContactMessage[]>('contact_messages', INITIAL_CONTACT_MESSAGES);
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Message not found');
    const updated = { ...messages[index], status };
    messages[index] = updated;
    setLocal('contact_messages', messages);
    return updated;
  },

  // Settings
  getSettings: async (): Promise<Setting[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('settings').select('*');
      if (!error && data) return data;
    }
    return getLocal<Setting[]>('settings', INITIAL_SETTINGS);
  },

  updateSettings: async (settingsMap: Record<string, string>): Promise<void> => {
    if (supabase) {
      const promises = Object.entries(settingsMap).map(([key, value]) => 
        supabase.from('settings').upsert({ key, value })
      );
      await Promise.all(promises);
      return;
    }
    const current = getLocal<Setting[]>('settings', INITIAL_SETTINGS);
    const updated = current.map(s => {
      if (settingsMap[s.key] !== undefined) {
        return { ...s, value: settingsMap[s.key] };
      }
      return s;
    });
    // Add new settings if they didn't exist
    Object.entries(settingsMap).forEach(([key, value]) => {
      if (!updated.some(s => s.key === key)) {
        updated.push({ key, value });
      }
    });
    setLocal('settings', updated);
  },

  // Audit Logs
  getAuditLogs: async (): Promise<AuditLog[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
  },

  logAction: async (adminName: string, action: string, table: string, targetId: string, details: string): Promise<AuditLog> => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      admin_id: 'admin',
      admin_name: adminName,
      action,
      target_table: table,
      target_id: targetId,
      details,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data } = await supabase.from('audit_logs').insert([newLog]).select().single();
      if (data) return data;
    }
    const logs = getLocal<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
    logs.unshift(newLog);
    setLocal('audit_logs', logs);
    return newLog;
  },

  // Statistics Summary for Admin Dashboard DashboardOverview
  getStats: async () => {
    const events = await db.getEvents();
    const volunteers = await db.getVolunteers();
    const donations = await db.getDonations();
    const certificates = await db.getCertificates();

    const activeCampaigns = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length;
    const totalVolunteers = volunteers.filter(v => v.status === 'approved').length;
    const totalApprovedDonations = donations
      .filter(d => d.status === 'approved')
      .reduce((sum, d) => sum + d.amount, 0);

    return {
      activeCampaigns,
      totalVolunteers,
      totalApprovedDonations,
      issuedCertificates: certificates.length,
      pendingVolunteersCount: volunteers.filter(v => v.status === 'pending').length,
      pendingDonationsCount: donations.filter(d => d.status === 'pending').length
    };
  }
};
