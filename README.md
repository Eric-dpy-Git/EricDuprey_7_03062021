Bienvenue sur le projet 7 Openclassrooms

Ce projet est le MVP d'un réseau social d'entreprise

Cette application se base sur Node pour le backend, Mysql pour la base de données et Vue pour le frontend

Ci-dessous, je vous présente les étapes nécessaires pour faire fonctionner l'app sur votre ordinateur

1- Téléchargez le projet en cliquant sur le lien à droite de la page GitHub ou ici :

https://github.com/Eric-dpy-Git/EricDuprey_7_03062021

---------------- Pour la base de donnée

2- Il faut avoir Mysql installé sur votre ordinateur et si cela n'est pas le cas, vous pouvez utiliser :
XAMPP, MAMP ou WAMP ;

Les serveurs Apache et Mysql devront être lancés ;

Inserez leș identifians de connexion dans le fichier qui se trouve dans le dossier de l'application téléchargée :

EricDuprey_7_03062021-main/Backend/config/config.json

L'username et le mot de passe sont "root" et "root" par défaut, remplacez les si besoin ;

---------------- Pour l'environement

------Backend----------

Si vous ne l'avez pas sur votre ordinateur :

Installez Node avec le lien suivant :

https://nodejs.org/en/download/

Une fois que Node est installé

Ouvrez un terminal dans le dossier backend de l'application et tapez la commande "npm install"
Si cela ne fonctionne pas, essayez avec : npm install node-sass

ensuite, toujours dans le dossier backend, lancez à la suite les commandes suivantes :

    `npx sequelize-cli db:create`

    `npx sequelize-cli db:migrate`

    `npx sequelize-cli db:seed:all` --> cela va vous creer un compte administrateur/modérateur
    			      Les identifiants sont :
    					 email: "admin@groupomania.com",
       						 username: "Admin",
        						 firstname: "Admin",
        						 lastname: "Admin",
        						 password: "Admin123"

Si vous rentrez des problèmes --> watch documentation at : https://sequelize.org/master/manual/migrations.html

Toujour dans le dossier backend, créez un ficher `.env` avec comme contenu :

         TOKEN=votre_token

pour finir ici, lancez la commande :

"npm start"

Listenig on port 3000 devrait apparaitre...

------Frontend----------

Ouvrez un autre terminal dans le dossier frontend, puis lancez la commande "npm run serve"

App running at:

- Local: http://localhost:8080/
- Network: http://172.20.10.2:8080/ devrait appraitre....

---------------- Pour tester l'application

Ouvrez votre navigateur internet préféré et allez à l'adresse :

http://localhost:8080

Vous pouvez utiliser l'application avec le compte modérateur et créer d'autre profils...

Enjoy !
