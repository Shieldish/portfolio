```latex
%% ============================================================
%% CV - Kossi Samuel Gabiam
%% Candidature - Programme de Recrutement des Jeunes Professionnels BIDC 2026
%% Compile: pdflatex cv_gabiam_fr.tex
%% ============================================================

\documentclass[10.5pt, a4paper]{article}

% ── Packages ──────────────────────────────────────────────────
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[french]{babel}
\usepackage{mathptmx}
\usepackage[margin=1.45cm, top=1.35cm, bottom=1.35cm]{geometry}
\usepackage{hyperref}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{tabularx}
\usepackage{array}
\usepackage{xcolor}
\usepackage{parskip}
\usepackage{fancyhdr}
\usepackage{needspace}

% ── Couleurs ──────────────────────────────────────────────────
\definecolor{sectioncolor}{HTML}{1E40AF}
\definecolor{secondary}{HTML}{475569}
\definecolor{linkcolor}{HTML}{1E40AF}

% ── Hyperliens ────────────────────────────────────────────────
\hypersetup{
  colorlinks=true,
  urlcolor=linkcolor,
  linkcolor=linkcolor
}

% ── Pages ─────────────────────────────────────────────────────
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\small\color{secondary}\thepage}

% ── Sections ──────────────────────────────────────────────────
\titleformat{\section}
  {\large\bfseries\color{sectioncolor}\scshape}
  {}{0em}
  {}
  [\vspace{-4pt}\color{sectioncolor}\rule{\linewidth}{1pt}]

\titlespacing{\section}{0pt}{11pt}{5pt}

% ── Listes ────────────────────────────────────────────────────
\setlist[itemize]{
  leftmargin=1.25em,
  itemsep=2pt,
  topsep=1pt,
  parsep=0pt,
  label=\small\textbullet
}

% ── Macro entrée CV ───────────────────────────────────────────
\newcommand{\cventry}[4]{%
  \needspace{3\baselineskip}%
  \noindent\textbf{\large #1}
  \hfill {\small\color{secondary}\textit{#2}}\\[1pt]%
  \ifx&#3&\else
    \noindent\textbf{\textit{#3}}\\[2pt]%
  \fi
  \ifx&#4&\else
    \noindent{#4}%
  \fi
  \vspace{4pt}\par
}

% =============================================================
\begin{document}
\color{black}

% ── EN-TÊTE ───────────────────────────────────────────────────
\begin{center}
  {\Huge\bfseries\scshape Kossi Samuel Gabiam}\\[4pt]

  {\large\bfseries
  Développeur Full-Stack \textbullet{}
  Ingénieur Systèmes \& Cloud}\\[6pt]

  \small
  \href{mailto:gabiam.k.samuel@gmail.com}{gabiam.k.samuel@gmail.com}
  \quad\textbullet\quad
  +228 90 84 77 68
  \quad\textbullet\quad
  Lomé, Togo\\[3pt]

  \href{https://www.linkedin.com/in/samuel-g-107663165/}
  {linkedin.com/in/samuel-g-107663165}
  \quad\textbullet\quad
  \href{https://github.com/Shieldish}{github.com/Shieldish}
  \quad\textbullet\quad
  \href{https://portfolio.gabiam-k-samuel.workers.dev/}
  {portfolio.gabiam-k-samuel.workers.dev}
\end{center}

\vspace{-2pt}
\noindent\rule{\linewidth}{1pt}
\vspace{3pt}

% ── PROFIL ────────────────────────────────────────────────────
\section{Profil Professionnel}

Titulaire d'un \textbf{Master Professionnel en Systèmes, Réseaux \& Cloud Computing} et d'une \textbf{Licence en Génie Logiciel}, je suis développeur Full-Stack spécialisé dans la conception et l'intégration de systèmes informatiques, d'applications web et mobiles et d'infrastructures distribuées.

Mon expérience couvre notamment les \textbf{architectures distribuées, les API, les bases de données, la sécurité applicative, l'authentification, le Cloud, la conteneurisation et les pipelines DevOps}. Je possède une approche orientée résolution de problèmes, fiabilité des systèmes et amélioration des performances, ainsi qu'une expérience dans le développement de solutions utilisées en production au Togo.

% ── EXPÉRIENCE ────────────────────────────────────────────────
\section{Expérience Professionnelle}

\cventry
{Développeur Full-Stack}
{Juin 2025 -- Présent}
{SuiSco Sarl}
{Lomé, Togo}

\begin{itemize}
  \item Conception et développement de solutions web et de services numériques destinés à différents usages et canaux, avec une attention particulière portée à la \textbf{fiabilité, la sécurité et la performance}.
  
  \item \textbf{EduBoost :} architecture et développement d'une plateforme nationale multi-canaux intégrant Web, SMS, USSD et Mobile Money, actuellement en production au Togo.
  
  \item Conception d'une \textbf{architecture distribuée} composée de 15 nœuds Django d'écriture et d'un nœud central d'agrégation, avec mécanisme de génération de tickets anti-collision basé sur PostgreSQL.
  
  \item Mise en œuvre de traitements \textbf{asynchrones et distribués} avec Celery, Redis et PostgreSQL, incluant synchronisation, reprise après incident et traitement des demandes Web.
  
  \item Intégration de mécanismes de \textbf{sécurité applicative} : OTP, HMAC-SHA256 pour la vérification des webhooks, rate-limiting Redis et authentification centralisée.
  
  \item Développement et maintenance de plusieurs solutions complémentaires : \textbf{DefiQuiz}, SuiSco My Account et intégration du \textbf{Single Sign-On Keycloak} basé sur OAuth2/OIDC.
\end{itemize}

% ── PROJETS ───────────────────────────────────────────────────
\section{Projets Majeurs}

\cventry
{EduBoost -- Plateforme Nationale de Tombola}
{2025 -- Présent}
{SuiSco Sarl / YAS TOGO}
{Plateforme en production}

\begin{itemize}
  \item Architecture distribuée : \textbf{15 nœuds Django + 1 nœud central d'agrégation}.
  \item Intégration de plusieurs canaux : Web, SMS, USSD et Mobile Money.
  \item Traitements synchrones et asynchrones avec Django, Celery, Redis et PostgreSQL.
  \item Mise en place de mécanismes d'idempotence, de reprise après incident et de contrôle de l'intégrité des échanges.
  \item Sécurisation des flux par OTP, HMAC-SHA256 et limitation du nombre de requêtes.
  \item Système de tirage en direct avec workflow multi-phases, anonymisation des tickets et portail de vote OTP.
  \item \textbf{Technologies :} Django, DRF, PostgreSQL, Redis, Celery, Nuxt 3, Vue 3, Docker, Gunicorn, Tailwind.
\end{itemize}

\cventry
{DefiQuiz -- Plateforme de Quiz Éducatif}
{2025 -- Présent}
{SuiSco Sarl / YAS TOGO}
{Plateforme Web}

\begin{itemize}
  \item Développement d'une plateforme de quiz multi-clients proposant plus de \textbf{5\,000 questions}.
  \item Conception du frontend et du backend avec Nuxt.js / Next.js, Hono.js et Deno.js.
\end{itemize}

\cventry
{SuiSco My Account \& SSO Centralisé}
{2025}
{SuiSco Sarl}
{Applications internes}

\begin{itemize}
  \item Développement d'une application web multi-clients de gestion de comptes en PHP Laravel, API REST et MySQL.
  \item Mise en place d'un système de \textbf{Single Sign-On} avec Keycloak et OAuth2/OIDC pour centraliser et sécuriser l'authentification.
\end{itemize}

\cventry
{Plateforme de Gestion de Stages}
{2024}
{Djagora}
{Projet de Fin d'Études}

\begin{itemize}
  \item Développement d'une application Web et Mobile pour la gestion des offres de stage, des candidatures et du suivi des étudiants.
  \item \textbf{Technologies :} React, Node.js, MySQL et React Native.
\end{itemize}

\cventry
{Extraction \& Visualisation de Données Sociales}
{2021}
{DK-Soft}
{Projet de Stage}

\begin{itemize}
  \item Développement d'une application d'extraction et de visualisation analytique en temps réel de données issues des réseaux sociaux.
  \item Mise en œuvre de la \textbf{Stack ELK} : Elasticsearch, Logstash et Kibana, avec Angular.
\end{itemize}

% ── FORMATION ─────────────────────────────────────────────────
\section{Formation Académique}

\cventry
{Master Professionnel en Systèmes, Réseaux \& Cloud Computing}
{2022 -- 2024}
{Faculté des Sciences de Sfax}
{Sfax, Tunisie}

\begin{itemize}
  \item Ingénierie des systèmes informatiques, architectures distribuées, virtualisation, Cloud Computing, administration Linux et sécurité réseau.
\end{itemize}

\cventry
{Licence Nationale en Science de l'Informatique}
{2019 -- 2022}
{Faculté des Sciences de Sfax}
{Sfax, Tunisie}

\begin{itemize}
  \item Spécialité \textbf{Génie Logiciel \& Systèmes d'Information}.
  \item Algorithmique, bases de données, UML, génie logiciel et réseaux informatiques.
\end{itemize}

\cventry
{Baccalauréat Scientifique -- Série D}
{2014 -- 2017}
{Lycée La Grâce}
{Sokodé, Togo}

% ── COMPÉTENCES ───────────────────────────────────────────────
\section{Compétences Techniques}

\begin{tabularx}{\linewidth}{
  @{}
  >{\bfseries}l
  @{\hspace{12pt}}
  X
  @{}
}

Développement &
React, Next.js, Vue.js, Nuxt 3, Angular, TypeScript, Django, DRF, Node.js, PHP Laravel, Hono.js, Deno.js, Python, API REST
\\[3pt]

Bases de données &
PostgreSQL, MySQL, Redis, MongoDB, Elasticsearch
\\[3pt]

Systèmes \& Cloud &
Linux/Unix, Docker, Docker Compose, architectures distribuées, virtualisation, Keycloak, SSO
\\[3pt]

DevOps \& Méthodes &
Git, GitHub, GitLab, CI/CD, Celery, Gunicorn, Agile / Scrum
\\[3pt]

Sécurité &
OAuth2/OIDC, HMAC-SHA256, OTP, rate-limiting, authentification et sécurisation des API
\\[3pt]

Mobile \& Data &
React Native, Flutter, ELK, Elasticsearch, Kibana
\\

\end{tabularx}

% ── LANGUES ──────────────────────────────────────────────────
\vspace{4pt}
\section{Langues}

\begin{tabularx}{\linewidth}{
  @{}
  >{\bfseries}l
  @{\hspace{12pt}}
  X
  @{}
}

Français & Langue maternelle
\\[3pt]

Anglais & Compétence professionnelle
\\

\end{tabularx}

\end{document}
```