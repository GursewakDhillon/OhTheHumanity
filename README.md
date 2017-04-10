
#Vagrant notes

The vagrant/chef setup is now working nicely. The one caveat is, it relies on having an *empty/non-existent node_modules directory 
in the project folder*. If you have files in this directory (potentially because you were testing locally), you will get ELF-related errors around using bcrypt, because bcrypt is a binary node module which must be compiled specifically for the machine being tested on.

To start the vagrant VM for ohthehumanity, use:
```
vagrant up
```
First time installation may take 5-10 minutes and download a lot of data.

#Application URLs

HTTP: http://localhost:8080
HTTPS (self-signed cert): https://localhost:8081

#User Accounts
We use Firebase email authentication for new users - to use the system, please register for new accounts using the 'sign up' button on 
the initial screen - you will have to validate your account before logging in, but once logging in, your session will persist until
you logout of the application on the main screen.

References: these references can be found in .css files as well
Neon Font style designed by Thomas Trinca. reference website https://codemyui.com/glowing-flicker-neon-text-effect 

 all 6 avatar icons art namely guy.png, man.png, teacher.png, woman.png, woman2.png and woman3.png are created by Freepik taken from 
   http://www.flaticon.com/packs/avatars-9 

