
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

### ✅ Mise en place
Les services `movie.service` et `serie.service` utilisent le **pattern Call and Return** :
- Appels API pour récupérer les données.
- Si l’appel réussit ➜ mise à jour du LocalStorage.
- Si l’appel échoue ➜ fallback automatique sur les données du LocalStorage.

### 🔧 Résilience du système
Pour rendre le système plus **résilient** :
- Utilisation de try/catch + opérateurs RxJS (`catchError`) pour capturer les erreurs.
- Fallback automatique sur le cache local.
- Logs d'erreurs pour débug et alertes visuelles si besoin.

```ts
getMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(url).pipe(
    tap(data => localStorage.setItem('movies', JSON.stringify(data))),
    catchError(err => {
      const cached = localStorage.getItem('movies');
      return of(cached ? JSON.parse(cached) : []);
    })
  );
}
```

### 🛠 Gestion des erreurs
- Utilisation de `MatSnackBar` ou autre système pour notifier l’utilisateur en cas d’erreur.
- Gestion centralisée des erreurs HTTP dans un `HttpInterceptor` possible pour plus de propreté.

## 📊 Data First

### ✅ Principe
L’application est conçue autour des **données en premier** :
- Les composants ne s’occupent que de l’affichage.
- Les services gèrent les données, le cache et la logique métier.

### 🧩 Gestion de la duplication
- Centralisation de la source de vérité via les services.
- Chaque type de contenu (films, séries) a son propre service, ce qui évite les redondances.
- Déduplication possible via des `Set`, `Map` ou en filtrant les IDs.

### 🔄 Gestion des mises à jour
- Mise à jour du LocalStorage à chaque réponse API.
- Possibilité d’ajouter un timestamp pour gérer l’obsolescence des données.
- Stratégie de **cache invalidation** si nécessaire.

## 🧼 Clean Architecture

### 🧭 Organisation
- **Domain layer** : les services.
- **Presentation layer** : les components.
- **Infrastructure layer** : les appels HTTP.

Cette séparation permet :
- Une meilleure testabilité.
- Une évolutivité facilitée.
- Un code plus lisible et maintenable.

### 💬 Communication avec les utilisateurs
- Feedback utilisateur via UI : chargement, erreurs, succès.
- Utilisation de composants comme `MatSnackBar` ou alertes pour informer l’utilisateur.
- Possibilité de loader/skeletons pour améliorer l’expérience utilisateur pendant le fetch de données.

## 📌 En résumé

| Aspect            | Mise en œuvre                                  |
|-------------------|------------------------------------------------|
| Call & Return     | Fallback sur LocalStorage + gestion d’erreur  |
| Data First        | Services = source de vérité, maj & cache      |
| Clean Archi       | Séparation claire des responsabilités         |

