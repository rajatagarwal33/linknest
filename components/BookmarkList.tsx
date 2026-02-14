"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";

export default function BookmarkList({
  bookmarks,
  setBookmarks,
}: {
  bookmarks: any[];
  setBookmarks: any;
}) {
  const removeBookmark = async (id: string) => {
    setBookmarks((prev: any[]) => prev.filter((b) => b.id !== id));
    const { supabase } = await import("@/lib/supabaseClient");
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center text-neutral-400 py-12">
        <p className="text-sm">
          No links yet. Add your first one above.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      <AnimatePresence>
        {bookmarks.map((b) => (
          <motion.li
            key={b.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between px-5 py-4">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-900 hover:underline"
                >
                  {b.title}
                </a>

                <button
                  onClick={() => removeBookmark(b.id)}
                  className="text-neutral-400 hover:text-neutral-700 transition"
                >
                  ✕
                </button>
              </div>
            </GlassCard>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
