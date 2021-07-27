-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2021 a las 01:50:40
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `challenge_javascript`
--

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `balance`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `balance` (
`ingreso` decimal(32,0)
,`egreso` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE `operaciones` (
  `operacionesId` int(11) NOT NULL,
  `operacionesConcepto` varchar(250) NOT NULL,
  `operacionesMonto` int(6) NOT NULL,
  `operacionesFecha` date NOT NULL,
  `relaTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`operacionesId`, `operacionesConcepto`, `operacionesMonto`, `operacionesFecha`, `relaTipo`) VALUES
(8, 'Venta de mercadería', 25000, '2021-07-26', 1),
(9, 'Cobro de deudas', 5000, '2021-07-26', 1),
(10, 'Compra de mercadería', 10000, '2021-07-26', 2),
(11, 'Pago de servicios', 5000, '2021-07-26', 2),
(12, 'Impuestos', 1500, '2021-07-26', 2),
(13, 'Alquiler', 8000, '2021-07-26', 2),
(14, 'Venta de mercadería', 7000, '2021-07-26', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `tiposId` int(11) NOT NULL,
  `tiposNombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`tiposId`, `tiposNombre`) VALUES
(1, 'Ingreso'),
(2, 'Egreso');

-- --------------------------------------------------------

--
-- Estructura para la vista `balance`
--
DROP TABLE IF EXISTS `balance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `balance`  AS SELECT (select sum(`operaciones`.`operacionesMonto`) from `operaciones` where `operaciones`.`relaTipo` = 1) AS `ingreso`, (select sum(`operaciones`.`operacionesMonto`) from `operaciones` where `operaciones`.`relaTipo` = 2) AS `egreso` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`operacionesId`),
  ADD KEY `relaTipo` (`relaTipo`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`tiposId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `operacionesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD CONSTRAINT `operaciones_ibfk_1` FOREIGN KEY (`relaTipo`) REFERENCES `tipos` (`tiposId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
