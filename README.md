# Alokito Poribesh Foundation Platform
### AI Project Specification (APS)

> Version: 1.0.0
>
> Status: Planning
>
> Project Type: Full Stack Web Platform
>
> Organization: Alokito Poribesh Foundation
>
> License: MIT (Recommended)

---

# Overview

Alokito Poribesh Foundation Platform is a modern, scalable, multilingual web application designed for managing a non-profit environmental organization.

The platform is intended to serve both the public and internal administration from a single unified system.

Instead of being only a traditional informational website, the platform acts as the organization's complete digital ecosystem.

The platform should be modular, maintainable, secure, and scalable for long-term growth.

---

# Primary Goals

The platform should allow the organization to:

- Showcase activities
- Publish blogs
- Share event galleries
- Accept volunteers
- Receive donations
- Display achievements
- Verify certificates
- Manage organizational content
- Generate certificates
- Maintain volunteer records
- Present transparency reports
- Support multiple languages
- Build public trust

---

# Long-term Vision

The long-term goal is to create a centralized digital platform where every organizational activity can be managed without relying on third-party software.

The architecture should support future expansion including:

- Volunteer Portal
- Member Portal
- Mobile Application
- Attendance System
- QR Check-in
- Digital ID Cards
- Project Management
- Financial Reporting
- Inventory Management
- API Integrations

without major architectural changes.

---

# Core Principles

The platform should follow these principles.

## Simplicity

Every feature should be easy to understand and easy to maintain.

---

## Scalability

Every module should be independently expandable.

The system must support growth without requiring major rewrites.

---

## Reusability

Reusable components should always be preferred over duplicated code.

---

## Performance

The platform should remain lightweight and fast.

Performance is considered a core feature.

---

## Accessibility

The website should be usable for everyone.

Accessibility should follow WCAG recommendations whenever practical.

---

## Mobile First

Every screen must be fully responsive.

Mobile users should receive the same experience as desktop users.

---

## Security

Security is mandatory.

Never trust frontend input.

Every request must be validated.

---

## Maintainability

The project should remain understandable for future developers.

Code should be readable before being clever.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- React Hook Form
- Zod
- TanStack Query
- React i18next

---

## Backend

- Supabase

---

## Database

- PostgreSQL

---

## Storage

- Supabase Storage

---

## Authentication

- Supabase Auth

Only administrators require authentication.

Public visitors never need an account.

---

## Deployment

Frontend

- Vercel

Database

- Supabase

Repository

- GitHub

DNS

- Cloudflare

Domain

- alokitoporibesh.org

---

# Public Website Modules

The public website includes:

- Home
- About
- Projects
- Events
- Gallery
- Blog
- Donate
- Join as Volunteer
- Certificate Verification
- Contact
- Privacy Policy
- Terms

---

# Administration Modules

The administration dashboard includes:

- Dashboard
- Blogs
- Gallery
- Projects
- Events
- Volunteers
- Certificates
- Achievements
- Donations
- Reports
- Website Settings
- Admin Management

---

# Supported Languages

The platform must support multilingual content.

Initial languages:

- English
- Bangla

Additional languages should be easy to add later.

---

# User Types

There are only two user types in Version 1.

## Public User

No login required.

Can:

- Browse website
- Read blogs
- View projects
- View gallery
- Register as volunteer
- Donate
- Verify certificates

---

## Administrator

Authentication required.

Can:

- Manage website
- Publish blogs
- Upload galleries
- Create projects
- Manage events
- Generate certificates
- Manage volunteers
- Update achievements
- Manage settings

---

# Out of Scope (Version 1)

The following features are intentionally excluded.

- Volunteer Login
- Member Portal
- Attendance Tracking
- QR Event Check-in
- Inventory System
- Financial Accounting
- Mobile Application
- Public User Accounts

These may be added in future versions.

---

# Documentation Structure

This repository contains the following documentation.

docs/

├── README.md

├── PRD.md

├── 01_Project_Overview.md

├── 02_Brand_Guidelines.md

├── 03_Information_Architecture.md

├── 04_UI_UX_Specification.md

├── 05_Design_System.md

├── 06_Database_Design.md

├── 07_Backend_Architecture.md

├── 08_API_Specification.md

├── 09_Admin_Dashboard.md

├── 10_Certificate_System.md

├── 11_Security.md

├── 12_Deployment.md

├── 13_AI_Development_Rules.md

└── ROADMAP.md

---

# Development Philosophy

This project follows the philosophy:

> "Build once, scale for years."

Every architectural decision should prioritize long-term maintainability over short-term convenience.

---

# Project Status

Current Phase

Planning & Documentation

Next Step

Create Product Requirement Document (PRD)

---

End of README.md


# Product Requirements Document (PRD)

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - 01_Project_Overview.md
> - ROADMAP.md

---

# 1. Executive Summary

Alokito Poribesh Foundation Platform is a modern web-based digital ecosystem for managing a non-profit environmental organization.

The platform will serve as the organization's official digital presence while also providing internal administrative tools for managing volunteers, events, projects, certificates, media, and organizational achievements.

The objective is to replace scattered manual workflows with one centralized, secure, and scalable platform.

---

# 2. Problem Statement

The organization currently lacks a centralized digital system.

Information is distributed across multiple social media platforms and documents, making it difficult to:

- Showcase organizational impact
- Organize volunteer information
- Maintain historical records
- Publish events consistently
- Verify issued certificates
- Present transparency
- Build public trust
- Scale organizational operations

The absence of a centralized platform also increases manual work and reduces efficiency.

---

# 3. Vision

Create a trusted, modern, scalable and maintainable digital platform that represents the organization's mission and simplifies operational management.

The platform should continue serving the organization for many years with minimal architectural changes.

---

# 4. Mission

Build a complete web platform that allows:

- Public engagement
- Volunteer recruitment
- Donation collection
- Project documentation
- Certificate verification
- Administrative management

through one unified system.

---

# 5. Product Goals

The platform should:

- Increase organizational credibility
- Improve transparency
- Reduce manual administrative work
- Preserve organizational history
- Improve volunteer management
- Improve public communication
- Support future organizational growth

---

# 6. Success Metrics

The project will be considered successful if it can:

- Publish projects without developer assistance
- Publish blogs through the admin dashboard
- Upload galleries through the dashboard
- Generate certificates within one minute
- Verify certificates publicly using QR codes
- Register volunteers digitally
- Display live organizational statistics
- Support both Bangla and English
- Maintain responsive performance on desktop and mobile

---

# 7. Target Audience

## Primary Audience

- Students
- Volunteers
- Environmental activists
- Donors
- Local communities
- Educational institutions

---

## Secondary Audience

- Sponsors
- Partner organizations
- Government organizations
- International collaborators
- Media
- Researchers

---

# 8. Stakeholders

## Internal

- Executive Committee
- Administrators
- Project Coordinators
- Media Team
- Volunteer Management Team

---

## External

- Volunteers
- Donors
- Visitors
- Sponsors
- Educational Institutions
- Government Agencies

---

# 9. Project Scope

## Included

- Public Website
- Admin Dashboard
- Blog Management
- Gallery Management
- Event Management
- Project Management
- Volunteer Registration
- Donation Information
- Certificate Generation
- QR Verification
- Achievement Tracking
- Contact Management
- Website Settings
- Multi-language Support

---

## Excluded (Version 1)

