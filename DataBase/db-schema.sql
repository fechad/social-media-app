SET search_path = Chymera;

DROP SCHEMA IF EXISTS Chymera CASCADE;
CREATE SCHEMA Chymera;

-- DÉFINITION DE L'UTILISATEUR POUR LA COMMUNICATION AVEC L'APPLICATION

-- Inspiré de : https://stackoverflow.com/questions/8092086/create-postgresql-role-user-if-it-doesnt-exist
-- et de : https://tableplus.com/blog/2018/04/postgresql-how-to-grant-access-to-users.html

CREATE TABLE IF NOT EXISTS Users(
	email TEXT NOT NULL,
	handle TEXT NOT NULL,
	profile_pic TEXT,
	age VARCHAR(3) NOT NULL,
	account_name TEXT,
	private_account boolean NOT NULL,
	bio TEXT,
	news_options TEXT NOT NULL,
	local_news boolean NOT NULL,
	french_language boolean NOT NULL,
	
	
	PRIMARY KEY (handle)
);




DO $$
	DECLARE count INT;
	BEGIN
		SELECT count(*) INTO count FROM pg_roles WHERE rolname = 'oveezion';
		IF count > 0 THEN
			EXECUTE 'REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA Chymera FROM "oveezion"';
			EXECUTE 'REVOKE ALL PRIVILEGES ON SCHEMA Chymera FROM "oveezion"';
		END IF;
	END
$$;
DROP USER IF EXISTS "oveezion";

CREATE ROLE "oveezion" LOGIN PASSWORD '%%oveezion%X322';
GRANT USAGE ON SCHEMA Chymera TO "oveezion";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Chymera TO "oveezion";

-- FIN DES DÉFINITION DE L'UTILISATEUR
	
	