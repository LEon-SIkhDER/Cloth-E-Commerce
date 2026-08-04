'use client'

export default function GlobalError({ unstable_retry }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#f8f5ef] text-[#1f2520]">
                <main className="grid min-h-screen place-items-center px-4">
                    <section className="max-w-md rounded-3xl border border-[#1f2520]/10 bg-white p-8 text-center shadow-xl shadow-[#1f2520]/5">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Threadora</p>
                        <h1 className="mt-3 text-3xl font-black">Something went wrong</h1>
                        <p className="mt-3 text-sm leading-6 text-[#667064]">The page could not load correctly. Try again to reload the latest version.</p>
                        <button onClick={() => unstable_retry()} className="btn btn-primary mt-6 rounded-full px-7">
                            Try again
                        </button>
                    </section>
                </main>
            </body>
        </html>
    )
}
