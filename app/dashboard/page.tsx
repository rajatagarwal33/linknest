"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // Auth check
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/";
      } else {
        setUser(data.user);
      }
    });
  }, []);

  // Fetch + realtime
  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
    };

    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Navbar email={user.email} />

      <main className="min-h-screen px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Add */}
          <section className="space-y-2">
            <h2 className="text-sm font-medium text-neutral-700">
              Add a new link
            </h2>
            <BookmarkForm user={user} setBookmarks={setBookmarks} />
          </section>

          {/* List */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-neutral-700">
              Saved links
            </h2>
            <BookmarkList
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />
          </section>
        </div>
      </main>
    </>
  );
}
