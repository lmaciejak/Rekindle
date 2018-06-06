DROP DATABASE IF EXISTS rekindle;
CREATE DATABASE rekindle;

\c rekindle

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR,
  full_name VARCHAR,
  user_img VARCHAR, 
  user_location VARCHAR
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
  usertosharewith_id INTEGER REFERENCES users, 
  hangout_confirmed VARCHAR
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
INSERT INTO users (username, password, email, full_name, user_img, user_location)
  VALUES ('Tom', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Tom Waters', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Creative-Tail-People-man.svg/256px-Creative-Tail-People-man.svg.png', 'New York, NY'), 
  ('Mary', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Mary Brooke', 'https://www.svgrepo.com/show/28663/woman.svg', 'Queens, NY'), 
  ('June', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'June Davis', 'https://www.svgrepo.com/show/51589/girl.svg', 'Brooklyn, NY'),
    ('Nathan', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Nathan Marks', 'https://www.svgrepo.com/show/106034/man.svg', 'Bronx, NY');

INSERT INTO friendships (friend_initial, friend_befriended, befriended_user_status, lastHangoutDate)
VALUES (1, 2, 'accepted', NULL), (1, 3, 'accepted', null);

INSERT INTO availabilities (availability_user_id, availability_starttime, availability_endtime, availability_title, stage)
VALUES (1, '2018-02-06 19:00:00', '2018-02-06 21:00:00', 'free', NULL), 
(1, '2018-04-06 19:00:00', '2018-04-06 21:00:00', 'free', NULL), 
(1, '2018-05-28 19:00:00', '2018-05-28 21:00:00', 'free', NULL), 
(2, '2018-06-07 18:30:00', '2018-06-07 20:30:00', 'free', NULL), 
(3, '2018-06-10 14:00:00', '2018-06-10 21:00:00', 'free', NULL), 
(1, '2018-06-15 19:00:00', '2018-06-15 20:00:00', 'free', NULL), 
(3, '2018-06-19 19:00:00', '2018-06-19 21:00:00', 'free', 'plan'); 


INSERT INTO availabilityshares (availability_id, usertosharewith_id, hangout_confirmed) 
VALUES (4, 1, 'no'), (4, 3, 'no'), (5, 1, 'no'), 
(1, 2, 'yes'), (2, 2, 'yes'), (3, 3, 'yes'), (7, 1, 'no'), (7, 2, 'no'); 

INSERT INTO hangouts (hangout_availability_id) VALUES (1); 
