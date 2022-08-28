SET search_path = Chymera;

DROP SCHEMA IF EXISTS Chymera CASCADE;
CREATE SCHEMA Chymera;

-- DÉFINITION DES TABLES EN LIEN DIRECT AVEC UN USER

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

CREATE TABLE IF NOT EXISTS Friend_requests(
	handle TEXT NOT NULL,
	active_requests TEXT,
	PRIMARY KEY (handle)
);

CREATE TABLE IF NOT EXISTS Friends(
	handle TEXT NOT NULL,
	list TEXT,
	PRIMARY KEY (handle)
);

CREATE TABLE IF NOT EXISTS Blocked_people(
	handle TEXT NOT NULL,
	list TEXT,
	PRIMARY KEY (handle)
);

CREATE TABLE IF NOT EXISTS Group_chat(
	chat_id int NOT NULL,
	owner_handle TEXT NOT NULL,
	members TEXT NOT NULL,
	PRIMARY KEY (chat_id)
);

CREATE TABLE IF NOT EXISTS My_group_chats(
	chat_id int NOT NULL,
	handle TEXT NOT NULL,
	PRIMARY KEY (handle, chat_id)
);

-- MAYBE MAKE LIKES function in db ?

CREATE TABLE IF NOT EXISTS Post(
	handle TEXT NOT NULL,
	post_id TEXT NOT NULL,
	media TEXT,
	text_message TEXT NOT NULL,
	likes int,
	isVideo boolean,
	comments_number int,
	FOREIGN KEY (handle) REFERENCES Users(handle) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (post_id)
);

CREATE TABLE IF NOT EXISTS Post_comment(
	comment_id TEXT NOT NULL,
	post_id Text NOT NULL,
	media TEXT,
	text_message TEXT NOT NULL,
	likes int,
	FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (comment_id)
);

CREATE TABLE IF NOT EXISTS chymera.notification (
    notificationId text NOT NULL,
    photos text,
    title text NOT NULL,
	description text NOT NULL,
	seen text NOT NULL,
	destination_handle text NOT NULL,
	url text,
	
	Primary key (notificationId)
);
-- FIN DES TABLES EN LIEN DIRECT AVEC UN USER

-- DÉFINITION DE L'UTILISATEUR POUR LA COMMUNICATION AVEC L'APPLICATION

-- Inspiré de : https://stackoverflow.com/questions/8092086/create-postgresql-role-user-if-it-doesnt-exist
-- et de : https://tableplus.com/blog/2018/04/postgresql-how-to-grant-access-to-users.html

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
	
	