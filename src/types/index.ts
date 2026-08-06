export interface Organization {
  id: string;
  name_en: string;
  name_bn: string;
  mission_en: string;
  mission_bn: string;
  vision_en: string;
  vision_bn: string;
  email: string;
  phone: string;
  address_en: string;
  address_bn: string;
  logo_url?: string;
  facebook_url?: string;
  youtube_url?: string;
  instagram_url?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'coordinator';
}

export type ProjectStatus = 'planning' | 'active' | 'completed' | 'archived';

export interface Project {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  description_en: string;
  description_bn: string;
  content_en: string;
  content_bn: string;
  image_url: string;
  status: ProjectStatus;
  start_date: string;
  end_date?: string;
  goal_amount?: number;
  raised_amount?: number;
  created_at: string;
  updated_at: string;
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  project_id?: string; // Optional parent project
  title_en: string;
  title_bn: string;
  slug: string;
  description_en: string;
  description_bn: string;
  content_en: string;
  content_bn: string;
  date: string;
  location_en: string;
  location_bn: string;
  image_url: string;
  status: EventStatus;
  volunteer_limit?: number;
  created_at: string;
  updated_at: string;
}

export type VolunteerStatus = 'pending' | 'approved' | 'rejected' | 'inactive';

export interface Volunteer {
  id: string;
  volunteer_id: string; // e.g., VOL-2026-0001
  name: string;
  email: string;
  phone: string;
  address_en: string;
  address_bn: string;
  blood_group: string;
  occupation: string;
  photo_url?: string;
  bio?: string;
  status: VolunteerStatus;
  joined_at: string;
  created_at: string;
}

export type ParticipationStatus = 'registered' | 'attended' | 'absent';

export interface VolunteerParticipation {
  id: string;
  volunteer_id: string;
  event_id: string;
  status: ParticipationStatus;
  role_en: string;
  role_bn: string;
  performance_notes?: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  title_template_en: string;
  title_template_bn: string;
  body_template_en: string;
  body_template_bn: string;
  signature_title_en: string;
  signature_title_bn: string;
  signature_name_en: string;
  signature_name_bn: string;
}

export interface Certificate {
  id: string;
  certificate_id: string; // e.g., APF-CERT-2026-000145
  volunteer_id: string;
  event_id: string;
  issue_date: string;
  template_id: string;
  verify_code: string;
  // Joins
  volunteer_name?: string;
  event_title_en?: string;
  event_title_bn?: string;
}

export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogCategory {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
}

export interface Blog {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  content_en: string;
  content_bn: string;
  image_url: string;
  author_name: string;
  category_id: string;
  tags: string[]; // Array of strings (tags)
  status: BlogStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  title_en: string;
  title_bn: string;
  description_en?: string;
  description_bn?: string;
  cover_image_url: string;
  project_id?: string;
  event_id?: string;
  created_at: string;
}

export interface Media {
  id: string;
  album_id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  title_en: string;
  title_bn: string;
  value: string; // e.g., "10K+", "50+", etc.
  icon: string; // Lucide icon name
  order_index: number;
}

export type DonationStatus = 'pending' | 'approved' | 'rejected';

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  amount: number;
  payment_method: 'bkash' | 'nagad' | 'bank' | 'other';
  transaction_id: string;
  status: DonationStatus;
  message?: string;
  created_at: string;
  approved_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  target_table: string;
  target_id: string;
  details: string;
  created_at: string;
}

export interface Setting {
  key: string;
  value: string;
}
