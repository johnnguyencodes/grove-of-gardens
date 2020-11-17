--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE ONLY public."carouselImages" DROP CONSTRAINT "carouselImages_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
ALTER TABLE public."carouselImages" ALTER COLUMN "carouselImageId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP TABLE public."productImages";
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP SEQUENCE public."carouselImages_carouselImageId_seq";
DROP TABLE public."carouselImages";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: carouselImages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."carouselImages" (
    "carouselImageId" integer NOT NULL,
    image text NOT NULL,
    "imageCaption" text,
    "imageText" text
);


--
-- Name: carouselImages_carouselImageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carouselImages_carouselImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carouselImages_carouselImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carouselImages_carouselImageId_seq" OWNED BY public."carouselImages"."carouselImageId";


--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    address1 text NOT NULL,
    address2 text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    "creditMonth" integer NOT NULL,
    "creditYear" integer NOT NULL,
    "creditCVV" integer NOT NULL,
    phone bigint NOT NULL,
    "creditCardNumber" bigint NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: productImages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productImages" (
    "productId" integer NOT NULL,
    "imageId" integer NOT NULL,
    "imageURL" text NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    category text
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: carouselImages carouselImageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."carouselImages" ALTER COLUMN "carouselImageId" SET DEFAULT nextval('public."carouselImages_carouselImageId_seq"'::regclass);


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: carouselImages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."carouselImages" ("carouselImageId", image, "imageCaption", "imageText") FROM stdin;
2	/images/carousel-image-2.jpg	All orders are shipped with care	Each plant is carefully inspected and packaged to arrive safely and healthy
3	/images/carousel-image-3.jpg	The Grove of Gardens supports One Tree Planted	A portion of the proceeds from each purchase will go towards global reforestation efforts in the Amazon Rainforest
1	/images/carousel-image-1.jpg	Find new favorite and rare succulents	The Grove of Gardens offers more than 200 varieties of popular and rare succulents
\.


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
1	70	1	2999	\N
2	71	1	2999	\N
3	72	1	2999	\N
4	73	1	2999	\N
5	74	1	2999	\N
6	75	1	2999	\N
7	76	1	2999	\N
8	77	1	2999	\N
9	78	1	2999	\N
10	79	1	2999	\N
11	80	1	2999	\N
12	81	1	2999	\N
13	82	1	2999	\N
14	83	1	2999	\N
15	84	1	2999	\N
16	85	1	2999	\N
17	86	1	2999	\N
18	87	1	2999	\N
19	88	1	2999	\N
21	89	1	2999	\N
23	90	1	2999	\N
24	90	1	2999	\N
25	90	1	2999	\N
26	90	1	2999	\N
27	90	1	2999	\N
28	90	1	2999	\N
29	90	1	2999	\N
30	91	1	2999	\N
31	91	2	2595	\N
32	91	3	2900	\N
33	92	1	2999	\N
34	92	2	2595	\N
35	92	1	2999	\N
36	92	2	2595	\N
37	91	1	2999	\N
38	91	1	2999	\N
39	91	3	2900	\N
40	93	1	2999	\N
41	93	1	2999	\N
42	93	1	2999	\N
43	93	3	2900	\N
44	92	1	2999	\N
45	92	2	2595	\N
46	93	1	2999	\N
47	93	2	2595	\N
48	93	1	2999	\N
49	93	1	2999	\N
50	93	1	2999	\N
51	92	1	2999	\N
52	93	1	2999	\N
63	173	16	492000	40
64	94	19	150000	3
65	94	8	1400000	7
67	95	19	150000	1
69	96	17	180000	4
71	97	14	720000	1
72	98	14	720000	1
73	99	14	720000	90
76	101	32	1505	10
77	101	20	1505	10
75	101	22	1555	20
79	102	20	1505	16
123	117	24	1495	1
124	118	1	1505	1
125	119	5	585	1
126	119	10	1655	1
78	102	22	1555	11
80	103	32	1505	7
81	104	32	1505	1
82	105	24	1495	1
83	106	22	1555	13
84	106	37	885	1
85	107	13	900	16
86	107	22	1555	21
87	107	20	1505	2
88	108	20	1505	1
89	109	20	1505	20
90	109	23	1655	1
127	119	45	1555	2
129	120	33	1505	1
130	121	16	1505	1
131	121	26	1855	1
93	110	13	900	1
94	110	1	1505	1
132	121	8	1505	3
92	110	24	1495	2
133	121	35	1505	14
91	110	17	985	10
95	110	2	1505	1
134	121	9	1505	1
135	122	17	985	1
102	111	17	985	1
103	111	24	1495	1
104	112	3	1505	1
106	112	37	885	1
107	112	42	1505	1
108	113	24	1495	1
109	113	1	1505	1
110	113	34	1505	1
111	113	17	985	1
112	114	24	1495	1
113	114	33	1505	1
114	115	13	900	1
115	115	44	1505	1
116	115	35	1505	1
117	116	33	1505	1
118	116	3	1505	1
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-06-14 13:37:42.914819-07
2	2020-06-14 13:37:55.96405-07
3	2020-06-14 13:38:32.329181-07
4	2020-06-14 13:39:18.351536-07
5	2020-06-14 13:40:22.097937-07
6	2020-06-14 13:41:55.532635-07
7	2020-06-14 13:43:08.656071-07
8	2020-06-14 15:45:01.034913-07
9	2020-06-14 15:46:14.605989-07
10	2020-06-14 15:47:10.003054-07
11	2020-06-14 15:47:33.290276-07
12	2020-06-14 15:47:49.133158-07
13	2020-06-14 15:48:22.061897-07
14	2020-06-14 15:48:47.176073-07
15	2020-06-14 15:49:00.184825-07
16	2020-06-14 15:49:19.417893-07
17	2020-06-14 15:49:37.624863-07
18	2020-06-14 15:50:13.064-07
19	2020-06-14 15:50:34.43677-07
20	2020-06-14 15:51:03.767047-07
21	2020-06-14 15:51:35.291487-07
22	2020-06-14 15:52:09.569119-07
23	2020-06-14 15:52:21.706529-07
24	2020-06-14 15:54:03.945858-07
25	2020-06-14 15:54:16.716245-07
26	2020-06-14 15:54:30.344011-07
27	2020-06-14 15:55:50.282736-07
28	2020-06-14 15:59:10.47849-07
29	2020-06-14 16:01:09.018471-07
30	2020-06-14 16:01:14.525566-07
31	2020-06-14 16:01:32.831225-07
32	2020-06-14 16:02:48.131246-07
33	2020-06-14 16:08:10.514872-07
34	2020-06-14 16:08:25.501155-07
35	2020-06-14 16:10:49.035729-07
36	2020-06-14 16:10:56.959279-07
37	2020-06-14 16:13:46.744251-07
38	2020-06-14 16:13:56.949939-07
39	2020-06-14 16:14:07.747659-07
40	2020-06-14 16:17:17.94072-07
41	2020-06-14 16:17:49.736791-07
42	2020-06-14 16:17:55.845943-07
43	2020-06-14 16:22:56.216359-07
44	2020-06-14 16:27:56.223935-07
45	2020-06-14 16:29:23.730869-07
46	2020-06-14 16:29:44.618929-07
47	2020-06-14 16:32:02.71397-07
48	2020-06-14 16:33:05.902554-07
49	2020-06-14 16:36:19.576596-07
50	2020-06-14 16:36:56.76056-07
51	2020-06-14 16:39:54.97426-07
52	2020-06-14 16:40:59.908843-07
53	2020-06-14 16:47:42.6551-07
54	2020-06-14 16:48:56.34428-07
55	2020-06-14 16:49:31.957755-07
56	2020-06-14 16:49:54.148028-07
57	2020-06-14 16:50:23.635198-07
58	2020-06-14 16:50:35.792701-07
59	2020-06-14 16:50:43.076529-07
60	2020-06-14 16:52:23.676884-07
61	2020-06-14 16:52:48.493125-07
62	2020-06-14 16:53:09.082518-07
63	2020-06-14 16:53:38.064595-07
64	2020-06-14 16:56:57.229249-07
65	2020-06-14 16:58:29.322451-07
66	2020-06-14 16:58:40.357857-07
67	2020-06-14 16:59:40.704564-07
68	2020-06-14 17:01:15.555093-07
69	2020-06-14 17:02:34.297422-07
70	2020-06-14 17:06:19.812061-07
71	2020-06-14 17:07:22.332521-07
72	2020-06-14 17:08:53.709205-07
73	2020-06-14 17:09:08.658714-07
74	2020-06-14 17:20:35.213375-07
75	2020-06-14 17:21:29.454912-07
76	2020-06-14 17:23:31.025306-07
77	2020-06-14 17:33:15.069686-07
78	2020-06-14 17:44:16.521573-07
79	2020-06-14 17:44:34.169424-07
80	2020-06-14 17:53:32.731543-07
81	2020-06-14 18:09:26.235233-07
82	2020-06-14 18:10:55.558299-07
83	2020-06-14 18:11:16.175736-07
84	2020-06-14 18:14:00.858029-07
85	2020-06-14 18:54:25.219222-07
86	2020-06-14 19:08:26.078841-07
87	2020-06-14 19:10:29.827426-07
88	2020-06-14 19:10:38.752742-07
89	2020-06-14 19:25:48.392154-07
90	2020-06-14 19:29:16.395867-07
91	2020-06-15 00:55:52.422178-07
92	2020-06-15 09:02:37.995398-07
93	2020-06-15 09:45:29.034044-07
94	2020-09-18 00:56:39.35041-07
95	2020-09-24 12:13:20.184473-07
96	2020-09-24 17:06:08.272507-07
97	2020-09-28 17:28:34.441446-07
98	2020-09-28 21:19:09.778752-07
99	2020-09-29 16:03:30.334964-07
100	2020-10-01 12:15:11.957647-07
101	2020-10-04 16:21:54.156437-07
102	2020-10-05 11:05:59.418307-07
103	2020-10-05 13:03:54.081771-07
104	2020-10-05 13:04:48.519534-07
105	2020-10-05 13:05:27.132057-07
106	2020-10-06 14:40:29.396796-07
107	2020-10-07 13:30:36.686304-07
108	2020-10-08 18:41:39.452539-07
109	2020-10-11 17:53:41.252883-07
110	2020-10-12 18:04:07.798361-07
111	2020-10-13 12:00:14.687961-07
112	2020-10-14 10:43:01.158085-07
113	2020-10-14 22:05:08.731221-07
114	2020-10-15 00:07:44.963355-07
115	2020-10-15 12:07:58.495681-07
116	2020-10-15 12:19:29.514079-07
117	2020-10-19 14:30:32.022214-07
118	2020-10-19 18:55:37.282861-07
119	2020-10-19 19:15:57.592982-07
120	2020-10-19 19:30:38.440045-07
121	2020-10-20 12:21:19.19152-07
122	2020-11-17 13:24:35.696986-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "createdAt", "fullName", email, address1, address2, city, state, zip, "creditMonth", "creditYear", "creditCVV", phone, "creditCardNumber") FROM stdin;
1	94	2020-09-18 00:56:57.60027-07	John Nguyen	johnnguyenthe5th@gmail.com	6592 belgrave ave		garden grove	CA	92845	1	2024	714	7148562384	1111111111111111
2	95	2020-09-24 16:55:38.234602-07	John Nguyen	johnnguyenthe5th@gmail.com	6592 belgrave ave		garden grove	CA	92845	1	2020	777	7148562384	1111111111111111
3	97	2020-09-28 17:31:17.598925-07	John Nguyen	johnnguyenthe5th@gmail.com	6592 belgrave ave		garden grove	CA	92845	2	2021	777	7148562384	1111111111111111
4	102	2020-10-05 12:50:52.968161-07	John Nguyen	johnnguyenthe5th@gmail.com	14622 Davis St.	92683	Westminster	CA	92683	12	2027	111	7148562384	1111111111111111
5	103	2020-10-05 13:04:06.071218-07	John Nguyen	johnnguyenthe5th@gmail.com	14622 Davis St.	92683	Westminster	CA	92683	4	2021	111	7148562384	1111111111111111
6	104	2020-10-05 13:05:01.109237-07	John Nguyen	johnnguyenthe5th@gmail.com	14622 Davis St.	92683	Westminster	CA	92683	2	2023	111	7148562384	1111111111111111
7	113	2020-10-15 00:07:08.132608-07	John Nguyen	johnnguyenthe5th@gmail.com	14622 Davis St.	92683	Westminster	CA	92683	1	2020	111	7148562384	1111111111111111
8	115	2020-10-15 12:08:20.807264-07	John Nguyen	johnnguyenthe5th@gmail.com	14622 Davis St.	92683	Westminster	CA	92683	2	2022	777	7148562384	1111111111111111
9	117	2020-10-19 18:55:18.567606-07	John Nguyen	jj@gmail.com	14 D. Street	99999	Some City	CA	99999	1	2020	111	1234567890	1111111111111111
10	118	2020-10-19 18:55:57.547411-07	John Nguyen	jj@gmail.com	14 D. Street	99999	Some City	CA	99999	1	2020	111	1234567890	1111111111111111
11	119	2020-10-19 19:30:25.694868-07	JNNNNN	jj@gmail.com	14 D. Street	99999	Some City	CA	99999	1	2020	111	1234567890	1111111111111111
12	120	2020-10-19 19:31:06.451039-07	John Nguyen	jj@gmail.com	14 D. Street	99999	Some City	CA	99999	1	2021	111	1234567890	1111111111111111
\.


