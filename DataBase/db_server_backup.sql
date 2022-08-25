--
-- PostgreSQL database cluster dump
--

-- Started on 2022-08-22 12:59:54

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--





--
-- Drop roles
--

DROP ROLE oveezion;
DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE oveezion;
ALTER ROLE oveezion WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md521c77fde2d9599baaf2304e0038d30fe';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5b77a0c6064ae480ea3b5649b4d440e3c';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Debian 13.7-0+deb11u1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-08-22 12:59:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- TOC entry 2980 (class 1262 OID 1)
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 2980
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- TOC entry 2983 (class 0 OID 0)
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 2980
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


-- Completed on 2022-08-22 12:59:56

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Debian 13.7-0+deb11u1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-08-22 12:59:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

DROP DATABASE postgres;
--
-- TOC entry 3075 (class 1262 OID 13443)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3076 (class 0 OID 0)
-- Dependencies: 3075
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 3077 (class 0 OID 0)
-- Name: postgres; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER ROLE postgres IN DATABASE postgres SET idle_in_transaction_session_timeout TO '20000';
ALTER ROLE oveezion IN DATABASE postgres SET idle_in_transaction_session_timeout TO '20000';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 5 (class 2615 OID 16962)
-- Name: chymera; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA chymera;


SET SESSION AUTHORIZATION DEFAULT;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3079 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET SESSION AUTHORIZATION 'postgres';

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16987)
-- Name: blocked_people; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.blocked_people (
    email text NOT NULL,
    list text
);


--
-- TOC entry 211 (class 1259 OID 17140)
-- Name: favorite; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.favorite (
    email text NOT NULL,
    posts text
);


--
-- TOC entry 203 (class 1259 OID 16971)
-- Name: friend_requests; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.friend_requests (
    handle text NOT NULL,
    active_requests text
);


--
-- TOC entry 204 (class 1259 OID 16979)
-- Name: friends; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.friends (
    email text NOT NULL,
    list text
);


--
-- TOC entry 206 (class 1259 OID 16995)
-- Name: group_chat; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.group_chat (
    chat_id integer NOT NULL,
    owner_handle text NOT NULL,
    members text NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 17155)
-- Name: likes; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.likes (
    email text NOT NULL,
    posts text
);


--
-- TOC entry 210 (class 1259 OID 17125)
-- Name: muted_people; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.muted_people (
    email text NOT NULL,
    list text
);


--
-- TOC entry 207 (class 1259 OID 17003)
-- Name: my_group_chats; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.my_group_chats (
    chat_id integer NOT NULL,
    handle text NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 17092)
-- Name: post; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.post (
    handle text NOT NULL,
    post_id text NOT NULL,
    media text,
    text_message text NOT NULL,
    likes integer,
    isvideo boolean,
    comments_number integer,
    date text
);


--
-- TOC entry 209 (class 1259 OID 17105)
-- Name: post_comment; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.post_comment (
    comment_id text NOT NULL,
    post_id text NOT NULL,
    media text,
    text_message text NOT NULL,
    likes integer
);


--
-- TOC entry 202 (class 1259 OID 16963)
-- Name: users; Type: TABLE; Schema: chymera; Owner: postgres
--

CREATE TABLE chymera.users (
    email text NOT NULL,
    handle text NOT NULL,
    profile_pic text,
    age character varying(3) NOT NULL,
    account_name text,
    private_account boolean NOT NULL,
    bio text,
    news_options text NOT NULL,
    local_news boolean NOT NULL,
    french_language boolean NOT NULL
);


--
-- TOC entry 3062 (class 0 OID 16987)
-- Dependencies: 205
-- Data for Name: blocked_people; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3068 (class 0 OID 17140)
-- Dependencies: 211
-- Data for Name: favorite; Type: TABLE DATA; Schema: chymera; Owner: postgres
--

