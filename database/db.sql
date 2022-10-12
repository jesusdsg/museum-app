
CREATE DATABASE museumdb;

USE museumdb;

CREATE TABLE bookmarks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    userId INT NOT NULL,
    image VARCHAR(225),
    website VARCHAR(200),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    name VARCHAR(250) NOT NULL,
    password VARCHAR(200) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, name, password)
VALUES ('admin', 'Administrator', 'root');

INSERT INTO users (email, name, password)
VALUES ('test', 'Test User', 'test');

INSERT INTO bookmarks (title, userId, image, website)
VALUES ('Test Bookmark', '1', 'Test img', 'Test Website');

describe bookmarks;