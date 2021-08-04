# Damascus

Damascus is a website specialized in commisions. Art, music or whatever, sell your ability.

[![Damascus Logo](https://cdn.discordapp.com/attachments/847474975049121872/847489651480330272/or_-017.jpg)](https://github.com/5tarlight/Damascus)

## Installation

### Requirements

- Node.js (14 or higher recommended)
- yarn
- MariaDB

### Ports

Please open ports below

- 80 - Production frontend
- 3000 - Development frontend (Optional)
- 5676 - Prod and Dev backend
- 5677 - Prod and Dev file server

### Set up

- Front-end

```bash
cd frontend
yarn
yarn build
yarn global add serve
yarn serve
```

- Back-end

```bash
cd backend
yarn
(apply db.sql to your mariadb server)
(make user 'damascus' identified by 'damascus1234' and grant all previleges in damascus for 'damascus')
yarn start
```

- File Server

```bash
cd file-server
yarn
(mkdir files/profile)
yarn start
```

### Author

- YEAHx4 (YEAHx4#5998 on discord)

### Contact

<developerstarlight@gmail.com>
I recommend discord. Email might be unread or slowly responded
