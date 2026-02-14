"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      className="
        w-full
        rounded-xl
        bg-indigo-500
        px-4 py-3
        text-sm font-medium
        text-white
        hover:bg-indigo-400
        transition
      "
    >
      Continue with Google
    </button>
  );
}
