-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ztecnologyapp
CREATE DATABASE IF NOT EXISTS `ztecnologyapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ztecnologyapp`;

-- Volcando estructura para tabla ztecnologyapp.cities
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.cities: ~32 rows (aproximadamente)
INSERT INTO `cities` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Arauca', '2024-03-19 06:53:36', '2024-03-19 06:53:36'),
	(2, 'Armenia', '2024-03-19 06:54:17', '2024-03-19 06:54:17'),
	(3, 'Barranquilla', '2024-03-19 17:59:35', '2024-03-19 17:59:35'),
	(4, 'Bogotá', '2024-03-19 17:59:53', '2024-03-19 17:59:53'),
	(5, 'Bucaramanga', '2024-03-19 18:00:19', '2024-03-19 18:00:19'),
	(6, 'Cali', '2024-03-19 18:00:36', '2024-03-19 18:00:36'),
	(7, 'Cartagena', '2024-03-19 18:00:48', '2024-03-19 18:04:15'),
	(8, 'Cúcuta', '2024-03-19 18:04:53', '2024-03-19 18:04:53'),
	(9, 'Florencia', '2024-03-19 18:05:04', '2024-03-19 18:05:04'),
	(10, 'Ibagué', '2024-03-19 18:05:14', '2024-03-19 18:05:14'),
	(11, 'Leticia', '2024-03-19 18:05:23', '2024-03-19 18:05:23'),
	(12, 'Manizales', '2024-03-19 18:05:33', '2024-03-19 18:05:33'),
	(13, 'Medellín', '2024-03-19 18:05:43', '2024-03-19 18:05:43'),
	(14, 'Mitú', '2024-03-19 18:05:52', '2024-03-19 18:05:52'),
	(15, 'Mocoa', '2024-03-19 18:06:02', '2024-03-19 18:06:02'),
	(16, 'Montería', '2024-03-19 18:06:12', '2024-03-19 18:06:12'),
	(17, 'Neiva', '2024-03-19 18:06:21', '2024-03-19 18:06:21'),
	(18, 'Pasto', '2024-03-19 18:06:31', '2024-03-19 18:06:31'),
	(19, 'Pereira', '2024-03-19 18:06:42', '2024-03-19 18:06:42'),
	(20, 'Popayán', '2024-03-19 18:06:52', '2024-03-19 18:06:52'),
	(21, 'Puerto Carreño', '2024-03-19 18:07:04', '2024-03-19 18:07:04'),
	(22, 'Puerto Inírida', '2024-03-19 18:07:17', '2024-03-19 18:08:22'),
	(23, 'Quibdó', '2024-03-19 18:07:27', '2024-03-19 18:08:43'),
	(24, 'Riohacha', '2024-03-19 18:09:19', '2024-03-19 18:09:19'),
	(25, 'San Andrés', '2024-03-19 18:09:34', '2024-03-19 18:09:34'),
	(26, 'San José del Guaviare', '2024-03-19 18:09:51', '2024-03-19 18:09:51'),
	(27, 'Santa Marta', '2024-03-19 18:10:04', '2024-03-19 18:10:04'),
	(28, 'Sincelejo', '2024-03-19 18:10:15', '2024-03-19 18:10:15'),
	(29, 'Tunja', '2024-03-19 18:10:24', '2024-03-19 18:10:24'),
	(30, 'Valledupar', '2024-03-19 18:10:34', '2024-03-19 18:10:34'),
	(31, 'Villavicencio', '2024-03-19 18:10:42', '2024-03-19 18:10:42'),
	(32, 'Yopal', '2024-03-19 18:10:54', '2024-03-19 18:10:54');

