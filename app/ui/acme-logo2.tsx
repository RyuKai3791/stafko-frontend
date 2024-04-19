import { lusitana } from './invoices/fonts';

export default function AcmeLogo2() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img src="/logo.png" alt="Logo" className="h-28 w-28 mb-1 ml-3 justify-center rounded-full" />
      <p className="text-[54px] ml-10">Stafko</p>
    </div>
  );
}
