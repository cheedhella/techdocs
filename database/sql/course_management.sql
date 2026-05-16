-- =========================================
-- COLLEGE MANAGEMENT DATABASE
-- Demonstrates:
-- 1. One-to-One
-- 2. One-to-Many
-- 3. Many-to-One
-- 4. Many-to-Many
-- =========================================

-- Create Database
CREATE DATABASE college_management;

-- Use Database
USE sql12825895;

-- =========================================
-- 1. DEPARTMENTS TABLE
-- One department can have many students
-- =========================================

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================
-- 2. STUDENTS TABLE
-- Many students belong to one department
-- =========================================

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT,
    dept_id INT,

    FOREIGN KEY (dept_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =========================================
-- 3. STUDENT PROFILES TABLE
-- One-to-One relationship with students
-- Each student has only one profile
-- =========================================

CREATE TABLE student_profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),

    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================
-- 4. COURSES TABLE
-- =========================================

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    credits INT DEFAULT 3
);

-- =========================================
-- 5. ENROLLMENTS TABLE
-- Many-to-Many relationship
-- Students <-> Courses
-- =========================================

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,

    PRIMARY KEY (student_id, course_id),

    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================
-- INSERT SAMPLE DATA
-- =========================================

-- Departments
INSERT INTO departments (name)
VALUES
('Computer Science'),
('Mechanical Engineering'),
('Electronics');

-- Students
INSERT INTO students (name, email, age, dept_id)
VALUES
('Rahul Sharma', 'rahul@example.com', 20, 1),
('Priya Reddy', 'priya@example.com', 21, 1),
('Arjun Kumar', 'arjun@example.com', 22, 2),
('Sneha Patel', 'sneha@example.com', 20, 3);

-- Student Profiles (One-to-One)
INSERT INTO student_profiles (student_id, phone, address)
VALUES
(1, '9876543210', 'Hyderabad'),
(2, '9123456780', 'Vijayawada'),
(3, '9988776655', 'Chennai'),
(4, '9001122334', 'Bangalore');

-- Courses
INSERT INTO courses (name, credits)
VALUES
('Database Management System', 4),
('Java Programming', 3),
('Computer Networks', 3),
('Thermodynamics', 4);

-- Enrollments (Many-to-Many)
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES
(1, 1, '2026-01-10'),
(1, 2, '2026-01-10'),
(1, 3, '2026-01-10'),

(2, 1, '2026-01-12'),
(2, 2, '2026-01-12'),

(3, 4, '2026-01-15'),

(4, 1, '2026-01-18'),
(4, 3, '2026-01-18');

-- =========================================
-- SAMPLE QUERIES
-- =========================================

-- 1. View all students with departments
SELECT
    s.id,
    s.name as student_name,
    d.name as department_name
FROM students s
LEFT JOIN departments d
ON s.dept_id = d.id;

-- =========================================

-- 2. View student profiles
SELECT
    s.name,
    sp.phone,
    sp.address
FROM students s
JOIN student_profiles sp
ON s.id = sp.student_id;

-- =========================================

-- 3. View students enrolled in courses
SELECT
    s.name as student_name,
    c.name as course_name,
    e.enrollment_date
FROM enrollments e
JOIN students s
ON e.student_id = s.id
JOIN courses c
ON e.course_id = c.id;

-- =========================================

-- 4. Count students in each department
SELECT
    d.name AS dept_name,
    COUNT(s.id) AS total_students
FROM departments d
LEFT JOIN students s
ON d.id = s.dept_id
GROUP BY d.name;

-- =========================================

-- 5. Find courses taken by Rahul Sharma
SELECT
    s.name as student_name,
    c.name as course_name
FROM enrollments e
JOIN students s
ON e.student_id = s.id
JOIN courses c
ON e.course_id = c.id
WHERE s.name = 'Rahul Sharma';

-- =========================================
-- SHOW TABLES
-- =========================================

SHOW TABLES;

-- =========================================
-- DESCRIBE TABLES
-- =========================================

DESC departments;
DESC students;
DESC student_profiles;
DESC courses;
DESC enrollments;