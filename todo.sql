CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  create_at datetime NOT NULL
);
