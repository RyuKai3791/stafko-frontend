import Pagination from '@/app/ui/invoices/pagination' // CAMBIAR IMPORTS
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { lusitana } from '../../ui/invoices/fonts';
import { ProjectsTableSkeleton } from '@/app/ui/skeletons';
import { fetchProjectsPages } from '@/app/lib/data';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProjectsPages(query);
// Implement Clockify with a new sidebar button called "Tracker". This new button should navigate to the tracker page. The tracker page should give the user a dropdown menu to select one project of a list, then, the project information shows up along with a button on his right called "Track". This "Track" button should, when clicked, start a visible counter with hours, minutes and seconds and change the inner text of the button to "Stop tracking". When clicked again, the counter stops and returns to "Track". The track data (time spent) should be stored in my vercel postgre database . In case you need it, make the necessary changes at "lib" files or another ones.
// Para resolver un error, necesito que revises varios archivos, individualmente, y en su conjunto, separados por el nombre. El error en mi aplicacion nextjs es:
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl bg-sky-200 bg-opacity-95 p-2 rounded-xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers" />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<ProjectsTableSkeleton />}>
        {/* <Table query={query} currentPage={currentPage} /> */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
