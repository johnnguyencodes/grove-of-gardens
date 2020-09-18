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
    "longDescription" text NOT NULL
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
1	/images/carousel-image-1.jpg	WATA-Certified Vintage Video Games	Lost Levels has partnered with Wata Games to bring you true confidence in collecting video games.
2	/images/carousel-image-2.jpg	Rediscover rare and vintage games.	We buy and sell a large variety of retro video games, consoles, and accessories.
3	/images/carousel-image-3.jpg	Your nostalgia lives here.	New stock every week, check back frequently for updates!
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
53	95	1	2999	\N
54	95	2	2595	\N
55	95	3	2900	\N
56	95	4	999	\N
57	95	5	9900	\N
58	95	6	830	\N
59	96	1	2999	\N
60	97	1	2999	\N
61	97	2	2595	\N
62	97	3	2900	\N
63	173	16	492000	40
64	94	19	150000	3
65	94	8	1400000	7
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
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "createdAt", "fullName", email, address1, address2, city, state, zip, "creditMonth", "creditYear", "creditCVV", phone, "creditCardNumber") FROM stdin;
1	94	2020-09-18 00:56:57.60027-07	John Nguyen	johnnguyenthe5th@gmail.com	6592 belgrave ave		garden grove	CA	92845	1	2024	714	7148562384	1111111111111111
\.


