import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-2xl px-8 py-10 shadow-sm text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-indigo-600">
              LinkNest
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Save and revisit the links that matter.
              <br />
              Private. Real-time. Yours.
            </p>
          </div>

          <AuthButton />

          <p className="text-xs text-neutral-400">
            Secure sign-in with Google
          </p>
        </div>
      </div>
    </main>
  );
}
