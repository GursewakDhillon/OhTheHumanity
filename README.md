
#Vagrant notes

The vagrant/chef setup is now working nicely. The one caveat is, it relies on having an *empty/non-existent node_modules directory 
in the project folder*. If you have files in this directory (potentially because you were testing locally), you will get ELF-related errors around using bcrypt, because bcrypt is a binary node module which must be compiled specifically for the machine being tested on.

To start the vagrant VM, use:
```
vagrant up
```
First time installation may take 5-10 minutes and download a lot of data.

On successful install, vagrant output should look like this:
```
==> default: [2017-04-03T21:56:42+00:00] INFO: execute[start_ohthehumanity] ran successfully
==> default: [2017-04-03T21:56:42+00:00] INFO: execute[startup_ohthehumanity] ran successfully
==> default: [2017-04-03T21:56:42+00:00] INFO: Chef Run complete in 217.988276434 seconds
==> default: [2017-04-03T21:56:42+00:00] INFO: Running report handlers
==> default: [2017-04-03T21:56:42+00:00] INFO: Report handlers complete
```



#Database notes

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
