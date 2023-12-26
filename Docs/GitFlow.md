# GitFlow 

- main : La branche de production, contenant le code en état de déploiement.
- dev : La branche de développement, où toutes les fonctionnalités, corrections et autres branches sont fusionnées avant d'être déployées en production.
- feature/ : Des branches pour développer de nouvelles fonctionnalités. Chaque fonctionnalité a sa propre branche (par exemple, feature/nouvelle-fonctionnalité).
- release/ : Des branches pour préparer une prochaine version. Ces branches sont utilisées pour les ajustements finaux avant le déploiement sur main.


## Règles de Protection des Branches
Pour assurer la stabilité et la qualité du code, des règles de protection de branches ont été mises en place sur main :

- Les Pull Requests sont requises pour les merges.
- Les tests CI doivent passer avec succès avant tout merge.