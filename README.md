# 🏪 Store Management Website

Ứng dụng quản lý cửa hàng: Sản phẩm, Nhập hàng, Xuất hàng, Hóa đơn.

**React (Vite) + Spring Boot + SQL Server**

---

## 📋 Mục lục

1. [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
2. [Cấu trúc dự án](#-cấu-trúc-dự-án)
3. [Cài đặt SQL Server và tạo database](#-cài-đặt-sql-server-và-tạo-database)
4. [Cấu hình kết nối database](#-cấu-hình-kết-nối-database)
5. [Chạy Backend (Spring Boot)](#-chạy-backend-spring-boot)
6. [Chạy Frontend (React + Vite)](#-chạy-frontend-react--vite)
7. [Sử dụng website](#-sử-dụng-website)
8. [Sơ đồ kiến trúc](#-sơ-đồ-kiến-trúc)
9. [FAQ - Xử lý lỗi thường gặp](#-faq---xử-lỗi-thường-gặp)

---

## ✅ Yêu cầu hệ thống

| Công nghệ | Phiên bản tối thiểu | Lệnh kiểm tra |
|---|---|---|
| Java (JDK) | 21 trở lên | `java -version` |
| Maven | 3.9+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| SQL Server | 2019+ | — |

> 💡 Chưa cài Maven? Dùng **Maven Wrapper** đi kèm dự án (`mvnw.cmd` trên Windows, `./mvnw` trên Mac/Linux).

---

## 📁 Cấu trúc dự án

```text
Store Management Website/
├── backend/                          ← Spring Boot API (Java 21)
│   ├── pom.xml                        ← Maven dependencies
│   └── src/main/
│       ├── java/com/namtrung/store/
│       │   ├── StoreApplication.java       ← Entry point
│       │   ├── WebConfig.java              ← Cấu hình CORS
│       │   ├── product/                    ← Module Sản phẩm
│       │   │   ├── Product.java            ←   @Entity (bảng products)
│       │   │   ├── ProductRepository.java  ←   JpaRepository
│       │   │   ├── ProductService.java     ←   @Service
│       │   │   └── ProductController.java  ←   @RestController (/api/products)
│       │   ├── imports/                   ← Module Nhập hàng (cấu trúc tương tự)
│       │   ├── exports/                   ← Module Xuất hàng
│       │   └── invoice/                   ← Module Hóa đơn
│       └── resources/
│           └── application.properties    ← Cấu hình kết nối database
│
├── frontend/                         ← React + Vite
│   ├── package.json
│   ├── vite.config.js                ← Proxy /api → localhost:8080
│   └── src/
│       ├── main.jsx                  ← Entry point
│       ├── App.jsx                   ← Component chính + routing
│       ├── api.js                    ← Gọi API backend
│       └── components/
│           ├── Sidebar.jsx
│           ├── Header.jsx
│           └── sections/             ← 6 trang: Products, Imports, Exports, Invoices, ...
│
├── store-architecture.html           ← Sơ đồ kiến trúc (mở bằng trình duyệt)
├── store-architecture.json           ← Spec archify
├── gen-spec.js                       ← Script sinh sơ đồ
└── README.md                         ← File này
```

Mỗi module backend tuân theo pattern: **Controller → Service → Repository → Entity**.

---

## 🗄️ Cài đặt SQL Server và tạo database

### Bước 1: Cài SQL Server

- Tải **SQL Server 2022 Express** (miễn phí): https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Hoặc dùng **Docker**:

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPass123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

### Bước 2: Tạo database

Mở **SQL Server Management Studio (SSMS)** hoặc **Azure Data Studio**, kết nối tới server, chạy:

```sql
CREATE DATABASE namtrung_db;
GO
USE namtrung_db;
GO

-- Tạo user (tuỳ chọn, có thể dùng sa hoặc account có sẵn)
CREATE LOGIN namtrung WITH PASSWORD = 'NamTrung@123';
GO

CREATE USER namtrung FOR LOGIN namtrung;
ALTER ROLE db_owner ADD MEMBER namtrung;
GO
```

> ⚠️ **KHÔNG cần tạo bảng thủ công!** Khi Spring Boot khởi động, Hibernate sẽ **tự động tạo/cập nhật bảng** từ các class `@Entity` nhờ cấu hình `ddl-auto=update`.

### Bước 3: Tạo database của riêng bạn (tuỳ chỉnh)

Muốn dùng tên database / user khác? Chạy SQL sau:

```sql
CREATE DATABASE my_store_db;
GO
USE my_store_db;
GO

CREATE LOGIN myuser WITH PASSWORD = 'MyPass@123';
CREATE USER myuser FOR LOGIN myuser;
ALTER ROLE db_owner ADD MEMBER myuser;
GO
```

Sau đó sửa `application.properties` (xem phần tiếp theo).

---

## ⚙️ Cấu hình kết nối database

Mở file: `backend/src/main/resources/application.properties`

```properties
# ─── SỐ PORT ───
server.port=8080

# ─── KẾT NỐI SQL SERVER ───
# Sửa URL, username, password theo database của bạn
spring.datasource.url=jdbc:sqlserver://localhost;databaseName=namtrung_db;encrypt=false;trustServerCertificate=true
spring.datasource.username=namtrung
spring.datasource.password=NamTrung@123
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# ─── HIBERNATE / JPA ───
# ddl-auto=update → tự động tạo/cập nhật bảng khi chạy (không xóa dữ liệu cũ)
# Các giá trị khác: none | validate | update | create | create-drop
spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect
spring.jpa.hibernate.ddl-auto=update

# ─── CORS ───
app.cors.allowed-origins=http://localhost:5173
```

### Các tham số cần sửa khi dùng database riêng

| Tham số | Giá trị mặc định | Đổi thành |
|---|---|---|
| `databaseName` | `namtrung_db` | tên database của bạn |
| `username` | `namtrung` | user của bạn |
| `password` | `NamTrung@123` | password của bạn |
| `localhost` | `localhost` | IP server nếu SQL Server ở máy khác |

**Ví dụ** — dùng database `my_store_db` với user `sa`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost;databaseName=my_store_db;encrypt=false;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=YourSaPassword123
```

> 🔒 **Bảo mật**: Không commit password thật lên GitHub. Dùng biến môi trường:
> ```properties
> spring.datasource.password=${DB_PASSWORD}
> ```
> Rồi set biến môi trường trước khi chạy (Windows): `set DB_PASSWORD=YourPass123`

---

## 🚀 Chạy Backend (Spring Boot)

### Bước 1: Mở terminal trong thư mục `backend`

```bash
cd "Store Management Website/backend"
```

### Bước 2: Chạy bằng Maven

```bash
# Windows
mvnw.cmd spring-boot:run

# Mac / Linux
./mvnw spring-boot:run
```

Hoặc nếu đã cài Maven toàn cục:

```bash
mvn spring-boot:run
```

### Bước 3: Kiểm tra

Backend chạy thành công khi terminal hiện:

```text
Tomcat started on port 8080
Started StoreApplication in X.XXX seconds
```

Test API bằng trình duyệt: http://localhost:8080/api/products → trả về `[]` (danh sách rỗng)

---

## 🖥️ Chạy Frontend (React + Vite)

### Bước 1: Mở terminal MỚI trong thư mục `frontend`

```bash
cd "Store Management Website/frontend"
```

### Bước 2: Cài dependencies (chỉ lần đầu)

```bash
npm install
```

### Bước 3: Chạy dev server

```bash
npm run dev
```

### Bước 4: Mở trình duyệt

Vào: **http://localhost:5173**

> Vite đã cấu hình proxy: mọi request `/api/*` từ frontend sẽ tự động chuyển tới `http://localhost:8080` — nên không cần lo CORS khi dev.

---

## 🎯 Sử dụng website

Sau khi cả backend và frontend đều đang chạy:

| Trang | Chức năng | API endpoint |
|---|---|---|
| **Products** | Thêm / sửa / xóa sản phẩm (SKU, tên, giá, tồn kho) | `/api/products` |
| **Imports** | Ghi nhận nhập hàng (tăng tồn kho) | `/api/imports` |
| **Exports** | Ghi nhận xuất hàng (giảm tồn kho) | `/api/exports` |
| **Invoices** | Tạo hóa đơn | `/api/invoices` |

---

## 📊 Sơ đồ kiến trúc

Mở file `store-architecture.html` bằng trình duyệt để xem sơ đồ tổng thể:

```text
Browser → Vite (:5173) → App.jsx → api.js
  → Spring Boot (:8080) → Controller → Service → Repository → Entity
    → SQL Server (namtrung_db)
```

Nếu muốn chỉnh sửa sơ đồ:

1. Sửa file `gen-spec.js`
2. Chạy `node gen-spec.js` → sinh `store-architecture.json`
3. Chạy `node archify.mjs validate architecture store-architecture.json --quality showcase`
4. Chạy `node archify.mjs render architecture store-architecture.json store-architecture.html --quality showcase`

---

## ❓ FAQ - Xử lý lỗi thường gặp

### Lỗi: "Connection refused: localhost:1433"

→ SQL Server chưa chạy. Khởi động dịch vụ **SQL Server** trong Services (Windows) hoặc Docker.

### Lỗi: "Login failed for user"

→ Sai username/password. Kiểm tra lại trong `application.properties` và SSMS.

### Lỗi: "Cannot connect to database"

→ Tên database sai hoặc chưa tạo. Chạy lệnh `CREATE DATABASE` ở Bước 2.

### Lỗi: "Port 8080 already in use"

→ Đổi port trong `application.properties`: `server.port=8081`. Rồi cập nhật proxy trong `frontend/vite.config.js` thành `http://localhost:8081`.

### Lỗi: "Port 5173 already in use"

→ Vite sẽ tự động chọn port khác (5174, 5175...). Xem terminal để biết port thực tế.

### Bảng không tự tạo sau khi chạy backend?

→ Kiểm tra `ddl-auto=update` trong `application.properties`. Nếu vẫn không tạo, thử đổi sang `create` (cẩn thận: sẽ xóa dữ liệu cũ).

### Frontend hiện lỗi "Failed to fetch"?

→ Backend chưa chạy, hoặc chạy sai port. Đảm bảo backend chạy ở `:8080` trước khi mở frontend.

---

## 📝 Thông tin thêm

| Công nghệ | Phiên bản |
|---|---|
| Java | 21 |
| Spring Boot | 3.3.4 |
| React | 18.3 |
| Vite | 5.4 |
| Database | SQL Server (Hibernate + JpaRepository) |

---

> Tác giả: **BigB**
