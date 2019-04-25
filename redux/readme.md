# Formation Front-End #3 - Redux 536

Pour ouvrir le projet, lancer le workspace "redux.code-workspace" avec VSCode.

Pour partir la solution, il faut partir un terminal sous le répertoire `amazon` et lancer les deux commandes suivantes:

`npm install` et ensuite `npm start`

## PowerPoint

Les informations pertinentes à connaître pour cette formation se retrouvent dans le PowerPoint `Redux+Patterns.pptx`.

## Exercices:

### Exercice 1:

Ajouter un bouton qui permet de retirer tous les items du cart.

### Exercice 2:

Ajouter un middleware qui log dans la console toute les actions qui passent dans Redux.

### Exercice 3:

Ajouter un bouton à la fin de chaque item dans le Cart qui permet de retirer l'item du Cart.

### Exercice 4: 

Ajouter un middleware pour récupérer les données doivent à partir du fake api fournie.

Pour faire une requête au fake-api :

```
const response = await fetch("http://localhost:5678/api/amazon/items", { method: "GET" });

if (response.ok) {
    const content = await response.json();
    ...
}
```

### Exercice 5:

Ajouter un middleware pour mapper les actions corresponds à des requêtes HTTP en une action API_REQUEST.
Modifier le middleware de l'exercice 4 pour handler uniquement l'action API_REQUEST.

### Exercice 6:

Un component doit afficher un indicateur de loading quand une requête HTTP est en cours.

### Exercice 7:

Ajouter un middleware qui enrichie d'un "correlationId" toutes les actions.
