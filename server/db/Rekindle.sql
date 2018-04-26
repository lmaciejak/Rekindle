DROP DATABASE IF EXISTS rekindle;
CREATE DATABASE rekindle;

\c rekindle

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR,
  full_name VARCHAR,
  user_img VARCHAR
  );

CREATE TABLE friendships ( 
  friendship_id SERIAL PRIMARY KEY, 
  friend_initial INTEGER REFERENCES users, 
  friend_befriended INTEGER REFERENCES users, 
  befriended_user_status VARCHAR, 
  lastHangoutDate date
);

CREATE TABLE availabilities (
  availability_id SERIAL PRIMARY KEY, 
  availability_date date, 
  availability_starttime time, 
  availability_endtime time
); 

CREATE TABLE availabilityshares (
  availabilityshare_id SERIAL PRIMARY KEY, 
  availability_id INTEGER REFERENCES availabilities, 
  usertosharewith_id INTEGER REFERENCES users
); 

CREATE TABLE hangouts (
  hangout_id SERIAL PRIMARY KEY, 
  hangout_location VARCHAR, 
  hangout_date date, 
  hangout_starttime time, 
  hangout_endtime time, 
  hangout_type VARCHAR
); 

CREATE TABLE hangoutparticipants (
  hangoutparticipants_id SERIAL PRIMARY KEY, 
  hangoutpartaker_id INTEGER REFERENCES users
); 