-- DROP TABLE IF EXISTS movies;

-- CREATE TABLE movies( id SERIAL PRIMARY KEY, title VARCHAR, review TEXT, image TEXT, rating INTEGER, createdAt DATE, updatedAt DATE );






-- USE THE FOLLOWING DATA 

INSERT INTO movies (title, review, image, rating)
VALUES
  ('Deadpool','It was great, and very funny.', 'http://cdn1-www.comingsoon.net/assets/uploads/gallery/deadpool/b4w8wlx.jpg', 4);


INSERT INTO movies (title, review, image, rating)
VALUES
  ('Star Wars: The Force Awakens','I love REY!', 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/10/star-wars-force-awakens-official-poster.jpg', 5);

INSERT INTO movies (title, review, image, rating)
VALUES
  ('Spotlight','Very beautiful and moving film. Glad it won best picture.', 'https://farm1.staticflickr.com/745/20104185723_0ca6c3e963_o.jpg', 5);