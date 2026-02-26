REST API Blog dengan PostgreSQL & MinIO

Project ini **RESTful API** untuk sistem blog sederhana yang mendukung **Authentication (JWT)**, **CRUD Post**, **CRUD Category**, serta **upload gambar ke MinIO (Object Storage)**.

Project ini dibuat sebagai tugas sekaligus portofolio backend untuk menunjukkan:

* Struktur backend yang rapi (MVC)
* Integrasi database relasional
* Object Storage (MinIO)
* API documentation menggunakan Swagger

## ✨ Fitur Utama

* 🔐 **Authentication & Authorization** (Register, Login, JWT)
* 📝 **CRUD Post**

  * Judul
  * Isi
  * Upload gambar
  * Relasi ke category
* 🗂️ **CRUD Category**

  * Validasi menggunakan Express Validator
* 🖼️ **Upload & Serve Gambar via MinIO**

  * Gambar tersimpan di bucket
  * Response API menampilkan URL gambar
* 📄 **Swagger API Documentation**

---

## 🧰 Teknologi yang Digunakan

* **Node.js**
* **Express.js**
* **PostgreSQL** (Database)
* **MinIO** (Object Storage – S3 Compatible)
* **JWT (jsonwebtoken)** – Authentication
* **Multer** – Upload file
* **Sharp** – Resize & compress image
* **Swagger (swagger-jsdoc & swagger-ui-express)** – API Documentation
* **dotenv** – Environment variable

---

## 📁 Struktur Folder

```
├── config/
│   ├── database.js
│   └── minio.js
├── controllers/
│   ├── auth_controller.js
│   ├── post_controller.js
│   └── category_controller.js
├── models/
│   ├── post.js
│   └── category.js
├── routes/
│   ├── auth_route.js
│   ├── post_route.js
│   └── category_route.js
├── validators/
│   └── categoryValidator.js
├── middlewares/
│   └── auth.js
├── utils/
│   └── swagger.js
├── index.js
└── .env.example
```

---

## ⚙️ Cara Menjalankan Project

### 1️ Clone Repository

```bash
git clone https://github.com/USERNAME/NAMA-REPO.git
cd NAMA-REPO
```

### 2️ Install Dependencies

```bash
npm install
```

---

### 3️ Setup Environment Variable

Buat file `.env` lalu isi:

```env
PORT=3000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=db_post
DB_PORT=5432

ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_ENDPOINT=192.168.18.60
MINIO_PORT=9000
MINIO_BUCKET=api-bucket
```

---

### 4️ Jalankan MinIO (Windows)

Masuk ke folder MinIO:

```powershell
cd D:\minio
$env:MINIO_ROOT_USER="minioadmin"
$env:MINIO_ROOT_PASSWORD="minioadmin"
.\minio.exe server D:\minio-data --console-address ":9001"
```

Akses:

* **API:** [http://192.168.18.60:9000](http://192.168.18.60:9000)
* **Console:** [http://192.168.18.60:9001](http://192.168.18.60:9001)

Pastikan bucket **api-bucket** sudah dibuat.

---

### 5️ Jalankan Server

```bash
node index.js
```

Server akan berjalan di:

```
http://localhost:3000
```

---

## Swagger Documentation

Buka browser:

```
http://localhost:3000/api-docs
```

Di Swagger:

1. Register / Login
2. Copy **Access Token**
3. Klik **Authorize**
4. Paste token (Bearer token)
5. Akses endpoint protected

---

## Cara Upload Post dengan Gambar

Endpoint:

```
POST /posts
```

Request type:

* **multipart/form-data**

Field:

* `judul` (string)
* `isi` (string)
* `category_id` (number)
* `gambar` (file)

Response:

```json
{
  "id": 1,
  "judul": "Contoh",
  "isi": "Isi post",
  "gambar": "http://192.168.18.60:9000/api-bucket/nama-file.png",
  "category_id": 1
}
```

---

## 📌 Catatan Arsitektur

* **Query database dipisahkan ke folder `models`**
* Controller hanya mengatur logic & response
* **MinIO URL tidak hardcode**, dapat dikonfigurasi via `.env`
* Database hanya menyimpan **nama file / path**, bukan full domain
* URL gambar dibentuk saat response

---

## ✅ Status Tugas

✔ CRUD Category dengan validation
✔ CRUD Post dengan relasi category
✔ Upload gambar ke MinIO
✔ Swagger documentation
✔ JWT Authentication

Project ini dibuat sebagai latihan backend sekaligus portofolio.

Jika ingin mencoba atau mengembangkan lebih lanjut, silakan clone dan eksplorasi 🚀
