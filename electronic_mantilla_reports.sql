-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2025 a las 21:10:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `electronic_mantilla_reports`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `user`, `password`, `created_at`) VALUES
(2, 'Johancuricho935@gmail.com', 'curicho', '$2b$12$b4w3i.1ywxSnoJOf4kEVguN9/WzT2NW52fc.8IkFRmy54OrdYaehW', '2025-11-05 19:49:58'),
(3, 'Electronicamantilla@gmail.com', 'ElectronicaM', '$2b$12$pyyPIZk9nOnfwnFk3K.kgONupHKCSINpA27An6HPqe.DlbN23H9JO', '2025-11-05 20:06:43'),
(4, 'pruebapruebita@gmail.com', 'prueba', '$2b$12$DQzZUDzxT5xAjy4GaIDuEeWV6sWpAXbL7WPyHYV081BG7JjnsILiG', '2025-11-05 21:54:56'),
(5, 'Curicho1@gmail.com', 'Curicho1@gmail.com', '$2b$12$xWCT7Lt.x/jas7JcDvUTouJWxzjp7RIUmeej8e1H71u/rm2UxGUVi', '2025-11-27 19:47:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