INSERT INTO chymera.favorite (email, posts) VALUES ('oveezion@gmail.com', '  fhbefigeiugfihebcksbaicg');
INSERT INTO chymera.favorite (email, posts) VALUES ('etienneaumais@gmail.com', 'jckhgcjhvkjbjbkjbljnljlbbllb jhcljcljchgcksv;  owppppppwdd odbdbppppiiiwdd');


--
-- TOC entry 3060 (class 0 OID 16971)
-- Dependencies: 203
-- Data for Name: friend_requests; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3061 (class 0 OID 16979)
-- Dependencies: 204
-- Data for Name: friends; Type: TABLE DATA; Schema: chymera; Owner: postgres
--

INSERT INTO chymera.friends (email, list) VALUES ('fedwinC@gmail.com', 'aumais oveezion');
INSERT INTO chymera.friends (email, list) VALUES ('etienneaumais@gmail.com', '@fedwin oveezion');
INSERT INTO chymera.friends (email, list) VALUES ('oveezion@gmail.com', '@fedwin aumais fedwinyahoo');


--
-- TOC entry 3063 (class 0 OID 16995)
-- Dependencies: 206
-- Data for Name: group_chat; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3069 (class 0 OID 17155)
-- Dependencies: 212
-- Data for Name: likes; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3067 (class 0 OID 17125)
-- Dependencies: 210
-- Data for Name: muted_people; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3064 (class 0 OID 17003)
-- Dependencies: 207
-- Data for Name: my_group_chats; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3065 (class 0 OID 17092)
-- Dependencies: 208
-- Data for Name: post; Type: TABLE DATA; Schema: chymera; Owner: postgres
--

INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'fhbefigeiugfihebcksbaicg', './assets/profile-pics/image0.jpg', 'this is one of fedwin profile pic', 25, false, 0, NULL);
INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'jckhgcjhvkjbjbkjbljnljlbbllb', './assets/profile-pics/image0.jpg', 'this is one of fedwin profile pic', 25, false, 0, '2');
INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'jhcljcljchgcksv;', './assets/profile-pics/image0.jpg', 'this is one of fedwin profile pic', 25, false, 0, '22-08-01');
INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'owodowodwdd', './assets/profile-pics/0', 'This is a blank post so no photo.', 0, false, 0, '22-08-20');
INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'owppppppwdd', './assets/profile-pics/bayo2.0.jpg', 'This is a post created through the internet. Look at Bayonetta !', 0, false, 0, '22-08-20');
INSERT INTO chymera.post (handle, post_id, media, text_message, likes, isvideo, comments_number, date) VALUES ('aumais', 'odbdbppppiiiwdd', './assets/profile-pics/image0.jpg', 'Simping over Marilou d''OD !!', 0, false, 0, '22-08-20');


--
-- TOC entry 3066 (class 0 OID 17105)
-- Dependencies: 209
-- Data for Name: post_comment; Type: TABLE DATA; Schema: chymera; Owner: postgres
--



--
-- TOC entry 3059 (class 0 OID 16963)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: chymera; Owner: postgres
--

INSERT INTO chymera.users (email, handle, profile_pic, age, account_name, private_account, bio, news_options, local_news, french_language) VALUES ('fedwinc@gmail.com', '@fedwin', 'undefined', '20', 'Fedwin Chatelier', false, 'Official profile account of Fedwin Chatelier', ' Finance Technology Food Game', true, false);
INSERT INTO chymera.users (email, handle, profile_pic, age, account_name, private_account, bio, news_options, local_news, french_language) VALUES ('fedwinc@yahoo.com', 'fedwinyahoo', './assets/profile-pics/image0.jpg', '20', 'testing', false, 'this is a test account', ' Finance Arts Cinema Politics', false, false);
INSERT INTO chymera.users (email, handle, profile_pic, age, account_name, private_account, bio, news_options, local_news, french_language) VALUES ('oveezion@gmail.com', 'oveezion', './assets/profile-pics/Oveezion.png', '0', 'Oveezion', true, 'Oficial page for website creator Oveezion', 'Sports Finance Cinema Food Odd facts Politics Game ', false, true);
INSERT INTO chymera.users (email, handle, profile_pic, age, account_name, private_account, bio, news_options, local_news, french_language) VALUES ('fedwin.chatelier@polymtl.ca', 'fedwinC', './assets/profile-pics/20220520_133436.jpg', '0', 'testing', false, 'another test', 'All', true, false);
INSERT INTO chymera.users (email, handle, profile_pic, age, account_name, private_account, bio, news_options, local_news, french_language) VALUES ('etienneaumais@gmail.com', 'aumais', './assets/profile-pics/1661183419207560.png', '0', 'Etienne the Agnes fan', false, 'Just a guy who likes Agnes Oblige.', 'Business Entertainment General ', false, true);