- Volunteer Login Portal
- Mobile Application
- Attendance System
- Event QR Check-in
- Inventory Management
- Accounting System
- Payment Gateway Automation
- Membership Subscription

---

# 10. Functional Requirements

The system shall allow administrators to:

- Create blogs
- Edit blogs
- Delete blogs
- Publish blogs

---

The system shall allow administrators to:

- Create projects
- Archive projects
- Upload galleries
- Create events
- Manage certificates
- Manage volunteers

---

The public shall be able to:

- Browse website
- Read blogs
- View projects
- View galleries
- Register as volunteers
- Submit contact forms
- Verify certificates

---

# 11. Non-Functional Requirements

The system should be:

- Fast
- Secure
- Mobile Responsive
- SEO Friendly
- Accessible
- Modular
- Maintainable
- Scalable
- Reliable

---

# 12. Constraints

The project should prioritize:

- Open-source technologies
- Low operating cost
- Easy deployment
- Easy maintenance
- Cloud-native architecture

The system should avoid vendor lock-in whenever possible.

---

# 13. Assumptions

- Internet connection is available.
- Administrators have basic computer literacy.
- The organization owns its domain.
- Images and documents will be uploaded digitally.
- Volunteers may not have user accounts.

---

# 14. Risks

Potential risks include:

- Poor documentation
- Inconsistent data entry
- Media storage growth
- Security misconfiguration
- Database corruption
- Unauthorized admin access

Mitigation strategies should be documented during implementation.

---

# 15. Guiding Principles

Every decision should prioritize:

- Simplicity
- Transparency
- Performance
- Maintainability
- Accessibility
- Security
- Scalability

---

# 16. Product Philosophy

This platform is not intended to be only a website.

It is intended to become the organization's primary digital operating platform.

The public website represents the organization externally.

The administration system supports internal organizational operations.

Both should evolve together as one unified product.

---

# 17. Future Expansion

The architecture should support future implementation of:

- Volunteer Portal
- Digital Membership
- Mobile App
- QR Attendance
- Digital ID Cards
- Automated Reports
- Impact Dashboard
- Sponsor Portal
- REST API
- Public Open Data

without major architectural redesign.

---

# 18. Acceptance Criteria

Version 1 will be considered complete when:

- All public pages are functional.
- Admin dashboard manages all content.
- Volunteer registration works correctly.
- Certificate generation works reliably.
- QR verification works publicly.
- Achievement statistics are manageable.
- Bangla and English are fully supported.
- The website is responsive.
- The system is successfully deployed.

---

# End of Document


# 01 - Project Overview

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 02_Brand_Guidelines.md
> - ROADMAP.md

---

# 1. Introduction

The Alokito Poribesh Foundation Platform is a modern full-stack web application built to digitally empower the activities of Alokito Poribesh Foundation.

The platform combines a professional public-facing website with an internal administration system, allowing the organization to manage its operations efficiently while maintaining transparency and credibility.

The goal is not simply to build a website, but to establish a long-term digital infrastructure that grows with the organization.

---

# 2. Organization Overview

Alokito Poribesh Foundation is a non-profit environmental organization dedicated to creating positive environmental and social impact through volunteer-driven initiatives.

The organization focuses on activities such as:

- Tree Plantation
- Environmental Awareness
- Cleanup Campaigns
- Fish Fry Release
- Community Engagement
- Educational Programs
- Social Responsibility Projects

The platform should accurately represent these efforts while making them accessible to the public.

---

# 3. Vision

To become a trusted, transparent, and technology-driven environmental organization that inspires positive change through community action.

---

# 4. Mission

To build a centralized digital ecosystem that enables the organization to:

- Communicate effectively
- Showcase impact
- Manage operations
- Preserve historical records
- Engage volunteers
- Increase transparency

---

# 5. Product Vision

The platform should become the organization's digital headquarters.

Everything related to the organization should eventually be manageable from this single platform.

Examples include:

- Website
- Events
- Projects
- Certificates
- Volunteers
- Reports
- Statistics
- Media
- Future Mobile Applications

---

# 6. Objectives

The project aims to:

- Establish a strong online presence.
- Improve organizational credibility.
- Digitize manual workflows.
- Preserve institutional knowledge.
- Support future growth.
- Reduce administrative overhead.
- Increase public engagement.

---

# 7. Core Values

The platform should reflect the organization's values.

## Transparency

Information should be publicly accessible whenever appropriate.

---

## Sustainability

The system should be maintainable for many years.

---

## Simplicity

Every workflow should remain intuitive.

---

## Trust

Public-facing information should be authentic and verifiable.

---

## Accessibility

The platform should be usable across devices and by users with varying abilities.

---

# 8. High-Level Modules

The platform is divided into two primary sections.

## Public Platform

Accessible without login.

Modules include:

- Home
- About
- Projects
- Events
- Gallery
- Blog
- Donate
- Join as Volunteer
- Certificate Verification
- Contact

---

## Administration Platform

Accessible only to administrators.

Modules include:

- Dashboard
- Blog Manager
- Gallery Manager
- Event Manager
- Project Manager
- Volunteer Manager
- Certificate Generator
- Achievement Manager
- Reports
- Website Settings

---

# 9. User Types

## Visitor

A public user who can:

- Browse the website
- Read blogs
- View projects
- Explore galleries
- Register as a volunteer
- Donate
- Verify certificates

---

## Administrator

An authenticated user who manages the platform and organizational content.

Administrators have complete control over content and operational modules.

---

# 10. System Architecture Overview

The platform consists of four major layers.

Frontend

↓

Backend Services

↓

Database

↓

Storage

The architecture should remain modular to allow independent upgrades of each layer.

---

# 11. Information Flow

Public Users

↓

Website

↓

Public Data

---

Administrators

↓

Dashboard

↓

Database

↓

Website Updates Automatically

---

Certificate Verification

↓

QR Code

↓

Verification Page

↓

Database Lookup

↓

Verified Result

---

# 12. Future Scalability

The architecture should support future modules without requiring major redesign.

Examples include:

- Volunteer Portal
- Member Portal
- Mobile Application
- Attendance Tracking
- QR Event Check-in
- Digital Membership
- REST API
- Public API
- Sponsor Dashboard

---

# 13. Design Philosophy

The user experience should be:

- Clean
- Minimal
- Professional
- Trustworthy
- Friendly
- Fast

The visual identity should prioritize clarity over decoration.

---

# 14. Content Philosophy

Every published content should communicate real organizational impact.

The platform should avoid unnecessary marketing language and instead emphasize authentic stories, measurable outcomes, and transparency.

---

# 15. Success Definition

The platform succeeds when it enables the organization to:

- Publish new content without developer assistance.
- Manage organizational data efficiently.
- Build trust with the public.
- Preserve historical records.
- Scale operations confidently.

---

# 16. Future Vision

The long-term vision is for the platform to evolve into the central digital operating system of Alokito Poribesh Foundation.

As the organization grows, the platform should continue to support new workflows, technologies, and user needs without compromising stability or usability.

---

# End of Document


# 02 - Brand Guidelines

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 01_Project_Overview.md
> - 04_UI_UX_Specification.md
> - 05_Design_System.md

---

# 1. Brand Identity

Alokito Poribesh Foundation is a modern, transparent, community-driven environmental organization.

The visual identity should reflect hope, trust, nature, sustainability and professionalism.

The brand should never feel corporate, political or commercial.

It should feel:

- Human
- Friendly
- Honest
- Professional
- Inspiring
- Modern

---

# 2. Brand Personality

The platform should communicate:

## Honest

Show real impact.

Avoid exaggerated marketing.

---

## Trustworthy

Transparency is more important than decoration.

---

## Modern

Simple interface.

Modern interactions.

Clean typography.

---

## Calm

The interface should never feel noisy.

Animations should be subtle.

---

## Community Focused

Real volunteers.

Real activities.

Real stories.

---

# 3. Design Philosophy

The website should follow:

Minimal Design

↓

Large White Space

↓

Readable Typography

↓

Clear Visual Hierarchy

↓

Authentic Photography

↓

Purposeful Animations

↓

Accessible Interface

---

# 4. Visual Keywords

When designing, always think about:

Nature

Growth

Freshness

Cleanliness

Hope

Community

Trust

Environment

Transparency

Simplicity

---

# 5. Target Emotion

When someone visits the website they should feel:

"This organization is trustworthy."

"This organization is active."

"I want to support them."

"I want to volunteer."

---

# 6. Color Philosophy

The interface should use colors inspired by nature.

Green represents growth.

Blue represents trust.

White represents transparency.

Earth colors represent sustainability.

Accent colors should only be used to guide user attention.

---

# 7. Color Palette

## Primary

Forest Green

Primary brand color.

Used for:

- Primary Buttons
- Links
- Important Highlights
- Icons

---

## Secondary

Deep Blue

Used for:

- Titles
- Navigation
- Professional Sections

---

## Success

Green

---

## Warning

Orange

---

## Error

Red

---

## Information

Blue

---

## Neutral

Gray Scale

50

100

200

300

400

500

600

700

800

900

---

# 8. Dark Mode

Version 1 does not require Dark Mode.

However,

Every component should be designed in a way that Dark Mode can be added later without redesigning the system.

---

# 9. Typography

Typography should prioritize readability.

Recommended Font Stack

English

Inter

Bangla

Hind Siliguri

Fallback

System Fonts

---

# 10. Typography Scale

Display

Hero

Heading 1

Heading 2

Heading 3

Heading 4

Body Large

Body

Small

Caption

Label

Button

---

# 11. Writing Style

English should be:

Simple

Professional

Friendly

Clear

---

Bangla should be:

Natural

Modern

Easy to understand

Avoid excessive formal language.

---

# 12. Icon Style

Icons should be:

Outlined

Minimal

Consistent

Rounded

Avoid mixing multiple icon styles.

Recommended:

Lucide Icons

---

# 13. Illustration Style

Illustrations should:

Feel modern

Feel optimistic

Use simple shapes

Avoid cartoon-like characters

Prefer flat or semi-flat illustrations.

---

# 14. Photography

Use real photographs whenever possible.

Avoid stock photos that appear artificial.

Preferred photos include:

- Tree Plantation
- Volunteers
- Cleanup Activities
- Community Work
- Environmental Awareness
- Nature

---

# 15. Image Guidelines

Every image should:

Be high quality

Be compressed

Have proper alt text

Maintain consistent aspect ratio

Support lazy loading

---

# 16. Component Style

Cards

Rounded Corners

Soft Shadow

Clean Padding

---

Buttons

Rounded

Medium Height

Strong Hover State

Accessible Focus State

---

Inputs

Large

Comfortable

Clear Labels

Helpful Validation

---

Tables

Simple

Readable

Minimal Borders

Responsive

---

Modals

Centered

Minimal

Keyboard Accessible

---

# 17. Layout Principles

Use a maximum content width.

Maintain generous white space.

Follow consistent spacing.

Never overcrowd the interface.

---

# 18. Animation Guidelines

Animations should support usability.

Avoid decorative animations.

Preferred:

Fade

Slide

Scale

Stagger

Counter Animation

Scroll Reveal

Avoid:

Long Animations

Continuous Motion

Distracting Effects

---

# 19. Accessibility

Maintain sufficient color contrast.

Support keyboard navigation.

Provide descriptive labels.

Never rely only on color to communicate information.

Every image must have alt text.

---

# 20. Branding Rules

Never distort the logo.

Never stretch the logo.

Never use low-resolution logos.

Always maintain safe spacing around the logo.

Do not place the logo on visually busy backgrounds.

---

# 21. User Experience Principles

Every interaction should answer one question:

"What does the user want to do next?"

Every page should have a clear primary action.

Avoid unnecessary clicks.

Keep forms short.

Reduce cognitive load.

---

# 22. AI Design Rules

When AI generates UI:

- Always follow this design language.
- Never invent random colors.
- Never use inconsistent spacing.
- Never duplicate UI patterns.
- Always reuse existing components.
- Maintain visual consistency.
- Prioritize readability over decoration.
- Design mobile-first.
- Optimize for accessibility.

---

# 23. Brand Promise

The platform should consistently communicate:

Trust

Transparency

Environmental Responsibility

Community Participation

Long-term Sustainability

Professionalism

---

# End of Document


# 00 - Project Principles

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 01_Project_Overview.md
> - 02_Brand_Guidelines.md

---

# Purpose

This document defines the core engineering, design, and product principles that govern every decision made throughout the project.

Every developer, designer, contributor, and AI coding assistant must follow these principles.

When there is uncertainty between two implementation approaches, the option that best aligns with these principles should be selected.

---

# Principle 1 — Build for the Future

The platform must be designed for long-term growth.

Every architectural decision should support future expansion without requiring major redesign.

Avoid short-term solutions that create long-term technical debt.

---

# Principle 2 — Simplicity First

Prefer simple solutions over complex ones.

Do not introduce unnecessary abstractions, dependencies, or technologies.

Readable code is more valuable than clever code.

---

# Principle 3 — Modular Architecture

Every major feature should be implemented as an independent module.

Examples:

- Blog
- Gallery
- Events
- Certificates
- Projects
- Volunteers
- Reports

Each module should be maintainable with minimal impact on others.

---

# Principle 4 — Single Source of Truth

Every piece of information should exist in one authoritative location.

Avoid duplicated data.

Avoid copying information between tables.

Avoid hardcoded values.

---

# Principle 5 — Reusability

Never duplicate UI components.

Never duplicate business logic.

Create reusable:

- Components
- Hooks
- Utilities
- Services
- Validation Schemas

---

# Principle 6 — Mobile First

Design every interface for mobile devices first.

Desktop layouts should be enhancements, not separate designs.

---

# Principle 7 — Accessibility

Accessibility is a requirement, not an optional enhancement.

Every page should:

- Support keyboard navigation
- Use semantic HTML
- Provide descriptive labels
- Maintain sufficient color contrast
- Include alt text for images

---

# Principle 8 — Performance

Performance should be considered during development, not after.

Prioritize:

- Lazy Loading
- Image Optimization
- Code Splitting
- Efficient Database Queries
- Minimal JavaScript
- Fast Initial Load

---

# Principle 9 — Security by Default

Never trust client-side input.

Always validate:

- Forms
- API Requests
- Uploaded Files
- Query Parameters

Follow the principle of least privilege.

---

# Principle 10 — Transparency

The platform represents a non-profit organization.

Information should be presented honestly.

Avoid misleading statistics or exaggerated claims.

Where possible, show measurable impact.

---

# Principle 11 — Documentation

Every important decision should be documented.

Code should explain **how** it works.

Documentation should explain **why** it exists.