--
-- Data for Name: productImages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productImages" ("productId", "imageId", "imageURL") FROM stdin;
1	1	/images/window-haworthia-1.jpg
1	2	/images/window-haworthia-2.jpg
1	3	/images/window-haworthia-3.jpg
1	4	/images/window-haworthia-4.jpg
1	5	/images/window-haworthia-5.jpg
2	6	/images/haworthia-cooperi-1.jpg
2	7	/images/haworthia-cooperi-2.jpg
2	8	/images/haworthia-cooperi-3.jpg
2	9	/images/haworthia-cooperi-4.jpg
2	10	/images/haworthia-cooperi-5.jpg
3	11	/images/haworthia-cuspidata-1.jpg
3	12	/images/haworthia-cuspidata-2.jpg
3	13	/images/haworthia-cuspidata-3.jpg
3	14	/images/haworthia-cuspidata-4.jpg
3	15	/images/haworthia-cuspidata-5.jpg
4	16	/images/haworthia-cymbiformios-var-obtusa-1.jpg
4	17	/images/haworthia-cymbiformios-var-obtusa-2.jpg
4	18	/images/haworthia-cymbiformios-var-obtusa-3.jpg
4	19	/images/haworthia-cymbiformios-var-obtusa-4.jpg
4	20	/images/haworthia-cymbiformios-var-obtusa-5.jpg
5	21	/images/haworthia-batesiana-1.jpg
5	22	/images/haworthia-batesiana-2.jpg
5	23	/images/haworthia-batesiana-3.jpg
5	24	/images/haworthia-batesiana-4.jpg
6	25	/images/silver-haworthia-1.jpg
6	26	/images/silver-haworthia-2.jpg
6	27	/images/silver-haworthia-3.jpg
6	28	/images/silver-haworthia-4.jpg
7	29	/images/variegated-aloe-1.jpg
7	30	/images/variegated-aloe-2.jpg
7	31	/images/variegated-aloe-3.jpg
7	32	/images/variegated-aloe-4.jpg
7	33	/images/variegated-aloe-5.jpg
8	34	/images/echeveria-tippy-pink-1.jpg
8	35	/images/echeveria-tippy-pink-2.jpg
8	36	/images/echeveria-tippy-pink-3.jpg
8	37	/images/echeveria-tippy-pink-4.jpg
9	38	/images/echeveria-topsy-turvy-1.jpg
9	39	/images/echeveria-topsy-turvy-2.jpg
9	40	/images/echeveria-topsy-turvy-3.jpg
9	41	/images/echeveria-topsy-turvy-4.jpg
9	42	/images/echeveria-topsy-turvy-5.jpg
10	43	/images/echeveria-black-knight-1.jpg
10	44	/images/echeveria-black-knight-2.jpg
10	45	/images/echeveria-black-knight-3.jpg
10	46	/images/echeveria-black-knight-4.jpg
11	47	/images/echeveria-sedeveria-blue-elf-1.jpg
11	48	/images/echeveria-sedeveria-blue-elf-2.jpg
11	49	/images/echeveria-sedeveria-blue-elf-3.jpg
11	50	/images/echeveria-sedeveria-blue-elf-4.jpg
12	51	/images/echeveria-crested-frosty-1.jpg
12	52	/images/echeveria-crested-frosty-2.jpg
12	53	/images/echeveria-crested-frosty-3.jpg
12	54	/images/echeveria-crested-frosty-4.jpg
12	55	/images/echeveria-crested-frosty-5.jpg
13	56	/images/cactus-pack-1.jpg
13	57	/images/cactus-pack-2.jpg
13	58	/images/cactus-pack-3.jpg
13	59	/images/cactus-pack-4.jpg
13	60	/images/cactus-pack-5.jpg
14	61	/images/opuntia-rufida-minima-1.jpg
14	62	/images/opuntia-rufida-minima-2.jpg
14	63	/images/opuntia-rufida-minima-3.jpg
14	64	/images/opuntia-rufida-minima-4.jpg
15	65	/images/mammillaria-spinosissima-1.jpg
15	66	/images/mammillaria-spinosissima-2.jpg
15	67	/images/mammillaria-spinosissima-3.jpg
16	68	/images/echinocereus-pulchellus-var-acanthosetus-1.jpg
16	69	/images/echinocereus-pulchellus-var-acanthosetus-2.jpg
16	70	/images/echinocereus-pulchellus-var-acanthosetus-3.jpg
16	71	/images/echinocereus-pulchellus-var-acanthosetus-4.jpg
17	72	/images/angel-wing-opuntia-microdasys-1.jpg
17	73	/images/angel-wing-opuntia-microdasys-2.jpg
17	74	/images/angel-wing-opuntia-microdasys-3.jpg
17	75	/images/angel-wing-opuntia-microdasys-4.jpg
17	76	/images/angel-wing-opuntia-microdasys-5.jpg
18	77	/images/mammillaria-thimble-1.jpg
18	78	/images/mammillaria-thimble-2.jpg
18	79	/images/mammillaria-thimble-3.jpg
18	80	/images/mammillaria-thimble-4.jpg
18	81	/images/mammillaria-thimble-5.jpg
20	83	/images/golden-barrel-1.jpg
20	84	/images/golden-barrel-2.jpg
20	85	/images/golden-barrel-3.jpg
20	86	/images/golden-barrel-4.jpg
20	87	/images/golden-barrel-5.jpg
21	88	/images/pine-cone-tephrocactus-1.jpg
21	89	/images/pine-cone-tephrocactus-2.jpg
21	90	/images/pine-cone-tephrocactus-3.jpg
21	91	/images/pine-cone-tephrocactus-4.jpg
21	92	/images/pine-cone-tephrocactus-5.jpg
23	98	/images/red-thorn-1.jpg
23	99	/images/red-thorn-2.jpg
23	100	/images/red-thorn-3.jpg
24	101	/images/britton-and-rose-1.jpg
24	102	/images/britton-and-rose-2.jpg
24	103	/images/britton-and-rose-3.jpg
24	104	/images/britton-and-rose-4.jpg
25	105	/images/golden-ball-1.jpg
25	106	/images/golden-ball-2.jpg
25	107	/images/golden-ball-3.jpg
25	108	/images/golden-ball-4.jpg
19	84	/images/echinopsis-domino-3.jpg
22	95	/images/mammillaria-powder-puff-3.jpg
22	96	/images/mammillaria-powder-puff-4.jpg
22	97	/images/mammillaria-powder-puff-5.jpg
19	82	/images/echinopsis-domino-1.jpg
19	83	/images/echinopsis-domino-2.jpg
25	109	/images/golden-ball-5.jpg
26	110	/images/christmas-cactus-1.jpg
26	111	/images/christmas-cactus-2.jpg
26	112	/images/christmas-cactus-3.jpg
26	113	/images/christmas-cactus-4.jpg
26	114	/images/christmas-cactus-5.jpg
27	115	/images/peanut-cactus-1.jpg
27	116	/images/peanut-cactus-2.jpg
27	117	/images/peanut-cactus-3.jpg
27	118	/images/peanut-cactus-4.jpg
27	119	/images/peanut-cactus-5.jpg
28	120	/images/peruvian-old-man-1.jpg
28	121	/images/peruvian-old-man-2.jpg
28	122	/images/peruvian-old-man-3.jpg
28	123	/images/peruvian-old-man-4.jpg
28	124	/images/peruvian-old-man-5.jpg
29	125	/images/lady-fingers-1.jpg
29	126	/images/lady-fingers-2.jpg
29	127	/images/lady-fingers-3.jpg
29	128	/images/lady-fingers-4.jpg
29	129	/images/lady-fingers-5.jpg
30	130	/images/mammillaria-albiflora-1.jpg
30	131	/images/mammillaria-albiflora-2.jpg
30	132	/images/mammillaria-albiflora-3.jpg
30	133	/images/mammillaria-albiflora-4.jpg
30	134	/images/mammillaria-albiflora-5.jpg
31	135	/images/variegated-corn-cob-1.jpg
31	136	/images/variegated-corn-cob-2.jpg
31	137	/images/variegated-corn-cob-3.jpg
31	138	/images/variegated-corn-cob-4.jpg
31	139	/images/variegated-corn-cob-5.jpg
32	140	/images/josephs-coat-1.jpg
32	141	/images/josephs-coat-2.jpg
32	142	/images/josephs-coat-3.jpg
32	143	/images/josephs-coat-4.jpg
32	144	/images/josephs-coat-5.jpg
33	145	/images/crassula-calico-kitten-1.jpg
33	146	/images/crassula-calico-kitten-2.jpg
33	147	/images/crassula-calico-kitten-3.jpg
33	148	/images/crassula-calico-kitten-4.jpg
33	149	/images/crassula-calico-kitten-5.jpg
34	150	/images/crassula-ivory-towers-1.jpg
34	151	/images/crassula-ivory-towers-1.jpg
34	152	/images/crassula-ivory-towers-1.jpg
34	153	/images/crassula-ivory-towers-1.jpg
35	154	/images/crassula-baby-necklace-1.jpg
35	155	/images/crassula-baby-necklace-2.jpg
35	156	/images/crassula-baby-necklace-3.jpg
35	157	/images/crassula-baby-necklace-4.jpg
35	158	/images/crassula-baby-necklace-5.jpg
36	159	/images/crassula-moonglow-1.jpg
36	160	/images/crassula-moonglow-2.jpg
36	161	/images/crassula-moonglow-3.jpg
36	162	/images/crassula-moonglow-4.jpg
36	163	/images/crassula-moonglow-5.jpg
37	164	/images/crassula-brevifolia-1.jpg
37	165	/images/crassula-brevifolia-1.jpg
37	166	/images/crassula-brevifolia-1.jpg
37	167	/images/crassula-brevifolia-1.jpg
37	168	/images/crassula-brevifolia-1.jpg
38	169	/images/crassula-morgan-hybrid-1.jpg
38	170	/images/crassula-morgan-hybrid-2.jpg
38	171	/images/crassula-morgan-hybrid-3.jpg
38	172	/images/crassula-morgan-hybrid-4.jpg
38	173	/images/crassula-morgan-hybrid-5.jpg
39	174	/images/crassula-springtime-1.jpg
39	175	/images/crassula-springtime-2.jpg
39	176	/images/crassula-springtime-3.jpg
39	177	/images/crassula-springtime-4.jpg
39	178	/images/crassula-springtime-5.jpg
40	179	/images/crassula-tom-thumb-1.jpg
40	180	/images/crassula-tom-thumb-2.jpg
40	181	/images/crassula-tom-thumb-3.jpg
40	182	/images/crassula-tom-thumb-4.jpg
40	183	/images/crassula-tom-thumb-5.jpg
41	184	/images/variegated-crassula-perforata-1.jpg
41	185	/images/variegated-crassula-perforata-2.jpg
41	186	/images/variegated-crassula-perforata-3.jpg
41	187	/images/variegated-crassula-perforata-4jpg
41	188	/images/variegated-crassula-perforata-5.jpg
42	189	/images/crassula-high-voltage-1.jpg
42	190	/images/crassula-high-voltage-2.jpg
42	191	/images/crassula-high-voltage-3.jpg
42	192	/images/crassula-high-voltage-4.jpg
42	193	/images/crassula-high-voltage-5.jpg
43	194	/images/crassula-mesembryanthemoides-1.jpg
43	195	/images/crassula-mesembryanthemoides-2.jpg
43	196	/images/crassula-mesembryanthemoides-3.jpg
44	197	/images/crassula-nudicaulus-var-herrei-1.jpg
44	198	/images/crassula-nudicaulus-var-herrei-2.jpg
44	199	/images/crassula-nudicaulus-var-herrei-3.jpg
44	200	/images/crassula-nudicaulus-var-herrei-4.jpg
44	201	/images/crassula-nudicaulus-var-herrei-5.jpg
45	202	/images/crassula-pagoda-village-1.jpg
45	203	/images/crassula-pagoda-village-2.jpg
45	204	/images/crassula-pagoda-village-3.jpg
45	205	/images/crassula-pagoda-village-4.jpg
45	206	/images/crassula-pagoda-village-5.jpg
22	94	/images/mammillaria-powder-puff-2.jpg
22	93	/images/mammillaria-powder-puff-1.jpg
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", category) FROM stdin;
1	Cathedral Window Haworthia	1505	/images/window-haworthia-1.jpg	4" Clay Pot	Haworthia cymbiformis, also known as Cathedral Window Haworthia or Window Haworthia, is a drought-tolerant evergreen succulent with rosettes up to 3 inches (8 cm) tall and 4 inches (10 cm) in diameter.  Its pale green leaves are fleshy, bulbous, and tender with dark stripes running across the length of each leaf and turning translucent at the tip. This species has flowers that are white or light pink with brown-green veins growing from 8 inches (20 cm) tall inflorescence. Window Haworthia is a popular houseplant because it is super easy to grow and low maintenance. Whether you grow it indoors or outdoors, the growing conditions for this plant remain the same.	Haworthia
2	Haworthia Cooperi	1505	/images/haworthia-cooperi-1.jpg	4" Clay Pot	Haworthia Cooperi is a slowly growing, low succulent plant. It grow in clumps of small rosettes of tiny, fleshy, light green leaves, up to 2 inches (5 cm) long. Its short stem produces many leaves that are just long enough to reach the soil surface, the transparent tips allowing light into the factory below. When flowering in spring to summer, it bears a peduncle simple inflorescence (up to 12 inches (30 cm) long) of whitish flowers.	Haworthia
3	Haworthia Cuspidata	1505	/images/haworthia-cuspidata-1.jpg	4" Clay Pot	Haworthia cuspidata is a strong and pretty hardy succulents. It forms star-like shaped rosette up to 4 inches in diameter. Also called "Star Window Plant", it has dark green leaves with translucent areas near the tips. It grows offsets freely and hence can be grown as a ground cover. In spring, it produces small white flowers on thin long stems.	Haworthia
4	Haworthia Cymbiformus Var. Obtusa	1555	/images/haworthia-cymbiformios-var-obtusa-1.jpg	4" Clay Pot	Haworthia Cymbiformis Var. Obtusa is one of the innumerable morphological forms of the very variable Haworthia cymbiformis characterized by denser rosettes up to 6 inches (15 cm) in diameter, forming round clumps. It has peculiar bright green leaves that looks like molded glass. Thay are succulent, soft, very juicy, obovate with entire margins, and leaf-tips are rather obtuse or rounded. White to very pale pink flowers with brownish-green veins are borne on a 8 inches (20 cm) tall inflorescence.	Haworthia
5	Haworthia Batesiana	585	/images/haworthia-batesiana-1.jpg	2" Clay Pot	Haworthia Batesiana has miniature rosettes with translucent bright green leaves marked with a net of deeper green. These succulent leaves have smooth margins and a terminal white spine. Rosettes offset freely to form dense clumps. Their shape and coloration make them perfect for succulent arrangements and make perfect gifts in a pot for the home or office desk.	Haworthia
6	Silver Haworthia	1045	/images/silver-haworthia-1.jpg	4" Clay Pot	This listing is for a special 4" silver Haworthia retusa var. acuminata f. variegata. It is also known as 'Grey Ghost' for its pale foliage with white-grey patterned variegation. It produces offsets slowly to form a beautiful clump. The amount of light each individual plant receives determines its varying appearance.	Haworthia
7	Variegated Aloe	1555	/images/variegated-aloe-1.jpg	4" Clay Pot	Variegated Aloe with amazing white/cream and green stripes. Its leaves are toothed and sword-shaped. This is a sprawling succulent that can grow up to 10 ft (3m). Deep orange or red flowers bloom about 2 ft above the foliage.	Haworthia
8	Echeveria Tippy Pink	1505	/images/echeveria-tippy-pink-1.jpg	4" Clay Pot	Echeveria Tippy is a hybrid of Echeveria Chihuahuensis. It is a lovely rosette succulent with cute rosy tips on light blue-green leaves. The thick pointy leaves are coated with a thin white powder, which gives it a soft pastel look. The rosettes can grow up to 6 inches in diameter. In spring and summer, Echeveria Tippy produces stalks of orange bell-shaped flowers, which are attractive to hummingbirds and butterflies.	Echeveria
9	Echeveria Topsy Turvy	1505	/images/echeveria-topsy-tury-1.jpg	4" Clay Pot	Echeveria Topsy Turvy is an unusual Echeveria with silvery green leaf tips pointing inwards towards the center of the plant. The rosettes can grow up to 10 inches in diameter. Echeveria Topsy Turvy grows quickly and produces multiple offsets so it can form a dense carpet over time. In late summer to fall, Echeveria Topsy Turvy produces orange bell-shaped flowers with tips that open up like little stars.	Echeveria
10	Echeveria Black Knight	1655	/images/echeveria-black-knight-1.jpg	4" Clay Pot	Echeveria Black Knight is an interesting succulent with dark-colored pointy narrow leaves. It's one of the darkest Echeverias, together with Echeveria Black Prince. In summer, it produces dark red flowers, which add an extra sense of drama to this stunning species.	Echeveria
11	Echeveria Blue Elf	1505	/images/echeveria-sedeveria-blue-elf-1.jpg	4" Clay Pot	Echeveria Blue Elf is a hybrid between Sedum and Echeveria, which gives it the rosette look of Echeveria and the ability to grow multiple offsets of Sedum. Sedeveria Blue Elf has teal green leaves with amazing red tips that darken in winter. An outstanding bloomer, Sedeveria Blue Elf produces clusters of bright yellow flowers multiple times a year, which give it its nickname "Happy Plant".	Echeveria
12	Crested Echeveria Frosty	1655	/images/echeveria-crested-frosty-1.jpg	4" Clay Pot	Echeveria pulvinata 'Frosty' - White Chenille Plant: Pale whitish green rosettes thickly covered with silvery white hairs. Velvet texture. Shrub like grower. Yellow-orange blooms in summer. Tender soft succulent - will not tolerate frost.	Echeveria
13	Cactus Pack	900	/images/cactus-pack-1.jpg	4 Cactus in 2" Clay Pot	Enjoy your gardening with our Cactus Pack. In this pack, you'll receive varieties of cactus that are easy to grow, incredibly adaptable, relatively pest-free, and are low maintenance - ideal for any home, office, or garden. Each pack contains a random variety of cactus with a size of 2-inches - fully rooted in a plastic pot with soil. Order now and give your friend or special someone a cactus gift they can admire and grow at home, office, or garden to make a perfect green space.	Cactus
14	Opuntia Rufida Minima Cinnamon Cactus	885	/images/opuntia-rufida-minima-1.jpg	2" Clay Pot	Opuntia Rufida Minima is a miniature prickly pear version also known as Cinnamon Cactus which only grows to approx. 8" to 10" in height. The pads are covered with very small brownish-cinnamon colored spines or glochids. Very compact and self branching a good variety for growing as a houseplant or placement outdoors in frost-free locations in the rock garden. Its spikes are small therefore you have to be careful when touching it.	Cactus
15	Mammillaria Spinosissima Cactus	1045	/images/mammillaria-spinosissima-1.jpg	3" Clay Pot	Mammillaria Spinosissima cactus is also known as Red-headed Irishman with cylyndrical, dark green stem, up to 12 inches (30 cm) tall and up to 4 inches (10 cm) in diameter, almost hidden under a dense covering of spines. Flowers are purplish or deep-pink in spring. The Red-Headed Irishman will do best outdoors, though it may be kept indoors as well.	Cactus
16	Echinocereus Pulchellus Var Acanthosetus Cactus	1505	/images/echinocereus-pulchellus-var-acanthosetus-1.jpg	3" Clay Pot	Echinocereus Pulchellus var acanthosetus is a solitary or clumping cactus with flat globular bodies and short pale spines. The stems are hemispherical and up to 6 cm (but cultivated plants are frequently higher), 5-7cm in diameter, bluish-green when young. The flowers are showy, pinkish-white to hot pink, up to 6 cm in diameter.	Cactus
17	Angel Wing Opuntia Microdasys Cactus	985	/images/angel-wing-opuntia-microdasys-1.jpg	2" Clay Pot	Opuntia microdasys, also called Bunny Ear Cactus or Angel's Wing. It’s a popular houseplant due to its easy care and cute appearance. It is native to Mexico with thornless, flat, elliptical to circular pads. It can grow 2 to 3 feet tall and up to 6 feet wide outdoors. Its spikes are small and white therefore you have to be careful when touching it.	Cactus
18	Mammillaria Thimble Cactus	1555	/images/mammillaria-thimble-1.jpg	4" Clay Pot	This listing features our beautiful rooted Thimble Mammillaria Cactus in 2 inch or 4 inch pot. Mammillaria gracilis v. fragilis is a charming, tiny cactus that is native to Central Mexico. Its small round bodies are densely covered with interlaced white spines, that gives the impression of white "thimbles". Clusters vigorously to form large mats. In late winter it features creamy yellow flowers. Requires gritty succulent or cactus potting soil. Prefers bright light and good airflow. Water when soil is completely dry to the touch. When one of the little bodies breaks off, it can be propagated into a new plant. Use in a fairy garden or in an alpine trough garden.	Cactus
19	Echinopsis Domino Cactus	1555	/images/mammillaria-thimble-1.jpg	4" Clay Pot	Echinopsis Domino Cactus is a cute cactus with white fuzzy domino like dots along the stems. It is known for its beautiful and fragrant flowers that bloom at night. The flowers are white, funnel shaped, and can open up to 9 inches long. A mature Domino Cactus can bloom several flowers at a time, but the flowers only last one day and would start to wither the next day. Domino Cactus's flowers can be enjoyed from late spring to all summer long.	Cactus
20	Golden Barrel Cactus	1505	/images/golden-barrel-1.jpg	4" Clay Pot	Echinocactus grusonii is covered with long golden yellow spines, hence its nickname "Golden Barrel". It is native to Brazil and Paraguay. Golden Barrel Cactus can grow up to 3 feet in height and be a stunning addition to any rock garden. In summer, it produces large yellow flowers forming a pretty crown around the top of the plant.	Cactus
21	Pine Cone Tephrocactus	1755	/images/pine-cone-tephrocactus-1.jpg	4" Clay Pot	Tephrocactus articulatus var. inermis, also known as Pine Cone Cactus, is a succulent upright shrublet that can grow up to 24 inches (60 cm) tall and spead 4 feet (1.2 m) wide. It produces small tufts with erect stems.	Cactus
22	Mammillaria Powder Puff Cactus	1555	/images/mammilaria-powder-puff-1.jpg	3" Clay Pot	Mammillaria Bocasana is an adorable cactus that is covered with soft white hair, which makes it looks like a round cotton ball, hence the cute nickname "Powder Puff Cactus". The thin central spines hiding among the white hair are reddish brown and hook-shaped. It produces offsets freely, which can be propagated when they are 1/3 the size of the mother plant.	Cactus
23	Red Thorn Cactus	1655	/images/red-thorn-1.jpg	4" Clay Pot	Red thorn cactus (Ferocactus chrysacanthus var. rubrispinus) has distinctive red thorn, which can be easily told apart from the standard Ferocactus chrysacanthus cactus with bright yellow thorn.Though some of this rare red spined specimens can be found in habitat, most of the "rubrispinus" found in cultivation are (presumably) horticultural hybrids selected for their spine colours. The plant is very densely spined (one of the spiniest of the Ferocacti) and because of that, will tolerate full sun.	Cactus
24	Britton and Rose Cactus	1495	/images/britton-and-rose-1.jpg	3" Clay Pot	A miniature cactus, Gymnocalycium Mihanovichii, also known as Chin Cactus, is often grown as a houseplant. It grows up to 1.6 inches (4 cm) tall and up to 2.4 inches (6 cm) in diameter. Growing best in the summer, Gymnocalycium Mihanovichii produces large silky flowers with color ranging from white, yellowish white, greenish to pink.	Cactus
25	Golden Ball Echinocactus	1505	/images/golden-ball-1.jpg	3" Clay Pot	Parodia leninghausii is also called Golden Ball, Lemon Ball, or Yellow Tower. It's covered with harmless thin yellow spines. The young cactus starts out globular, but grow taller to form a column up to 3 feet when mature. It produces offsets around the base. Mature plants grow large yellow flowers around the top of the plant.	Cactus
26	Christmas Cactus	1855	/images/christmas-cactus-1.jpg	4" Clay Pot	Christmas cactus is known as Thanksgiving cactus or Easter cactus. This plant has a flattened body and the leaves are actually its stems, from which the red-pink flowers bloom during the holiday season. This popular, winter-flowering houseplant makes a great addition to nearly any indoor setting. Christmas cactus is not only easy to care for but propagates easily too, making it an exceptional candidate for holiday gift giving. All of the plants will be shipped bare root. The flowers' colors are random. We have 3 options: red, pink and white.	Cactus
27	Peanut Cactus	1555	/images/peanut-cactus-1.jpg	4" Clay Pot	This listing is for a cute Peanut cactus growing in a 4 inch size. Echinopsis chamaecereus is a branched cactus with crowded stems that resemble the shape of the fingers, up to 6 inches (10 cm) tall. It has pale green stems, up to 6 inches (15 cm) long and up to 0.5 inches (1.2 cm) in diameter. It has 8 to 10 ribs which have 10 to 15 soft and white bristles. Most people don't know that cactus can have orange & red blooms which are about 2 inches (5 cm) in diameter. This plant is fragile therefore some small pieces could fall off during shipping. You can put the pieces back into soil to make baby plants.	Cactus
41	Variegated Crassula Perforata	885	/images/variegated-crassula-perforata-1.jpg	2" Clay Pot	Crassula perforata ‘Variegata’ is a variegated form of Crassula perforata. It grows and spreads out considerably fast into shrubs of up to 18 inches (46 cm) tall. The leaves are up to 1 inch (2.5 cm) long. Variegated leaves are gathered at the top of the plant and the lower leaves lose their variegation. It blooms with pale yellow flowers in spring. It blooms with pale yellow flowers in spring.	Crassula
28	Peruvian Old Man Cactus	1445	/images/peruvian-old-man-1.jpg	3" Clay Pot	Espostoa lanata, also known as Peruvian Old Man Cactus or Peruvian Snowball Cactus, is a columnar cactus densely covered in wooly white hair. The cactus can grow up to 8 inches (20 cm) in diameter and 23 feet (7 m) tall. Espostoa lanata has around 18 to 25 ribs and sharp spines but most are hidden inside the thick wooly cover. The plant branches and blooms after a couple of years. Its nocturnal flowers are white or purple, as large as 2 inches (5 cm) in diameter, and bloom from late spring to early summer. Espostoa lanata grows quickly as a new plant but as soon as it reaches maturity, its growth slows down significantly and will eventually stop producing cephalium and flowers. However, if you live in areas with warm weather, you can plant Espostoa lanata directly into the ground, which promotes more vigorous growth and therefore the plant will flower.	Cactus
29	Lady Fingers Cactus	1555	/images/lady-fingers-1.jpg	4" Clay Pot	Known as the ladyfinger cactus, Mammillaria elongata forms clusters of cylindrical stems with yellow-brown spines, giving plants an overall golden brown appearance. Pink-yellow flowers may appear in spring. Easy to grow, it’s a great cactus for beginners. Its offshoots may be used to propagate new plants. For best results grow Mammillaria elongata in cactus compost in containers in full sun. Water from mid-spring to summer only, and feed once a month with a special cactus fertiliser. Mammillaria elongata is best grown as a houseplant but containers may be moved to a sunny, sheltered patio in midsummer.	Cactus
30	Mammillaria Albiflora Cactus	1505	/images/mammillaria-albiflora-1.jpg	3.5" Clay Pot	Mammillaria carmenae "albiflora", also known as Isla Carmen pincushion cactus, is a species native to eastern central Mexico. It has clustered globular stems that grow up to 3 inches (8 cm) tall and 6 inches (15 cm) wide. The stems are covered in soft white radial spines up to 5 mm long. Mammillaria carmenae blooms small pure white flowers in the spring. Easily clustering and easily flowered. Most plants will offset readily, and clumps can be produced in a few years.	Cactus
31	Variegated Corn Cob Cactus	1555	/images/variegated-corn-cob-1.jpg	4" Clay Pot	Euphorbia mammillaris variegata, also known as Indian Corn Cob, is a fast-growing shrublet with thick stems that are chalky green, erect and ribbed. These stems can turn rosy pink in colder weather. At maturity, the plant can reach 8-10 inches (20-35 cm) tall. Each stem can have from 7 to 17 ribs with thick hexagonal tubercles placed next to each other vertically, which resembles the look of a corn cob. The spines are pinkish white, thick and pointy like toothpicks, up to 0.4 inches (1 cm) long and scattered around the stem. From late winter to early summer, Euphorbia mammillaris variegata produces small red and orange flowers from each stem. Protect from frost.	Cactus
32	Joseph's Coat Cactus	1505	/images/josephs-coat-1.jpg	4" Clay Pot	Opuntia monacantha, more commonly known as Barbary fig, cochineal prickly pear or drooping prickly pear, is native to South America. It is an erect fleshy succulent plant that can grow up to 16 feet (5 m) tall. Its big trunk grows flat round-shaped branches at the top with drooping upper branches. Both its trunks and branches have multiple pointy spines of about 1-3 inches (3-7 cm) long that might grow in groups of 2 or 3. Its leaves are small and shed annually. O. monacantha produces showy yellow or orange red flowers from late spring to early autumn. Its fruits are green when immature and turn into fleshy purple red berries as they age.	Cactus
33	Crassula Calico Kitten	1505	/images/crassula-calico-kitten-1.jpg	4" Clay Pot	Crassula Calico Kitten is an adorable succulent that grows long trailing branches of colorful heart-shaped leaves. The leaves have a lovely combination of rose, pink, cream and green shades. It is perfect for hanging baskets or to spill over rock walls or path edges. Calico Kitten is a tender soft succulent and will not tolerate frost. This crassula blooms flowers with shades of rose/mauve, pale yellow or green in late spring to early summer.	Crassula
34	Crassula Ivory Towers	1505	/images/crassula-ivory-towers-1.jpg	4" Clay Pot	Crassula Conjuncta, also called "Ivory Towers", is native to South Africa. It has attractive silvery green leaves with deep red rims. The leaves are very similar to that of Crassula Perforata String of buttons, but are fleshier and grow more compact. Crassula Ivory Tower produces clusters of tiny white flowers that attract butterflies and hummingbirds.	Crassula
35	Crassula Baby Necklace	1505	/images/crassula-baby-necklace-1.jpg	4" Clay Pot	Crassula Baby Necklace is a special plant which has small rounded and tightly stacked leaves. It has many colors similar to a string of beads on a necklace. Therefore, it is also known as ‘String of Buttons’, with Crassula rupestris ssp. It can grow up to 6″-12″ (tall). Crassulas are commonly grown in the quartz stone fields. They have wonderful trailing stems for hanging baskets. They can grow up so fast in succulent's garden or window sill.	Crassula
36	Crassula Moonglow	1555	/images/crassula-moonglow-1.jpg	4" Clay Pot	Crassula Moonglow has thick fleshy gray-green leaves that form compact square rosettes stacked on top of each other like a tower as high as 18 inches. The plant needs a lot of support so that the stacked column will not fall over. Its leaves are covered with fine short hairs, giving it a chalky fuzzy look. Crassula Moonglow produces clusters of small pink-orange flowers in winter or spring.	Crassula
37	Crassula Brevifolia	885	/images/crassula-brevifolia-1.jpg	2" Clay Pot	Crassula Brevifolia, native to South Africa, has thick, fleshy, triangulated green leaves with a rough, fuzzy texture borne on woody branches. It grows small shrubs of up to 20 inches (50 cm) tall. The leaves will get a red-brown margin in full sun. Pale pink flower clusters bloom in early fall.	Crassula
38	Crassula Morgan Hybrid w. Silver Springtime	1505	/images/crassula-morgan-hybrid-1.jpg	4" Clay Pot	This species is a hybrid between Crassula "Morgan Beauty" and Crassula "Springtime". It has the silvery coating of Crassula Morgan Beauty, while the dark green color and triangular leaf shape comes from Crassula "Spring Time". A compact plant, it can be grown indoors in small containers. In winter and spring, it produces clusters of tiny soft pink flowers on short stems.	Crassula
39	Crassula Springtime	1505	/images/crassula-springtime-1.jpg	4" Clay Pot	Crassula Springtime is a slow-growing succulent with thick green foliage. The plant can climb up to 6 inches (15 cm) tall, and is perfect as a ground cover or in hanging baskets. The grey-green leaves are fleshy and packed around a thin stem. From winter to early spring, Crassula Springtime grows dense clusters of scented light pink flowers of up to 2 inches (5 cm) wide, each is red at the center. This is a tender soft succulent; it will not tolerate frost. This plant is attractive to bees, butterflies, and birds.	Crassula
40	Crassula Tom Thumb Perforata	1505	/images/crassula-tom-thumb-1.jpg	4" Clay Pot	Crassula Tom Thumb is a cute miniature succulent that grow trailing branches, making them a great addition for hanging planters. It has tiny densely packed triangular leaves that can develop red edges with enough sun exposure. It's not frost tolerant and needs protection in the winter to avoid scarring. In spring, it produces tiny white flowers as cute as the mother plant.	Crassula
42	Crassula High Voltage	1505	/images/crassula-high-voltage-1.jpg	4" Clay Pot	Crassula Rupetris High Voltage is a branching succulent with triangular leaves that develop pink to red edges in bright sunlight. It has a branching habit and can get leggy. Cutting it back will allow the plant to grow fuller as two new branches will grow from every cut. Crassula High Voltage is drought tolerant but cannot tolerate frost. They have many colors from green to yellow or from pink to red in bright sunlight. It displays white or pink flowers in spring or early summer.	Crassula
43	Crassula Mesembryanthemoides	1505	/images/crassula-mesembryanthemoides-1.jpg	4" Clay Pot	Crassula Mesembryanthemoides comes from South African. Its long, pointed green leaves are covered with soft bristle-like hairs, giving it a fuzzy, frosted appearance. The hairs protect the plant from getting burnt and drying out, hence this succulent can be grown under full sun or partial shade. It produces very pretty hot pink flower clusters.	Crassula
44	Crassula Nudicaulis Var. Herrei	1505	/images/crassula-nudicaulus-var-herrei-1.jpg	4" Clay Pot	Crassula nudicaulis var. herrei is a low-growing succulent that forms shrubs of thick chubby leaves.The foliage's colors range from green to yellow with pink edges depending on sun exposure. It produces small greenish flowers clusters in spring and late summer.	Crassula
45	Crassula Pagoda Village	1555	/images/crassula-pagoda-village-1.jpg	4" Clay Pot	Crassula Capitella Subsp. Thyrsiflora ‘Pagoda Village’ grows tightly stacked triangular leaves that resemble the shape of a pagoda. The branches can grow up to 10 inches long. Unlike Crassula Shark Tooth/ Red Pagoda, Crassula Pagoda Village has leaves that are flatter and grow a bit downward. The foliage has shades of red, purple and green. Crassula Capitella Subsp. Thyrsiflora ‘Pagoda Village’ produces tiny white or pink flowers from mid-summer to early fall.	Crassula
\.


--
-- Name: carouselImages_carouselImageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carouselImages_carouselImageId_seq"', 3, true);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 135, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 122, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 12, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: carouselImages carouselImages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."carouselImages"
    ADD CONSTRAINT "carouselImages_pkey" PRIMARY KEY ("carouselImageId");


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

