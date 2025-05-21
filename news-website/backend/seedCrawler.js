const Article = require('./models/Article');
const logger = require('./utils/logger');

// Dữ liệu mẫu
const sampleArticles = [
  {
    title: 'Cải cách giáo dục: Cần thay đổi tư duy học tập',
    summary: 'Các chuyên gia giáo dục đưa ra nhiều đề xuất cải cách đào tạo, trong đó nhấn mạnh việc thay đổi tư duy học tập là nền tảng quan trọng.',
    content: 'Tại hội thảo "Cải cách giáo dục Việt Nam" được tổ chức tại TP.HCM ngày 15/5, nhiều chuyên gia giáo dục đã đưa ra các đề xuất về cải cách đào tạo. Theo PGS.TS Nguyễn Văn A, Hiệu trưởng Trường đại học X, việc thay đổi tư duy học tập là nền tảng quan trọng nhất. "Chúng ta cần chuyển từ học thuộc sang học hiểu, từ tiếp thu kiến thức một chiều sang chủ động tìm tòi, sáng tạo", ông nói.\n\nCác chuyên gia cũng nhấn mạnh việc cần thay đổi phương pháp giảng dạy, đánh giá học sinh và cải thiện cơ sở vật chất. "Giáo viên cần được đào tạo để trở thành người hướng dẫn, người truyền cảm hứng chứ không chỉ là người truyền đạt kiến thức", TS. Phạm Thị B, chuyên gia giáo dục, nhận định.',
    imageUrl: 'https://tuoitre.vn/img/giaoduc.jpg',
    sourceUrl: 'https://tuoitre.vn/cai-cach-giao-duc-can-thay-doi-tu-duy-hoc-tap-2025051501.htm',
    publishedAt: new Date(2025, 4, 15, 8, 30), // 15/05/2025 8:30
    category: 'giao-duc'
  },
  {
    title: 'Giá vàng tăng kỷ lục, vượt mốc 100 triệu đồng/lượng',
    summary: 'Giá vàng trong nước tiếp tục tăng mạnh, vượt mốc 100 triệu đồng/lượng, thiết lập kỷ lục mới trong lịch sử.',
    content: 'Sáng 16/5, giá vàng SJC được các doanh nghiệp niêm yết ở mức 98-100,2 triệu đồng/lượng (mua vào - bán ra), tăng 1,5 triệu đồng so với hôm qua. Đây là mức cao nhất trong lịch sử thị trường vàng Việt Nam.\n\nTheo các chuyên gia, giá vàng tăng mạnh do ảnh hưởng từ thị trường quốc tế và tâm lý găm giữ vàng của người dân trước tình hình kinh tế bất ổn. "Khi lạm phát tăng cao, người dân có xu hướng mua vàng để bảo toàn tài sản", ông Nguyễn Văn C, chuyên gia kinh tế, phân tích.\n\nNgân hàng Nhà nước cho biết đang theo dõi sát diễn biến thị trường và sẽ có biện pháp can thiệp khi cần thiết để ổn định thị trường vàng.',
    imageUrl: 'https://tuoitre.vn/img/vang.jpg',
    sourceUrl: 'https://tuoitre.vn/gia-vang-tang-ky-luc-vuot-moc-100-trieu-dong-luong-2025051601.htm',
    publishedAt: new Date(2025, 4, 16, 9, 15), // 16/05/2025 9:15
    category: 'kinh-te'
  },
  {
    title: 'Đường sắt tốc độ cao Bắc-Nam: Khởi công vào năm 2026',
    summary: 'Dự án đường sắt tốc độ cao Bắc-Nam dự kiến sẽ được khởi công vào năm 2026 với tổng mức đầu tư khoảng 60 tỷ USD.',
    content: 'Theo thông tin từ Bộ Giao thông Vận tải, dự án đường sắt tốc độ cao Bắc-Nam dự kiến sẽ được khởi công vào năm 2026. Dự án có tổng chiều dài khoảng 1.560km, đi qua 20 tỉnh, thành phố với tổng mức đầu tư khoảng 60 tỷ USD.\n\nBộ trưởng Bộ GTVT Nguyễn Văn D cho biết, dự án sẽ được chia thành nhiều giai đoạn, ưu tiên triển khai trước các đoạn Hà Nội - Vinh và TP.HCM - Nha Trang. "Đây là dự án quan trọng quốc gia, sẽ tạo động lực phát triển kinh tế - xã hội cho cả nước", ông nhấn mạnh.\n\nKhi hoàn thành, tàu cao tốc có thể chạy với tốc độ tối đa 350km/h, rút ngắn thời gian di chuyển từ Hà Nội đến TP.HCM xuống còn khoảng 5,5 giờ, so với 36 giờ như hiện nay.',
    imageUrl: 'https://tuoitre.vn/img/duongsatcaotoc.jpg',
    sourceUrl: 'https://tuoitre.vn/duong-sat-toc-do-cao-bac-nam-khoi-cong-vao-nam-2026-2025051701.htm',
    publishedAt: new Date(2025, 4, 17, 10, 0), // 17/05/2025 10:00
    category: 'thoi-su'
  },
  {
    title: 'Chợ Bến Thành và phố đi bộ Nguyễn Huệ: Điểm đến yêu thích của du khách quốc tế',
    summary: 'Theo khảo sát mới nhất, chợ Bến Thành và phố đi bộ Nguyễn Huệ là hai điểm đến được du khách quốc tế yêu thích nhất khi đến TP.HCM.',
    content: 'Theo kết quả khảo sát mới nhất của Sở Du lịch TP.HCM, chợ Bến Thành và phố đi bộ Nguyễn Huệ là hai điểm đến được du khách quốc tế yêu thích nhất khi đến thành phố. Tiếp theo là các địa điểm như Nhà thờ Đức Bà, Bưu điện Trung tâm và Bảo tàng Chứng tích Chiến tranh.\n\nÔng Lê Văn E, Giám đốc Sở Du lịch TP.HCM, cho biết số lượng khách quốc tế đến thành phố trong 4 tháng đầu năm 2025 đã tăng 25% so với cùng kỳ năm 2024. "Chúng tôi đang nỗ lực đa dạng hóa sản phẩm du lịch, nâng cao chất lượng dịch vụ để thu hút thêm du khách", ông nói.\n\nNgoài ra, du lịch ẩm thực cũng là một điểm nhấn thu hút du khách quốc tế, với các món ăn đặc trưng như phở, bánh mì, cơm tấm được đánh giá cao.',
    imageUrl: 'https://tuoitre.vn/img/chobenthanhvadicho.jpg',
    sourceUrl: 'https://tuoitre.vn/cho-ben-thanh-va-pho-di-bo-nguyen-hue-diem-den-yeu-thich-cua-du-khach-quoc-te-2025051801.htm',
    publishedAt: new Date(2025, 4, 18, 14, 30), // 18/05/2025 14:30
    category: 'du-lich'
  },
  {
    title: 'Apple ra mắt iPhone 17 với pin graphene, sạc đầy trong 15 phút',
    summary: 'Apple vừa chính thức ra mắt dòng iPhone 17 với công nghệ pin graphene mới, cho phép sạc đầy pin chỉ trong 15 phút và thời lượng sử dụng lên đến 2 ngày.',
    content: 'Ngày 20/5, Apple đã chính thức ra mắt dòng iPhone 17 với nhiều cải tiến đột phá, nổi bật nhất là công nghệ pin graphene mới. Theo công bố của Apple, công nghệ này cho phép sạc đầy pin chỉ trong 15 phút và có thời lượng sử dụng lên đến 2 ngày đối với các tác vụ thông thường.\n\nNgoài ra, iPhone 17 còn được trang bị chip A19 Bionic với khả năng xử lý AI mạnh mẽ, camera 108MP với khả năng quay video 8K, và màn hình ProMotion 120Hz trên tất cả các phiên bản. "Đây là bước nhảy vọt lớn nhất trong lịch sử iPhone", CEO Tim Cook nhấn mạnh trong sự kiện ra mắt.\n\nDòng iPhone 17 sẽ có 4 phiên bản: iPhone 17, iPhone 17 Plus, iPhone 17 Pro và iPhone 17 Pro Max, với giá bán từ 999 USD. Sản phẩm sẽ được bán ra chính thức vào ngày 15/6 tới.',
    imageUrl: 'https://tuoitre.vn/img/iphone17.jpg',
    sourceUrl: 'https://tuoitre.vn/apple-ra-mat-iphone-17-voi-pin-graphene-sac-day-trong-15-phut-2025052001.htm',
    publishedAt: new Date(2025, 4, 20, 7, 0), // 20/05/2025 7:00
    category: 'cong-nghe'
  }
];

// Hàm thêm dữ liệu mẫu vào database
async function seedCrawlerData() {
  try {
    // Kiểm tra xem đã có dữ liệu chưa
    const count = await Article.count();
    if (count > 0) {
      logger.info(`Đã có ${count} bài viết trong database, không cần thêm dữ liệu mẫu`);
      return;
    }

    // Thêm dữ liệu mẫu
    for (const article of sampleArticles) {
      await Article.create(article);
      logger.info(`Đã thêm bài viết mẫu: ${article.title}`);
    }

    logger.info(`Đã thêm ${sampleArticles.length} bài viết mẫu vào database`);
  } catch (error) {
    logger.error(`Lỗi khi thêm dữ liệu mẫu: ${error.message}`);
  }
}

// Chạy hàm thêm dữ liệu mẫu
seedCrawlerData();