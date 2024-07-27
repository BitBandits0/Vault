import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          {/* Can change name of the project if required */}
          <h1 className="text-5xl font-bold">
            Welcome to Vault,
            <br />
            <br />
            Your digital fortress for secure, seamless document management and
            storage.
          </h1>
          <p>
            <strong>Vault</strong> is a secure document management website built
            with Next.js, ShadCN library TypeScript, and Firebase Firestore. It
            offers Clerk authentication for user security. Users can upload,
            store, view, and edit their documents directly on the platform. The
            intuitive interface allows easy document management and access,
            ensuring documents are safely stored and readily available when
            needed.
          </p>
          <Link
            href="/dashboard"
            className="flex cursor-pointer rounded-md bg-[#219EBC] p-3 w-fit"
          >
            Try it! ✨
            <ArrowRightCircle className="ml-3" />
          </Link>
        </div>

        <div className="  bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </main>
  );
}
