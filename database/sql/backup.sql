/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: coreit
-- ------------------------------------------------------
-- Server version	10.5.29-MariaDB-ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `logo_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (1,'Programming','In this division, you will learn about Programing skills and logic. It is expected that later you can solve the Study case about Logical in Gemastik.','CQKlccX5fIQZv7ONYTaURcy0GwGiObpi8DleocCc.png','2025-06-17 03:09:13','2025-06-17 04:01:58'),(2,'Cyber Security','In this division, you will explore the fundamentals of securing information systems. You will learn about threats, vulnerabilities, and how to protect data through ethical hacking and defense strategies in Gemastik scenarios.','7tHUGA3CaDI2P6ckVmaWNNnygqLkKE3iZgCidLRh.png','2025-06-17 03:09:13','2025-06-17 04:01:58'),(3,'Software Engineering','This division focuses on software development methodologies, design patterns, and team-based project building. You\'ll be trained to manage the full software development lifecycle and deliver structured solutions.','g9JEboxtnroHrIwZ3dUMnUMruz4Tk38E2PPV2eTX.png','2025-06-17 03:09:13','2025-06-17 04:01:59'),(4,'Game Development','In this division, you will dive into game design principles, mechanics, and interactive storytelling. You\'ll also practice developing engaging games while optimizing performance and user experience.','9WifnAJJah10fEdZlaIiAYobhtwJdTIMVfbKEpbD.png','2025-06-17 03:09:13','2025-06-17 04:01:59'),(5,'Data Mining','This division introduces data processing, pattern recognition, and predictive analytics. You will learn how to extract insights from large datasets to make data-driven decisions during competition cases.','GUknOHD75OKFilxtRMoxeXYjggFk7rbykECndil3.png','2025-06-17 03:09:13','2025-06-17 04:01:58'),(6,'UI/UX','In this division, you will learn how to design user-centered interfaces and enhance user experiences. It emphasizes usability, wireframing, and prototyping to solve design problems effectively.','Nmt4kfMha73DmuqptCaovlpBChAXORMfRpjiGlP1.png','2025-06-17 03:09:13','2025-06-17 04:01:58'),(7,'ICT Business','This division explores the intersection between technology and business. You will learn how to create innovative business models using ICT, and how to pitch ideas that solve real-world problems.','77isRVsdhsvKHGcjZ2d8bDbBYMPSPOQnYj8MJFai.png','2025-06-17 03:09:13','2025-06-17 04:01:59'),(8,'Smart City','This division challenges you to design technology solutions that improve urban living. You will explore topics like smart mobility, energy, and urban data systems to build sustainable city innovations.','w548CZIzdbpx29UZyU0VEt1Telb0ieau3I4PmVmx.png','2025-06-17 03:09:13','2025-06-17 04:01:58'),(9,'ICT Scientific Paper','Here, you will focus on academic writing and research methodology. This division helps you articulate technical solutions in the form of scientific papers to be presented in ICT-themed conferences.','UJkUbzFihwjTcbi72bIeSpgz9wxT0TVSZFDrcHle.png','2025-06-17 03:09:13','2025-06-17 04:01:59'),(10,'Internet of Things','In this division, you will learn how to connect hardware devices to the internet. You’ll work on sensor integration, microcontrollers, and data exchange to build intelligent IoT systems.','6p01CuF4TqqgbACdl34kBrs4dSdMTtrvKLaIwMeQ.png','2025-06-17 03:09:13','2025-06-17 04:01:59'),(11,'Animation','This division emphasizes digital storytelling, 2D/3D design, and motion graphics. You will learn how to express complex ideas through engaging visual animations for various platforms.','IN2iSMjecRcfv2XovVug83b7gYPAhHny9rhtxjS7.png','2025-06-17 03:09:13','2025-06-17 04:01:59');
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` enum('news','photo','meeting','project','program','competition','achievment') NOT NULL,
  `path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
INSERT INTO `galleries` VALUES (28,'Muhammad Azizsyah Putra','photo','lcAFCkwC9vzQxFWJRoNRPlNOM6IdxZqGaRQqHJ4p.jpg','2025-06-17 04:08:36','2025-06-20 18:26:33'),(29,'Alika Raisya','photo','Kxju4dkAEbaLHI3aOfHPqkLRQylk66dq18IBZYmK.jpg','2025-06-17 04:08:39','2025-06-17 04:08:39'),(30,'Bintang Al Fizar','photo','nEoMwbfO1rWVBRXadQjYs5cudVsJYMEmjDQ8w7Z7.jpg','2025-06-17 04:08:41','2025-06-22 03:42:41'),(31,'Bintang Al Fizar','photo','cLxgD6tZJFnylUSPn4drsZmDHduMHv5EIsRCJxGV.jpg','2025-06-17 19:14:54','2025-06-17 19:14:54'),(32,'Muhammad Naufal Razani','photo','qVY32QQkdKHzkl2UrJYbqWGUB3E05kJ43KcBQvJM.jpg','2025-06-20 03:46:22','2025-06-20 03:46:22'),(33,'Muhammad Ajar Danu Wiratama','photo','I35MdqXDMHx6rpamh4YckLcfRAJ3iFY2u8q4Qn9q.jpg','2025-06-20 03:57:43','2025-06-20 03:57:43'),(34,'Arya Meyza Alfarizky','photo','AxkKAOJGJlJCLhO3FfDPgOOJEBDKBHeqshb4Uf1F.png','2025-06-20 04:05:50','2025-06-20 04:05:50'),(35,'Dina Andriani','photo','g8lYoHC4bA7e4KOm6jojxTDbGYvRwDwGFVygigwM.png','2025-06-20 04:05:50','2025-06-20 04:05:50'),(36,'Kevin Raydafa Algibran','photo','hu6bpyHB7CKHgMiYxfdRTe0TYr1oRrq0pBxKrtaK.png','2025-06-20 04:08:32','2025-06-20 04:08:32'),(37,'Adam Muuhammad Ridwan','photo','d9F14kcICEtInQk19qvt5lbURfoxmMnws5ZSuxM8.png','2025-06-20 04:08:32','2025-06-20 04:08:32'),(38,'Muhammad Fikri Arrayan','photo','YssszaF0v0PfB2SPqax3FOjSA6CtKsl2oOKZ2Wi6.png','2025-06-20 04:08:32','2025-06-20 04:08:32'),(39,'IDELIA FITRIKYLA','photo','NvFqlfmocr2TQFtTgbaM2ScE8Byx6eoDwXDgvbo9.png','2025-06-20 04:13:14','2025-06-20 04:13:14'),(40,'Apridho Fuadil Hadid','photo','Aaq72LIiT6g8VtMSFSAPa5fhcYxZgl292yAveVR7.png','2025-06-20 04:13:14','2025-06-20 04:13:14'),(41,'Akbar  Ardiansyah','photo','3UrpQF69aTHXPDbsgXEQpfuzYeJyAmKlSi6K09QK.png','2025-06-20 04:13:14','2025-06-20 04:13:14'),(42,'Yasir Abduzzhohir','photo','VCRXVoxGsc5Lq7d51GEzm9Har1FCsFzmdaLWqvoF.png','2025-06-20 04:13:14','2025-06-20 04:13:14'),(43,'Assidiq Nurrochman','photo','KkLOxHigVFpZRUxSXCXGHpFHQihsVZIjgJNlDg0y.png','2025-06-20 04:13:15','2025-06-20 04:13:15'),(44,'Fildzah Amalina Hanifani','photo','zaxk0GrEBCFETGcaZTXn0OhA1eGSSdjrSDxbZcIh.png','2025-06-20 04:18:15','2025-06-20 04:18:15'),(45,'Nandhita Ghin Yatin Nafiah','photo','oLGD3dLDXktavTBUsihwADJgSnQTbP4XaPmLc1y2.png','2025-06-20 04:18:15','2025-06-20 04:18:15'),(46,'Agung Firmansyah','photo','QognlE6FTKYyJDbc35HU6Xgh2hOZWaKOoJw2n6Yb.jpg','2025-06-20 04:18:15','2025-06-21 19:50:58'),(47,'Amar Triadi','photo','8g85eedh6k7u9Ke0ps6Q9N3IBBuYVyMkjkKOmTEu.png','2025-06-20 04:18:15','2025-06-20 04:18:15'),(48,'Taufiq Rahman Hakim','photo','ciOqzjwfCKacrTDfyenPLKOYGr1PeUVGtvIlhIa7.jpg','2025-06-20 04:18:15','2025-06-21 22:05:58'),(49,'Elsa Mundi Raswati','photo','qovJq36ERnZ19tfRdtxO0CvbtZmNxsQzpNR0wutG.png','2025-06-20 04:18:15','2025-06-20 04:18:15'),(50,'Muhammad Rayyan Ghifari','photo','QSbXcv4jftKdmCa9ul8k71V24HylNOm6tqJpw8SA.png','2025-06-20 04:18:16','2025-06-20 04:18:16'),(51,'Mirza Maulana','photo','itHidGJ2F2PWq4BXZFIWjj3gyuhyt0uZJzoEcZmJ.jpg','2025-06-20 04:30:57','2025-06-20 04:30:57'),(52,'CORE IT: Membangun Generasi Digital Unggul Melalui Program Pelatihan dan Pengembangan IT','news','cpUA7qgxeGZm9BeAll5hrUOv0nw0SUhYJKcMq5bB.jpg','2025-06-20 05:11:23','2025-06-20 19:18:52'),(53,'CORE IT: Membangun Generasi Digital Unggul Melalui Program Pelatihan dan Pengembangan IT','news','LeRt9rL2EbxO5ZIPuvmqvXZZDp09dJti38OpXbO8.jpg','2025-06-20 05:11:23','2025-06-20 19:18:52'),(56,'\" Tim Ugal-Ugalan\" dari CORE IT Berhasil Lolos ke GEMASTIK!','news','JfGGtYjq7KXpbOLF68TQzBMnyrtnzL2npmPzvbi5.jpg','2025-06-20 19:21:32','2025-06-20 19:21:32'),(57,'\" Tim Ugal-Ugalan\" dari CORE IT Berhasil Lolos ke GEMASTIK!','news','lwW09pJrT0HdHa1cdtU7Jjf1KqJcoY3x4zs06xsb.jpg','2025-06-20 19:21:32','2025-06-20 19:21:32'),(58,'Sesi Mentoring GEMASTIK: CORE IT Asah Kesiapan Tim Menuju Nasional','news','AF70yRY1sFIb27ltmFTivDN6YDlZuOy91h9Dl2PD.jpg','2025-06-20 19:25:45','2025-06-20 19:25:45'),(59,'Sesi Mentoring GEMASTIK: CORE IT Asah Kesiapan Tim Menuju Nasional','news','3ZOpNr7YxlUTxag2F1UpCsyl8k8NbcALrxNPSK9j.jpg','2025-06-20 19:25:45','2025-06-20 19:25:45');
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informations`
--

