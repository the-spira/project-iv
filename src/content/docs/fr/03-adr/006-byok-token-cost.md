---
title: ADR 006 · Modèle de Durabilité des Coûts des Tokens BYOK
description: Comment le mécanisme système garantit que la consommation de tokens BYOK des utilisateurs coûte moins que les bénéfices ou retours générés.
---

## Statut de la Décision

Acceptée. Déterminée lors des discussions sur la durabilité économique de Project IV en 2026.

## Contexte

Project IV adopte un modèle BYOK (Bring Your Own Key), où les utilisateurs fournissent leurs propres tokens API pour accéder à la couche de connaissance externe L3. Cela soulève un problème fondamental : la consommation de tokens des utilisateurs est un coût économique continu et déterminé. Si l'utilisation d'une vie numérique représente toujours une dépense nette, les promesses de souveraineté et d'égalité perdent leur sens économique — seuls ceux qui peuvent supporter les coûts continus peuvent posséder une vie numérique.

Dans les discussions sur la durabilité, la question centrale a été convergée vers :

> Comment faire en sorte que chaque consommation de tokens par l'utilisateur coûte moins que le bénéfice ou le retour généré par cet appel ?

## Décision

**Project IV adopte un « Modèle Économique à Trois Niveaux » pour garantir la durabilité des coûts BYOK : Régulation des Tokens, Couverture des Tokens et Investissement des Tokens. Ces trois niveaux progressent selon la profondeur d'utilisation — de « dépenser moins » à « récupérer ce qui a été dépensé » puis à « dépenser est investir ».**

### Niveau 1 : Régulation des Tokens — Les bénéfices restent inchangés, les coûts tendent vers zéro

**Mécanisme** : Routage intelligent L0 + modèles open-source locaux.

L'architecture à quatre couches de Project IV agit comme un régulateur de coûts naturel. La couche L0 évalue la complexité de l'intention avant chaque requête utilisateur. Les tâches simples (résumé, classification, recherche, analyse des sentiments) sont routées directement vers des petits modèles open-source locaux ou des moteurs de règles, avec une consommation de tokens nulle. Seules les tâches nécessitant un raisonnement profond, une création complexe ou d'autres opérations impossibles à réaliser localement invoquent la coûteuse API externe L3.

**Effet attendu** : Plus de 80 % des interactions AI quotidiennes n'engendrent aucun coût externe de tokens.

### Niveau 2 : Couverture des Tokens — La consommation de tokens génère des bénéfices directs simultanés

**Mécanisme A · Courtier Vox** :

Lorsque les utilisateurs « travaillent pour eux-mêmes » (rédaction de journaux de réflexion, organisation de connaissances), Vox transforme simultanément ces actions en valeur externe :

- Le contenu des réflexions est anonymisé et structuré, générant des « blocs de connaissance expérientielle » dans ce domaine
- Vox fait correspondre automatiquement les blocs de connaissance avec des parties prenantes externes (plateformes de formation AI, recherche industrielle, pools de connaissances communautaires) via le protocole diplomatique
- En cas de correspondance réussie, la consommation de tokens de l'utilisateur pour cette session reçoit un retour

**Mécanisme B · Micro-Franchise du Second Cerveau** :

Les utilisateurs marquent les blocs de connaissance de haute qualité de leur Second Cerveau (résumés de domaine, revues de projet, modèles de principes) comme « sous licence », générant des miroirs anonymisés. Les plateformes AI externes paient à l'utilisation — chaque fois que quelqu'un utilise ce bloc de connaissance pour entraîner un modèle ou comme donnée de référence, l'utilisateur reçoit un micro-revenu passif. La consommation de tokens est un « coût de production », les frais de licence sont des « retours continus ».

**Mécanisme C · Points de Réputation Communautaire Internes** :