--
-- Data for Name: productImages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productImages" ("productId", "imageId", "imageURL") FROM stdin;
17	2	/images/bionic-commando-back.jpg
17	1	/images/bionic-commando-front.jpg
17	3	/images/bionic-commando-screenshot-1.png
17	4	/images/bionic-commando-screenshot-2.png
17	5	/images/bionic-commando-screenshot-3.png
19	7	/images/blaster-master-back.jpg
19	6	/images/blaster-master-front.jpg
19	8	/images/blaster-master-screenshot-1.gif
19	9	/images/blaster-master-screenshot-2.jpg
19	10	/images/blaster-master-screenshot-3.jpg
14	12	/images/bubble-bobble-back.jpg
14	11	/images/bubble-bobble-front.jpg
14	13	/images/bubble-bobble-screenshot-1.gif
14	14	/images/bubble-bobble-screenshot-2.gif
14	15	/images/bubble-bobble-screenshot-3.gif
18	17	/images/castlevania-back.jpg
18	16	/images/castlevania-front.jpg
4	22	/images/castlevania-iii-back.jpg
4	21	/images/castlevania-iii-front.jpg
4	23	/images/castlevania-iii-screenshot-1.png
4	24	/images/castlevania-iii-screenshot-2.png
4	25	/images/castlevania-iii-screenshot-3.png
18	18	/images/castlevania-screenshot-1.jpg
18	19	/images/castlevania-screenshot-2.png
18	20	/images/castlevania-screenshot-3.png
8	27	/images/contra-back.jpg
8	26	/images/contra-front.jpg
8	28	/images/contra-screenshot-1.gif
8	29	/images/contra-screenshot-2.gif
8	30	/images/contra-screenshot-3.gif
9	32	/images/final-fantasy-back.jpg
9	31	/images/final-fantasy-front.jpg
9	33	/images/final-fantasy-screenshot-1.jpg
9	34	/images/final-fantasy-screenshot-2.jpg
9	35	/images/final-fantasy-screenshot-3.jpg
12	37	/images/kirbys-adventure-back.jpg
12	36	/images/kirbys-adventure-front.jpg
12	38	/images/kirbys-adventure-screenshot-1.jpg
12	39	/images/kirbys-adventure-screenshot-2.png
12	40	/images/kirbys-adventure-screenshot-3.png
2	42	/images/legend-of-zelda-back.jpg
2	41	/images/legend-of-zelda-front.jpg
2	43	/images/legend-of-zelda-screenshot-1.jpg
2	44	/images/legend-of-zelda-screenshot-2.png
2	45	/images/legend-of-zelda-screenshot-3.png
3	47	/images/mega-man-2-back.jpg
3	46	/images/mega-man-2-front.jpg
3	48	/images/mega-man-2-screenshot-1.png
3	49	/images/mega-man-2-screenshot-2.png
3	50	/images/mega-man-2-screenshot-3.png
11	52	/images/mega-man-3-back.jpg
11	51	/images/mega-man-3-front.jpg
11	53	/images/mega-man-3-screenshot-1.png
11	54	/images/mega-man-3-screenshot-2.png
11	55	/images/mega-man-3-screenshot-3.png
5	57	/images/metroid-back.jpg
5	56	/images/metroid-front.jpg
5	58	/images/metroid-screenshot-1.jpg
5	59	/images/metroid-screenshot-2.png
5	60	/images/metroid-screenshot-3.png
6	62	/images/mike-tysons-punch-out-back.jpg
6	61	/images/mike-tysons-punch-out-front.jpg
6	63	/images/mike-tysons-punch-out-screenshot-1.png
6	64	/images/mike-tysons-punch-out-screenshot-2.png
6	65	/images/mike-tysons-punch-out-screenshot-3.png
20	67	/images/ninja-gaiden-back.jpg
20	66	/images/ninja-gaiden-front.jpg
20	68	/images/ninja-gaiden-screenshot-1.jpg
20	69	/images/ninja-gaiden-screenshot-2.png
20	70	/images/ninja-gaiden-screenshot-3.png
13	72	/images/river-city-ransom-back.jpg
13	71	/images/river-city-ransom-front.jpg
13	73	/images/river-city-ransom-screenshot-1.gif
13	74	/images/river-city-ransom-screenshot-2.png
13	75	/images/river-city-ransom-screenshot-3.gif
16	77	/images/super-mario-bros-2-back.jpg
16	76	/images/super-mario-bros-2-front.jpg
16	78	/images/super-mario-bros-2-screenshot-1.png
16	79	/images/super-mario-bros-2-screenshot-2.png
16	80	/images/super-mario-bros-2-screenshot-3.png
1	82	/images/super-mario-bros-3-back.jpg
1	81	/images/super-mario-bros-3-front.jpg
1	83	/images/super-mario-bros-3-screenshot-1.jpg
1	84	/images/super-mario-bros-3-screenshot-2.png
1	85	/images/super-mario-bros-3-screenshot-3.png
7	87	/images/super-mario-bros-back.jpg
7	86	/images/super-mario-bros-front.jpg
7	88	/images/super-mario-bros-screenshot-1.png
7	89	/images/super-mario-bros-screenshot-2.png
7	90	/images/super-mario-bros-screenshot-3.png
10	92	/images/tetris-back.jpg
10	91	/images/tetris-front.jpg
10	93	/images/tetris-screenshot-1.jpg
10	94	/images/tetris-screenshot-2.jpg
10	95	/images/tetris-screenshot-3.jpg
15	97	/images/zelda-2-back.jpg
15	96	/images/zelda-2-front.jpg
15	98	/images/zelda-2-screenshot-1.jpg
15	99	/images/zelda-2-screenshot-2.png
15	100	/images/zelda-2-screenshot-3.png
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Super Mario Bros 3	3840000	/images/super-mario-bros-3-front.jpg	Wata 9.0 A Sealed, NES Nintendo 1990 USA	This is the first sealed copy of the "Left Bros." variant of Super Mario Bros. 3 that we have ever offered in our auctions. Make no mistake, this copy is not at all to be compared with any sealed copy of the "Right Bros." variety; the "Left Bros." is in a completely different league. This variant's nickname refers to the justification of "Bros." on the front of the box, which indicates this copy is from the earliest production run of the title. It is as close as one could get to saying this copy is from a "first printing." While there are certainly a fair number of complete in box copies of this variant out there, sealed copies of the "Left Bros." variant exist in the low single digits. Which is understandable, considering the earliest produced copies of a game are much more likely to have all been sold early on (and opened). For many collectors, the prospect of finding a sealed copy of this variant of Super Mario Bros. 3 has been such an unlikely task that many have forked over a pretty penny for a high grade complete in box copy. For example, in April 2019, we sold a Complete in Box copy of this title, graded 9.4 by Wata, for over $5,000. What a high grade sealed example such as this one will go for is anybody's best guess; there are no verifiable auction records of an example ever being sold.  --As a means to better explain the significance of this variant, it isn't much of a stretch to say "Left Bros." is to Super Mario Bros. 3 as "Dr. Wright" is to the first Mega Man game. We have a feeling that many collectors who have longed to own a sealed "Left Bros." will be practically jump at the chance to finally add this coveted game to their collection.
2	Legend of Zelda	3360000	/images/legend-of-zelda-front.jpg	Wata 9.4 A Sealed, NES Nintendo 1987 USA	As a means to better explain the significance of this variant, it isn't much of a stretch to say "Left Bros." is to Super Mario Bros. 3 as "Dr. Wright" is to the first Mega Man game. We have a feeling that many collectors who have longed to own a sealed "Left Bros." will be practically jump at the chance to finally add this coveted game to their collection.
3	Mega Man 2	31200	/images/mega-man-2-front.jpg	Wata 9.4 Complete in Box, NES Capcom 1989 USA	Highest graded CIB example of this game that we have seen in our auctions. The component grades are so high it's almost as if they were never handled! Best-selling game in the highly acclaimed series that has spawned 30 games to date. The cover art of this Nintendo Entertainment System game was rendered by the talented Marc Ericksen.
4	Castlevania III: Dracula's Curse	132000	/images/castlevania-iii-front.jpg	Wata 9.2 A+ Sealed, NES Konami 1990 USA	This is the first sealed copy of the third game released in the Castlevania series that we have offered, and it is quite a copy at that! Even though the game is titled as the third, it's actually a prequel to the first game. It's also the last Castlevania game released on the Nintendo Entertainment System, but it still features at least one first for the series with the introduction of Trevor C. Belmont, the ancestor of Simon Belmont. Second revisions of the game, like this copy, removed the round advertisement offer "Win a Trip to Dracula's Hometown! Details Inside." There have been speculations that the trip was cancelled due to unrest in Eastern Europe at the time. Collectors have told us that revised copies such as this one are a little bit harder to come by than the copy with the offer.
5	Metroid	1800000	/images/metroid-front.jpg	Wata 9.6 A+ Sealed, NES Nintendo 1987 USA	This is the highest graded copy of the first game in the Metroid series that we have ever offered in our auctions. Considering that the Wata 9.2 A+ oval seal of quality copy from the Carolina Collection realized $7,200 in our November Signature Auction, we expect there will be a fierce battle over this near mint copy! Metroid's claim to fame is not only attributed to its stellar non-linear gameplay, it is also known as the first Nintendo game to feature a female protagonist -- Samus Aran.
6	Mike Tyson's Punch Out!!	5040000	/images/mike-tysons-punch-out-front.jpg	Wata 9.2 B Sealed, NES Nintendo 1987 USA	Out of all the copies of this game we have offered so far, most collectors would agree, this is by far the most impressive. This is the highest graded copy of this game we have ever offered with a round seal of quality. We've also heard a few rumors that this is one of the highest graded copies (if not the highest-graded copy) of this variant. In our May 2020 Signature Auction, we offered a round seal of quality copy of this game -- the same variant as this one -- that sold for an all-in price of $45,600 -- and it was a Wata 8.5 A! We can only imagine the level of ferocity the competition for this copy will experience based on that result. Mike Tyson's Punch-Out!! is the first Nintendo game to ever be endorsed by a celebrity. The then-world heavyweight boxing champion was eventually removed from the game once the license for Nintendo expired. He was completely replaced by Mr. Dream in the subsequently released Punch-Out!!
7	Super Mario Bros	11400000	/images/super-mario-bros-front.jpg	Wata 9.4 A+ Sealed, NES Nintendo 1985 USA	Black box aficionados are often captivated by the appeal of the elusive sealed with hangtab variants. From what we witnessed in our May Signature Auction just a few months ago, Super Mario Bros. is no exception. A Wata 8.0 A Sealed copy of Super Mario Bros. with a cardboard hangtab sold for a record-breaking $40,200. Considering the grade of this copy, we can only imagine the kind of competitive frenzy it will spark amongst bidders.
8	Contra	1400000	/images/contra-front.jpg	Wata 9.6 A++ Sealed, NES Konami 1988 USA	This is the first installment in what is arguably one of the most famous game series in the side scrolling run and gun video game genre. Looking at this immaculate example instantly evokes deep feelings of nostalgia from those of us who made it our mission to spend every free moment away from school binge-playing this game with our buddies in co-op mode. Originally designed as a coin-op arcade game by Konami, Contra was later ported to the Nintendo Entertainment System and was a must-own on the system. Contra has spawned countless sequels and has made a number of appearances in its original NES form on other systems in recent years (here's looking at you, NES mini)! From the Carolina Collection.
9	Final Fantasy	780000	/images/final-fantasy-front.jpg	Wata 9.8 A Sealed, NES Nintendo 1990 USA	Finding a game with a Wata grade better than this would be like trying to find a needle in a haystack. Not to mention, sealed copies of this highly influential role-playing game are hard enough to come by sealed as it is. During our May 16-18 Signature Auction earlier this year, a Wata 9.6 A+ fetched $5,280 at auction - and we know there are collectors out there who were kicking themselves over missing out on it! Arguably one of the biggest role-playing games of all time, right up there with Chrono Trigger and Dragon Warrior. The first of many games in a critically acclaimed series. Music composed by the illustrious Nobuo Uematsu. Developed by Square, which later became Square Enix.
10	Tetris	552000	/images/tetris-front.jpg	Wata 9.8 A+ Sealed, NES Nintendo 1989 USA	This is the first copy of Tetris that we have ever offered that has received a grade of 9.8 from Wata. Effectively, this is the highest grade one could ever hope to receive! Tetris is one of the most timeless video games ever created. In fact, it holds up so well -- and it is just so good -- that its fans never truly tire of it. Over the years since its creation, Tetris has been released and rereleased on so many different systems, with different versions, that we could probably fill a full page with the list. One could even go so far as to say it is the quintessential game. After all, how many video games could we say have cognitive effects named after them? That's right -- just this one.
11	Mega Man 3	252000	/images/mega-man-3-front.jpg	WATA 9.4 A++ Sealed, NES Capcom 1990 USA	This game is rare to see in a sealed state - and this example was awarded the highest seal rating in Wata's scale! It is part of the Indiana Collection, the first video game collection with a recognized pedigree, which is noted on the game's label. The 2,000 game collection came from an independent video rental store in rural Indiana that closed its doors in 1998. Their unsold stock was carefully stored, keeping it in excellent condition. Mega Man 3 was the first game in the series that had box art that accurately depicted Mega Man's appearance, illustrated by Greg Winters. This game introduced the canine sidekick, Rush, and Mega Man's signature sliding move to the series.
12	Kirby's Adventure	105000	/images/kirbys-adventure-front.jpg	WATA 9.2 A+ Sealed, NES Nintendo 1993 USA	Sequel to Kirby's Dream Land for GameBoy. First game to depict Kirby as pink, and to feature Kirby's signature copy ability. Box illustration by Larry Jost. Designed by Masahiro Sakurai, also known for his work on the Super Smash Bros. series.
13	River City Ransom	6900	/images/river-city-ransom-front.jpg	Wata 7.5 Complete in Box, NES American Technos 1990	River City Ransom, the open world action role-playing beat 'em up, is definitely a favorite in many people's hearts! The pieces within this complete in box copy are in good condition, including the slightly uncommon manual and box. River City Ransom is the third game in Technos' Kunio-kun series, preceded by Renegade and Super Dodge Ball.
14	Bubble Bobble	720000	/images/bubble-bobble-front.jpg	Wata 9.8 A+ Sealed, NES Taito 1988 USA	This is the first copy of the first game in the Bubble Bobble series that we have offered in our auctions - sealed or otherwise. One would be hard pressed to find a copy that is nicer than this one too. Copies with a Round seal of quality and a Rev-A code were from one of the earliest production runs of the title. Though, this copy does have a "Parents' Choice" sticker on the seal dated 1990 on it, so it is likely this copy was released near the end of that production run, as the standard seal became an Oval in 1990. Bubble Bobble was ported to the Nintendo Entertainment System from the 1986 Taito arcade game.
15	Zelda 2: The Adventure of Link	408000	/images/zelda-2-front.jpg	Wata 9.2 A+ Sealed, NES Nintendo 1988 USA	We haven't offered a sealed copy of the first release of Zelda II since our February auction earlier this year, and this is one jaw dropping copy! The round seal of quality confirms it is from the original production run of the game. This iconic game was produced by none other than Shigeru Miyamoto, the man behind the creation of the series as well as Nintendo's mascot, Mario. Notable firsts in the series featured ni this game include the introduction of the Dark Link character and Link's "Magic Meter."
16	Super Mario Bros 2	492000	/images/super-mario-bros-2-front.jpg	Wata 9.2 A+ Sealed, NES Nintendo 1988 USA	We may not have gotten the same game as Japan for Super Mario Bros. 2 (because it was "too hard"), but this second installment in the Super Mario series is well beloved just the same! What we actually got was a re-skinned version of an easier Famicom game called Yume Kojo: Doki Doki Panic. Even so, we have heard some longtime fans of the series say that this is one of their top favorite Mario games. After all, who doesn't want to literally FLY around as Princess Peach? In our opinion, clearly the best choice for speedrunning this game. During our April 2020 Signature Auction, a round seal of quality variant copy of this game with a Wata grade of 9.2 A sold for $7,800. We have a feeling there are a few collectors who are still kicking themselves for missing out on that one, but will be delighted when they get a load of this one.
17	Bionic Commando	180000	/images/bionic-commando-front.jpg	Wata 9.4 A Sealed, NES Capcom 1988 USA	Based on the 1987 Capcom arcade game, this action-platformer was originally released in Japan as Hitler's Resurrection: Top Secret. All references to Nazism that existed in the original Famicom title were removed for the Nintendo Entertainment System release in the United States. You may recognize the initials on the box illustration, which was created by none other than Frank Cirocco!
18	Castlevania	720000	/images/castlevania-front.jpg	Wata 9.0 A Sealed, NES Konami 1987 USA	This copy was produced later than the title's initial release date, indicated by the trademarked oval seal of quality, which was used by Nintendo after the round seal of quality. Castlevania on the Nintendo Entertainment System marks the first installment in this iconic video game in the series and the first appearance of the protagonist, Simon Belmont. Much beloved, this game has been re-released on numerous consoles and in various compilations throughout the years.
19	Blaster Master	150000	/images/blaster-master-front.jpg	WATA 9.6 A+ Sealed, NES Sunsoft 1988 USA	This copy was produced sometime after the game's initial release, indicated by the presence of an Oval, rather than Round, seal of quality. Despite its reported gameplay difficulty, this 2D platform run and gun for the Nintendo Entertainment System is considered one of the best games on the console. Upon its release it received nothing but praise, and was featured nine years later in Nintendo Power's "100 Best Games of All Time" list in their September 1997 issue. It's also one of several NES titles on the Nintendo Switch Online service.
20	Ninja Gaiden	264000	/images/ninja-gaiden-front.jpg	WATA 9.4 A++ Sealed, NES Tecmo 1989 USA	This is the first sealed copy of the first game in the Ninja Gaiden series that we have offered, and it is certainly a beauty! Ninja Gaiden was ported to the Nintendo Entertainment System from the 1988 Tecmo arcade game. Since this first installment in the series' release, the series has spawned numerous sequels that have been released all the way up until the PlayStation 3 and Xbox 360. We're sure there's a big fan of the Ninja Ryu who is very excited to see this copy! 
\.


--
-- Name: carouselImages_carouselImageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carouselImages_carouselImageId_seq"', 3, true);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 65, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 94, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, true);


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

