# Portfolio — Kossi Samuel Gabiam

Portfolio personnel présentant mon parcours, mes compétences et mes projets en tant que développeur Full-Stack.

## Aperçu

Site statique construit en HTML/CSS/JavaScript vanilla, sans dépendances ni framework front-end. Il inclut un système de thème clair/sombre, un formulaire de contact fonctionnel et un CV téléchargeable.

## Sections

- **À propos** — Présentation et parcours académique
- **Expérience** — Poste actuel chez SuiSco Sarl
- **Projets** — Réalisations sélectionnées
- **Formation** — Diplômes et établissements
- **Compétences** — Technologies maîtrisées par domaine
- **Contact** — Formulaire et coordonnées

## Stack technique

| Domaine | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Frameworks & Librairies | React / Next.js, Vue.js / Nuxt.js, Angular, TypeScript, Tailwind CSS |
| Backend | Node.js / Express.js, PHP Laravel, Python, REST API, GraphQL |
| Mobile | React Native, Flutter |
| Bases de données | MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis |
| Systèmes & Cloud | Linux/Unix, Docker, Keycloak / SSO, ELK Stack |
| DevOps | Git, CI/CD, Virtualisation, Agile/Scrum |

## Structure du projet

```text
portfolio/
├── index.html       # Page principale
├── style.css        # Styles (thème clair/sombre inclus)
├── cv_gabiam.pdf    # CV au format PDF
├── cv_gabiam.rtf    # CV au format RTF
└── cv_gabiam.tex    # Source LaTeX du CV
```

## Déploiement local

Aucune dépendance à installer. Ouvrir simplement `index.html` dans un navigateur, ou lancer un serveur local :

```bash
npx serve .
# ou
python -m http.server 8080
```

## Générer le CV PDF

Avec une distribution LaTeX installée (TeX Live ou MiKTeX) :

```bash
pdflatex cv_gabiam.tex
```

## Contact

- **Email :** <gabiam.k.samuel@gmail.com>
- **Téléphone :** +228 90 84 77 68
- **Localisation :** Lomé, Togo — disponible en remote
