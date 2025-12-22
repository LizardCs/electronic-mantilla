-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-12-2025 a las 19:16:12
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
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `REP_ID` int(11) NOT NULL,
  `REP_CED_USU` varchar(10) NOT NULL,
  `REP_NOM_USU` varchar(150) NOT NULL,
  `REP_TIPO` varchar(50) NOT NULL,
  `REP_DOC` mediumblob NOT NULL,
  `REP_FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serviciostecnicos`
--

CREATE TABLE `serviciostecnicos` (
  `SERV_ID` int(11) NOT NULL,
  `SERV_NUM` varchar(30) NOT NULL,
  `SERV_CED_ENV` varchar(10) NOT NULL,
  `SERV_NOM_ENV` varchar(30) NOT NULL,
  `SERV_IMG_ENV` mediumblob NOT NULL,
  `SERV_CED_REC` varchar(10) NOT NULL,
  `SERV_NOM_REC` varchar(10) NOT NULL,
  `SERV_EST` int(11) NOT NULL,
  `SERV_DESCRIPCION` varchar(250) DEFAULT NULL,
  `SERV_FECH_ASIG` datetime DEFAULT NULL,
  `SERV_FECH_FIN` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersmovil`
--

CREATE TABLE `usersmovil` (
  `MOV_ID` int(11) NOT NULL,
  `MOV_CED` varchar(10) NOT NULL,
  `NOM_MOV` varchar(50) NOT NULL,
  `MOV_APE` varchar(50) NOT NULL,
  `MOV_CELU` varchar(10) NOT NULL,
  `MOV_USU` varchar(50) NOT NULL,
  `MOV_CLAVE` varchar(50) NOT NULL,
  `MOV_ROL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usersmovil`
--

INSERT INTO `usersmovil` (`MOV_ID`, `MOV_CED`, `NOM_MOV`, `MOV_APE`, `MOV_CELU`, `MOV_USU`, `MOV_CLAVE`, `MOV_ROL`) VALUES
(1, '1850221761', 'Johan Israel', 'Curicho Soria', '0990167477', 'johan', 'johan', 1),
(7, '1850221769', 'tecnico', 'tecnicopurebaeste', '0992778023', 'tecnico', 'tecnico', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersweb`
--

CREATE TABLE `usersweb` (
  `WEB_ID` int(11) NOT NULL,
  `WEB_CED` varchar(10) NOT NULL,
  `WEB_NOMBRES` varchar(100) NOT NULL,
  `WEB_APELLIDOS` varchar(100) NOT NULL,
  `WEB_USU` varchar(50) NOT NULL,
  `WEB_CLAVE` varchar(255) NOT NULL,
  `WEB_CELU` varchar(10) NOT NULL,
  `WEB_FEC_CREADO` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usersweb`
--

INSERT INTO `usersweb` (`WEB_ID`, `WEB_CED`, `WEB_NOMBRES`, `WEB_APELLIDOS`, `WEB_USU`, `WEB_CLAVE`, `WEB_CELU`, `WEB_FEC_CREADO`) VALUES
(9, '1850221761', 'Johan', 'Curicho', 'johan', '$2b$12$isaktKNDg9a0CzjXcBdnrO/ky36/6Qxs/2I9hlLchGfPGfv4hwH7y', '0992778023', '2025-12-19 21:59:36');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`REP_ID`);

--
-- Indices de la tabla `serviciostecnicos`
--
ALTER TABLE `serviciostecnicos`
  ADD PRIMARY KEY (`SERV_ID`);

--
-- Indices de la tabla `usersmovil`
--
ALTER TABLE `usersmovil`
  ADD PRIMARY KEY (`MOV_ID`);

--
-- Indices de la tabla `usersweb`
--
ALTER TABLE `usersweb`
  ADD PRIMARY KEY (`WEB_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `REP_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `serviciostecnicos`
--
ALTER TABLE `serviciostecnicos`
  MODIFY `SERV_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usersmovil`
--
ALTER TABLE `usersmovil`
  MODIFY `MOV_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usersweb`
--
ALTER TABLE `usersweb`
  MODIFY `WEB_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
