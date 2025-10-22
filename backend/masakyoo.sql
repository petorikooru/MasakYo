-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2025 at 11:28 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masakyoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarked`
--

CREATE TABLE `bookmarked` (
  `id_user` int NOT NULL,
  `Id_recipe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foryou`
--

CREATE TABLE `foryou` (
  `id_user` int NOT NULL,
  `Id_recipe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id_user` int NOT NULL,
  `Id_recipe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id_recipe` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` multilinestring NOT NULL,
  `type` enum('nusantara','western','beverages') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipedetail`
--

CREATE TABLE `recipedetail` (
  `id_recipe` int NOT NULL,
  `thumbnail` blob NOT NULL,
  `video` blob NOT NULL,
  `alat_bahan` multilinestring NOT NULL,
  `langkah_langkah` multilinestring NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipestats`
--

CREATE TABLE `recipestats` (
  `id_user` int NOT NULL,
  `Id_recipe` int NOT NULL,
  `rating_kelezatan` int NOT NULL,
  `rating_kemudahan` int NOT NULL,
  `viewed_count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviewed`
--

CREATE TABLE `reviewed` (
  `id_user` int NOT NULL,
  `Id_recipe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `profile_pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `viewedrecipes`
--

CREATE TABLE `viewedrecipes` (
  `id_recipe` int NOT NULL,
  `viewed_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foryou`
--
ALTER TABLE `foryou`
  ADD PRIMARY KEY (`id_user`,`Id_recipe`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id_recipe`);

--
-- Indexes for table `recipedetail`
--
ALTER TABLE `recipedetail`
  ADD PRIMARY KEY (`id_recipe`);

--
-- Indexes for table `recipestats`
--
ALTER TABLE `recipestats`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `viewedrecipes`
--
ALTER TABLE `viewedrecipes`
  ADD PRIMARY KEY (`id_recipe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foryou`
--
ALTER TABLE `foryou`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id_recipe` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipedetail`
--
ALTER TABLE `recipedetail`
  MODIFY `id_recipe` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipestats`
--
ALTER TABLE `recipestats`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `viewedrecipes`
--
ALTER TABLE `viewedrecipes`
  MODIFY `id_recipe` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
