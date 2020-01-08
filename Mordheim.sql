-- phpMyAdmin SQL Dump
-- version 4.9.2deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mer. 08 jan. 2020 à 15:38
-- Version du serveur :  5.7.26-1+b1
-- Version de PHP :  7.3.12-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Mordheim`
--

-- --------------------------------------------------------

--
-- Structure de la table `equipement`
--

CREATE TABLE `equipement` (
  `ID` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `prix` int(11) NOT NULL,
  `description` text NOT NULL,
  `regles` text NOT NULL,
  `Force` int(11) DEFAULT NULL,
  `Protee` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `equipement`
--

INSERT INTO `equipement` (`ID`, `nom`, `Type`, `prix`, `description`, `regles`, `Force`, `Protee`) VALUES
(1, 'Dague', 'CAC', 2, '', '', NULL, NULL),
(2, 'Masse', 'CAC', 3, '', 'Contondant', NULL, NULL),
(3, 'Marteau', 'CAC', 3, '', 'Contondant', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `race`
--

CREATE TABLE `race` (
  `id` int(11) NOT NULL,
  `nom_race` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `race`
--

INSERT INTO `race` (`id`, `nom_race`) VALUES
(1, 'Nains'),
(2, 'Orques'),
(3, 'Hommes-bêtes'),
(4, 'Skavens');

-- --------------------------------------------------------

--
-- Structure de la table `rang`
--

CREATE TABLE `rang` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom_rang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rang`
--

INSERT INTO `rang` (`id`, `nom_rang`) VALUES
(0, 'Héros'),
(1, 'Hommes de Main');

-- --------------------------------------------------------

--
-- Structure de la table `ref_profil`
--