-- Volcando estructura para tabla ztecnologyapp.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `idCitie` int(11) DEFAULT NULL,
  `state` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idCitie` (`idCitie`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`idCitie`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.customers: ~8 rows (aproximadamente)
INSERT INTO `customers` (`id`, `document`, `name`, `email`, `phone`, `address`, `idCitie`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, '90042038', 'Avivamiento', 'avivamiento@gmail.com', '4171380', 'Cra 13 80', 12, 0, '2024-03-19 18:54:43', '2024-05-17 01:08:14'),
	(2, '830128384', 'Meridian', 'meridian@gmail.com', '7562908', 'Cra 26 80', 4, 1, '2024-03-19 18:57:13', '2024-03-19 19:04:53'),
	(4, '900932898', 'INGEYA SAS', 'ingeyasas@gmail.com', '3114782086', 'Calle 129a', 4, 1, '2024-05-14 20:46:58', '2024-05-14 20:46:58'),
	(7, '900042038', 'TransMeridian', 'transmeridiano@gmail.com', '7562907', 'Cra 26 56', 4, 1, '2024-05-14 23:12:00', '2024-05-14 23:12:00'),
	(8, '52107108', 'Rubiela Gutierrez P', 'rubi@gmail.com.co', '311207', 'calle 80 80', 18, 1, '2024-05-14 23:18:23', '2024-05-16 08:37:12'),
	(12, '1019026', 'Alejandro', 'alejosilver@gmail.com', '3114782085', 'Calle 129a', 4, 0, '2024-05-14 23:36:20', '2024-05-15 05:08:10'),
	(29, '456123', 'Hernando', 'hernando@gmail.com', '7562908', 'Cra 26 80', 5, 1, '2024-05-15 18:45:58', '2024-05-16 00:15:56'),
	(30, '1016082458', 'Duilia Guerrero', '', '', '', 4, 1, '2024-05-17 01:10:01', '2024-05-17 01:10:01');

-- Volcando estructura para tabla ztecnologyapp.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `priceUnit` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `state` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.products: ~11 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `description`, `priceUnit`, `photo`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, 'Mouse alambrico', 'Mouse alambrico negro USB', '20000', 'https://www.intelsegurity.com/wp-content/uploads/2020/04/Mouse-Genius-Dx-120-Plug-n-play-Con-Puerto-USB-Negro-1.jpg', 1, '2024-03-19 19:25:28', '2024-03-19 19:31:29'),
	(2, 'Mouse alambrico', 'Mouse alambrico blanco USB', '25000', 'https://http2.mlstatic.com/D_NQ_NP_735002-MLC47413057607_092021-O.webp', 1, '2024-03-19 19:26:11', '2024-03-19 19:30:53'),
	(3, 'Mouse inalambrico', 'Mouse ergonomico', '30000', 'https://exitocol.vtexassets.com/arquivos/ids/13558012/mouse-ergonomico-vertical-inalambrico-24g-recargable-usb.jpg?v=637931585775170000', 0, '2024-03-19 19:26:15', '2024-03-19 19:32:00'),
	(4, 'Mouse inalambrico', 'Mouse Gaming Rojo', '35000', 'https://http2.mlstatic.com/D_NQ_NP_784557-MCO43579586412_092020-O.webp', 1, '2024-03-19 19:26:21', '2024-03-19 19:26:21'),
	(5, 'Mouse inalambrico', 'Mouse Gaming Negro', '40000', 'https://http2.mlstatic.com/D_NQ_NP_953207-MLU73659130279_122023-O.webp', 1, '2024-03-19 19:26:58', '2024-03-19 19:26:58'),
	(6, 'Mouse inalambrico', 'Mouse Multifuncion', '50000', 'https://imgmedia.larepublica.pe/640x371/larepublica/original/2023/11/17/6557dac8d5b85b215b39fc2b.webp', 1, '2024-05-16 02:57:23', '2024-05-16 02:57:23'),
	(7, 'Monitor Curvo 27 Fhd', 'Diseño Sin Bordes Color Black 100v/240v', '702000', 'https://www.muycomputer.com/wp-content/uploads/2016/01/tv-curvas-1.jpg', 1, '2024-05-16 07:01:12', '2024-05-16 07:01:12'),
	(9, 'Monitor', 'Diseño Sin Bordes Color Black 100v/240v', '500000', 'https://d598hd2wips7r.cloudfront.net/wysiwyg/MX_Las_5_razones_principales_para_comprar_un_monitor_de_PC_curvo_2.png', 0, '2024-05-16 07:11:12', '2024-05-16 07:11:12'),
	(18, 'Celular Oppo', 'Oppo Rojo', '105102', 'https://teknopolis.vtexassets.com/arquivos/ids/212432/Celular-Oppo-Reno-11-5G-12GB-256GB-Verde--Agua-1.jpg?v=638442128290700000', 1, '2024-05-16 07:50:46', '2024-05-16 07:50:46'),
	(19, 'Xbox', 'One de 1 Tb', '900000', 'https://m.media-amazon.com/images/I/61tl4Go6rqL._AC_SL1100_.jpg', 1, '2024-05-16 08:36:17', '2024-05-16 08:36:17'),
	(20, 'Monitor', 'Gaming', '800000', 'https://www.lg.com/content/dam/channel/wcms/co/images/monitores/34gp63a-b_awp_escb_co_c/gallery/DZ-01.jpg', 1, '2024-05-17 01:16:58', '2024-05-17 01:16:58');

-- Volcando estructura para tabla ztecnologyapp.quotedetail
CREATE TABLE IF NOT EXISTS `quotedetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idQuote` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idQuote` (`idQuote`),
  CONSTRAINT `quotedetail_ibfk_1` FOREIGN KEY (`idQuote`) REFERENCES `quotes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.quotedetail: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ztecnologyapp.quotes
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `yearQuote` year(4) DEFAULT NULL,
  `dateQuote` date DEFAULT current_timestamp(),
  `idCustomer` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `priceTotal` decimal(10,2) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `percentageDiscount` decimal(5,2) DEFAULT NULL,
  `idStateQuote` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idCustomer` (`idCustomer`),
  KEY `idUser` (`idUser`),
  KEY `idStateQuote` (`idStateQuote`),
  KEY `FK_quote_ztecnologyapp.products` (`idProduct`),
  CONSTRAINT `FK_quote_ztecnologyapp.products` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customers` (`id`),
  CONSTRAINT `quotes_ibfk_3` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `quotes_ibfk_4` FOREIGN KEY (`idStateQuote`) REFERENCES `statequote` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.quotes: ~2 rows (aproximadamente)
INSERT INTO `quotes` (`id`, `number`, `yearQuote`, `dateQuote`, `idCustomer`, `idProduct`, `stock`, `total`, `priceTotal`, `idUser`, `discount`, `percentageDiscount`, `idStateQuote`, `createdAt`, `updatedAt`) VALUES
	(6, NULL, NULL, '2024-05-16', 1, 9, 1, NULL, NULL, 1, 0.00, 0.00, 2, '2024-05-16 20:53:39', '2024-05-16 20:53:39'),
	(7, 'CT007/2024', NULL, '2024-05-16', 1, 1, 5, 25000.00, 125000.00, 6, 0.00, 0.00, 2, '2024-05-16 20:58:16', '2024-05-16 20:58:16');

-- Volcando estructura para tabla ztecnologyapp.quote_products
CREATE TABLE IF NOT EXISTS `quote_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idQuote` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idQuote` (`idQuote`),
  KEY `idProduct` (`idProduct`),
  CONSTRAINT `FK_quote_products_quotes` FOREIGN KEY (`idQuote`) REFERENCES `quotes` (`id`),
  CONSTRAINT `FK_quote_products_ztecnologyapp.products` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.quote_products: ~3 rows (aproximadamente)
