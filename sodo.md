lofi-chill-study/
├── public/                     # Tài nguyên tĩnh dùng chung cho toàn bộ ứng dụng
│   ├── assets/                 # Kho lưu trữ dữ liệu đa phương tiện
│   │   ├── icons/              # Thư mục chứa các biểu tượng (icon)
│   │   ├── lofi/               # Nhạc nền thuộc thể loại lofi
│   │   ├── musics/            # Các file âm thanh hoặc nhạc được lưu trữ cục bộ
│   │   └── video/             # Video nền (background video) cho giao diện
│   ├── index.html              # Tệp HTML gốc được render bởi React
│   └── manifest.json           # Cấu hình Progressive Web App (PWA)
│
├── src/                        # Mã nguồn chính của ứng dụng
│   ├── components/             # Các thành phần (component) giao diện UI
│   │   ├── About/              # Component trang giới thiệu
│   │   ├── Login/              # Component xử lý đăng nhập người dùng
│   │   ├── Player/             # Trình phát nhạc chính (Music Player UI)
│   │   ├── VideoSelector/      # Chức năng chọn video nền
│   │   └── ...                 # Các component khác như Navbar, Footer, Loader, v.v.
│
│   ├── contexts/               # Quản lý trạng thái cục bộ bằng React Context
│   │   └── MusicContext.jsx    # Context lưu trữ trạng thái nhạc (bài hát đang phát, v.v.)
│
│   ├── data/                   # Dữ liệu tĩnh của ứng dụng
│   │   └── songData.jsx        # Danh sách các bài hát, thông tin metadata (tên, artist, URL)
│
│   ├── redux/                  # Cấu trúc Redux để quản lý state phức tạp
│   │   ├── actions/            # Các action gửi yêu cầu thay đổi state
│   │   ├── constantsType/      # Các hằng số định nghĩa loại action
│   │   ├── reducers/           # Các reducer xử lý thay đổi state theo action
│   │   └── store/              # File cấu hình store trung tâm của Redux
│
│   ├── App.jsx                 # Component gốc của ứng dụng, định tuyến và layout chính
│   └── index.js                # Điểm khởi động chính của ứng dụng React (root render)
│
├── package.json                # File khai báo thư viện, script và cấu hình dự án