DROP TABLE IF EXISTS `informations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `informations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `main_image_id` bigint(20) unsigned NOT NULL,
  `body_image_id` bigint(20) unsigned NOT NULL,
  `paragraph_1` text NOT NULL,
  `paragraph_2` text NOT NULL,
  `paragraph_3` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `informations_main_image_id_foreign` (`main_image_id`),
  KEY `informations_body_image_id_foreign` (`body_image_id`),
  CONSTRAINT `informations_body_image_id_foreign` FOREIGN KEY (`body_image_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `informations_main_image_id_foreign` FOREIGN KEY (`main_image_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informations`
--

LOCK TABLES `informations` WRITE;
/*!40000 ALTER TABLE `informations` DISABLE KEYS */;
INSERT INTO `informations` VALUES (4,'CORE IT: Membangun Generasi Digital Unggul Melalui Program Pelatihan dan Pengembangan IT',52,53,'CORE IT (Community of Rising Engineers in IT) resmi membuka program pengembangan talenta digital tahun ini dengan semangat Empower, Explore, Elevate. CORE IT merupakan wadah bagi mahasiswa untuk mengasah kemampuan di bidang teknologi informasi melalui berbagai pelatihan, proyek kolaboratif, dan mentoring profesional.','Program ini dibentuk sebagai respons terhadap kebutuhan industri akan talenta IT yang adaptif, inovatif, dan siap kerja. Dengan kurikulum berbasis proyek dan pendampingan intensif dari para mentor berpengalaman, peserta CORE IT akan dibekali dengan keterampilan teknis seperti web development, mobile app, UI/UX, data analysis, dan DevOps.','Tahun ini, CORE IT akan merekrut anggota baru melalui tahapan seleksi yang mencakup pengisian form, portofolio, hingga sesi wawancara. Para peserta terpilih akan dibagi ke dalam beberapa divisi seperti:\r\n\r\nFrontend & Backend Development\r\n\r\nMobile App Development\r\n\r\nUI/UX Design\r\n\r\nDevOps & Infrastructure\r\n\r\nProject Management\r\n\r\nSelain itu, CORE IT juga aktif mengadakan event internal seperti Tech Sharing, Hackathon, hingga Startup Simulation yang memberikan pengalaman nyata bekerja dalam tim IT.\r\n\r\nDengan tagline #GrowWithCORE, program ini diharapkan menjadi jembatan bagi mahasiswa menuju dunia profesional IT dan menjadi agen perubahan di era digital.\r\n\r\nTentang CORE IT\r\nCORE IT adalah komunitas teknologi yang berfokus pada pengembangan keterampilan mahasiswa di bidang IT dan kepemimpinan digital. Berdiri sejak [tahun], CORE IT telah meluluskan puluhan alumni yang kini berkontribusi di berbagai perusahaan teknologi nasional dan internasional.',8,'2025-06-20 05:11:23','2025-06-21 22:06:23'),(5,'\" Tim Ugal-Ugalan\" dari CORE IT Berhasil Lolos ke GEMASTIK!',56,57,'Kabar membanggakan datang dari komunitas teknologi Universitas XYZ. Tim Ugal-Ugalan yang berasal dari divisi CORE IT berhasil lolos sebagai finalis pada ajang GEMASTIK XVIII (Pagelaran Mahasiswa Nasional Bidang Teknologi Informasi dan Komunikasi), yang merupakan kompetisi teknologi bergengsi tingkat nasional.\r\n\r\nTim yang beranggotakan tiga mahasiswa ini dikenal sebagai tim yang unik, solid, dan kreatif dalam menyelesaikan berbagai tantangan pengembangan perangkat lunak. Meskipun nama mereka terdengar santai dan lucu, prestasi yang mereka raih sangat serius.','Dalam seleksi GEMASTIK kali ini, mereka mengusung aplikasi berbasis AI yang berfokus pada deteksi penyakit TBC secara dini, sebuah solusi nyata yang sejalan dengan kebutuhan masyarakat Indonesia.\r\n\r\nKeberhasilan ini menjadi bukti bahwa CORE IT bukan hanya komunitas belajar biasa, tapi juga tempat tumbuhnya inovator-inovator muda yang siap bersaing di level nasional.','CORE IT menyampaikan dukungan penuh kepada tim Ugal-Ugalan yang akan berangkat ke babak final di Jakarta pada bulan Agustus mendatang. Harapannya, prestasi ini bisa memicu semangat anggota lainnya untuk terus berkreasi dan percaya diri melangkah lebih jauh.',8,'2025-06-20 19:21:32','2025-06-22 00:08:39'),(6,'Sesi Mentoring GEMASTIK: CORE IT Asah Kesiapan Tim Menuju Nasional',58,59,'Dalam rangka mempersiapkan tim menuju kompetisi GEMASTIK XVIII, CORE IT mengadakan sesi mentoring intensif bagi tim yang akan mewakili kampus, termasuk tim Ugal-Ugalan yang baru saja dinyatakan lolos sebagai finalis.\r\n\r\nSesi mentoring ini dilaksanakan secara hybrid selama dua minggu penuh, menghadirkan mentor-mentor berpengalaman dari bidang UX, pemrograman, dan riset teknologi. Materi yang dibahas antara lain:\r\n\r\n- Validasi ide dan studi kelayakan\r\n- UI/UX dan presentasi prototipe\r\n- eknik komunikasi tim dan pitching\r\n- Review submission berdasarkan kriteria GEMASTIK','Sesi mentoring dilakukan secara bergilir untuk semua divisi, dan menjadi salah satu bentuk pembinaan berkelanjutan dari CORE IT terhadap anggota-anggotanya yang memiliki potensi kompetitif di tingkat nasional.\r\n\r\nDi akhir setiap sesi, peserta diberikan waktu untuk presentasi dan menerima feedback langsung dari para mentor dan alumni yang pernah ikut GEMASTIK sebelumnya.','Setelah mentoring selesai, tim akan memfinalisasi karya mereka untuk disubmit secara resmi dan mempersiapkan diri menuju sesi penjurian di tingkat nasional. CORE IT terus mendorong semangat kolaborasi, riset, dan kompetensi melalui kegiatan seperti ini, demi membawa nama baik kampus di kancah teknologi nasional.',4,'2025-06-20 19:25:45','2025-06-22 00:09:19');
/*!40000 ALTER TABLE `informations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2025_05_22_000000_create_personal_access_tokens_table',1),(4,'2025_05_25_000001_create_divisions_table',1),(5,'2025_05_25_000002_create_galleries_table',1),(6,'2025_05_25_000003_create_users_table',1),(7,'2025_05_25_000004_create_staffs_table',1),(8,'2025_05_25_000005_create_informations_table',1),(9,'2025_05_25_000006_create_settings_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('GQgMfq3P1OwezPga7R7WrsinAX7C4CqlJtkpNqLw',NULL,'103.167.219.10','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUm1XRGRPdmw1T3dnWE42cXVHQkxmU0FqR3d0YThHSDlxUEtvdzFQVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vY29yZWl0Lmthcnlha3JlYXNpLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1750386791),('MA0sIYPpwpWtjsP9WElvegCFmj3uWSjBqFVXpzbq',NULL,'143.198.67.143','vercel-screenshot/1.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2g3ejA5UDBGUmM4akFXY1dVUWRKbjdPaVlhWm9LVDYzOUhBTEpyMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vY29yZWl0Lmthcnlha3JlYXNpLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1750433156),('W2XzaTqFTNkZWidVhDO03atXo8xGf1DnDrfWqt61',NULL,'103.167.219.9','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTY0WHcyRkMxYXZiMWJMWFFkOG8wSFhXQVUzZTVoc0R5cTFrSDBycSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vY29yZWl0Lmthcnlha3JlYXNpLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1750385734);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'isRecrut',0,NULL,'2025-06-22 03:42:06');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffs`
--

DROP TABLE IF EXISTS `staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `nim` varchar(255) NOT NULL,
  `photo_id` bigint(20) unsigned NOT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `isLogin` tinyint(1) NOT NULL DEFAULT 0,
  `isRecrut` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `staffs_nim_foreign` (`nim`),
  KEY `staffs_photo_id_foreign` (`photo_id`),
  CONSTRAINT `staffs_nim_foreign` FOREIGN KEY (`nim`) REFERENCES `users` (`nim`) ON DELETE CASCADE,
  CONSTRAINT `staffs_photo_id_foreign` FOREIGN KEY (`photo_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffs`
--

LOCK TABLES `staffs` WRITE;
/*!40000 ALTER TABLE `staffs` DISABLE KEYS */;
INSERT INTO `staffs` VALUES (24,'Ketua','23040700061',28,NULL,NULL,NULL,0,0,'$2y$12$Hfu/YAx2F9fwkHWIT6cxPeQeU3CoL2kVaEHI94VHNenpdTYASK3Py','2025-06-17 04:08:36','2025-06-17 04:08:36'),(25,'Anggota Research and Development','23040700059',29,NULL,NULL,NULL,0,0,'$2y$12$QN7uPrMHtN83z9ENN4HC1uWJeaiOIkK7xXLd1o4hwU/HBdELWIw.i','2025-06-17 04:08:39','2025-06-22 05:13:41'),(26,'Ketua Departemen Product Publishing','22040700020',30,'https://instagram.com/bintang_alfizar_','https://www.linkedin.com/in/bintang25a','https://github.com/bintang25a',0,0,'$2y$12$IU5Uqkf41qmnavjOMh0g7Ob9cWZl5SBYk437vaF4SyyRenss.36Bi','2025-06-17 04:08:41','2025-06-22 05:20:46'),(27,'Admin','01062025',31,'https://instagram.com/bintang_alfizar_',NULL,'https://github.com/bintang25a',0,0,'$2y$12$.4QdWxPMyLBiRMxz/pzAEObAPqOOQOgfNr5fkMc8QC6JpVO277S6e','2025-06-17 19:14:55','2025-06-20 04:31:03'),(28,'Anggota Product publishing','23040700057',32,'https://instagram.com/naufalrzni',NULL,NULL,0,0,'$2y$12$HceEQC48h7kjImupSWhjyOWOWU9.xgrJvBCJQGqShGUCSpJmucjFu','2025-06-20 03:46:23','2025-06-20 03:46:23'),(29,'Ketua Departemen Public Relation','23040700063',33,NULL,NULL,NULL,0,0,'$2y$12$xH/OfOxTot7h1RZ6nt0oguMcFyhqopJOWOGKwQRo1U5McdlU41VGK','2025-06-20 03:57:43','2025-06-20 03:57:43'),(30,'Anggota Product Publishing','24040700002',35,'-','-','-',0,0,'$2y$12$vwXx45YuS9bIwYxaCzbhS.o6AS75P0UXymZhhW7EN5LWiNvBTL4NC','2025-06-20 04:05:50','2025-06-20 04:05:50'),(31,'Anggota Product Publishing','23040700002',34,'-','-','-',0,0,'$2y$12$oEAwiA/WkpJQkPsRaJxL1.mYXeyglIOryhWStDkOjL7/h78NsOB1.','2025-06-20 04:05:50','2025-06-20 04:05:50'),(32,'Anggota Media','23040700056',36,'-','-','-',0,0,'$2y$12$9lS9JgHSef1usewoU6pwZeyw8lMmq23qRoP3RtJcRvnixK89VIotS','2025-06-20 04:08:32','2025-06-20 04:08:32'),(33,'Anggota Media','22010300029',37,'-','-','-',0,0,'$2y$12$yrcbCKXmsV2XoddhaPY91O2Ix.8cju2maZJNGMObVzqpFAXxTlYy.','2025-06-20 04:08:33','2025-06-20 04:08:33'),(34,'Anggota Media','23040700043',38,'-','-','-',0,0,'$2y$12$17BNJ8zuD9fSVDmdkb9xee3PorXghc.b4PNB1we09JcKSe5hsoBVi','2025-06-20 04:08:33','2025-06-20 04:08:33'),(35,'Anggota Public Relation','23040700031',39,'-','-','-',0,0,'$2y$12$c.RAK77DB/A3LccMOTTz5.q0RBRrcsZS3zJB1DLGAL6qRP3Zm44LG','2025-06-20 04:13:15','2025-06-20 04:13:15'),(36,'Anggota Public Relation','22040760006',41,'-','-','-',0,0,'$2y$12$OBSqjf1H6.YN8WzqIVHH7ej9Raz5ZbeAbz6/gMwX.eahASYsBG/je','2025-06-20 04:13:15','2025-06-20 04:13:15'),(37,'Anggota Public Relation','24040700011',40,'-','-','-',0,0,'$2y$12$9Us7VHbobd3CxANMPRPCkemg3P1GTc0CdLKbDiMZ9GudF1bbV2lAS','2025-06-20 04:13:15','2025-06-20 04:13:15'),(38,'Ketua Departemen Media','22040700053',42,'-','-','-',0,0,'$2y$12$2auWZ2BVDtE/MSuTS9mbdOw9LmlWvpqE3Al9UbGcsH17Vw2SKUjCu','2025-06-20 04:13:15','2025-06-20 04:13:15'),(39,'Anggota Public Relation','23040700053',43,'-','-','-',0,0,'$2y$12$NXWQjMdHJ7sEcrnXxKvOaeTGcd8aTow4sW2UaFopSE7RfBwqSuK72','2025-06-20 04:13:15','2025-06-20 04:13:15'),(40,'Sekretaris','23040700038',44,'-','-','-',0,0,'$2y$12$srG8vvkeMOE4GEdUWC6rV.wmTTvSEB8GwTOcVp24Fy3HGKery1qou','2025-06-20 04:18:15','2025-06-20 04:18:15'),(41,'Anggota Research and Development','23040700021',47,'-','-','-',0,0,'$2y$12$aDwU4NgUaWDWesiZrfqPeuJuJQECpCVwYHKeCffhNqMKwdMl07XFW','2025-06-20 04:18:15','2025-06-20 04:18:15'),(42,'Anggota Research and Development','23040700052',46,'-','-','-',0,0,'$2y$12$XJeL9VIcphgEBVUFQSWX/uEvcjx2rUWi8/fY2tHDDmo4ZKoELsvK2','2025-06-20 04:18:15','2025-06-20 04:18:15'),(43,'Bendahara','23040700039',45,'-','-','-',0,0,'$2y$12$D91BKGxms7BmwydkhrkHsuuKPhukL5DozP25XnxM98w3vfWFWp6zu','2025-06-20 04:18:15','2025-06-20 04:18:15'),(44,'Ketua Departemen Research and Development','22040700101',48,NULL,NULL,NULL,0,0,'$2y$12$vnjqZsvXcxPKAsCQp9UjouJTSSOmgfbX9zIlPtYFMPrmAMgUWnUTu','2025-06-20 04:18:16','2025-06-21 22:05:58'),(45,'Anggota Research and Development','23040700062',49,'-','-','-',0,0,'$2y$12$73TR.VPZiSkZZ/rZcn9UeOaHWfDnJ1Ee5XyaYbwaP9T5d0vXh7XYi','2025-06-20 04:18:16','2025-06-20 04:18:16'),(46,'Anggota Research and Development','22040700112',50,'-','-','-',0,0,'$2y$12$InfnZ1ct4L2pI6bZOLGMROhtDRCA5rxZqJ54q2v0BbvZMFwudjL4a','2025-06-20 04:18:16','2025-06-20 04:18:16'),(47,'Founder','20210410700038',51,'https://instagram.com/zaaa_mrz','https://www.linkedin.com/in/mirza-maulana?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACeLx6QBNDAHzSPPIdvRdJRzof3YbvLXOek&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BUZRPfF2yRimB4jh7O0icmQ%3D%3D',NULL,0,0,'$2y$12$t/qQDUc71wDzkHL3lFSi9OWujkFsWsDqL7V5Q7.8NRKQlY/k8hc9S','2025-06-20 04:30:57','2025-06-20 19:49:16');
/*!40000 ALTER TABLE `staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `nim` varchar(255) NOT NULL,
  `prodi` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` enum('registrant','member','bph','admin') NOT NULL,
  `division_id` bigint(20) unsigned NOT NULL,
  `link_project` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nim_unique` (`nim`),
  KEY `users_division_id_foreign` (`division_id`),
  CONSTRAINT `users_division_id_foreign` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bintang Al Fizar','01062025','Teknik Informatika','bintangalfizar25@gmail.com','082111710709','admin',1,NULL,NULL,NULL,'2025-06-17 03:09:13','2025-06-20 04:57:39'),(2,'Bintang Al Fizar','22040700020','Teknik Informatika','22040700020@student.umj.ac.id','082111710709','bph',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 19:56:51'),(3,'Muhammad Hably Nashrullah','22040700001','Teknik Informatika','22040700001@student.umj.ac.id','089555423728','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(4,'Yasir Abduzzhohir','22040700053','Teknik Informatika','22040700053@student.umj.ac.id','081306880267','bph',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:13:14'),(5,'Apri Baroka','23040700006','Teknik Informatika','23040700006@student.umj.ac.id','081288926797','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(6,'Apridho Fuadil Hadid','24040700011','Teknik Informatika','24040700011@student.umj.ac.id','089589663545','bph',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:13:14'),(7,'Tedy Fachrudin','22040700006','Teknik Informatika','22040700006@student.umj.ac.id','089589663545','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(8,'Muhammad Zikri','22040700049','Teknik Informatika','22040700049@student.umj.ac.id','081974748130','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(9,'Assidiq Nurrochman','23040700053','Teknik Informatika','0821','0821','bph',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:13:15'),(10,'Fathoni Adam Ilyasa','24040700060','Teknik Informatika','24040700060@student.umj.ac.id','089924199048','member',10,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(11,'Aiva Nabilla Salma','23040700054','Teknik Informatika','23040700054@student.umj.ac.id','089891854729','member',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(12,'Alya Rahma Azzahra','23040700064','Teknik Informatika','23040700064@student.umj.ac.id','081221876861','member',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 19:49:20'),(13,'Dina Andriani','24040700002','Teknik Informatika','24040700002@student.umj.ac.id','088227740510','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:05:50'),(14,'Akhmad Thauzi','22040700088','Teknik Informatika','22040700088@student.umj.ac.id','0895334378224','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 22:08:10'),(15,'Akbar  Ardiansyah','22040760006','Teknik Informatika','22040760006@studnet.umj.ac.id','082196978669','bph',5,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:13:14'),(16,'Taufiq Rahman Hakim','22040700101','Teknik Informatika','22040700101@student.umj.ac.id','089652476114','bph',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 21:59:58'),(17,'Adam Muuhammad Ridwan','22010300029','ilmu politik','22010300029@student.umj.ac.id','0821','bph',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:08:32'),(18,'Adji Setyawan Saputra','23040700073','Teknik Informatika','23040700073@student.umj.ac.id','0821','member',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(19,'Agung Firmansyah','23040700052','Teknik Informatika','23040700052@student.um.ac.id','0821','bph',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:15'),(20,'Anisah Meidiana','23110200014','Magister Teknologi Pendidikan','23040700064@student.umj.ac.id','0821','bph',11,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 08:03:17'),(21,'IDELIA FITRIKYLA','23040700031','Teknik Informatika','23040700031@student.umj.ac.id','0821','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:13:14'),(22,'MIFTAHUL JANNAH','23040700072','Teknik Informatika','23040700072@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 19:31:12'),(23,'Muhammad Hafizh Ayatillah','24040700063','Teknik Informatika','24040700063@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 08:42:55'),(24,'Muhammad Ajar Danu Wiratama','23040700063','Teknik Informatika','23040700063@student.umj.ac.id','0821','bph',5,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 03:57:43'),(25,'Muhammad Aurian Noval','24040700007','Teknik Informatika','24040700007@student.umj.ac.id','0821','member',11,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 19:49:19'),(26,'Muhammad Almustofa Khanafi','23040700074','Teknik Informatika','23040700074@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(27,'Muhammad Linggar Givary','23040700037','Teknik Informatika','23040700037@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(28,'Muhammad Naufal Razani','23040700057','Teknik Informatika','23040700057@student.umj.ac.id','0821','bph',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 03:46:22'),(29,'DEAN RAFI ALGHOZALI','24040700026','Teknik Informatika','24040700026@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 19:49:19'),(30,'FADLI INDRA GUCI','23040700084','Teknik Informatika','24040700002@student.umj.ac.id','0821','member',5,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(31,'FARHAN ABRAR KISAN','24040700037','Teknik Informatika','24040700037@student.umj.ac.id','0821','member',5,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(32,'GUSESA ABIDA GHIFAR','24040700003','Teknik Informatika','24040700060@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(33,'HAIDAR KHADAFI','24040700033','Teknik Informatika','24040700033@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 19:26:02'),(34,'MUHAMMAD NURFINNUHA','24040600030','Arsitektur','24040600030@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(35,'MUHAMAD RAMZY','24040700054','Teknik Informatika','24040700054@student.umj.ac.id','0821','member',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(36,'PRADIPTA MUHAMMAD','22040700113','Teknik Informatika','22040700113@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-21 09:35:05'),(37,'MUHAMMAD ZIDANE AL-GHIFARI','24040700075','Teknik Informatika','24040700075@student.umj.ac.id','0821','member',11,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(38,'NAUFAL MUYASSAR','24040700090','Teknik Informatika','24040700090@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(39,'NUR JIHAN ALYRA FIRDAUS','24040700023','Teknik Informatika','24040700023@student.umj.ac.id','0821','member',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(40,'RADEN RAYHAN DWI','24040700067','Teknik informatika','24040700067@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(41,'VIRGIAWAN RAIHAN ABI NUGROHO','24040700056','Teknik Informatika','24040700056@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(42,'RAIHAN DAFFA ALIF','24040700014','Teknik Informatika','24040700014@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(43,'RAJENDRA NAYAKA ANDIANO ABIMATHA FARAAZ','24040700061','Teknik Informatika','24040700061@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(44,'RAMDANI VIKRIAMSYAH','22040700074','Teknik Informatika','22040700074@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(45,'RANA BUMI','24040700080','Teknik Informatika','24040700080@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(46,'RIDHO AKBAR PANGESTU','24040700005','Teknik Informatika','24040700005@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(47,'RIFQI BAIHAQI SABHAN','20210410700078','Teknik Informatika','20210410700078@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(48,'RIVA DWI HARTANTO','24040700078','Teknik Informatika','24040700078@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(49,'SALMAN ALFARISI','24040700085','Teknik Informatika','24040700085@student.umj.ac.id','0821','member',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(50,'SHAHAD KHALID','24040750001','Teknik Informatika','24040750001@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(51,'SULTAN MUQADDAS','24040700038','Teknik Informatika','24040700038@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(52,'THORAS FAADIHILAH','24040700041','Teknik Informatika','24040700041@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(53,'RAHMAN YUDHA PRATAMA','24040700039','Teknik Informatika','24040700039@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(54,'Muhammad Faiz Amanullah','22040700063','Teknik Informatika','22040700063@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(55,'Hilmi Dzakiyuddin Rohman','22040700068','Teknik Informatika','22040700068@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(56,'Fadel Amili','20210410700058','Teknik Informatika','20210410700058@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(57,'Tan Kelvin Zia Zhuang','20210410700083','Teknik Informatika','20210410700083@student.umj.ac.id','0821','member',10,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(58,'Lantip Nurrohman','23040700036','Teknik Informatika','23040700036@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(59,'Alif Fatir Aidil','23040700089','Teknik Informasi','23040700089@student.umj.ac.id','0821','member',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(60,'Reihan Aditya Permata Bintang','22040700015','Teknik Informatika','22040700015@student.umj.ac.id','0821','member',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(61,'Amar Triadi','23040700021','Teknik Informatika','23040700021@student.umj.ac.id','0821','bph',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:15'),(62,'Muhammad Azizsyah Putra','23040700061','Teknik Informatika','23040700061@student.umj.ac.id','0821','bph',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-17 04:08:36'),(63,'Muhammad Fikri Arrayan','23040700043','Teknik Informatika','23040700043@student.umj.ac.id','0821','bph',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:08:32'),(64,'Fikri Naufal Maulana','22040700044','Teknik Informatika','22040700044@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(65,'Kevin Raydafa Algibran','23040700056','Teknik informatika','23040700056@student.umj.ac.id','0821','bph',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:08:32'),(66,'Naula Nabila','23040700044','Teknik Informatika','23040700044@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(67,'Muhammad Rizqi Raihan Firdaus','22040700066','Teknik Informatika','22040700066@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(68,'Syahrul Al Habib','22040700089','Teknik Informatika','22040700089@student.umj.ac.id','0821','member',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(69,'Zaky Pratama','23040700069','Teknik Informatika','23040700069@student.umj.ac.id','0821','member',4,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(70,'Anggi Rahmadillah.','23040700008','Teknik Informatika','23040700008@student.umj.ac.id','0821','member',9,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(71,'Irsyadi Hanif Elnur','20210410700015','Teknik Informatika','20210410700015@student.umj.ac.id','0821','member',3,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(72,'Khamdan Budiarto','20210410700024','Teknik informatika','20210410700024@student.umj.ac.id','0821','member',5,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-05-28 04:55:56'),(73,'Alika Raisya','23040700059','Teknik Informatika','23040700059@student.umj.ac.id','0821','bph',1,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-17 04:08:39'),(74,'Fildzah Amalina Hanifani','23040700038','Teknik Informatika','23040700038@student.umj.ac.id','0821','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:15'),(75,'Nandhita Ghin Yatin Nafiah','23040700039','Teknik Informatika','23040700039@student.umj.ac.id','0821','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:15'),(76,'Elsa Mundi Raswati','23040700062','Teknik Informatika','23040700062@student.umj.ac.id','0821','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:15'),(77,'Muhammad Rayyan Ghifari','22040700112','Teknik Informatika','23040700112@student.umj.ac.id','0821','bph',2,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:18:16'),(78,'Arya Meyza Alfarizky','23040700002','Teknik Elektro','23040700002@student.umj.ac.id','0821','bph',6,NULL,NULL,NULL,'2025-05-28 04:55:56','2025-06-20 04:05:50'),(79,'Muhammad Haryanda Pratama','22040700093','informatika','aripatama08@gmail.com','087862453202','member',1,NULL,NULL,NULL,'2025-06-17 20:59:41','2025-06-21 09:35:05'),(80,'Mirza Maulana','20210410700038','Teknik Informatika','20210410700038@student.umj.ac.id','087752434520','bph',3,NULL,NULL,NULL,'2025-06-20 04:28:38','2025-06-20 04:30:57'),(87,'Bintang Al Fizar','220407000201','Teknik Informatika','230407000591@student.umj.ac.id','0821117107091','registrant',9,NULL,NULL,NULL,'2025-06-21 20:49:36','2025-06-21 20:49:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'coreit'
--

--
-- Dumping routines for database 'coreit'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-22 22:53:12
