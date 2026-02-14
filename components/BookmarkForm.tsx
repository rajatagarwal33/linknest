"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({
  user,
  setBookmarks,
}: {
  user: any;
  setBookmarks: any;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    const { data } = await supabase
      .from("bookmarks")
      .insert({
        title,
        url,
        user_id: user.id,
      })
      .select()
      .single();

    if (data) {
      setBookmarks((prev: any[]) => [data, ...prev]);
    }

    setTitle("");
    setUrl("");
  };

  return (
    <GlassCard>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="
              w-full rounded-xl border border-neutral-300
              px-4 py-3 text-sm
              placeholder-neutral-400
              focus:border-indigo-400
              focus:ring-1 focus:ring-indigo-200
            "
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="
              w-full rounded-xl border border-neutral-300
              px-4 py-3 text-sm
              placeholder-neutral-400
              focus:border-indigo-400
              focus:ring-1 focus:ring-indigo-200
            "
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={addBookmark}
            className="
              rounded-xl
              bg-indigo-500
              px-6 py-2.5
              text-sm font-medium
              text-white
              hover:bg-indigo-400
              transition
            "
          >
            Add bookmark
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
