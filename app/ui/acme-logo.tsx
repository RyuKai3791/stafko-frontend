import { CogIcon } from '@heroicons/react/24/outline';
import { lusitana } from './invoices/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <	CogIcon className="h-28 w-16" />
      <p className="text-[40px]">Stafko</p>
    </div>
  );
}
