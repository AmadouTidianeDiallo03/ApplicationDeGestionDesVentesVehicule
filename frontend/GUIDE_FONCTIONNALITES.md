# 🚗 Guide des Fonctionnalités - Gestion de Stock de Véhicules

## 📋 Vue d'ensemble

Cette application de gestion de stock de véhicules intègre maintenant l'API NHTSA (National Highway Traffic Safety Administration) pour rechercher des informations détaillées sur les véhicules.

---

## ✨ Nouvelles Fonctionnalités

### 1. 🔍 Recherche NHTSA

L'application offre maintenant deux modes de recherche dans l'API NHTSA :

#### **Recherche par VIN (Vehicle Identification Number)**
- Entrez un VIN de 17 caractères
- Obtenez des informations détaillées sur le véhicule :
  - Marque et modèle
  - Année de fabrication
  - Type de carrosserie
  - Moteur et carburant
  - Fabricant et lieu de fabrication
  - Et bien plus...

**Exemple de VIN à tester :** `1HGBH41JXMN109186`

#### **Recherche par Marque et Année**
- Entrez une marque (ex: Toyota, Honda, Ford)
- Entrez une année (ex: 2020)
- Obtenez une liste de tous les modèles disponibles pour cette marque et année

**Exemples à tester :**
- Marque: `Toyota`, Année: `2020`
- Marque: `BMW`, Année: `2021`
- Marque: `Tesla`, Année: `2022`

### 2. 📦 Catalogue d'Inventaire Amélioré

#### **Filtres de Recherche**
- Filtrer par VIN
- Filtrer par marque
- Filtrer par année
- Bouton de réinitialisation des filtres

#### **Deux Modes d'Affichage**
- **Vue Cartes** : Affichage visuel avec cartes colorées
- **Vue Tableau** : Affichage tabulaire pour une vue d'ensemble

#### **Informations Détaillées**
- VIN
- Marque et modèle
- Année de fabrication
- Couleur (avec indicateur visuel)
- Prix
- Statut de disponibilité (En stock / Épuisé)

### 3. 🎨 Interface Utilisateur Modernisée

#### **Pages de Connexion et Inscription**
- Design moderne avec animations fluides
- Arrière-plan avec gradients animés
- Icônes intuitives
- Bouton "Afficher/Masquer" le mot de passe
- Option "Se souvenir de moi"
- Liens de connexion sociale (Google, GitHub)
- Validation des formulaires améliorée

#### **Navigation**
- Barre de navigation sticky avec effets d'animation
- Logo cliquable
- Boutons de profil et déconnexion

---

## 🎯 Comment Utiliser

### Démarrage de l'Application

```bash
cd "C:\Users\Mor Diongue\Downloads\inf33307_groupe_d-BRANCHE_DISTANTE\inf33307_groupe_d-BRANCHE_DISTANTE"
npm start
```

ou

```bash
npm run dev
```

### Navigation dans l'Application

1. **Page de Connexion** (`/`)
   - Entrez vos identifiants (pas de validation pour l'instant)
   - Cliquez sur "Se connecter"

2. **Page d'Inventaire** (`/inventaire`)
   - Cliquez sur le bouton violet "🔍 Recherche NHTSA" pour accéder à la recherche
   - Ou utilisez les filtres pour rechercher dans l'inventaire existant

3. **Recherche NHTSA**
   - **Pour rechercher par VIN :**
     - Entrez un VIN de 17 caractères
     - Cliquez sur "🔎 Rechercher"
     - Consultez les informations détaillées
     - Cliquez sur "➕ Ajouter à l'inventaire" (fonctionnalité à implémenter)

   - **Pour rechercher par Marque et Année :**
     - Entrez une marque
     - Entrez une année
     - Cliquez sur "🔎 Rechercher"
     - Parcourez la liste des modèles disponibles

---

## 🎨 Palette de Couleurs

### Couleurs Principales
- **Bleu Ciel** : `#72C6FD` (rgb(114, 198, 253))
- **Bleu Foncé** : `#54A8DF` (rgb(84, 168, 223))
- **Violet** : `#667eea` à `#764ba2`
- **Rose-Rouge** : `#f093fb` à `#f5576c`
- **Vert** : `#11998e` à `#38ef7d`
- **Rouge** : `#ff6b6b` à `#ee5a6f`

### États
- **Disponible** : Vert
- **Épuisé** : Rouge
- **En cours** : Bleu

---

## 🛠️ Technologies Utilisées

- **React** : Framework JavaScript
- **React Router** : Navigation
- **Redux Toolkit** : Gestion d'état
- **API NHTSA** : Base de données de véhicules
- **CSS3** : Animations et styles modernes

---

## 📝 API NHTSA - Endpoints Utilisés

### 1. Décodage VIN
```
https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/{VIN}?format=json
```

### 2. Modèles par Marque et Année
```
https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/{marque}/modelyear/{année}?format=json
```

### Documentation Complète
[https://vpic.nhtsa.dot.gov/api/](https://vpic.nhtsa.dot.gov/api/)

---

## 🚀 Fonctionnalités Futures Possibles

- [ ] Ajouter des véhicules NHTSA à l'inventaire
- [ ] Modifier les véhicules existants
- [ ] Supprimer des véhicules
- [ ] Exporter l'inventaire (CSV, PDF)
- [ ] Statistiques et graphiques
- [ ] Notifications en temps réel
- [ ] Système d'authentification complet
- [ ] Gestion des rôles (Admin, Utilisateur)
- [ ] Historique des modifications
- [ ] Recherche avancée avec plus de critères

---

## 🎓 VINs de Test

Voici quelques VINs valides pour tester la fonctionnalité :

1. `1HGBH41JXMN109186` - Honda
2. `1FMCU0F77EUB90196` - Ford
3. `5YFBURHE5HP588319` - Toyota
4. `3VW2B7AJ9CM334184` - Volkswagen
5. `1G1ZE5ST8HF176877` - Chevrolet

---

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- 📱 Mobile (< 576px)
- 📲 Tablette (576px - 768px)
- 💻 Desktop (> 768px)

---

## 🎉 Améliorations Visuelles

### Animations
- Fade in / Fade out
- Slide up / Slide down
- Bounce
- Float
- Pulse
- Rotation

### Effets
- Hover effects sur tous les boutons
- Ombres portées (box-shadow)
- Transitions fluides (0.3s ease)
- Backdrop blur pour les glassmorphism effects
- Gradient animés

### Interactions
- Boutons avec feedback visuel
- Inputs avec focus states
- Cards avec hover effects
- Loader animé pendant le chargement

---

## 💡 Conseils d'Utilisation

1. **Recherche VIN** : Assurez-vous d'entrer exactement 17 caractères
2. **Recherche Marque** : Le nom doit être en anglais (Toyota, Honda, etc.)
3. **Année** : L'API accepte les années entre 1900 et l'année actuelle + 1
4. **Performance** : Les recherches NHTSA peuvent prendre 2-3 secondes

---

## 🐛 Dépannage

### Problème : "Aucun modèle trouvé"
**Solution** : Vérifiez l'orthographe de la marque (en anglais) et l'année

### Problème : "Erreur lors de la recherche"
**Solution** : Vérifiez votre connexion internet ou réessayez plus tard

### Problème : VIN invalide
**Solution** : Assurez-vous que le VIN contient exactement 17 caractères alphanumériques

---

## 👨‍💻 Développeurs

Pour toute question ou suggestion, n'hésitez pas à contribuer au projet !

**Bon développement ! 🚀**

