# Sử dụng Node.js phiên bản 22.6.0 làm base image
FROM node:22.6.0

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 3000 để truy cập ứng dụng (đây là cổng mặc định của React Dev Server)
EXPOSE 3000

# Chạy ứng dụng bằng lệnh "npm start"
CMD ["npm", "start"]
