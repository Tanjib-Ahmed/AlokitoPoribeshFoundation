# Alokito Poribesh Foundation Website

This project is a premium, high-performance website for the Alokito Poribesh Foundation, redesigned with a "Carex-inspired" aesthetic. It features a code-first Content Management System (CMS), making it easy to manage content directly in the code while benefiting from automated deployments.

## 🚀 Quick Start

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run development server**:
    ```bash
    npm run dev
    ```
4.  **Build and Deploy**: Push changes to the `main` branch, and the GitHub Actions workflow will automatically build and deploy the site to GitHub Pages.

---

## 📸 Media Management (Photos)

To update images on the website:

1.  **Where to put photos**: Place your image files in the `public/` directory (or a subdirectory like `public/images/`).
2.  **Naming**: Use clean, descriptive names (e.g., `event-2024.jpg`).
3.  **Referencing**: In your data files, reference the image starting from the root (e.g., `/event-2024.jpg` or `/images/event-2024.jpg`).

---

## 📝 Content Management (Static CMS)

All website content is managed in the `src/data/` directory. Each file corresponds to a specific part of the site.

### 1. `config.ts` (Branding & Navigation)
- **What's inside**: Foundation name, navigation links, and contact information.
- **Example**: Update `branding.foundationNameBn` or `navItems`.

### 2. `impact.ts` (Impact Stats)
- **What's inside**: The numbers and labels shown in the Hero and Impact sections.
- **Example**: Update `impactStats` values like `৫০০০+` or `১২০+`.

### 3. `projects.ts` (Activities & Gallery)
- **What's inside**: Descriptions of your activities and images for the gallery.
- **Example**: Add a new member to the `activities` array or a new photo to the `gallery`.

### 4. `blog.ts` (Blog Posts)
- **What's inside**: All blog post content, including headers, excerpts, and full text.
- **Example**: Add objects to the `blogPosts` array to create new articles.

> [!TIP]
> Each object in these files usually has two sets of text: `Bn` for Bangla and `En` for English. Make sure to fill out both!

---

## 🎨 Design & Typography

- **English Font**: Inter (Clean, modern sans-serif).
- **Bangla Font**: Li Ador Noirito (Premium, stylized).
- **Primary Color**: `#1F7A3E` (Emerald Green).
- **Layout**: The site uses a "Bento Grid" system with high border-radius (`rounded-[3rem]`) for a flagship feel.

---

## ⚙️ Technical Details

- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS.
- **Animations**: Framer Motion.
- **Icons**: Lucide React.
- **Deployment**: GitHub Actions (`.github/workflows/deploy.yml`).
