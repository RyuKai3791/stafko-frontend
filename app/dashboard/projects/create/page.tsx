import Form from '@/app/ui/projects/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { projects } from '@/app/lib/placeholder-data';
 
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'Create Project',
            href: '/dashboard/projects/create',
            active: true,
          },
        ]}
      />
      <Form projects={projects} />
    </main>
  );
}