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
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT null,
  state VARCHAR NOT null,
  city VARCHAR NOT null,
  contact_number VARCHAR NOT NULL,
  zip_code VARCHAR NOT NULL,
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
  quantity VARCHAR NOT null,
  category VARCHAR NOT null,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  users_id uuid,
  PRIMARY KEY(id),
  FOREIGN KEY(users_id)
  REFERENCES users(id)
)
