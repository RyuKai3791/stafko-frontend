import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search';
import Table from '@/app/ui/tracker/table';
// import { StartTimer } from '@/app/ui/tracker/buttons'; 
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl bg-sky-200 bg-opacity-95 p-2 rounded-xl`}>Tracker</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search projects" />
      </div>
      <Suspense key={query + currentPage} fallback={<ProjectsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
