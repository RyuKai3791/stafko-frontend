import Form from '@/app/ui/projects/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProjectById, fetchProjects } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { projects } from '@/app/lib/placeholder-data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [project, customers] = await Promise.all([
    fetchProjectById(id),
    fetchProjects(),
  ]);

  if (!project) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'Edit Project',
            href: `/dashboard/projects/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form project={project} projects={projects} />
    </main>
  );
}
