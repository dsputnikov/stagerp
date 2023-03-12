-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Фев 21 2023 г., 15:36
-- Версия сервера: 8.0.32-0ubuntu0.20.04.2
-- Версия PHP: 7.4.3-4ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `derebas`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE `accounts` (
  `id` int NOT NULL,
  `login` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `socialClub` varchar(64) NOT NULL,
  `admin` int NOT NULL DEFAULT '0',
  `regIP` varchar(64) NOT NULL,
  `lastIP` varchar(64) NOT NULL,
  `regDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `email`, `socialClub`, `admin`, `regIP`, `lastIP`, `regDate`, `lastDate`) VALUES
(15, 'Lemonqee', '1324356', 's5kype@yandex.ru', 'xz', 10, '31.173.240.133', '31.173.240.133', '2023-02-04 03:38:49', '2023-02-04 03:38:49'),
(16, 'tututu', '12312345', 'fdfsfdf@gmail.com', 'GoroHxZ', 10, '62.118.87.173', '62.118.87.173', '2023-02-04 08:54:26', '2023-02-04 08:54:26'),
(17, 'kostya', 'ko29eg08', 'kosego2008@gmail.com', 'top_gopshirt', 0, '193.106.185.147', '193.106.185.147', '2023-02-04 09:26:06', '2023-02-04 09:26:06'),
(19, 'test', '123123', 'safif@gmail.com', 'Saveliy_Sobolev', 0, '185.210.142.168', '185.210.142.168', '2023-02-04 16:22:45', '2023-02-04 16:22:45'),
(20, 'testik123', '123123', 'thebombaditreal@gmail.com', 'Saveliy_Sobolev', 0, '185.210.142.168', '185.210.142.168', '2023-02-05 04:21:12', '2023-02-05 04:21:12'),
(21, 'test2', '123123', '123123@gmail.com', 'Saveliy_Sobolev', 10, '185.210.142.168', '185.210.142.168', '2023-02-05 04:24:12', '2023-02-05 04:24:12'),
(22, 'test3', '1324356', 'tst@gmail.com', 'Saveliy_Sobolev', 10, '185.210.142.60', '185.210.142.60', '2023-02-05 08:22:26', '2023-02-05 08:22:26'),
(23, 'tosFOXter', '11012002', 'dsadas@mail.cry', 'DiM.asik', 0, '91.245.139.0', '91.245.139.0', '2023-02-05 08:40:11', '2023-02-05 08:40:11'),
(24, 'Sava123', '123123', 'Sava123@gmail.com', 'Saveliy_Sobolev', 10, '185.210.142.60', '185.210.142.60', '2023-02-06 14:27:25', '2023-02-06 14:27:25'),
(25, 'm3tla', '123123', 'daniilmetlakov02@mail.ru', '---MOUSE---', 10, '82.117.79.17', '82.117.79.17', '2023-02-07 08:24:24', '2023-02-07 08:24:24'),
(26, 'Mihai', 'cedrq', 'yoc63@yahoo.com', 'xMihai3002', 0, '82.16.229.166', '82.16.229.166', '2023-02-11 09:02:37', '2023-02-11 09:02:37'),
(27, 'Sava', '123123', 'thebombaditreal@gmail.com', 'Saveliy_Sobolev', 0, '185.210.143.162', '185.210.143.162', '2023-02-12 13:58:51', '2023-02-12 13:58:51'),
(28, '123', '123', '123@mail.ru', 'stagelabs', 0, '178.155.17.67', '178.155.17.67', '2023-02-12 14:08:39', '2023-02-12 14:08:39'),
(29, 'banan', '123', 'banan@mail.ry', 'stagelabs', 0, '178.155.17.67', '178.155.17.67', '2023-02-12 15:38:30', '2023-02-12 15:38:30');

-- --------------------------------------------------------

--
-- Структура таблицы `banip`
--

CREATE TABLE `banip` (
  `id` int NOT NULL,
  `admin` varchar(64) NOT NULL,
  `player` varchar(64) NOT NULL,
  `ip` varchar(64) NOT NULL,
  `reason` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Структура таблицы `bank`
--

CREATE TABLE `bank` (
  `id` int NOT NULL,
  `login` text NOT NULL,
  `playerid` text NOT NULL,
  `account` text NOT NULL,
  `money` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `bank`
--

INSERT INTO `bank` (`id`, `login`, `playerid`, `account`, `money`) VALUES
(10, 'str1x', '9', '783582', 91),
(11, 'tututu', '13', '614107', 2011309),
(12, 'Lemonqee', '12', '695507', 119856),
(13, 'Sava123', '21', '142869', 138889),
(14, 'Lemonqee', '30', '591875', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `bank_operations`
--

CREATE TABLE `bank_operations` (
  `id` int NOT NULL,
  `playerid` text NOT NULL,
  `type` text NOT NULL,
  `name` text NOT NULL,
  `subname` text NOT NULL,
  `money` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `bank_operations`
--

INSERT INTO `bank_operations` (`id`, `playerid`, `type`, `name`, `subname`, `money`) VALUES
(24, '9', '2', 'Пополнение счёта', 'в банке', 100),
(25, '9', '2', 'Пополнение счёта', 'в банке', 1),
(26, '9', '2', 'Пополнение счёта', 'в банке', 1),
(27, '9', '2', 'Пополнение счёта', 'в банке', 1),
(28, '9', '2', 'Пополнение счёта', 'в банке', 100),
(29, '9', '1', 'Снятие денег', 'со счёта', -10),
(30, '12', '2', 'Пополнение счёта', 'в банке', 14000),
(31, '13', '2', 'Пополнение счёта', 'в банке', 999999),
(32, '13', '2', 'Пополнение счёта', 'в банке', 999999),
(33, '12', '1', 'Перевод денег', 'Игроку Eblan_Aueshnik', -13),
(34, '13', '2', 'Пополнение счёта', 'в банке', 999999),
(35, '12', '1', 'Перевод денег', 'Игроку Eblan_Aueshnik', -13),
(36, '12', '1', 'Перевод денег', 'Игроку Eblan_Aueshnik', -13),
(37, '13', '1', 'Перевод денег', 'Игроку Sava_Testov', -12),
(38, '13', '1', 'Перевод денег', 'Игроку Sava_Testov', -12),
(39, '12', '1', 'Перевод денег', 'Игроку Eblan_Aueshnik', -13),
(40, '12', '1', 'Снятие денег', 'со счёта', -1233),
(41, '21', '2', 'Пополнение счёта', 'в банке', 150000),
(42, '21', '1', 'Снятие денег', 'со счёта', -11111);

-- --------------------------------------------------------

--
-- Структура таблицы `characters`
--

CREATE TABLE `characters` (
  `id` int UNSIGNED NOT NULL,
  `login` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `items` text NOT NULL,
  `gender` int NOT NULL,
  `dimension` int NOT NULL DEFAULT '0',
  `money` bigint NOT NULL DEFAULT '0',
  `bank` bigint NOT NULL DEFAULT '0',
  `lvl` int NOT NULL DEFAULT '1',
  `pedFace` text NOT NULL,
  `pedDnk` text NOT NULL,
  `pedHair` text NOT NULL,
  `lastPos` text,
  `faction` int NOT NULL DEFAULT '0',
  `faction_lvl` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `characters`
--

INSERT INTO `characters` (`id`, `login`, `Name`, `Surname`, `age`, `items`, `gender`, `dimension`, `money`, `bank`, `lvl`, `pedFace`, `pedDnk`, `pedHair`, `lastPos`, `faction`, `faction_lvl`) VALUES
(26, 'Mihai', 'Mihai', 'nusezice', 19, '[{\"slot\":0,\"name\":\"Верх\",\"desc\":\"Обычный\",\"type\":\"clothes\",\"componentId\":11,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/top/1.png\"},{\"slot\":0,\"name\":\"Штаны\",\"desc\":\"Обычные\",\"type\":\"clothes\",\"componentId\":4,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/legs/1.png\"},{\"slot\":0,\"name\":\"Нижняя одежда\",\"desc\":\"Обычная\",\"type\":\"clothes\",\"componentId\":8,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":47,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/underwear/1.png\"},{\"slot\":0,\"name\":\"Ботинки\",\"desc\":\"Обычные\",\"type\":\"clothes\",\"componentId\":6,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/shoes/1.png\"}]', 0, 0, 0, 0, 1, '[0.9714783269205731,0.47413449246377315,0.7113274595683636,-0.8512374267806662,0.291357619037413,-0.40928594682024144,0.961281542569365,-0.3173773512545628,-0.574350928827374,-0.010048359934298645,-0.6195329497637729,-0.6859141828380042,0.6764416229761694,-0.11581717474181863,-0.17316679803211565,0.09295620314057018,-0.007737013328114717,0.871942307320527,0.5077198300461112,0.39125218750135327]', '7,27,0,50', '[0,0,0,-1]', '-1037.662353515625,-2697.140869140625,13.679372787475586', 0, 0),
(27, 'Sava', 'Sava', 'Limonov', 19, '[{\"slot\":\"15\",\"name\":\"Верх\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":11,\"drawableId\":0,\"isOnPlayer\":false,\"spawn\":true,\"textureId\":100,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/top/1.png\"},{\"slot\":0,\"name\":\"Штаны\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":4,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":100,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/legs/1.png\"},{\"slot\":0,\"name\":\"Нижняя одежда\",\"desc\":\"С биркой 55\",\"type\":\"clothes\",\"componentId\":8,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":55,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/underwear/1.png\"},{\"slot\":\"23\",\"name\":\"Ботинки\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":6,\"drawableId\":0,\"isOnPlayer\":false,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/shoes/1.png\"}]', 0, 0, 0, 0, 1, '[-0.40264686986915477,\"0.1\",\"-1\",0.11548868597656492,-0.12207390518255234,0.08856998920068104,-0.23946247034260715,-0.1679314369747864,-0.6514072052422146,-0.6481422380674275,-0.2106400983224921,-0.1817354851052322,-0.7632100396058603,0.6327957269261093,-0.770785134377098,0.4879454261281757,-0.33683062367712946,-0.2867949736665141,0.4905294639806095,-0.4326785382639615]', '12,1,0.3314346233743659,50', '[0,0,4,-1]', '-1035.1639404296875,-2722.933349609375,13.64482307434082', 0, 0),
(28, '123', 'Demyan', 'Stagov', 19, '[{\"slot\":0,\"name\":\"Верх\",\"desc\":\"Обычный\",\"type\":\"clothes\",\"componentId\":11,\"drawableId\":0,\"isOnPlayer\":true,\"textureId\":69,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/top/1.png\"},{\"slot\":0,\"name\":\"Штаны\",\"desc\":\"Обычные\",\"type\":\"clothes\",\"componentId\":4,\"drawableId\":0,\"isOnPlayer\":true,\"textureId\":100,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/legs/1.png\"},{\"slot\":0,\"name\":\"Нижняя одежда\",\"desc\":\"Обычная\",\"type\":\"clothes\",\"componentId\":8,\"drawableId\":0,\"isOnPlayer\":true,\"textureId\":15,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/underwear/1.png\"},{\"slot\":0,\"name\":\"Ботинки\",\"desc\":\"Обычные\",\"type\":\"clothes\",\"componentId\":6,\"drawableId\":0,\"isOnPlayer\":true,\"textureId\":23,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/shoes/1.png\"},{\"slot\":0,\"name\":\"Головной убор\",\"desc\":\"Обычная\",\"type\":\"props\",\"componentId\":1,\"drawableId\":0,\"isOnPlayer\":true,\"textureId\":25,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/hat/1.png\"},{\"slot\":\"19\",\"name\":\"Ключ от машины\",\"desc\":\"Ключ от PGT3RS19 (67)\",\"type\":\"carkey\",\"carId\":67,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/carkey.png\"},{\"slot\":\"15\",\"name\":\"Ключ от машины\",\"desc\":\"Ключ от BUG300SS (68)\",\"type\":\"carkey\",\"carId\":68,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/carkey.png\"},{\"slot\":\"16\",\"name\":\"Ключ от машины\",\"desc\":\"Ключ от GTR34 (69)\",\"type\":\"carkey\",\"carId\":69,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/carkey.png\"}]', 0, 0, 9249500, 0, 1, '[0.0519092802327048,0.5894344252823331,-0.13607451015794947,-0.7440177154353487,-0.3300740462105076,-0.8340853748643524,-0.7896815891471616,-0.6442343868594116,0.21763769977261038,0.595702285345693,-0.9582151596062718,0.13314922938889584,-0.45709662028938114,-0.827598390722518,0.33811711535907385,0.45506334995276587,-0.6878542392059472,0.23138260872787741,-0.7147916267549839,-0.7850759899057072]', '12,19,0.2539528465376304,50', '[0,0,0,-1]', '-344.5796813964844,-866.7901611328125,31.246049880981445', 0, 0),
(29, 'banan', 'Banan', 'Bananov', 19, '[{\"slot\":0,\"name\":\"Верх\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":11,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/top/1.png\"},{\"slot\":0,\"name\":\"Штаны\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":4,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/legs/1.png\"},{\"slot\":0,\"name\":\"Нижняя одежда\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":8,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/underwear/1.png\"},{\"slot\":0,\"name\":\"Ботинки\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":6,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/shoes/1.png\"}]', 1, 0, 0, 0, 1, '[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]', '8,26,50,50', '[0,0,3,-1]', '-1233.976806640625,553.5586547851562,777.3600463867188', 0, 0),
(30, 'Lemonqee', 'Sava', 'Limonov', 19, '[{\"slot\":0,\"name\":\"Верх\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":11,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":100,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/top/1.png\"},{\"slot\":0,\"name\":\"Штаны\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":4,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":100,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/legs/1.png\"},{\"slot\":25,\"name\":\"Нижняя одежда\",\"desc\":\"С биркой 55\",\"type\":\"clothes\",\"componentId\":8,\"drawableId\":0,\"isOnPlayer\":false,\"spawn\":true,\"textureId\":55,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/underwear/1.png\"},{\"slot\":0,\"name\":\"Ботинки\",\"desc\":\"С биркой 1\",\"type\":\"clothes\",\"componentId\":6,\"drawableId\":0,\"isOnPlayer\":true,\"spawn\":true,\"textureId\":1,\"paletteId\":0,\"weight\":0.5,\"img\":\"./systems/inventory/img/items/clothes/shoes/1.png\"}]', 0, 0, 9881010, 1, 1, '[\"0\",-0.41724318741782485,-0.0840985600662223,-0.703537678019051,0.7537268853777603,0.05080420061414026,\"0.1\",0.7488901683950173,0.846299273603,-0.8258309012630978,-0.3694461186636775,\"-0.6\",-0.5466640848401307,0.11380040113537548,0.17056062935216065,0.9500605788724235,0.13603067132587476,-0.07795927024658988,0.358165095284519,-0.5255201091982737]', '10,26,0.6486630378182356,50', '[0,0,3,-1]', '35.078330993652344,-2506.132568359375,5.544336318969727', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `houses`
--

CREATE TABLE `houses` (
  `id` int NOT NULL,
  `ownerScId` int NOT NULL,
  `ownerName` text NOT NULL,
  `price` int NOT NULL,
  `payments` text NOT NULL,
  `class` text NOT NULL,
  `status` int NOT NULL,
  `lockedStatus` int NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `z` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `houses`
--

INSERT INTO `houses` (`id`, `ownerScId`, `ownerName`, `price`, `payments`, `class`, `status`, `lockedStatus`, `x`, `y`, `z`) VALUES
(4, 9, 'Grisha_Hueglot', 500, '', 'low', 2, 1, -1340, -2, 52),
(6, 0, '', 300000, '', 'medium', 1, 1, -659, 887, 229),
(7, 0, '', 100000, '', 'low', 1, 1, -495, 797, 184),
(8, 0, '', 250000, '', 'medium', 1, 1, -496, 739, 163),
(9, 22, 'Metla_Ayekovich', 250000, '', 'medium', 2, 2, -446, 686, 153),
(10, 0, '', 150000, '', 'medium', 1, 1, -400, 667, 164),
(11, 0, '', 180000, '', 'medium', 1, 1, -340, 668, 173),
(12, 0, '', 200000, '', 'medium', 1, 1, -189, 618, 200),
(13, 0, '', 180000, '', 'medium', 1, 1, -186, 592, 198),
(14, 0, '', 130000, '', 'low', 1, 1, -233, 589, 191),
(15, 0, '', 250000, '', 'medium', 1, 1, -233, 622, 188),
(16, 0, '', 100000000, '', 'high', 1, 1, -119, -976, 296),
(17, 0, '', 1, '', 'High', 1, 1, 3084, -4687, 27),
(18, 0, '', 5000000, '', 'High', 1, 1, -430, 1111, 328),
(19, 22, 'Metla_Ayekovich', 300000, '', 'Medium', 2, 1, -1095, 427, 76),
(20, 0, '', 300000, '', 'high', 1, 1, 1323, -582, 73),
(21, 0, '', 250000, '', 'high', 1, 1, 1348, -547, 74),
(22, 0, '', 150000, '', 'low', 1, 1, 1329, -536, 72),
(23, 12, 'Sava_Testov', 200000, '', 'medium', 2, 1, 1303, -527, 71),
(24, 0, '', 250000, '', 'high', 1, 1, 1301, -573, 72),
(25, 0, '', 300000, '', 'high', 1, 1, 1342, -597, 75),
(26, 0, '', 300000, '', 'high', 1, 1, 1367, -606, 75),
(27, 0, '', 330000, '', 'high', 1, 1, 1385, -593, 74),
(28, 0, '', 300000, '', 'high', 1, 1, 1388, -570, 74),
(29, 0, '', 200000, '', 'medium', 1, 1, 1373, -555, 75);

-- --------------------------------------------------------

--
-- Структура таблицы `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int NOT NULL,
  `login` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `items` text NOT NULL,
  `model` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pos` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `rot` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `parkpos` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `parkrot` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `color1` text NOT NULL,
  `color2` text NOT NULL,
  `loaded` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `vehicles`
--

INSERT INTO `vehicles` (`id`, `login`, `items`, `model`, `pos`, `rot`, `parkpos`, `parkrot`, `color1`, `color2`, `loaded`) VALUES
(67, '123', '[{}]', 'pgt3rs19', '{\"x\":-3194.96630859375,\"y\":947.16455078125,\"z\":16.028139114379883}', '{\"x\":-1.402077317237854,\"y\":-2.963261127471924,\"z\":172.24209594726562}', '{\"x\":-768.3637084960938,\"y\":-245.3536376953125,\"z\":37.24693298339844}', '{\"x\":0,\"y\":0,\"z\":0}', '[13,17,22]', '[13,17,22]', 0),
(68, '123', '[{}]', 'bug300ss', '{\"x\":-344.5796813964844,\"y\":-866.7901611328125,\"z\":31.246049880981445}', '{\"x\":-0.32750630378723145,\"y\":-0.0656883642077446,\"z\":79.297607421875}', '{\"x\":-768.3637084960938,\"y\":-245.3536376953125,\"z\":37.24693298339844}', '{\"x\":0,\"y\":0,\"z\":0}', '[247,134,22]', '[102,184,31]', 0),
(69, '123', '[{}]', 'gtr34', '{\"x\":-55.265777587890625,\"y\":-1669.2708740234375,\"z\":29.285898208618164}', '{\"x\":0,\"y\":0,\"z\":0}', '{\"x\":-55.265777587890625,\"y\":-1669.2708740234375,\"z\":29.285898208618164}', '{\"x\":0,\"y\":0,\"z\":0}', '[247,134,22]', '[102,184,31]', 1),
(70, 'Lemonqee', '[{}]', 'mbbs20', '{\"x\":-768.3637084960938,\"y\":-245.3536376953125,\"z\":37.24693298339844}', '{\"x\":0,\"y\":0,\"z\":0}', '{\"x\":-768.3637084960938,\"y\":-245.3536376953125,\"z\":37.24693298339844}', '{\"x\":0,\"y\":0,\"z\":0}', '[165,30,35]', '[142,27,31]', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `banip`
--
ALTER TABLE `banip`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bank_operations`
--
ALTER TABLE `bank_operations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `bank_operations`
--
ALTER TABLE `bank_operations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
