--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.7
-- Dumped by pg_dump version 9.5.7

-- Started on 2020-07-16 15:30:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'WIN1252';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2125 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 73737)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2126 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 183 (class 1259 OID 73818)
-- Name: clientes; Type: TABLE; Schema: public; Owner: DBA
--

CREATE TABLE clientes (
    cdcl uuid DEFAULT uuid_generate_v4() NOT NULL,
    dsnome character varying(50) NOT NULL,
    idtipo character(2) DEFAULT 'PF'::bpchar NOT NULL,
    cdvend uuid,
    dslim numeric(15,2) NOT NULL
);


ALTER TABLE clientes OWNER TO "DBA";

--
-- TOC entry 182 (class 1259 OID 73812)
-- Name: vendedores; Type: TABLE; Schema: public; Owner: DBA
--

CREATE TABLE vendedores (
    cdvend uuid DEFAULT uuid_generate_v4() NOT NULL,
    dsnome character varying(50) NOT NULL,
    cdtab integer NOT NULL,
    dtnasc date
);


ALTER TABLE vendedores OWNER TO "DBA";

--
-- TOC entry 2117 (class 0 OID 73818)
-- Dependencies: 183
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: DBA
--

COPY clientes (cdcl, dsnome, idtipo, cdvend, dslim) FROM stdin;
a57ba282-dd27-4fd3-a6ca-c77b1756671c	vitor r	PF	94a093bd-72f4-4f44-a69b-3cba3b25eb0c	1400.00
fdc94c30-3710-438a-9d3b-ec20c819d66e	gladsney	PF	94a093bd-72f4-4f44-a69b-3cba3b25eb0c	1400.00
208538de-f1ad-4f2e-a5de-4f04a5d0d8a4	maria	PF	803dcbf2-c299-4ea3-9437-e0251af63dd2	1400.00
5a0702f0-74a8-4b95-bf8c-9cb19e6e3de8	joao	PF	\N	1400.00
e5bf6fdf-f2a3-4a8a-8e77-b6a79223f78a	lucas	PF	\N	900.00
aca84a3d-f035-49a5-b360-327900a517f4	marcos	PF	\N	1500.00
bb4aa1bb-a0e9-432b-a709-231220a2b88d	guilherme	PJ	\N	3000.00
515a37cf-1377-4e02-b2e5-1776247a37c0	laura	PF	\N	800.00
bbc49eda-299f-441e-81c2-716df322e86a	matheus	PF	9b6f3efe-d29f-4211-9417-b883c40062ad	400.00
940b1204-8a0c-4322-bd8d-ca721ca167be	julio	PJ	\N	1242.53
\.


--
-- TOC entry 2116 (class 0 OID 73812)
-- Dependencies: 182
-- Data for Name: vendedores; Type: TABLE DATA; Schema: public; Owner: DBA
--

COPY vendedores (cdvend, dsnome, cdtab, dtnasc) FROM stdin;
94a093bd-72f4-4f44-a69b-3cba3b25eb0c	lindaval	1	1972-09-30
803dcbf2-c299-4ea3-9437-e0251af63dd2	vitor	2	1997-06-26
9b6f3efe-d29f-4211-9417-b883c40062ad	ana	3	2000-06-22
fa7b876b-d0f5-44b2-bb2c-a87eba5d38cf	jose	2	1984-09-30
5dfeebcc-879b-4e80-8393-4c38b3014308	joaquim	2	1964-09-20
\.


--
-- TOC entry 2000 (class 2606 OID 73824)
-- Name: clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: DBA
--

ALTER TABLE ONLY clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (cdcl);


--
-- TOC entry 1998 (class 2606 OID 73817)
-- Name: vendedores_pkey; Type: CONSTRAINT; Schema: public; Owner: DBA
--

ALTER TABLE ONLY vendedores
    ADD CONSTRAINT vendedores_pkey PRIMARY KEY (cdvend);


--
-- TOC entry 2001 (class 2606 OID 73825)
-- Name: clientes_cdvend_fkey; Type: FK CONSTRAINT; Schema: public; Owner: DBA
--

ALTER TABLE ONLY clientes
    ADD CONSTRAINT clientes_cdvend_fkey FOREIGN KEY (cdvend) REFERENCES vendedores(cdvend);


--
-- TOC entry 2124 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: DBA
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM "DBA";
GRANT ALL ON SCHEMA public TO "DBA";
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-07-16 15:30:46

--
-- PostgreSQL database dump complete
--

