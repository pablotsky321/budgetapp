CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(150) CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  name VARCHAR(50),
  lastname VARCHAR(50),
  password TEXT,
  roles VARCHAR(50)[] NOT NULL CHECK (roles <@ ARRAY['user', 'admin']::varchar(50)[]),
  expenses NUMERIC NOT NULL DEFAULT 0,
  earning NUMERIC NOT NULL DEFAULT 0,
  unique(email)
);

create table if not exists billType(
  id uuid default gen_random_uuid() primary key,
  bill_type varchar(50),
  description text,
  user_id uuid not null,
  foreign key(user_id) references users(id)
);

create table if not exists bills (
  id uuid default gen_random_uuid() primary key,
  bill_type_id uuid not null,
  bill_name varchar(100),
  bill_value numeric,
  foreign key(bill_type_id) references billType(id)
);

