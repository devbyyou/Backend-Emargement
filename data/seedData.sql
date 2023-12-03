-- Insertion de données pour les coaches
INSERT INTO coaches (nom, prenom, email, tel, role, password, logo, statut, session_id)
VALUES
    ('Dupont', 'Pierre', 'pierre.dupont@example.com', '0123456789', 'entraîneur', 'motdepasse1', 'logo1.png', 'actif', NULL),
    ('Martin', 'Manu', 'manu.martin@example.com', '0987654321', 'entraîneur', 'motdepasse2', 'logo2.png', 'actif', NULL),
    ('Durand', 'Jean', 'jean.durand@example.com', '0123456789', 'entraîneur', 'motdepasse3', 'logo3.png', 'actif', NULL);

-- Insertion de données pour les catégories
INSERT INTO categories (nom, tranche_age, nombre_total)
VALUES
    ('U17', 'moins de 17 ans', 50),
    ('U19', 'moins de 19 ans', 50),
    ('Senior', 'plus de 19 ans', 50);

-- Insertion de données pour les équipes
INSERT INTO equipes (nom, logo, categorie_id, statut)
VALUES
    ('Equipe A', 'logo_equipeA.png', 1, 'active'),
    ('Equipe B', 'logo_equipeB.png', 1, 'active'),
    ('Equipe A', 'logo_equipeA.png', 2, 'active'),
    ('Equipe B', 'logo_equipeB.png', 2, 'active'),
    ('Equipe A', 'logo_equipeA.png', 3, 'active'),
    ('Equipe B', 'logo_equipeB.png', 3, 'active');

-- Insertion de données pour les séances
INSERT INTO seances (date, heure, lieu, equipe_id, statut)
VALUES
    (CURRENT_DATE, '20:00', '19 rue du stade', 1, 'active'),
    (CURRENT_DATE, '22:00', '19 rue du stade', 1, 'active'),
    (CURRENT_DATE, '20:00', '19 rue du stade', 2, 'active'),
    (CURRENT_DATE, '22:00', '19 rue du stade', 2, 'active'),
    (CURRENT_DATE, '20:00', '19 rue du stade', 3, 'active'),
    (CURRENT_DATE, '22:00', '19 rue du stade', 3, 'active');

-- Insertion de données pour les joueurs
-- Liste de noms et prénoms réalistes
DO $$ 
DECLARE 
    last_names VARCHAR[] := ARRAY['Martin', 'Dupont', 'Lefevre', 'Dubois', 'Leroy', 'Moreau', 'Fournier', 'Girard', 'Bonnet', 'Roux', 'Caron', 'Lemoine', 'Picard', 'Garnier', 'Durand', 'Simon', 'Leclerc', 'Michel', 'Thomas', 'Perrin'];
    first_names VARCHAR[] := ARRAY['Vincent', 'Pierre', 'Manuel', 'Élise', 'Sophie', 'Antoine', 'Camille', 'Charlotte', 'Julien', 'Alexandre', 'Émilie', 'Marie', 'Jérôme', 'Nicolas', 'Claire', 'Jean', 'Alice', 'François', 'Mélanie', 'Mathieu'];
BEGIN
    FOR i IN 1..50 LOOP
        INSERT INTO joueurs (nom, prenom, email, tel, categorie_id, derniere_activite, date_creation, equipe_id, statut, logo, nom_prenom_tel_parent, total_presence, password, role, age, etat, nombre_total_joueur, session_id)
        VALUES (
            last_names[1 + floor(random() * array_length(last_names, 1))],
            first_names[1 + floor(random() * array_length(first_names, 1))],
            'joueur' || i || '@example.com',
            '0601020304',
            1 + floor(random() * 3), -- Catégorie aléatoire entre 1 et 3
            CURRENT_TIMESTAMP,
            CURRENT_DATE,
            1 + floor(random() * 6), -- Équipe aléatoire entre 1 et 6
            'actif',
            null,
            'Parent' || i,
            0,
            'password' || i,
            'joueur',
            15 + floor(random() * 10), -- Âge aléatoire entre 15 et 24
            'disponible',
            50, -- Nombre total de joueurs par catégorie
            null
        );
    END LOOP;
END $$;


-- Insertion de données pour les présences
INSERT INTO presences (joueur_id, seance_id, statut, absence, retard)
SELECT
    joueurs.id,
    seances.id,
    'présent',
    NULL,
    NULL
FROM joueurs, seances
WHERE joueurs.equipe_id = seances.equipe_id
  AND joueurs.categorie_id = seances.equipe_id;

-- Insertion de données pour les absences
INSERT INTO absences (joueur_id, date, heure, statut)
SELECT
    joueurs.id,
    CURRENT_DATE,
    '20:00',
    'absent'
FROM joueurs
WHERE joueurs.equipe_id = 1
LIMIT 5;

-- Insertion de données pour les retards
INSERT INTO retards (joueur_id, date, heure, statut)
SELECT
    joueurs.id,
    CURRENT_DATE,
    '20:00',
    'en retard'
FROM joueurs
WHERE joueurs.equipe_id = 1
LIMIT 5;

-- Insertion de données pour la liaison coaches_equipes
INSERT INTO coaches_equipes (coach_id, equipe_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

-- Insertion de données pour l'historique des présences
INSERT INTO historique_presences (joueur_id, date, presence, absence, retard)
SELECT
    joueurs.id,
    CURRENT_TIMESTAMP,
    true,
    false,
    false
FROM joueurs
LIMIT 5;
