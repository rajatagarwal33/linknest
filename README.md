# Smart Bookmark App (LinkNest)

LinkNest is a simple bookmark manager that lets users save and manage links securely using Google authentication. The app supports real-time updates, so changes are reflected instantly across multiple open tabs.

This project was built as part of a technical assignment and focuses on correctness, simplicity, and clarity rather than unnecessary complexity.

---

## 🔗 Live Demo

**Live URL:** https://linknest.vercel.app  
You can log in using any Google account to test the app.

**GitHub Repository:**  
https://github.com/rajatagarwal33/linknest

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **Supabase**
  - Google OAuth authentication
  - PostgreSQL database
  - Realtime subscriptions
- **Tailwind CSS** for styling
- **Vercel** for deployment

---

## ✨ Features

- Google OAuth login (no email/password)
- Add bookmarks (title + URL)
- Delete bookmarks
- Bookmarks are private to each user
- Real-time updates across multiple tabs
- Protected dashboard route
- Fully deployed on Vercel

---

## 🔐 Authentication & Data Privacy

Authentication is handled using Supabase Google OAuth.

Each bookmark is associated with the logged-in user, and Supabase Row Level Security (RLS) is enabled to ensure:
- users can only see their own bookmarks
- users can only delete their own data

If a user is not authenticated, they cannot access the dashboard.

---

## 🔄 Realtime Updates

The app uses Supabase Realtime to listen for changes on the `bookmarks` table.  
If a bookmark is added or deleted in one tab, all other open tabs update automatically without requiring a page refresh.

---

## ⚙️ Problems I Faced & How I Solved Them

### Realtime updates not showing without refresh
Initially, whenever I added or deleted a bookmark, the UI only updated after refreshing the page. This became very noticeable when testing the app in two tabs — changes in one tab were not reflected in the other.

I solved this by using Supabase Realtime subscriptions and listening to `postgres_changes` on the `bookmarks` table. Whenever an insert or delete event occurs, the app refetches the latest bookmarks, keeping all open tabs in sync.

---

### Duplicate bookmarks appearing temporarily
At one point, when adding a bookmark, it appeared twice in the UI, but after refreshing the page it showed up only once. This was confusing and clearly incorrect behavior.

The issue was caused by a mix of optimistic UI updates and realtime updates both modifying the state. I fixed this by making the realtime subscription the single source of truth for syncing data and ensuring state updates were handled consistently.

---

### Google OAuth configuration in production
Google authentication worked correctly during local development, but required additional configuration after deploying the app.

I resolved this by properly setting the Site URL and Redirect URLs in Supabase to match the Vercel production domain. After that, authentication worked reliably in both environments.

---

### Keeping the UI simple but complete
While the app itself is small, I wanted it to feel complete and usable rather than like a rough demo. Finding the right balance between minimal design and usability took some iteration.

I added a navigation bar with user context and logout functionality, kept the color palette consistent, and avoided over-designing the interface.

---

## 🧪 Running the Project Locally

```bash
npm install
npm run dev
