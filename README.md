# Étape pour déployer Sonarqube en local

1) Tout d'abord, vous allez avoir besoin de ceci sur votre ordinateur:  
   -Java 17 ou supérieur   https://www.oracle.com/ca-fr/java/technologies/downloads/  
   -Docker Desktop   https://www.docker.com/products/docker-desktop/  

   Ensuite, assurez-vous d'avoir la dernière version du projet Gitlab sur votre ordinateur.  

2) Lancer docker et assurer vous qu'il fonctionne et qu'il reste ouvert pour les prochaines étapes.  

3) Aller sur un terminal de commande et lancer: docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community  
   
   Là, un instance sonarqube en local va ce lancer à l'adresse local: http://localhost:9000. Les identifiants par defauts sont:  
   Login: admin  
   Mot de passe: admin  

   Vous allez pouvoir changer le mot de passe. Je vous conseil de rester simple (ex:1234)  

4) Dans sonarqube, cliquez sur "Create Project" et choisissez Manually.  
   Donnez le nom "Projet_groupeD" et la clé "Projet_groupeD".  
   Cliquez sur Set Up et choisir Locally.  
   Copiez le token d'analyse qui sera généré et copiez le quelque part!  

5) Aller dans un terminal à la racine du projet et lancer "npm install -g sonar-scanner".  

6) Ensuite, dans la racine du projet, il y a un fichier sonar-project.properties. Ouvrez le et vérifier ces champs:  
    sonar.projectKey=Projet_groupeD  
    sonar.projectName=Projet_groupeD  
    sonar.host.url=http://localhost:9000  
    sonar.login=[ICI IL FAUDRA METTRE VOTRE TOKEN COPIÉ PRÉCÉDEMMENT]  
    sonar.sourceEncoding=UTF-8  

7) Une fois que vous avez mis votre token à l'étape 6, vous pouvez lancer cette commande à la racine du projet:  
    sonar-scanner  

   Si pas d'erreur, vous aller voir sur le page web local de sonarqube votre analyse.  

Malheureusement, puisque l'instance de l'UQAR est privé et que le sonarqube est seulement en local sur votre machine, le gitlab ne pourra pas voir le sonarqube local donc on ne pourra pas mettre en place le CI/CD automatique.  

