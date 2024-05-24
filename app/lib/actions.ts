'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// import clockifyClient from './clockifyClient';

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
  start_date: z.string(),
  end_date: z.string(),
  status: z.enum(['active', 'completed']),
});

const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image_url: z.string(),
});
  
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const CreateProject = ProjectSchema.omit({ id: true });
const UpdateProject = ProjectSchema.omit({ id: true });

const CreateCustomer = CustomerSchema.omit({ id: true });
const UpdateCustomer = CustomerSchema.omit({ id: true });

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
  const { name, description, amount, start_date, end_date, status } = CreateProject.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    startDate: formData.get('start_date'),
    endDate: formData.get('end_date'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      INSERT INTO projects (name, description, amount, start_date, end_date, status)
      VALUES (${name}, ${description}, ${amountInCents}, ${start_date}, ${end_date}, ${status})
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
  const { name, description, amount, start_date, end_date, status} = UpdateProject.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    startDate: formData.get('start_date'),
    endDate: formData.get('end_date'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE projects
      SET name = ${name}, description = ${description}, amount = ${amountInCents},
        start_date = ${start_date}, end_date = ${end_date}, status = ${status}
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

export async function createCustomer(formData: FormData) {
  const { name, email, image_url } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  try {
    await sql`
      INSERT INTO projects (name, description, amount, start_date, end_date, status)
      VALUES (${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to create project.'
    };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateCustomer(id: string, formData: FormData) {
  const { name, email, image_url } = UpdateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to update customer.'
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted customer.' };
  } catch (error) {
    return { message: 'Database error: Failed to delete customer.' };
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