---

# Principle 12 — Internationalization

The platform must support multiple languages.

User-facing text should never be hardcoded directly into components.

All translatable content should be managed through the localization system.

---

# Principle 13 — Content Management

Non-technical administrators should be able to manage website content without modifying source code.

Content updates should be performed through the administration dashboard whenever possible.

---

# Principle 14 — Progressive Enhancement

Core functionality should remain usable even if animations or advanced features are unavailable.

Visual enhancements must never block essential functionality.

---

# Principle 15 — Consistency

The same action should behave the same way throughout the platform.

Maintain consistency in:

- Layouts
- Forms
- Buttons
- Icons
- Validation
- Error Messages
- Navigation

---

# Principle 16 — Scalability

The architecture should support future additions such as:

- Volunteer Portal
- Mobile Application
- REST API
- Digital Membership
- QR Attendance
- Sponsor Dashboard

without significant restructuring.

---

# Principle 17 — Maintainability

The project should remain understandable after several years.

Favor:

- Clear naming
- Small functions
- Predictable structure
- Meaningful documentation

Avoid unnecessary complexity.

---

# Principle 18 — AI Collaboration

AI is a development assistant, not the project owner.

Every AI-generated output must be:

- Reviewed
- Understood
- Tested
- Refactored if necessary

Do not accept generated code blindly.

---

# Principle 19 — Open Standards

Whenever practical, use open standards and widely adopted technologies.

Avoid unnecessary vendor lock-in.

---

# Principle 20 — Long-Term Ownership

This platform belongs to the organization.

Every implementation decision should prioritize long-term maintainability over short-term convenience.

The goal is to create software that remains useful, understandable, and extensible for many years.

---

# Summary

Every feature added to this platform should satisfy the following questions:

- Is it necessary?
- Is it maintainable?
- Is it secure?
- Is it reusable?
- Is it accessible?
- Is it scalable?
- Is it consistent?
- Is it documented?

If the answer to any of these questions is "No", the implementation should be reconsidered.

---

# End of Document


# 00 - Terminology

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 00_Project_Principles.md
> - 06_Database_Design.md
> - 08_API_Specification.md

---

# Purpose

This document defines the official terminology used throughout the project.

Every developer, designer, administrator, contributor, and AI assistant must use these definitions consistently.

If a term appears in multiple documents, its meaning must remain identical.

---

# Organization

**Definition**

The legal non-profit entity operating the platform.

**Current Organization**

Alokito Poribesh Foundation

---

# Administrator

A trusted user with authenticated access to the administration dashboard.

Administrators can create, edit, publish, archive, and manage organizational data.

---

# Public User

A visitor who accesses the website without authentication.

Public users can browse content, submit forms, donate, and verify certificates.

---

# Volunteer

A person who participates in one or more organizational activities.

### Rules

- A volunteer has one unique Volunteer ID.
- A volunteer may participate in multiple events.
- A volunteer may receive multiple certificates.
- A volunteer does not require a login account in Version 1.

---

# Volunteer ID

A permanent unique identifier assigned to a volunteer.

Example:

VOL-000001

The Volunteer ID never changes.

---

# Project

A long-term initiative with a defined objective.

Examples:

- Green Campus Initiative
- Coastal Tree Plantation
- Plastic-Free Community Program

A project may contain multiple events.

---

# Event

A scheduled activity conducted under a project or as an independent initiative.

Examples:

- Tree Plantation on 12 July
- Beach Cleanup Campaign
- Awareness Seminar

Each event has one unique Event ID.

---

# Event ID

A unique identifier assigned to an event.

Example:

EV-2026-001

The Event ID remains constant throughout the event lifecycle.

---

# Campaign

A themed collection of related events or activities.

Examples:

- Environment Week
- Plastic Awareness Campaign
- National Tree Plantation Month

A campaign may include multiple projects and events.

---

# Activity

A specific action performed during an event.

Examples:

- Planting trees
- Collecting waste
- Releasing fish fry
- Conducting awareness sessions

Activities contribute to impact statistics.

---

# Achievement

A measurable organizational accomplishment.

Examples:

- Total Trees Planted
- Total Fish Fry Released
- Total Volunteers
- Total Cleanup Campaigns
- Total Districts Covered

Achievements are cumulative and displayed publicly.

---

# Gallery

A collection of visual media associated with an event or project.

A gallery contains one or more albums.

---

# Album

A logical grouping of media files.

Examples:

- Tree Plantation 2026
- Cleanup Campaign Dhaka
- Volunteer Workshop

Each album belongs to one event or project.

---

# Media

A digital asset stored by the platform.

Supported media types include:

- Image
- Video (Future)
- PDF
- Document

---

# Blog

A written article published by the organization.

Blogs communicate stories, updates, achievements, announcements, or educational content.

---

# News

A short informational update.

Unlike blogs, news items are brief and time-sensitive.

Version 1 may treat news as a blog category.

---

# Donation

A financial contribution made to support the organization's activities.

Version 1 records donation intent and information.

Automated payment processing may be added in future versions.

---

# Contact Submission

A message submitted through the public contact form.

Contact submissions are managed through the administration dashboard.

---

# Certificate

An official document issued by the organization to recognize participation in an event or activity.

Each certificate is uniquely identifiable and publicly verifiable.

---

# Certificate ID

A globally unique identifier assigned to a certificate.

Example:

APF-CERT-2026-000145

Certificate IDs must never be reused.

---

# Certificate Verification

The process of confirming the authenticity of a certificate using its Certificate ID or QR code.

Verification is public and does not require authentication.

---

# QR Code

A machine-readable code printed on certificates.

The QR code links directly to the certificate verification page.

The QR code must never contain sensitive personal information.

---

# Verification Page

A public page displaying the verification status of a certificate.

The page confirms that the certificate was officially issued by Alokito Poribesh Foundation.

---

# Dashboard

The administrator's landing page after login.

The dashboard provides summaries, analytics, and shortcuts to management modules.

---

# Module

A self-contained functional area of the platform.

Examples:

- Blog Module
- Gallery Module
- Event Module
- Certificate Module

Modules should remain loosely coupled.

---

# Record

A single database entry representing one entity.

Examples:

- One Volunteer
- One Event
- One Blog
- One Certificate

---

# Status

The current lifecycle stage of a record.

Examples:

Draft

Published

Archived

Completed

Cancelled

Pending

Verified

---

# Soft Delete

A record marked as deleted without being permanently removed from the database.

Soft-deleted records remain recoverable.

---

# Audit Log

A chronological record of important system actions.

Examples:

- Certificate generated
- Blog published
- Volunteer updated
- Admin login

Audit logs improve accountability and troubleshooting.

---

# Localization

The process of translating user-facing content into multiple languages.

Version 1 supports:

- Bangla
- English

---

# Responsive Design

A design approach ensuring the platform functions correctly across mobile, tablet, laptop, and desktop devices.

---

# API

An interface used for communication between the frontend and backend.

All APIs must be documented and versioned.

---

# Version

A numbered release of the platform.

Example:

v1.0.0

Major versions introduce significant new functionality.

---

# Environment

A deployment stage of the application.

Examples:

- Development
- Staging
- Production

Each environment should remain isolated.

---

# Single Source of Truth

A design principle stating that every piece of information should have exactly one authoritative location.

Duplicated or conflicting data should be avoided.

---

# End of Document