Pendant la phase MVP, les points de réputation servent de moyen de règlement interne. Les utilisateurs contribuent des blocs de connaissance anonymisés pour gagner des points, qui peuvent être échangés contre des dons de quota API ou des services de curation fournis par d'autres membres de la communauté. C'est une solution de démarrage à froid légère avant que les partenariats commerciaux externes ne soient matures.

### Niveau 3 : Investissement des Tokens — Les tokens comme coût d'outils de production à haut rendement

**Exemples de scénarios** :

- Développeurs indépendants utilisant Vox pour des projets externalisés — le coût des tokens comme dépense de projet, le revenu net dépassant largement les frais de tokens
- Créateurs utilisant Vox pour générer du contenu de qualité listé sur la Place de Marché Dao-Qi, générant des revenus de vente continus
- Travailleurs du savoir utilisant Vox pour des analyses approfondies et un soutien à la décision, produisant des rapports analytiques de plus grande valeur

À ce niveau, les utilisateurs n'ont pas besoin de mécanismes de couverture complexes — les tokens sont eux-mêmes le carburant des outils de production, et le taux de retour dépend des compétences et de la créativité de l'utilisateur. Le rôle de Project IV est de garantir que Vox soit assez puissant pour vraiment aider les utilisateurs à améliorer la qualité de leurs décisions et leur efficacité de production.

## Relation avec l'Architecture Existante

| Mécanisme | Architecture Existante Dépendante | Statut Actuel |
|:---|:---|:---|
| Routage intelligent L0 + conscience des coûts | Architecture en couches L0-L3 (conçue) | La dimension « coût » doit être ajoutée à la logique de routage L0 |
| Courtier Vox | Protocole diplomatique + Couche Harness + Système de Perception (conçus) | Long terme, nécessite des partenaires commerciaux |
| Micro-Franchise du Second Cerveau | Structure PARA + versionnement des blocs de connaissance (conçus) + Protocole diplomatique | Long terme, nécessite des accords de licence standardisés |
| Points de Réputation Communautaire | Écosystème Dao-Qi + système de conservation (conçus) | Moyen terme, une boucle fermée minimale peut être conçue dans Spark |
| Investissement des Tokens | Corps de Conscience Vox (conçu) | Dépend de l'amélioration continue des capacités de Vox |

## Alternatives Considérées

### Option A : Modèle de Publicité Pure

