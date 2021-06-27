CREATE DATABASE `damascus` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- damascus.`user` definition

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UN` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user table with email, pw, username'