CREATE TABLE `ref_profil` (
  `ID` int(11) NOT NULL,
  `id_rang` int(11) NOT NULL,
  `id_race` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prix` int(11) NOT NULL,
  `M` int(11) NOT NULL,
  `CC` int(11) NOT NULL,
  `CT` int(11) NOT NULL,
  `F` int(11) NOT NULL,
  `E` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  `I` int(11) NOT NULL,
  `A` int(11) NOT NULL,
  `Cd` int(11) NOT NULL,
  `Arme_Armure` text NOT NULL,
  `Regle` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ref_profil`
--

INSERT INTO `ref_profil` (`ID`, `id_rang`, `id_race`, `Nom`, `Prix`, `M`, `CC`, `CT`, `F`, `E`, `PV`, `I`, `A`, `Cd`, `Arme_Armure`, `Regle`) VALUES
(1, 0, 1, 'Noble Nain', 85, 3, 5, 4, 3, 4, 1, 2, 1, 9, 'Guerriers Nains', 1),
(2, 0, 1, 'Ingenieur Nain', 50, 3, 4, 3, 3, 4, 1, 2, 1, 9, '', 0),
(3, 0, 1, 'Tueurs de Trolls Nain', 50, 3, 4, 3, 3, 4, 1, 2, 1, 9, '', 0),
(4, 1, 1, 'Guerriers nains', 40, 3, 4, 3, 3, 4, 1, 2, 1, 9, '', 0),
(5, 1, 1, 'Tireurs nains', 40, 3, 4, 3, 3, 4, 1, 2, 1, 9, '', 0),
(6, 1, 1, 'Poil-au-menton', 25, 3, 3, 2, 3, 4, 1, 2, 1, 8, '', 0),
(7, 0, 2, 'Chef Orque', 80, 4, 4, 4, 4, 4, 1, 3, 1, 8, '', 0),
(8, 0, 2, 'Chaman Orque', 40, 4, 3, 3, 3, 4, 1, 3, 1, 7, '', 0),
(9, 0, 3, 'chef homme-bête', 65, 5, 4, 3, 4, 4, 1, 4, 1, 7, '', 0),
(10, 0, 3, 'Shaman homme-bête', 45, 5, 4, 3, 3, 4, 1, 3, 1, 6, '', 0),
(11, 0, 3, 'Bestigor', 45, 5, 4, 3, 4, 4, 1, 3, 1, 7, '', 0),
(12, 0, 3, 'Centigor', 80, 8, 4, 3, 4, 4, 1, 2, 1, 7, '', 0),
(13, 1, 3, 'Ungor', 25, 5, 3, 3, 3, 3, 1, 3, 1, 6, '', NULL),
(14, 1, 3, 'Gor', 35, 5, 4, 3, 3, 3, 1, 3, 1, 6, '', NULL),
(15, 1, 3, 'Chien du chaos', 15, 7, 4, 0, 4, 3, 1, 3, 1, 5, '', NULL),
(16, 1, 3, 'Minotaure', 200, 6, 4, 3, 4, 4, 3, 4, 3, 8, '', NULL),
(17, 0, 4, 'Chef Skaven', 145, 6, 4, 2, 3, 3, 2, 8, 2, 9, '', NULL),
(18, 0, 8, 'chef', 90, 1, 1, 1, 1, 1, 1, 1, 1, 1, '', NULL),
(19, 1, 2, 'Gobelins', 40, 4, 5, 3, 2, 1, 2, 3, 4, 5, '', NULL),
(20, 1, 2, 'Orques', 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', NULL),
(22, 1, 2, 'Orcs', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', NULL),
(25, 1, 2, 'Squigg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', NULL),
(27, 1, 2, 'Orc', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', NULL),
(28, 1, 4, 'Rat', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `regles_speciales`
--

CREATE TABLE `regles_speciales` (
  `ID` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `resume` varchar(255) NOT NULL,
  `id_personnage` int(11) DEFAULT NULL,
  `id_race` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `regles_speciales`
--

INSERT INTO `regles_speciales` (`ID`, `nom`, `description`, `resume`, `id_personnage`, `id_race`) VALUES
(1, 'Difficile a tuer', 'Les nains sont très coriaces et résilients, ils ne peuvent donc être mis hors combat que sur un jet de 6 au lieu de 5-6 sur le tableau des degats.', 'hors combat que sur un jet de 6 au lieu de 5-6 sur le tableau des degats', NULL, 1),
(2, 'Tête dure', 'Les nains ignorent les règles spéciales des masses, marteaux,etc. Ils ne sont pas faciles a assommer!', 'Les nains ignorent les règles spéciales des masses, marteaux,etc.', NULL, 1),
(3, 'Armure', 'Les nains ne subissent aucune pénalité de mouvement pour le port d\'une armure.', 'Les nains ne subissent aucune pénalité de mouvement pour le port d\'une armure.', NULL, 1),
(4, 'Haine des orques et des gobelins', 'Tous les nains haïssent les orques et les gobelins. Voir la section psychologie des règles de Mordheim pour les détails sur les effets de la haine.', 'Tous les nains haïssent les orques et les gobelins.', NULL, 1),
(5, 'Rancuniers', 'Les nains gardent une vieille rancœur contre les elfes qui date du temps où les deux races se disputaient\r\nla suprématie sur le Vieux Monde. Une bande nains ne peut jamais inclure de ranc-tireur elfe, quel qu’il soit.', 'Une bande nains ne peut jamais inclure de franc-tireur elfe, quel qu’il soit.', NULL, 1),
(6, 'Mineurs Sans Egaux', 'Les nains passent leur vie sous terre a\r\nla recherche de minerais précieux et sont les meilleurs mineurs du Vieux Monde. Dans la cité de Mordheim, ils mettent leur talent a pro?t pour chercher de la Pierre Magique. Ajoutez + 1 au nombre de fragments trouvés lors du jet pour déterminer la quantité de Pierre Magique a la ?n de la partie.', 'Ajoutez + 1 au nombre de fragments trouvés lors du jet pour déterminer\r\nla quantité de Pierre Magique a la ?n de la partie.', NULL, 1),
(7, 'Chef', 'Tout membre de la bande situé a moins de 6ps du noble nain peut utiliser le Commandement de ce dernier a la place du sien pour effectuer ses tests.', 'Tout membre de la bande situé a moins de 6ps du noble nain peut utiliser le Commandement de ce dernier', 1, NULL),
(8, 'Maître Armurier', 'Les ingénieurs nains sont des experts en mécanique. Grâce a l’utilisation de meilleurs matériaux et de techniques secrètes, un ingénieur nain peut accroître la portée des armes de tir de la bande. Toutes les armes de tir de la bande voient leur portée accrue de 6ps tant que l’ingénieur fait partie de la bande (Les modi?cations nécessitent l’entretien constant et méticuleux d’un expert).', 'Toutes les armes de tir de la bande voient leur portée accrue de 6ps tant que l’ingénieur fait partie de la bande.', 2, NULL),
(9, 'Voeu de Mort', 'Les Tueurs de Trolls cherchent une mort honorable au combat. Ils sont immunisés a la psychologie et ne font jamais de test lorsqu’ils se battent seuls.', 'Ils sont immunisés a la psychologie et ne font jamais de test lorsqu’ils se battent seuls.', 3, NULL),
(10, 'Compétences de Tueur', 'Les Tueurs de Trolls peuvent choisir une compétence dans le tableau des compétences de Tueur au lieu des tableaux de compétences classiques lorsqu’ils gagnent une nouvelle compétence.', 'Les Tueurs de Trolls peuvent choisir une compétence dans le tableau des compétences de Tueur', 3, NULL),
(11, 'Des gens peu recommandables', 'De nombreux Francs-Tireurs refuseraient de travailler pour des orques car ils savent que ces derniers peuvents à tout moment se retourner contre eux. Une bande d\'orques ne peut donc louer les services que des francs-Tireurs suivants : Gladiateurs, Ogres ou Mages.', 'les orques peuvent louer les services que des francs-Tireurs suivants : Gladiateurs, Ogres ou Mages.', NULL, 2),
(12, 'Sorcier', 'Un Chaman homme-bête est un sorcier, il peut utiliser les rituels du chaos décrits dans la section magie du livre de règles de Mordheim (p.59).', '', 9, NULL),
(13, 'Ivre', 'Avant un combat, le Centigor a pour habitude d\'ingurgiter de grandes quantités de bière et de vin, fruits de ses précédentes rapines. Cette pratique les plonge dans une ivresse frénétique aux effets variables.\r\n\r\nAu début de chaque tour, jetez 1D6. Sur un résultat de 1, effectuez un test de stupidité (en cas d’échec, l\'effet dure jusqu\'à la fin du tour).\r\nSi vous obtenez un résultat compris entre 2 et 5, rien de particulier. Un résultat de 6 indique qu\'il devient frénétique pour la durée du tour.\r\n\r\nLorsqu\'il est stupide ou frénétique, le Centigor est immunisé à la psychologie.', '1D6 1->stupidité/2-5->R.A.S/6->frénétique', 12, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `privileges` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `privileges`) VALUES
(1, 'brock', 'azerty', 'brock@exemple.com', 'user'),
(2, 'flow', 'brock', NULL, 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `equipement`
--
ALTER TABLE `equipement`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ref_profil`
--
ALTER TABLE `ref_profil`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `regles_speciales`
--
ALTER TABLE `regles_speciales`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `race`
--
ALTER TABLE `race`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `rang`
--
ALTER TABLE `rang`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ref_profil`
--
ALTER TABLE `ref_profil`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `regles_speciales`
--
ALTER TABLE `regles_speciales`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