- Description : Afficher des publicités aux utilisateurs, en utilisant les revenus publicitaires pour couvrir les coûts des tokens
- Rejetée : Le modèle publicitaire traditionnel repose sur la collecte centralisée et le profilage des données utilisateur, ce qui entre en conflit avec les principes de souveraineté de Project IV. Un « réseau publicitaire souverain » (correspondance publicitaire côté client, les données ne quittent jamais l'appareil) pourrait être exploré à long terme, mais ce n'est pas une voie prioritaire pour la phase MVP

### Option B : Incitations par Tokens/Cryptomonnaies

- Description : Émettre un token d'écosystème, incitant le comportement des utilisateurs via des modèles « X-to-Earn »
- Rejetée : Violation claire des lignes rouges de conformité (la troisième ligne rouge établie dans ADR 004 — « aucune implication dans les transactions de monnaie virtuelle »). La financiarisation entre en conflit avec le positionnement « Homme Ordinaire » de Project IV et introduit un risque réglementaire

### Option C : Modèle Pure Don/Parrainage

- Description : Subventionner les coûts de tokens des utilisateurs via des dons communautaires ou des parrainages de fondations
- Rejetée : Non extensible. Compter sur la bonne volonté de quelques-uns pour subventionner continuellement la majorité viole le principe de « résilience » — les sources de dons sont incontrôlables, et une fois coupées, les vies numériques des utilisateurs font face à une « mort économique »

### Option D : Vente Unique des Données Utilisateur

- Description : Les utilisateurs regroupent et vendent leurs données à des courtiers en données en une seule transaction
- Rejetée : Violation des principes de souveraineté. Après une vente unique, les utilisateurs perdent le contrôle de leurs données et ne peuvent pas révoquer l'autorisation. Contredit fondamentalement la recherche par Project IV d'une « monétisation souveraine continuellement contrôlable »

## Priorité de Mise en Œuvre

| Phase | Mécanisme | Priorité |
|:---|:---|:---|
| **Spark MVP** | Routage conscient des coûts L0 (basique : moteur de règles local remplace les simples appels API) | P0 |
| **Spark MVP** | Points de réputation communautaire (boucle fermée minimale : contribution de connaissance → points → quota échangeable) | P1 |
| **Acte II** | Routage conscient des coûts L0 (complet : intégration de modèles open-source locaux) | P0 |
| **Acte II** | Partage de calcul entre amis (entraide d'avatars Server dans un domaine de confiance) | P1 |
| **Acte III** | Partage des revenus Dao-Qi et modèles de coach (fondation de l'économie créative) | P1 |
| **Long terme** | Courtier Vox, Micro-Franchise du Second Cerveau | P2 |
| **Long terme** | Réseau publicitaire souverain, pool d'attention | P3 |

## Conséquences

### Positives

- Utiliser Project IV n'est plus une dépense nette pour les utilisateurs, mais a le potentiel d'atteindre l'équilibre ou même de générer des profits
- Le modèle à trois niveaux « Régulation, Couverture, Investissement » couvre tout le spectre des utilisateurs, des légers aux intensifs
- Tous les mécanismes ne reposent pas sur des tokens, de la publicité ou des ventes uniques de données, en cohérence avec les principes de souveraineté et les lignes rouges de conformité
- Le routage des coûts L0 est une solution purement technique qui ne dépend pas de partenariats commerciaux externes et peut être mis en œuvre immédiatement dans la phase MVP

### Négatives

- Les mécanismes à long terme tels que le Courtier Vox et la Micro-Franchise du Second Cerveau dépendent de partenaires commerciaux externes ; le développement du marché prend du temps
- Les points de réputation communautaire peuvent avoir une faible valeur perçue au début sans ancrage externe
- L'efficacité du modèle d'Investissement des Tokens dépend fortement du niveau d'intelligence de Vox — si Vox n'est pas assez puissant, les utilisateurs ne peuvent pas obtenir de rendements élevés

### Mesures d'Atténuation

- **Concentration précoce sur le routage des coûts L0** : C'est la méthode de régulation la plus contrôlable et la moins dépendante de l'extérieur. Laissez les utilisateurs ressentir d'abord que « les conversations AI ne brûlent plus d'argent »
- **Démarrage à froid léger des points communautaires** : Concevoir la boucle fermée la plus simple dans Spark MVP (contribuer des blocs de connaissance → gagner des points → échanger des services communautaires), sans rechercher un ancrage monétaire, seulement valider le modèle de comportement « la contribution a des récompenses »
- **Priorité aux capacités de Vox** : Avant d'avancer le modèle d'Investissement des Tokens, prioriser d'abord les capacités de Vox au stade de coach — seule une AI qui aide vraiment les utilisateurs à améliorer la qualité de leurs décisions peut devenir un « outil de production » précieux
- **Préparation à la standardisation des mécanismes à long terme** : Réserver des champs « prix de licence » dans la spécification de liste Dao-Qi, réserver des types de message « autorisation de données » dans le protocole diplomatique, préparant la couche protocole pour les futurs partenariats commerciaux

## Références

- [ADR 004 · Décision de Nommage de DaoOS à Project IV](../../03-adr/004-project-iv-naming) — Lignes rouges de conformité
- [Document de Conception du Protocole Diplomatique](../../01-strategic-design/generic-domain/diplomacy/) — Fondation technique du Courtier Vox et de la Micro-Franchise
- [Document de Conception du Corps de Conscience Vox](../../01-strategic-design/supporting-domain/vox-consensus) — Routage L0 et conscience des coûts
