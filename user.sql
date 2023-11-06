CREATE TABLE user_roles(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  status boolean,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT null,
  state VARCHAR NOT null,
  city VARCHAR NOT null,
  contact_number VARCHAR NOT NULL,
  gender gender NOT NULL,
  address VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  user_role_id uuid,
  PRIMARY KEY(id),
  FOREIGN KEY(user_role_id)
  REFERENCES user_roles(id)
)

CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  price VARCHAR NOT NULL,
  image VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  users_id uuid,
  PRIMARY KEY(id),
  FOREIGN KEY(users_id)
  REFERENCES users(id)
)
CREATE TABLE categories(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  valueinfo VARCHAR NOT NULL,
  description text NOT NULL,
  image VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(id)
 )
CREATE TABLE sub_categories(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  valueinfo VARCHAR NOT NULL,
  description text NOT NULL,
  image VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
    categories_id uuid,
  PRIMARY KEY(id),
  FOREIGN KEY( categories_id)
  REFERENCES categories(id)
)
CREATE TABLE products_categories(
  id uuid DEFAULT uuid_generate_v4(),
  categories_id uuid,
  products_id uuid,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(categories_id)
  REFERENCES categories(id),
  FOREIGN KEY(products_id)
  REFERENCES products(id)
)


CREATE TABLE booking_table(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  date VARCHAR NOT NULL,
  time VARCHAR NOT NULL,
  contact VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  users_id uuid,
  PRIMARY KEY(id),
  FOREIGN KEY(users_id)
  REFERENCES users(id)
)