# 00 - Coding Standards

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 00_Project_Principles.md
> - 00_Terminology.md
> - 07_Backend_Architecture.md
> - 08_API_Specification.md

---

# Purpose

This document defines the official engineering standards for the entire project.

Every developer and every AI coding assistant must follow these standards.

If generated code violates these rules, the code should be refactored before being merged.

---

# Engineering Philosophy

The project values:

- Readability
- Maintainability
- Simplicity
- Predictability
- Performance
- Security
- Scalability

Readable code is preferred over clever code.

---

# Language Standards

Frontend

- TypeScript Only

Backend

- TypeScript Only

JavaScript should not be introduced into the codebase except for external tooling where unavoidable.

---

# Strict TypeScript

Enable:

- strict
- noImplicitAny
- strictNullChecks
- noUnusedLocals
- noUnusedParameters

Never disable TypeScript safety checks.

---

# Folder Structure

The project should follow a feature-first architecture.

Example:

src/

app/

components/

features/

hooks/

layouts/

lib/

services/

types/

utils/

assets/

styles/

locales/

routes/

---

# Components

Every UI component must:

- Have a single responsibility.
- Be reusable.
- Accept typed props.
- Avoid unnecessary internal state.
- Be documented when behavior is non-obvious.

---

# Component Naming

Use PascalCase.

Examples:

VolunteerCard

CertificateCard

GalleryGrid

HeroSection

ProjectTimeline

Never use vague names.

Avoid:

Card2

DataComponent

TestComponent

NewComponent

---

# File Naming

React Components

PascalCase

Example

VolunteerCard.tsx

Hooks

camelCase

Example

useVolunteer.ts

Utilities

camelCase

Example

formatDate.ts

Constants

UPPER_SNAKE_CASE only when appropriate.

---

# Imports

Prefer absolute imports.

Avoid long relative import chains.

Good

@/components

Bad

../../../../../components

---

# Functions

Functions should:

- Perform one task.
- Be short.
- Return predictable values.
- Avoid hidden side effects.

Prefer early return.

---

# Variables

Names must clearly express purpose.

Good

certificateId

volunteerName

eventDate

Bad

temp

value

data1

abc

---

# State Management

Keep state as local as possible.

Avoid unnecessary global state.

Server data should not be duplicated into local state without reason.

---

# Forms

Use:

React Hook Form

Validation

Zod

Validation must exist on both frontend and backend.

---

# API Design

Follow REST principles.

Examples

GET

POST

PUT

PATCH

DELETE

Never expose unnecessary endpoints.

---

# Error Handling

Never silently ignore errors.

Every API should return structured error responses.

Unexpected errors should be logged.

---

# Database Access

Never query the database directly from UI components.

Always use service or repository layers.

---

# Security

Never trust frontend input.

Always validate:

- IDs
- Query Parameters
- Uploaded Files
- Request Bodies

Sanitize all user input.

---

# Authentication

Authentication belongs only to administrators.

Public users never require login in Version 1.

---

# Authorization

Every protected route must verify permissions.

Never rely only on frontend route protection.

---

# Logging

Important actions should be logged.

Examples:

- Login
- Certificate Generation
- Volunteer Update
- Blog Publish
- Settings Change

---

# Comments

Write comments only when explaining *why*.

Do not explain obvious code.

Bad

Increment counter.

Good

This delay prevents duplicate certificate generation caused by accidental double-clicks.

---

# Styling

Use Tailwind CSS.

Avoid inline styles.

Avoid duplicated utility groups.

Create reusable UI components when patterns repeat.

---

# Icons

Use a single icon library throughout the project.

Recommended:

Lucide React

---

# Images

Optimize images before upload.

Use lazy loading where appropriate.

Provide descriptive alt text.

---

# Accessibility

Every interactive element must be keyboard accessible.

Buttons must have visible focus states.

Forms must use labels.

---

# Internationalization

User-facing text must never be hardcoded inside components.

All visible strings should come from localization files.

---

# Configuration

Never hardcode:

API Keys

URLs

Secrets

Database Credentials

Use environment variables.

---

# Git

Commit Messages

Follow Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

style:

test:

chore:

---

# Branch Naming

Examples

feature/certificate-module

feature/gallery

fix/login

docs/prd

---

# AI Coding Rules

When AI generates code:

- Never duplicate components.
- Never duplicate business logic.
- Never use placeholder implementations in production code.
- Always generate reusable modules.
- Always use TypeScript.
- Always follow project architecture.
- Always preserve backward compatibility where possible.
- Explain architectural decisions when introducing new patterns.

---

# Performance

Prefer:

Lazy Loading

Memoization where justified

Efficient rendering

Image Optimization

Code Splitting

Avoid premature optimization.

---

# Testing

Every critical business feature should be testable.

Examples:

Certificate Generation

Certificate Verification

Volunteer Registration

Blog Publishing

Authentication

---

# Documentation

Public functions should have meaningful names.

Complex modules should include README files.

Major architectural decisions should be documented.

---

# Definition of Done

A task is complete only if:

- Code builds successfully.
- Lint passes.
- Types pass.
- Responsive behavior is verified.
- Accessibility is considered.
- Validation exists.
- Error handling exists.
- Documentation is updated.
- No duplicated logic exists.
- Code review feedback is addressed.

---

# Final Principle

The project should remain understandable five years from now.

Every line of code should contribute to that goal.

---

# End of Document


# 03 - Information Architecture

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - README.md
> - PRD.md
> - 01_Project_Overview.md
> - 02_Brand_Guidelines.md
> - 04_UI_UX_Specification.md
> - 06_Database_Design.md

---

# Purpose

This document defines how information is organized, structured, connected, and presented throughout the platform.

Information Architecture (IA) focuses on helping users quickly find information while maintaining scalability and consistency.

The architecture should remain effective even after thousands of blog posts, events, projects, galleries, volunteers, and certificates have been added.

---

# IA Principles

The platform follows these principles:

- Clear hierarchy
- Predictable navigation
- Minimal clicks
- Consistent structure
- Search-friendly organization
- Mobile-first navigation
- Future scalability

---

# Global Navigation Structure

Public Navigation

Home

About

Projects

Events

Gallery

Blog

Donate

Join as Volunteer

Certificate Verification

Contact

Language Toggle

---

Administrator Navigation

Dashboard

Projects

Events

Gallery

Blog

Volunteers

Certificates

Achievements

Donations

Reports

Website Settings

Admin Users

---

# Sitemap

/

Home

/about

/projects

/projects/:slug

/events

/events/:slug

/gallery

/gallery/:album

/blog

/blog/:slug

/donate

/join

/verify

/verify/:certificateId

/contact

/privacy

/terms

/404

---

# Navigation Hierarchy

Level 1

Primary Navigation

↓

Level 2

Section Listing

↓

Level 3

Detail Page

↓

Level 4

Related Content

---

Example

Projects

↓

Mangrove Restoration

↓

Related Gallery

↓

Related Blog

↓

Related Event

---

# Content Relationships

One Project

↓

Many Events

↓

Many Galleries

↓

Many Blogs

↓

Many Certificates

↓

Many Volunteers

---

Every relationship should be connected through relational database references.

Never duplicate content manually.

---

# URL Strategy

URLs should be:

Readable

Stable

SEO Friendly

Permanent

Examples

/projects/coastal-tree-plantation

/blog/world-environment-day-2026

/events/dhaka-cleanup-drive

Avoid

