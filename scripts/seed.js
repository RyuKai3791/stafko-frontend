const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "usuarios" table`);

    // Insert data into the "usuarios" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO usuarios (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "proyectos" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS proyectos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "proyectos" table`);

    // Insert data into the "proyectos" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
          INSERT INTO proyectos (id, staff_id, amount, status, date)
          VALUES (${invoice.id}, ${invoice.staff_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}


async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "staff" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS staff (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,  
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "staff" table`);

    // Insert data into the "staff" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
          INSERT INTO staff (id, name, email, image_url)
          VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "asignaciones" table if it doesn't exist
    // TABLA ASIGNACIONES, RELACIONADO CON REVENUE EN PLACEHOLDER-DATA, SI HAGO INSERT DARA ERROR. PENSAR
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS asignaciones (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        staff_id UUID NOT NULL,
        proyecto_id UUID NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        FOREIGN KEY (staff_id) REFERENCES staff(id),
        FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
      );
    `;

    console.log(`Created "asignaciones" table`);

    // Insert data into the "asignaciones" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
          INSERT INTO asignaciones (id, staff_id, proyecto_id, fecha_inicio, fecha_fin)
          VALUES (${rev.id}, ${rev.staff_id}, ${rev.proyecto_id}, ${rev.fecha_inicio}, ${rev.fecha_fin})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'Ha habido un error al insertar los datos:',
    err,
  );
});
