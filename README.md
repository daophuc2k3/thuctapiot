# NestJS CRUD Project with PostgreSQL and Prisma

## Cấu Hình Môi Trường

### 1. Cài Đặt Các Công Cụ Cần Thiết

Trước khi bắt đầu, hãy chắc chắn rằng bạn đã cài đặt các công cụ cần thiết:

- **Node.js** (>=16.x): [Cài đặt Node.js](https://nodejs.org/)
- **PostgreSQL**: [Cài đặt PostgreSQL](https://www.postgresql.org/download/)
- **Prisma**: Được cài đặt trong dự án.

### 2. Cài Đặt Dự Án

1. **Clone Dự Án**:

2. **Cài Đặt Các Gói Cần Thiết**:
   - Cài đặt các gói npm cần thiết cho dự án:
     ```bash
     npm install
     ```

3. **Cấu Hình Cơ Sở Dữ Liệu**:
   - Cài đặt **PostgreSQL** và tạo một cơ sở dữ liệu mới.
   - Mở file `.env` trong thư mục gốc của dự án và cấu hình thông tin DATABASE_URL kết nối PostgreSQL:

### 3. Cài Đặt và Khởi Tạo Prisma

1. **Tạo Migration và Áp Dụng vào Cơ Sở Dữ Liệu**:
   - Sau khi cấu hình kết nối, bạn cần tạo migration và áp dụng vào cơ sở dữ liệu PostgreSQL:
     ```bash
     npx prisma migrate dev --name init
     ```

2. **Chạy Prisma Client**:
   - Sau khi áp dụng migration, bạn cần chạy Prisma Client để tạo các file cần thiết cho dự án:
     ```bash
     npx prisma generate
     ```

### 4. Chạy Dự Án

Khi tất cả đã được cài đặt và cấu hình xong, bạn có thể chạy ứng dụng:

```bash
npm run start