?id=42

?post=123

?event=19

---

# URL Naming Rules

Use lowercase.

Use hyphens.

Avoid spaces.

Avoid dates unless meaningful.

Avoid IDs in public URLs.

---

# Breadcrumb Strategy

Every detail page should display breadcrumbs.

Example

Home

↓

Projects

↓

Coastal Tree Plantation

---

Breadcrumbs improve:

Navigation

SEO

Accessibility

---

# Search Strategy

Search should support:

Projects

Events

Blogs

Gallery Albums

Future Versions:

Volunteers

Certificates (Admin Only)

Search results should prioritize relevance.

---

# Filtering

Projects

Filter by:

Year

Category

District

Status

---

Events

Filter by:

Upcoming

Completed

Year

Location

---

Gallery

Filter by:

Project

Event

Year

Album

---

Blog

Filter by:

Category

Tag

Year

Author

---

# Taxonomy

Project Categories

Tree Plantation

Cleanup

Awareness

Wildlife

Education

Community

Research

Others

---

Blog Categories

News

Success Story

Awareness

Volunteer Story

Announcement

Environment

Research

Others

---

Gallery Categories

Project

Event

Campaign

Training

Workshop

Community

---

# Content Priority

Homepage displays

Featured Projects

↓

Current Campaign

↓

Upcoming Event

↓

Latest Blog

↓

Latest Gallery

↓

Impact Statistics

↓

Volunteer CTA

↓

Donation CTA

---

# Homepage Information Flow

Hero

↓

Mission

↓

Impact Statistics

↓

Current Campaign

↓

Timeline

↓

Projects

↓

Upcoming Events

↓

Gallery Preview

↓

Latest Blogs

↓

Partners

↓

Call To Action

↓

Footer

---

# Timeline Model

Past

↓

Current

↓

Upcoming

Past

Grayscale

Current

Full Color

Highlighted

Animated

Upcoming

Low Opacity

Visible but inactive

---

# Certificate Verification Flow

QR Scan

↓

Verification URL

↓

Certificate Lookup

↓

Verification Result

↓

Official Status

↓

Return Home

---

# Error Handling

Unknown URL

↓

404 Page

Invalid Certificate

↓

Certificate Not Found

Expired Link

↓

Helpful Recovery Page

---

# Navigation Rules

Every page should have:

Page Title

Breadcrumb

Primary CTA

Footer

Language Toggle

Responsive Navigation

---

# Mobile Navigation

Bottom Navigation is not required.

Use:

Responsive Navigation Drawer

Collapsible Menus

Sticky Header

---

# Desktop Navigation

Top Navigation

Sticky Header

Dropdown Menus

Mega Menu is unnecessary for Version 1.

---

# Internal Linking Strategy

Projects should link to:

Events

Blogs

Gallery

---

Events should link to:

Project

Gallery

Blog

---

Blogs should link to:

Related Project

Related Event

Gallery

---

Gallery should link to:

Event

Project

---

This interconnected structure improves both user experience and SEO.

---

# SEO Architecture

Every content page must include:

Unique Title

Meta Description

Canonical URL

Open Graph Image

Structured Data (Future)

Clean URL

---

# Language Architecture

Every public page should support:

Bangla

English

The selected language should persist across navigation.

---

# Future Expansion

Information Architecture should support future sections:

Volunteer Portal

Member Portal

Digital Library

Research Publications

Annual Reports

Impact Dashboard

Media Center

Job Circular

Sponsor Portal

Open Data

without restructuring existing navigation.

---

# IA Validation Checklist

Before adding any new page, verify:

- Does it belong in the existing hierarchy?
- Is it reachable within three clicks?
- Does it duplicate existing content?
- Does it require a new taxonomy?
- Does it improve user experience?
- Is the URL SEO-friendly?
- Is the navigation consistent?

If any answer is "No", reconsider the design.

---

# End of Document


# 05 - Design System

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06

---

# Purpose

The Design System defines the reusable visual language, interaction patterns, spacing, typography, colors, components, and accessibility rules for the entire platform.

Every interface must follow this design system.

No page should introduce its own design language.

---

# Design Philosophy

The design should feel:

• Modern

• Clean

• Calm

• Natural

• Trustworthy

• Accessible

• Human

The interface should never feel corporate or overloaded.

---

# Design Principles

1. Content First

Content is always more important than decoration.

---

2. White Space

Use generous spacing.

Never overcrowd the interface.

---

3. Visual Hierarchy

Users should immediately understand

Primary

↓

Secondary

↓

Supporting information

---

4. Consistency

Buttons

Cards

Inputs

Tables

Modals

Badges

Typography

Spacing

must always look and behave consistently.

---

# Grid System

Desktop

12 Columns

---

Tablet

8 Columns

---

Mobile

4 Columns

---

Maximum Content Width

1280px

---

Container Padding

Desktop

32px

Tablet

24px

Mobile

16px

---

# Spacing System

Use an 8px spacing scale.

Examples

4

8

16

24

32

40

48

56

64

80

96

Never invent random spacing values.

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Extra Large

24px

Cards and buttons should share consistent corner radii.

---

# Shadows

Use soft shadows.

Avoid heavy shadows.

Recommended hierarchy:

Small

Medium

Large

Never use colored shadows.

---

# Typography

Primary Font

Inter

Bangla Font

Hind Siliguri

Fallback

System Fonts

---

# Typography Scale

Display

Hero

H1

H2

H3

H4

Body Large

Body

Small

Caption

Label

Button

Each typography level must remain consistent across all pages.

---

# Color System

## Brand

Primary Green

Secondary Blue

Accent Orange

Success Green

Warning Orange

Danger Red

Info Blue

---

## Neutral

Gray 50

Gray 100

Gray 200

Gray 300

Gray 400

Gray 500

Gray 600

Gray 700

Gray 800

Gray 900

---

# Iconography

Use only one icon library.

Recommended:

Lucide React

Icons should:

- Maintain consistent stroke width.
- Use rounded corners.
- Scale proportionally.
- Never mix icon styles.

---

# Buttons

Types

Primary

Secondary

Outline

Ghost

Danger

Link

---

States

Default

Hover

Active

Focused

Disabled

Loading

---

Buttons must always contain descriptive labels.

---

# Inputs

Supported Components

Text

Textarea

Email

Phone

Number

Password

Select

Checkbox

Radio

Switch

Date

File Upload

Search

---

Every input requires

Label

Placeholder

Validation

Helper Text

Error State

Success State

---

# Cards

Cards are the primary content container.

Cards should support:

Image

Title

Description

Meta

Action

Status Badge

Footer

Cards should remain consistent across modules.

---

# Tables

Tables should support:

Sorting

Searching

Pagination

Responsive Layout

Empty State

Loading State

---

# Badges

Supported Variants

Success

Warning

Error

Info

Neutral

Badges should be used to represent status.

---

# Alerts

Types

Success

Warning

Information

Error

Alerts should always include:

Icon

Title

Description

Optional Action

---

# Modal

Every modal should support:

Keyboard Navigation

Escape Close

Focus Trap

Responsive Layout

---

# Toast Notifications

Toast duration

Approximately 3–5 seconds.

Never display multiple conflicting toasts.

---

# Empty States

Every page that can have no data must include:

Illustration

Message

Primary Action

Examples:

No Blog Posts

No Events

No Gallery Images

No Volunteers

---

# Loading States

