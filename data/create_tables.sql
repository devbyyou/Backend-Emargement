-- On démarre une transaction afin de s'assurer de la cohérence gloabale de la BDD
BEGIN;
-- D'abord on supprime les table 'si elle existe"
DROP TABLE IF EXISTS "coaches", "categories", "equipes", "seances","joueurs", "presences", "absence","retards", "coaches_equipes";

-- Table des coaches
-- Table des coaches
CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    tel VARCHAR(15),
    role VARCHAR(15),
    mot_de_passe VARCHAR(255),
    date_creation DATE,
    last_activity TIMESTAMP,
    logo VARCHAR(255),
    statut VARCHAR(15),
    session_id VARCHAR(255),  -- Ajout de la colonne session_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Table des categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    date_creation DATE,
    statut VARCHAR(15),
    tranche_age VARCHAR(255),
    nombre_total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des equipes
CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    logo VARCHAR(255),
    categorie_id INT REFERENCES categories(id),
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des seances
CREATE TABLE seances (
    id SERIAL PRIMARY KEY,
    date DATE,
    heure TIME,
    lieu VARCHAR(255),
    equipe_id INT REFERENCES equipes(id),
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des joueurs
CREATE TABLE joueurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    tel VARCHAR(15),
    categorie_id INT REFERENCES categories(id),
    derniere_activite TIMESTAMP,
    date_creation DATE,
    equipe_id INT REFERENCES equipes(id),
    statut VARCHAR(15),
    logo VARCHAR(255),
    nom_prenom_tel_parent VARCHAR(255),
    total_presence INT,
    mot_de_passe VARCHAR(255),
    role VARCHAR(15),
    age INT,
    etat VARCHAR(15),
    nombre_total_joueur INT,
    session_id VARCHAR(255),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table des presence
CREATE TABLE presences (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id),
    seance_id INT REFERENCES seances(id),
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des absences
CREATE TABLE absences (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id),
    date DATE,
    heure TIME,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des retards
CREATE TABLE retards (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id),
    date DATE,
    heure TIME,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison coaches_equipes
CREATE TABLE coaches_equipes (
    coach_id INT REFERENCES coaches(id),
    equipe_id INT REFERENCES equipes(id),
    PRIMARY KEY (coach_id, equipe_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Création des associations entre les tables
ALTER TABLE Equipes
ADD CONSTRAINT fk_equipe_categorie
FOREIGN KEY (categorie_id) REFERENCES Categories(id);

ALTER TABLE Seances
ADD CONSTRAINT fk_seance_equipe
FOREIGN KEY (equipe_id) REFERENCES Equipes(id);

ALTER TABLE Joueurs
ADD CONSTRAINT fk_joueur_categorie
FOREIGN KEY (categorie_id) REFERENCES Categories(id);

ALTER TABLE Joueurs
ADD CONSTRAINT fk_joueur_equipe
FOREIGN KEY (equipe_id) REFERENCES Equipes(id);

ALTER TABLE Presences
ADD CONSTRAINT fk_presence_joueur
FOREIGN KEY (joueur_id) REFERENCES Joueurs(id);

ALTER TABLE Presences
ADD CONSTRAINT fk_presence_seance
FOREIGN KEY (seance_id) REFERENCES Seances(id);

COMMIT;