INSERT INTO `quote_products` (`id`, `idQuote`, `idProduct`, `quantity`) VALUES
	(3, 7, 20, 2),
	(4, 7, 1, 3),
	(5, 7, 18, 1);

-- Volcando estructura para tabla ztecnologyapp.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  `description` varchar(40) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.roles: ~2 rows (aproximadamente)
INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', 'Administrador', '2024-03-19 06:54:44', '2024-03-19 06:54:44'),
	(2, 'gestor', 'Usuario Standard', '2024-03-19 06:55:02', '2024-03-19 06:55:02');

-- Volcando estructura para tabla ztecnologyapp.statequote
CREATE TABLE IF NOT EXISTS `statequote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.statequote: ~4 rows (aproximadamente)
INSERT INTO `statequote` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Aprobada', '2024-03-19 19:46:17', '2024-03-19 19:46:17'),
	(2, 'En estudio', '2024-03-19 19:47:37', '2024-03-19 19:47:37'),
	(3, 'Anulada', '2024-03-19 19:48:10', '2024-03-19 19:48:10'),
	(4, 'Raclazada', '2024-03-19 19:52:00', '2024-03-19 19:52:47');

-- Volcando estructura para tabla ztecnologyapp.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `names` varchar(100) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `state` tinyint(1) DEFAULT 1,
  `password` varchar(20) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT 0,
  `failedLogin` int(11) DEFAULT NULL,
  `lastFailedLogin` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idRol` (`idRol`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ztecnologyapp.users: ~6 rows (aproximadamente)
INSERT INTO `users` (`id`, `names`, `email`, `phone`, `area`, `state`, `password`, `idRol`, `blocked`, `failedLogin`, `lastFailedLogin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Alejandro Yopasa', 'admin@ztecnology.com', '3114782085', 'Sistemas', 1, '$2a$10$.VTYVLhEaSvFj', 1, 0, 0, '0000-00-00 00:00:00', '2024-03-19 06:55:34', '2024-03-19 06:55:34'),
	(6, 'Andres Carrasco', 'usuario1@ztecnology.com', '3114782089', 'Comercial', 0, '$2a$10$qrQWRFYyA.f4J', 2, 0, 0, '0000-00-00 00:00:00', '2024-03-19 18:35:06', '2024-03-19 18:35:06'),
	(7, 'Usuario2', 'usuario2@ztecnology.com', '3114782085', 'Ventas', 0, '$2a$10$dJT3unoPpNDWa', 2, 0, 0, '0000-00-00 00:00:00', '2024-05-15 05:56:37', '2024-05-15 05:56:37'),
	(8, 'Usuario3', 'usuario3@ztecnology.com', '3114782085', 'Ventas', 1, '$2a$10$PgGeDJYz53x.U', 1, 0, 0, '0000-00-00 00:00:00', '2024-05-15 08:41:09', '2024-05-15 08:41:09'),
	(9, 'Alejandra', 'usuario4@ztecnology.com', '75689', 'Ventas', 1, '$2a$10$OB17faYgS4kGj', 2, 0, 0, '0000-00-00 00:00:00', '2024-05-16 12:48:39', '2024-05-16 12:48:39'),
	(10, 'Andres Arriaga', 'andres@ztecnology.com', '31245698', 'Gerente', 1, '$2a$10$fB/NAYJtfXFLp', 2, 0, NULL, NULL, '2024-05-17 01:14:59', '2024-05-17 01:14:59');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