Preferred loading strategy:

Skeleton UI

Avoid large spinning loaders whenever possible.

---

# Error States

Errors should:

Explain the problem.

Suggest a recovery action.

Avoid technical jargon.

---

# Motion Design

Animations should be subtle.

Recommended:

Fade

Slide

Scale

Counter

Scroll Reveal

Avoid excessive motion.

Respect reduced motion preferences.

---

# Forms

Forms should:

Be short

Be clearly grouped

Provide inline validation

Display helpful error messages

Prevent accidental submission

---

# Accessibility

Minimum contrast ratio should meet WCAG recommendations.

Interactive elements must be keyboard accessible.

Focus indicators must always remain visible.

Images require meaningful alt text.

---

# Responsive Breakpoints

Mobile

Tablet

Laptop

Desktop

Large Desktop

Breakpoints should be centralized and reused.

---

# Images

Use responsive images.

Optimize file size.

Support lazy loading.

Maintain aspect ratio.

---

# Theme

Version 1

Light Theme

Future

Dark Theme

The design system should be ready for future dark mode support.

---

# Reusable Components

Examples

Navbar

Footer

Hero

Section Header

Button

Card

Modal

Timeline

Statistics

Gallery Grid

Blog Card

Event Card

Volunteer Card

Certificate Card

Breadcrumb

Pagination

Search Bar

Language Switcher

Theme Switcher

Form Components

Toast

Loader

Empty State

Error Page

---

# Design Tokens

All visual values should be centralized.

Never hardcode:

Colors

Spacing

Radius

Typography

Shadow

Transitions

---

# AI Design Rules

AI-generated interfaces must:

Reuse existing components.

Avoid inconsistent spacing.

Follow typography hierarchy.

Maintain accessibility.

Avoid introducing unnecessary styles.

Use the Design System as the single source of truth.

---

# End of Document


# 06.00 - Data Model

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06
>
> Related Documents:
>
> - 00_Terminology.md
> - 03_Information_Architecture.md
> - 06.01_ER_Diagram.md
> - 06.02_Database_Tables.md

---

# Purpose

This document defines the conceptual data model of the platform.

It identifies the core business entities, their responsibilities, ownership, lifecycle, and relationships before physical database implementation.

The purpose is to ensure that the database reflects the organization's business processes rather than the user interface.

---

# Design Principles

The data model must follow these principles:

- Normalize data to reduce duplication.
- Keep entities independent whenever practical.
- Use UUIDs as primary identifiers.
- Preserve historical data.
- Support future expansion.
- Minimize breaking schema changes.
- Prefer explicit relationships over implicit references.

---

# Core Domains

The platform is divided into the following business domains.

## Organization

Represents organization-wide configuration and metadata.

Entities:

- Organization
- Settings
- Social Links
- Contact Information

---

## Content

Responsible for public-facing information.

Entities:

- Blog
- Blog Category
- Blog Tag
- Project
- Project Category
- Event
- Gallery
- Album
- Media

---

## Volunteers

Responsible for volunteer management.

Entities:

- Volunteer
- Volunteer Profile
- Volunteer Participation

---

## Certification

Responsible for certificate generation and verification.

Entities:

- Certificate
- Certificate Template
- Verification Record

---

## Impact

Responsible for measurable achievements.

Entities:

- Achievement
- Statistic
- District Coverage

---

## Administration

Responsible for platform management.

Entities:

- Admin User
- Role
- Permission
- Audit Log

---

## Communication

Responsible for user submissions.

Entities:

- Contact Message
- Volunteer Application
- Donation Record

---

# Entity Ownership

Each entity must have a clearly defined owner.

| Entity | Owner |
|----------|-------|
| Blog | Content Team |
| Project | Project Coordinator |
| Event | Event Coordinator |
| Gallery | Media Team |
| Volunteer | Volunteer Team |
| Certificate | Administration |
| Achievement | Administration |
| Donation | Finance Team |
| Settings | Super Admin |

Ownership defines who is responsible for maintaining the data.

---

# Entity Lifecycle

Every major entity should have a predictable lifecycle.

Example

Draft

↓

Published

↓

Archived

↓

Soft Deleted

Not every entity requires every stage, but lifecycle states should be explicit.

---

# Identity Strategy

Every major entity should use UUID as the internal primary key.

Human-readable IDs may also exist where appropriate.

Examples:

Volunteer ID

VOL-000001

Event ID

EV-2026-001

Certificate ID

APF-CERT-2026-000145

Internal UUIDs must never be exposed publicly unless required.

---

# Relationships

The following high-level relationships define the platform.

Organization

↓

Projects

↓

Events

↓

Volunteer Participation

↓

Certificates

Projects may exist without events.

Events belong to at most one project.

Volunteers may participate in many events.

Certificates belong to exactly one volunteer and one event.

---

# Content Relationships

Projects may contain:

- Blogs
- Galleries
- Events

Events may contain:

- Albums
- Media
- Certificates

Blogs may reference:

- Projects
- Events

Media should always belong to an Album.

Albums should always belong to an Event or Project.

---

# Data Integrity Rules

The system must maintain referential integrity.

Examples:

- A certificate cannot exist without a volunteer.
- A certificate cannot exist without an event.
- An album cannot exist without a parent.
- A media file cannot exist without an album.

Deletion should never leave orphaned records.

---

# Historical Preservation

Historical information must be preserved.

Deleting an event should not erase issued certificates.

Deleting a volunteer should not invalidate historical participation records.

Soft delete should be preferred whenever possible.

---

# Auditability

Every important business entity should record:

- Created By
- Updated By
- Created At
- Updated At

Critical entities should additionally support:

- Deleted At
- Deleted By

Sensitive administrative actions should be written to the Audit Log.

---

# Localization Strategy

Public-facing textual content should support multiple languages.

Examples:

- Blog Title
- Blog Content
- Project Description
- Event Description

The data model should allow future languages without schema redesign.

---

# Media Strategy

Binary files should never be stored inside the relational database.

Only metadata should be stored.

Examples:

- File Name
- Storage Path
- MIME Type
- Size
- Width
- Height
- Uploaded By

The actual files should reside in object storage.

---

# Privacy Principles

Only collect personal information that is necessary.

Public certificate verification pages should expose only the minimum information required for verification.

Sensitive personal information should remain private.

---

# Extensibility

The data model should support future additions such as:

- Mobile Application
- Volunteer Portal
- Attendance
- Sponsor Management
- Inventory
- Financial Reports
- Public API

without major restructuring.

---

# Definition of a Good Data Model

A successful data model should satisfy the following:

- Minimal redundancy
- Strong relationships
- High readability
- Future scalability
- Business-oriented structure
- Clear ownership
- Secure by default
- Easy migration
- Efficient querying

---

# End of Document

# 06.01 - Entity Specification

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-08-06

---

# Purpose

This document defines every business entity used within the platform before database table implementation.

Each entity represents a real-world concept used by the organization.

The goal is to ensure that the software models the organization's operations accurately.

---

# Entity Overview

