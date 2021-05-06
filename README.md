# Mobile Apps Final Server

## Express server that handles auth, saving locations and follower functionality with a Postgres db

### Steps to reproduce
1.	Clone this repo
2.	Run `yarn install` to install all dependencies
3.	Login to postgres using the psql command
4.	Create a database called `MobileAppsCluster`
5.	Uncomment the file `createDb/db.js` on the server
6.	Run `yarn dev` to run server at localhost:80
7.	Make a GET request to ‘localhost:80/create_db’ to create the db schema locally

