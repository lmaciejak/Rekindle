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
  availability_user_id INTEGER REFERENCES users, 
  availability_starttime timestamp, 
  availability_endtime timestamp, 
  availability_title VARCHAR, 
  stage VARCHAR); 

CREATE TABLE availabilityshares (
  availabilityshare_id SERIAL PRIMARY KEY, 
  availability_id INTEGER REFERENCES availabilities, 
  usertosharewith_id INTEGER REFERENCES users
); 

CREATE TABLE hangouts (
  hangout_id SERIAL PRIMARY KEY, 
  hangout_location VARCHAR, 
  hangout_availability_id INTEGER REFERENCES availabilities,
  hangout_type VARCHAR, 
  hangout_confirmed boolean 
); 

CREATE TABLE hangoutparticipants (
  hangoutparticipants_id SERIAL PRIMARY KEY, 
  hangoutpartaker_id INTEGER REFERENCES users
); 

/* password for test is testtest */
INSERT INTO users (username, password, email, full_name, user_img)
  VALUES ('Tom', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Tom Waters', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'), 
  ('Mary', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Mary Brooke', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'), 
  ('June', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'June Davis', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
    ('Nathan', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Nathan Marks', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg');

INSERT INTO friendships (friend_initial, friend_befriended, befriended_user_status, lastHangoutDate)
VALUES (1, 2, 'accepted', NULL), (1, 3, 'accepted', null);

INSERT INTO availabilities (availability_user_id, availability_starttime, availability_endtime, availability_title)
VALUES (1, '2018-02-06 19:00:00', '2018-02-06 21:00:00', 'free'), 
(1, '2018-04-06 19:00:00', '2018-04-06 21:00:00', 'free'), 
(1, '2018-05-28 19:00:00', '2018-05-28 21:00:00', 'free'), 
(2, '2018-06-07 18:30:00', '2018-06-07 20:30:00', 'free'), 
(3, '2018-06-10 14:00:00', '2018-06-10 21:00:00', 'free'), 
(1, '2018-06-15 19:00:00', '2018-06-15 20:00:00', 'free'); 


INSERT INTO availabilityshares (availability_id, usertosharewith_id) VALUES (4, 1), (4, 3), (5, 1), (1, 2); 

INSERT INTO hangouts (hangout_availability_id) VALUES (1); 
