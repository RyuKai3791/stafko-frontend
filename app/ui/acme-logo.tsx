import { lusitana } from './invoices/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img src="/logo.png" alt="Logo" className="h-28 w-28 mb-2 ml-12 justify-center rounded-full" />
    </div>
  );
}
