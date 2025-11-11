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

Regarding Django's role, as outlined in your readme.md, its initial purpose is to serve the production-ready Vue.js application. However, it can evolve into a powerful backend service for more complex,
  non-real-time operations. For instance, you could use Django to:

   * Handle file uploads and processing: Manage cover images or other assets.
   * Export documents: Convert and export documents to formats like PDF or Markdown.
   * Send email notifications: For collaboration invites or other alerts.
   * Implement advanced search: Integrate with tools like Elasticsearch for powerful search functionality.
   * Manage third-party integrations: Connect with external services and APIs.


That's an excellent question. You are correct; if Convex is running only locally, Clerk's servers on the internet won't be able to reach it.

  To solve this during development, you can use a tunneling service like ngrok. It creates a secure, public URL that forwards all traffic directly to your local machine.

  Here are the steps:

   1. Keep Convex Running: Keep your local Convex development server (npx convex dev) running in a terminal. Note the port it's using (e.g., 3100).

   2. Install ngrok: If you don't have it, you can download it from the ngrok website (https://ngrok.com/download).

   3. Start ngrok: In a new terminal window, run the following command, replacing <PORT> with the port your Convex server is using:

   1     ngrok http <PORT>
      For example:
   1     ngrok http 3100

   4. Get the Public URL: ngrok will display a "Forwarding" URL that looks something like https://<random-string>.ngrok.io. This is your temporary public URL.

   5. Configure Clerk:
       * Go to your Clerk dashboard and navigate to "Webhooks".
       * Use the ngrok URL and add your webhook path to the end. For example: https://<random-string>.ngrok.io/clerk-webhook.
       * Save the endpoint and copy the Webhook Secret.

   6. Set Local Environment Variable:
       * In your convex/ directory, create a file named .env.local (if it doesn't exist).
       * Add your Clerk webhook secret to this file:
   1       CLERK_WEBHOOK_SECRET=whsec_...
       * Your local Convex server will automatically pick up this variable.

  Now, whenever a new user signs up, Clerk will send the webhook to your public ngrok URL, which will forward it to your local Convex server, and your http.ts function will be executed.

> how to run convex, so I can know the port?

✦ To run Convex locally and find the port, use the command npx convex dev.

  Look for output similar to this, which will indicate the port:

   1 Listening on http://localhost:<PORT_NUMBER>

  The <PORT_NUMBER> is what you'll use with ngrok.