--
-- TOC entry 2911 (class 2606 OID 16994)
-- Name: blocked_people blocked_people_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.blocked_people
    ADD CONSTRAINT blocked_people_pkey PRIMARY KEY (email);


--
-- TOC entry 2903 (class 2606 OID 17134)
-- Name: users email_unique; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.users
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- TOC entry 2923 (class 2606 OID 17147)
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (email);


--
-- TOC entry 2907 (class 2606 OID 16978)
-- Name: friend_requests friend_requests_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (handle);


--
-- TOC entry 2913 (class 2606 OID 17002)
-- Name: group_chat group_chat_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.group_chat
    ADD CONSTRAINT group_chat_pkey PRIMARY KEY (chat_id);


--
-- TOC entry 2925 (class 2606 OID 17162)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (email);


--
-- TOC entry 2921 (class 2606 OID 17132)
-- Name: muted_people muted_people_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.muted_people
    ADD CONSTRAINT muted_people_pkey PRIMARY KEY (email);


--
-- TOC entry 2915 (class 2606 OID 17010)
-- Name: my_group_chats my_group_chats_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.my_group_chats
    ADD CONSTRAINT my_group_chats_pkey PRIMARY KEY (handle, chat_id);


--
-- TOC entry 2919 (class 2606 OID 17112)
-- Name: post_comment post_comment_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.post_comment
    ADD CONSTRAINT post_comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 2917 (class 2606 OID 17099)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- TOC entry 2909 (class 2606 OID 17149)
-- Name: friends primaryKey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.friends
    ADD CONSTRAINT "primaryKey" PRIMARY KEY (email);


--
-- TOC entry 2905 (class 2606 OID 16970)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (handle);


--
-- TOC entry 2926 (class 2606 OID 17150)
-- Name: friends foreignEmail; Type: FK CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.friends
    ADD CONSTRAINT "foreignEmail" FOREIGN KEY (email) REFERENCES chymera.users(email) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2928 (class 2606 OID 17113)
-- Name: post_comment post_comment_post_id_fkey; Type: FK CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.post_comment
    ADD CONSTRAINT post_comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES chymera.post(post_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2927 (class 2606 OID 17100)
-- Name: post post_handle_fkey; Type: FK CONSTRAINT; Schema: chymera; Owner: postgres
--

ALTER TABLE ONLY chymera.post
    ADD CONSTRAINT post_handle_fkey FOREIGN KEY (handle) REFERENCES chymera.users(handle) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3078 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA chymera; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA chymera TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE blocked_people; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.blocked_people TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE favorite; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.favorite TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE friend_requests; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.friend_requests TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3083 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE friends; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.friends TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 206
-- Name: TABLE group_chat; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.group_chat TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3085 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE muted_people; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.muted_people TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3086 (class 0 OID 0)
-- Dependencies: 207
-- Name: TABLE my_group_chats; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.my_group_chats TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3087 (class 0 OID 0)
-- Dependencies: 208
-- Name: TABLE post; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.post TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3088 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE post_comment; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.post_comment TO oveezion;


SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE users; Type: ACL; Schema: chymera; Owner: postgres
--

GRANT ALL ON TABLE chymera.users TO oveezion;


-- Completed on 2022-08-22 12:59:59

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-08-22 12:59:59

--
-- PostgreSQL database cluster dump complete
--

