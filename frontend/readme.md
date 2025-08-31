### **Project Roadmap: Notion Clone (Vue.js, Django, Convex)**

This document outlines the step-by-step plan to build a full-stack Notion clone application.

---

### **Phase 1: Core Setup & Authentication**

1.  **Frontend (Vue.js) & Clerk Integration:**
    *   Set up Clerk for authentication in the Vue.js application.
    *   Create public routes (`/`) for the landing page and protected routes for the main application (`/dashboard`).
    *   Build login and sign-up components using Clerk's UI elements.

2.  **Backend (Convex) & Authentication:**
    *   Integrate Clerk with the Convex backend to authenticate API requests.
    *   Define the initial user schema in `convex/convex/schema.ts`.

3.  **Backend (Django):**
    *   Configure Django to serve the built Vue.js application as static files. This will be the entry point for users.

---

### **Phase 2: Real-time Document Management**

1.  **Convex Schema & API:**
    *   Define the `documents` schema in `convex/convex/schema.ts`. It will include fields for `title`, `content`, `parentDocument`, `isArchived`, `isPublished`, `icon`, and `coverImage`.
    *   Implement core API functions (mutations and queries) in `convex/convex/api/documents.ts` for:
        *   `createDocument`
        *   `getDocuments` (for the current user)
        *   `updateDocument` (for title, content, icon, etc.)
        *   `archiveDocument` (soft delete)

2.  **Frontend (Vue.js) Dashboard:**
    *   Create a `DashboardView.vue` that fetches and displays a list of the user's documents.
    *   This view will be the main hub for authenticated users.

---

### **Phase 3: Sidebar & Hierarchical Navigation**

1.  **UI Development:**
    *   Build a collapsible and expandable sidebar component.
    *   The sidebar will display a hierarchical list of the user's documents.

2.  **Functionality:**
    *   Implement real-time updates in the sidebar (new documents, title changes).
    *   Add functionality to create new documents directly from the sidebar.
    *   Include user settings and a logout button.

---

### **Phase 4: Notion-Style Editor**

1.  **Editor Integration:**
    *   Select and integrate a block-based editor library (e.g., Tiptap with custom extensions) into the main content area.
    *   The editor should feel similar to Notion's.

2.  **Real-time Collaboration:**
    *   Connect the editor to the Convex backend to save document content in real-time as the user types.

3.  **Toolbar & Cover Image:**
    *   Create a toolbar for the editor that allows users to add an icon to the document.
    *   Implement the cover image feature, including file upload, replacement, and deletion.

---

### **Phase 5: Advanced Features**

1.  **Trash & Recovery:**
    *   Create a "Trash" interface to show archived documents.
    *   Implement `restoreDocument` and `deleteDocumentPermanently` functions in Convex and connect them to the UI.

2.  **Publishing:**
    *   Add a "Publish" toggle to the document editor.
    *   Create a public, read-only view for published documents, accessible via a unique URL.

3.  **Search:**
    *   Implement a search feature that allows users to find documents by title or content.

---

### **Phase 6: Polish & Final Touches**

1.  **Theming:**
    *   Implement a Light and Dark mode toggle.

2.  **Responsiveness:**
    *   Ensure the entire application is fully responsive and usable on mobile devices.

3.  **Landing Page:**
    *   Refine the landing page design and content.
  

I've updated DashboardView.vue with document creation, finishing Phase 2. Now, for Phase 3, I'll
  create a placeholder Sidebar.vue component using write_file, styled with Tailwind for
  collapsibility.