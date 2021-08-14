CREATE DATABASE `damascus` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- damascus.`user` definition
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` bit(1) DEFAULT b'0',
  `email_verify` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UN` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='user table with email, pw, username';

-- damascus.profile definition

CREATE TABLE `profile` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `bio` varchar(50) DEFAULT '',
  `profile` varchar(200) DEFAULT '',
  UNIQUE KEY `profile_UN` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
