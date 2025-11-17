
-- ZooBuilder Tycoon Postgres schema (simplified)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  tg_user JSONB,
  coins BIGINT DEFAULT 0,
  gems INT DEFAULT 0,
  zoo JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  animal_id TEXT,
  name TEXT,
  rarity TEXT,
  income_per_min INT,
  appeal INT
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  item TEXT,
  amount INT,
  created_at TIMESTAMP DEFAULT now()
);
