
Database noteS:

OSX: to install mysql instance, use 'brew install mysql'
Database configuration values are stored in config/config.json

Once mysql is loaded, connect using 'mysql -uroot', and create the database:
create database ohthehumanity;

Note: vagrant is now setup, which contains:
- mysql install (and securing)
- creation of 'ohthehumanity' database, and 'ohthehuanity' user
- nginx install and configuration, proxying 3000->80

To run, use: vagrant up

Application will be listening on http://localhost:8080 after startup.
