import AcmeLogo2 from '@/app/ui/acme-logo2';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/invoices/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-900 to-purple-500 p-4 md:h-52">
        <AcmeLogo2 />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-sky-200 bg-opacity-95 px-6 py-10 md:w-2/5 md:px-20">
          <div
            className="h-0 w-0 border-b-[35px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
          />
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Stafko!</strong> <br />The definitive management app.<br />Under development...
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Go to App</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Hero Images */}
          <Image
            src="/dashboard.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Desktop version"
          />
          {/* 
          <Image
            src="/dashboard.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Mobile version"
          />
          */}
        </div>
      </div>
    </main>
  );
}
