BEGIN;
-- D'abord on supprime les table 'si elle existe"
DROP TABLE IF EXISTS "coaches", "categories", "equipes", "seances","joueurs", "presences", "absences","retards", "coaches_equipes", "historique_presences";
-- Table des coaches
CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(15) NOT NULL,
    role VARCHAR(15) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_creation DATE DEFAULT CURRENT_DATE NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    logo VARCHAR(255),
    statut VARCHAR(15),
    session_id INTEGER DEFAULT NULL,
    -- session_id INTEGER NOT NULL REFERENCES seances(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    -- session_id INTEGER REFERENCES seances(id) DEFAULT NULL
);

-- Table des categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    date_creation DATE DEFAULT CURRENT_DATE NOT NULL,
    statut VARCHAR(15),
    tranche_age VARCHAR(255),
    nombre_total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table des equipes
CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    categorie_id INT REFERENCES categories(id) NOT NULL,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- Table des seances
CREATE TABLE seances (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    lieu VARCHAR(255),
    equipe_id INT REFERENCES equipes(id) NOT NULL,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (equipe_id) REFERENCES equipes(id)
);

-- Table des joueurs
CREATE TABLE joueurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(15) NOT NULL,
    categorie_id INT REFERENCES categories(id) NOT NULL,
    derniere_activite TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_creation DATE DEFAULT CURRENT_DATE NOT NULL,
    equipe_id INT REFERENCES equipes(id) NOT NULL,
    statut VARCHAR(15),
    logo VARCHAR(255),
    nom_prenom_tel_parent VARCHAR(255),
    total_presence INT,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(15),
    age INT,
    etat VARCHAR(15),
    nombre_total_joueur INT,
    session_id INTEGER REFERENCES seances(id) DEFAULT NULL,
    -- session_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(id),
    FOREIGN KEY (equipe_id) REFERENCES equipes(id),
    FOREIGN KEY (session_id) REFERENCES seances(id)
);

-- Table des presences
CREATE TABLE presences (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id) NOT NULL,
    seance_id INT REFERENCES seances(id) NOT NULL,
    statut VARCHAR(15),
    absence VARCHAR(255),
    retard VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (joueur_id) REFERENCES joueurs(id),
    FOREIGN KEY (seance_id) REFERENCES seances(id)
);

-- Table des absences
CREATE TABLE absences (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id) NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (joueur_id) REFERENCES joueurs(id)
);

-- Table des retards
CREATE TABLE retards (
    id SERIAL PRIMARY KEY,
    joueur_id INT REFERENCES joueurs(id) NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    statut VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (joueur_id) REFERENCES joueurs(id)
);

-- Table de liaison coaches_equipes
CREATE TABLE coaches_equipes (
    coach_id INT REFERENCES coaches(id) NOT NULL,
    equipe_id INT REFERENCES equipes(id) NOT NULL,
    PRIMARY KEY (coach_id, equipe_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES coaches(id),
    FOREIGN KEY (equipe_id) REFERENCES equipes(id)
);

CREATE TABLE IF NOT EXISTS historique_presences (
    id SERIAL PRIMARY KEY,
    joueur_id INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    presence BOOLEAN NOT NULL,
    absence BOOLEAN NOT NULL,
    retard BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (joueur_id) REFERENCES joueurs(id)
);
-- associations entre les tables
 ALTER TABLE coaches 
 ADD CONSTRAINT fk_coaches_seances
FOREIGN KEY ("session_id") REFERENCES seances("id");
COMMIT;
