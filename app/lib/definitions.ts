export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Staff = {
  id: string;
  name: string;
  email: string;
};

export type Project = {
  id: string;
  staff_id: string;
  name: string;
  description: string;
  amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: number;
};

export type LatestProject = {
  id: string;
  name: string;
  amount: number;
};

export type ProjectsTable = {
  id: string;
  staff_id: string;
  staff_name: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  amount: number;
  status: 'active' | 'completed';
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type StaffField = {
  id: string;
  name: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type ProjectField = {
  id: string;
  name: string;
}

export type ProjectForm = {
  id: string;
  staff_id: string;
  name: string;
  description: string;
  amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
