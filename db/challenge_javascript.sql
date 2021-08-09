-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2021 a las 18:56:00
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
  `relaUsuario` int(11) NOT NULL,
  `relaTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`operacionesId`, `operacionesConcepto`, `operacionesMonto`, `operacionesFecha`, `relaUsuario`, `relaTipo`) VALUES
(19, 'Compra de mercadería', 6000, '2021-08-09', 4, 1),
(20, 'Venta de mercadería', 2500, '2021-08-09', 4, 1),
(21, 'Pago de impuestos', 1300, '2021-08-09', 4, 2),
(22, 'Compra de mercadería', 30000, '2021-08-09', 5, 1),
(23, 'Pago de alquiler', 6000, '2021-08-09', 5, 2),
(24, 'Pago de servicios', 3000, '2021-08-09', 5, 2),
(25, 'Cobro de deudas', 2500, '2021-08-09', 5, 1),
(26, 'Venta de mercadería', 3500, '2021-08-09', 5, 1);

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
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuariosId` int(11) NOT NULL,
  `usuariosNombre` varchar(250) NOT NULL,
  `usuariosEmail` varchar(250) NOT NULL,
  `usuariosPassword` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuariosId`, `usuariosNombre`, `usuariosEmail`, `usuariosPassword`) VALUES
(4, 'acostamatias', 'matias@gmail.com', '$2b$10$AIMrKMOfndAMf9N5bU4dd.M2pbVTpegV4J50lMSQv1CYYKajm90/O'),
(5, 'user', 'user@gmail.com', '$2b$10$oA5LKLkmEPPHLzWnP0ilceNeI3e0WzT1V1ejEPIBiycPEmnX7P2Ie');

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
  ADD KEY `relaTipo` (`relaTipo`),
  ADD KEY `relaUsuario` (`relaUsuario`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`tiposId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuariosId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `operacionesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuariosId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD CONSTRAINT `operaciones_ibfk_1` FOREIGN KEY (`relaTipo`) REFERENCES `tipos` (`tiposId`),
  ADD CONSTRAINT `operaciones_ibfk_2` FOREIGN KEY (`relaUsuario`) REFERENCES `usuarios` (`usuariosId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
