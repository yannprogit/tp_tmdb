
# 🎬 Gestion de contenus avec Angular : Clean Architecture, Call & Return et Data First

## 🧱 Structure du projet

```bash
src/
├── app/
│   ├── components/
│   │   ├── movie-list/
│   │   └── serie-list/
│   └── services/
│       ├── movie.service.ts
│       └── serie.service.ts
```

- **Components** : responsables de l'affichage et de l'interaction utilisateur.
- **Services** : responsables de la logique métier, des appels API et de la gestion du cache (LocalStorage).

## 🔁 Call and Return

### Mise en place
Les services `movie.service` et `serie.service` utilisent le **pattern Call and Return** :
- Appels API pour récupérer les données.
- Si l’appel réussit ➜ mise à jour du LocalStorage.
- Si l’appel échoue ➜ fallback automatique sur les données du LocalStorage.

### Résilience du système
Pour rendre le système plus résilient :
- Utilisation de try/catch + opérateurs RxJS (`catchError`) pour capturer les erreurs.
- Données prises sur le localStorage en cas d'échec.
- Logs d'erreurs pour le débug et voir l'erreur visuellement.

### Gestion des erreurs
- Gestion centralisée des erreurs HTTP dans un `HttpInterceptor` possible pour plus de propreté.

## 📊 Data First

### Principe
L’application est conçue autour des données en premier :
- Les composants ne s’occupent que de l’affichage.
- Les services gèrent les données, le cache et la logique métier.

### Gestion de la duplication
- Centralisation de la source de vérité via les services.
- Chaque type de contenu (films, séries) a son propre service, ce qui évite les redondances.
- Déduplication possible via des `Set`, `Map` ou en filtrant les IDs.

### Gestion des mises à jour
- Mise à jour du LocalStorage à chaque réponse API.

## 🧼 Clean Architecture

### Organisation
- Domain layer : les services.
- Presentation layer : les components.
- Infrastructure layer : les appels HTTP.

Cette séparation permet :
- Une meilleure testabilité.
- Une évolutivité facilitée.
- Un code plus lisible et maintenable.

### Communication avec les utilisateurs
- Feedback utilisateur via UI : chargement, erreurs, succès.

