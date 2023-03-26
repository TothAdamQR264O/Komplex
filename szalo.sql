-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Már 26. 14:25
-- Kiszolgáló verziója: 10.1.16-MariaDB
-- PHP verzió: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szalo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berles`
--

CREATE TABLE `berles` (
  `SzID` int(11) NOT NULL,
  `SzemszamB` varchar(8) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlo`
--

CREATE TABLE `berlo` (
  `SzemszamB` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `NevB` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `EmailB` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `SzamlaB` int(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foberlo`
--

CREATE TABLE `foberlo` (
  `SzemszamFB` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `NevFB` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `EmailFB` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `SzamlaFB` int(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `haz`
--

CREATE TABLE `haz` (
  `Helyrajzszam` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Tulaj` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szoba`
--

CREATE TABLE `szoba` (
  `SzID` int(11) NOT NULL,
  `Ar` int(11) NOT NULL,
  `Ferohely` int(11) NOT NULL DEFAULT '1',
  `Helyrajzszam` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `berles`
--
ALTER TABLE `berles`
  ADD KEY `SzID` (`SzID`),
  ADD KEY `SzemszamB` (`SzemszamB`);

--
-- A tábla indexei `berlo`
--
ALTER TABLE `berlo`
  ADD PRIMARY KEY (`SzemszamB`);

--
-- A tábla indexei `foberlo`
--
ALTER TABLE `foberlo`
  ADD PRIMARY KEY (`SzemszamFB`);

--
-- A tábla indexei `haz`
--
ALTER TABLE `haz`
  ADD PRIMARY KEY (`Helyrajzszam`),
  ADD KEY `Tulaj` (`Tulaj`);

--
-- A tábla indexei `szoba`
--
ALTER TABLE `szoba`
  ADD PRIMARY KEY (`SzID`),
  ADD KEY `Helyrajzszam` (`Helyrajzszam`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `szoba`
--
ALTER TABLE `szoba`
  MODIFY `SzID` int(11) NOT NULL AUTO_INCREMENT;
--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `berles`
--
ALTER TABLE `berles`
  ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`SzID`) REFERENCES `szoba` (`SzID`),
  ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`SzemszamB`) REFERENCES `berlo` (`SzemszamB`);

--
-- Megkötések a táblához `haz`
--
ALTER TABLE `haz`
  ADD CONSTRAINT `haz_ibfk_1` FOREIGN KEY (`Tulaj`) REFERENCES `foberlo` (`SzemszamFB`);

--
-- Megkötések a táblához `szoba`
--
ALTER TABLE `szoba`
  ADD CONSTRAINT `szoba_ibfk_1` FOREIGN KEY (`Helyrajzszam`) REFERENCES `haz` (`Helyrajzszam`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
