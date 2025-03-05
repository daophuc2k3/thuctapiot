# NestJS CRUD Project with MySQL and Prisma
## Cấu Hình Môi Trường

### 1. Cài Đặt Các Công Cụ Cần Thiết

- **Node.js** (>=16.x) - Cài đặt từ [Node.js](https://nodejs.org/)
- **MySQL** - Cài đặt từ [MySQL](https://dev.mysql.com/downloads/).
- **Prisma** - Được cài đặt trong dự án.

### 2. Cài Đặt Dự Án

1. **Clone Project**:

2. **Cài đặt các gói cần thiết**:
    ```bash
    npm install
    ```

3. **Cấu Hình Cơ Sở Dữ Liệu**:
    - Cài đặt MySQL và tạo một cơ sở dữ liệu mới.
    - Mở file `.env` và cấu hình thông tin kết nối DATABASE_URL với MySQL:

### 3. Cài Đặt và Khởi Tạo Prisma

1. **Tạo migration và áp dụng vào cơ sở dữ liệu**:
    ```bash
    npx prisma migrate dev --name init
    ```

2. **Chạy Prisma Client**:
    ```bash
    npx prisma generate
    ```

### 4. Chạy Dự Án


```bash
npm run start
