'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['active', 'completed']),
  staffCount: z.number(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const CreateProject = ProjectSchema.omit({ id: true });
const UpdateProject = ProjectSchema.omit({ id: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to create invoice.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
  
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to update invoice.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database error: Failed to delete invoice.' };
  }
}

export async function createProject(formData: FormData) {
  const { name, description, amount, startDate, endDate, status, staffCount } = CreateProject.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    status: formData.get('status'),
    staffCount: formData.get('staffCount'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      INSERT INTO projects (name, description, amount, start_date, end_date, status, staff_count)
      VALUES (${name}, ${description}, ${amountInCents}, ${startDate}, ${endDate}, ${status}, ${staffCount})
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to create project.'
    };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const { name, description, amount, startDate, endDate, status, staffCount } = UpdateProject.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    status: formData.get('status'),
    staffCount: formData.get('staffCount'),
  });

  const amountInCents = amount * 100;

  try {
    // TENER EN CUENTA PARA ACTUALIZAR SEED O PLACEHOLDER.DATA
    await sql`
      UPDATE projects
      SET name = ${name}, description = ${description}, amount = ${amountInCents},
          start_date = ${startDate}, end_date = ${endDate}, status = ${status}, staff_count = ${staffCount}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to update project.'
    };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/dashboard/projects');
    return { message: 'Deleted project.' };
  } catch (error) {
    return { message: 'Database error: Failed to delete project.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