| Entity | Description |
|----------|-------------|
| Organization | Foundation profile and global information |
| AdminUser | Authenticated administrator |
| Role | Administrator role |
| Permission | Permission set for roles |
| Project | Long-term initiative |
| Event | Individual activity or program |
| Volunteer | Person participating in events |
| VolunteerParticipation | Links volunteers with events |
| Certificate | Recognition issued to volunteers |
| CertificateTemplate | Template used to generate certificates |
| Blog | Published article |
| BlogCategory | Category for blogs |
| Tag | Reusable labels |
| Gallery | Media collection |
| Album | Logical grouping of media |
| Media | Uploaded files |
| Achievement | Public impact statistics |
| Donation | Donation records |
| ContactMessage | Contact form submissions |
| Setting | Website configuration |
| AuditLog | Administrative activity logs |

---

# Organization

Represents the foundation itself.

Only one active record should exist.

Responsibilities:

- Organization name
- Mission
- Vision
- Contact details
- Social links
- Logo
- Branding assets

---

# AdminUser

Represents authenticated staff members.

Responsibilities:

- Login
- Dashboard access
- Content management
- Certificate generation

Rules:

- Must have one Role.
- May perform many actions.
- Every important action should be logged.

---

# Project

Represents a long-term organizational initiative.

Examples:

- Coastal Tree Plantation
- Plastic-Free Campus
- Green School Initiative

Rules:

- May contain multiple Events.
- May contain Blogs.
- May contain Galleries.
- May remain active for several years.

---

# Event

Represents one specific activity.

Examples:

- Beach Cleanup
- Tree Plantation
- Awareness Seminar

Rules:

- May belong to one Project.
- May exist independently.
- May issue Certificates.
- May contain Albums.
- May produce Achievements.

---

# Volunteer

Represents an individual participant.

Responsibilities:

- Identity
- Contact information
- Photograph
- Participation history

Rules:

- Receives one permanent Volunteer ID.
- Can join multiple Events.
- Can receive multiple Certificates.

---

# VolunteerParticipation

Represents attendance in an Event.

This entity connects Volunteers and Events.

Stores:

- Attendance status
- Assigned role
- Participation date
- Performance notes (optional)

---

# Certificate

Represents official recognition.

Rules:

- Belongs to exactly one Volunteer.
- Belongs to exactly one Event.
- Uses one Certificate Template.
- Has one globally unique Certificate ID.
- Must remain permanently verifiable.

---

# CertificateTemplate

Defines the visual design of certificates.

Allows future redesign without affecting existing certificate records.

---

# Blog

Represents a published article.

Rules:

- May reference Projects.
- May reference Events.
- Supports Bangla and English.
- Supports Categories and Tags.

---

# BlogCategory

Used to organize Blogs.

Examples:

- News
- Awareness
- Success Story
- Announcement

---

# Tag

Reusable keyword labels.

Examples:

- Trees
- Cleanup
- Volunteers
- Environment Day

Tags improve search and filtering.

---

# Gallery

Represents a media collection.

Rules:

- May belong to a Project.
- May belong to an Event.
- Contains one or more Albums.

---

# Album

Logical subdivision inside a Gallery.

Contains Media items.

---

# Media

Represents uploaded files.

Supported types:

- Image
- PDF

Future:

- Video
- Audio

Only metadata is stored in the database.

---

# Achievement

Represents measurable impact.

Examples:

- Trees Planted
- Fish Fry Released
- Cleanup Campaigns
- Active Volunteers
- District Coverage

Displayed publicly on the homepage.

---

# Donation

Represents a donation record.

Version 1:

- Manual verification
- Donation information
- Donor details (when provided)

Future versions may integrate online payment gateways.

---

# ContactMessage

Stores messages submitted through the Contact page.

Administrators can review, archive, or respond externally.

---

# Setting

Stores configurable website values.

Examples:

- Organization name
- Theme
- Default language
- Contact information
- Social media links

Avoid hardcoding configuration values.

---

# AuditLog

Stores important administrative actions.

Examples:

- Admin login
- Blog published
- Event created
- Certificate generated
- Settings changed

Audit logs must be immutable.

---

# Entity Relationships Summary

- One Project → Many Events
- One Project → Many Blogs
- One Project → Many Galleries
- One Event → Many VolunteerParticipations
- One Volunteer → Many VolunteerParticipations
- One VolunteerParticipation → Zero or One Certificate
- One Event → Many Certificates
- One Gallery → Many Albums
- One Album → Many Media
- One Blog → Many Tags
- One Role → Many AdminUsers

---

# General Rules

Every entity should:

- Use UUID as the primary key.
- Include created_at and updated_at timestamps.
- Support soft deletion where appropriate.
- Record created_by and updated_by for administrative actions.
- Be designed with future extensibility in mind.

---

# End of Document


# 09 - Product Roadmap

> Project: Alokito Poribesh Foundation Platform
>
> Version: 1.0.0
>
> Status: Living Document
>
> Last Updated: 2026-08-06

---

# Purpose

This roadmap defines the phased evolution of the platform.

The objective is to prioritize value delivery while keeping the architecture scalable.

Every feature should belong to a defined release.

---

# Release Philosophy

Build small.

Release often.

Improve continuously.

Avoid building unnecessary features before they are needed.

---

# Version 1.0 — Foundation

Goal:

Launch the official public website and administration system.

Core Features:

- Public Website
- About Page
- Projects
- Events
- Gallery
- Blog
- Contact
- Donation Information
- Volunteer Registration Form
- Impact Statistics
- Certificate Generator
- QR Certificate Verification
- Admin Dashboard
- Bangla / English Support
- SEO
- Responsive Design

Success Criteria:

- Organization can publish content independently.
- Certificates can be generated and verified.
- Public website is production-ready.

---

# Version 1.1 — Content Enhancement

Goal:

Improve content management.

Features:

- Rich Text Editor
- Blog Categories
- Tags
- Featured Content
- Gallery Albums
- Search
- Filters
- Related Content

---

# Version 1.2 — Administration

Goal:

Improve internal workflows.

Features:

- Admin Roles
- Permissions
- Audit Logs
- Activity History
- Dashboard Analytics
- Bulk Upload
- Bulk Certificate Generation

---

# Version 2.0 — Volunteer Ecosystem

Goal:

Provide a richer volunteer experience.

Potential Features:

- Volunteer Profiles
- Participation History
- Download Certificates
- Achievement Badges
- Digital Membership Card

---

# Version 2.1 — Event Management

Features:

- Online Registration
- QR Check-in
- Attendance Tracking
- Volunteer Assignment
- Event Reports

---

# Version 3.0 — Organization Intelligence

Features:

- Interactive Impact Dashboard
- District-wise Statistics
- Yearly Reports
- Downloadable Reports
- Data Visualization

---

# Version 3.1 — Mobile Experience

Features:

- Progressive Web App (PWA)
- Offline Support
- Push Notifications

---

# Future Ideas

- Sponsor Portal
- Research Library
- Annual Reports
- GIS-based Activity Map
- Public API
- Mobile App
- Inventory Management
- Equipment Tracking
- Internal Messaging

---

# Feature Priority

## Must Have (V1)

- Homepage
- About
- Projects
- Events
- Gallery
- Blog
- Contact
- Volunteer Form
- Donation Page
- Certificate Verification
- Admin Dashboard

---

## Should Have

- Search
- Filters
- Analytics
- Rich Text Editor

---

## Nice to Have

- Dark Mode
- PWA
- Interactive Charts
- Animated Maps

---

## Future

- Volunteer Portal
- Mobile App
- Public API
- Sponsor Dashboard

---

# Release Principles

A feature is considered complete only when:

- Implemented
- Tested
- Responsive
- Accessible
- Documented
- Deployed

---

# End of Document
