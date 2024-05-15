const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const projects = [
  {
    id: '6b8e7394-bc4b-4fb1-87a7-fec4b6a6442a',
    staff_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Project One',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    description: 'This is the first project',
    amount: 5000,
    status: 'active',
  },
  {
    id: 'c07e224a-aa2d-48c2-a000-fec4b6a6442a',
    staff_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Project Two',
    start_date: '2022-02-01',
    end_date: '2022-11-30',
    description: 'This is the second project',
    amount: 8000,
    status: 'completed',
  },
  {
    id: 'b166a29f-367b-457a-8e21-fec4b6a6442a',
    staff_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Project Three',
    start_date: '2022-03-01',
    end_date: '2022-10-31',
    description: 'This is the third project',
    amount: 10000,
    status: 'active',
  },
  {
    id: 'f9d1f3eb-2bcb-42f2-b572-fec4b6a6442a',
    staff_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Project Four',
    start_date: '2022-04-01',
    end_date: '2022-09-30',
    description: 'This is the fourth project',
    amount: 7000,
    status: 'completed',
  },
  {
    id: '6d13a034-2ed1-4c6e-9536-fec4b6a6442a',
    staff_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Project Five',
    start_date: '2022-05-01',
    end_date: '2022-08-31',
    description: 'This is the fifth project',
    amount: 6000,
    status: 'active',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const staff = [
  {
    id: 'd4818200-6f2e-441e-8c1b-869f61f49c7a',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: '2fba8c60-71af-4785-8278-7cb14f5a5cc1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  },
  {
    id: 'd3db785a-9567-4fb3-b6c2-2f2538ae2b50',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
  },
  {
    id: 'e9be7c78-768c-4184-8645-4b62cf56317a',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
  },
  {
    id: 'ed6c4b4e-27ed-4b7c-b9e4-f2950c0ee490',
    name: 'David Brown',
    email: 'david.brown@example.com',
  },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  projects,
  staff,
  projects,
};
