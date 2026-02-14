"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Navbar({ email }: { email: string }) {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-indigo-600">
            LinkNest
          </span>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500 hidden sm:block">
            {email}
          </span>

          <button
            onClick={logout}
            className="
              rounded-lg
              bg-indigo-500
              px-3 py-1.5
              text-sm font-medium
              text-white
              hover:bg-indigo-400
              transition
            "
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
