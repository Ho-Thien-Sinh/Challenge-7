const Article = require('./models/Article');
const logger = require('./utils/logger');

const sampleArticles = [
  {
    title: 'Việt Nam đạt thành tích cao tại Olympic Toán học quốc tế',
    summary: 'Đội tuyển Việt Nam giành 2 huy chương vàng, 2 huy chương bạc và 2 huy chương đồng tại kỳ thi Olympic Toán học quốc tế năm 2025.',
    content: 'Đội tuyển Việt Nam tham dự kỳ thi Olympic Toán học quốc tế (IMO) 2025 đã xuất sắc giành được 2 huy chương vàng, 2 huy chương bạc và 2 huy chương đồng. Đây là thành tích cao nhất của Việt Nam trong 5 năm qua tại đấu trường toán học danh giá nhất dành cho học sinh phổ thông.\n\nCác thí sinh đạt huy chương vàng là em Nguyễn Văn A (học sinh trường THPT chuyên Hà Nội - Amsterdam) và em Trần Thị B (học sinh trường THPT chuyên Khoa học Tự nhiên, Đại học Quốc gia Hà Nội).\n\nKỳ thi Olympic Toán học quốc tế năm nay có sự tham gia của hơn 100 quốc gia và vùng lãnh thổ với hơn 600 thí sinh. Việt Nam xếp thứ 7 trong bảng xếp hạng không chính thức.',
    imageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80',
    sourceUrl: 'https://example.com/olympic-toan-hoc-2025',
    publishedAt: new Date(),
    category: 'giao-duc'
  },
  {
    title: 'Giá vàng trong nước tăng mạnh, vượt mốc 80 triệu đồng/lượng',
    summary: 'Giá vàng SJC trong nước đã tăng vượt mốc 80 triệu đồng/lượng, thiết lập kỷ lục mới trong lịch sử.',
    content: 'Sáng nay, giá vàng SJC tại các công ty và doanh nghiệp kinh doanh vàng đã tăng vượt mốc 80 triệu đồng/lượng, thiết lập kỷ lục mới trong lịch sử.\n\nCụ thể, Công ty Vàng bạc đá quý Sài Gòn (SJC) niêm yết giá vàng SJC ở mức 79,5 triệu đồng/lượng (mua vào) và 81,2 triệu đồng/lượng (bán ra), tăng 1,5 triệu đồng ở cả hai chiều mua và bán so với chốt phiên hôm qua.\n\nGiá vàng thế giới hiện ở mức 2.450 USD/ounce, tăng khoảng 15 USD so với chốt phiên giao dịch hôm qua. Mức giá này tương đương khoảng 72 triệu đồng/lượng khi quy đổi theo tỷ giá hiện hành, thấp hơn giá vàng SJC khoảng 9 triệu đồng/lượng.\n\nCác chuyên gia cho rằng, giá vàng tăng mạnh do nhu cầu trú ẩn an toàn của nhà đầu tư trước những bất ổn của nền kinh tế toàn cầu và các căng thẳng địa chính trị.',
    imageUrl: 'https://images.unsplash.com/photo-1610375461369-d613b564c5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80',
    sourceUrl: 'https://example.com/gia-vang-2025',
    publishedAt: new Date(),
    category: 'kinh-doanh'
  },
  {
    title: 'Đội tuyển bóng đá Việt Nam chuẩn bị cho vòng loại World Cup 2026',
    summary: 'HLV Park Hang-seo công bố danh sách 30 cầu thủ chuẩn bị cho các trận đấu vòng loại World Cup 2026 khu vực châu Á.',
    content: 'HLV Park Hang-seo vừa công bố danh sách 30 cầu thủ được triệu tập chuẩn bị cho các trận đấu vòng loại World Cup 2026 khu vực châu Á sẽ diễn ra vào tháng 6 tới.\n\nDanh sách lần này có nhiều gương mặt mới, đặc biệt là các cầu thủ trẻ đang có phong độ cao tại V-League. Đáng chú ý nhất là sự trở lại của tiền đạo Nguyễn Công Phượng sau thời gian dài không được gọi lên đội tuyển quốc gia.\n\nTheo lịch, đội tuyển Việt Nam sẽ tập trung vào ngày 25/5 tại Hà Nội. Sau đó, đội sẽ có hai trận giao hữu với Thái Lan và Malaysia trước khi bước vào các trận đấu chính thức tại vòng loại World Cup 2026.\n\nỞ vòng loại thứ hai World Cup 2026 khu vực châu Á, đội tuyển Việt Nam nằm ở bảng C cùng với Nhật Bản, Australia, Saudi Arabia và Indonesia.',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80',
    sourceUrl: 'https://example.com/doi-tuyen-viet-nam-2025',
    publishedAt: new Date(),
    category: 'the-thao'
  },
  {
    title: 'Hà Nội triển khai hệ thống xe buýt điện trên toàn thành phố',
    summary: 'Hà Nội sẽ triển khai 500 xe buýt điện trên 15 tuyến mới từ tháng 7/2025, góp phần giảm ô nhiễm môi trường.',
    content: 'UBND thành phố Hà Nội vừa phê duyệt đề án triển khai 500 xe buýt điện trên 15 tuyến mới từ tháng 7/2025. Đây là một phần trong kế hoạch phát triển giao thông công cộng và giảm ô nhiễm môi trường của thành phố.\n\nTheo đề án, các xe buýt điện sẽ được trang bị công nghệ hiện đại, có thể chạy liên tục 300km sau mỗi lần sạc đầy pin. Mỗi xe có sức chứa tối đa 60 hành khách, được thiết kế thân thiện với người khuyết tật và người cao tuổi.\n\nCác trạm sạc điện sẽ được xây dựng tại các điểm đầu, cuối tuyến và một số vị trí trung chuyển. Thời gian sạc nhanh chỉ khoảng 30 phút cho phép xe hoạt động liên tục trong ngày.\n\nViệc triển khai xe buýt điện không chỉ giúp giảm lượng khí thải carbon mà còn tiết kiệm chi phí vận hành so với xe buýt truyền thống chạy bằng nhiên liệu hóa thạch.',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80',
    sourceUrl: 'https://example.com/xe-buyt-dien-2025',
    publishedAt: new Date(),
    category: 'thoi-su'
  },
  {
    title: 'Phim "Chị chị em em 3" lập kỷ lục phòng vé Việt Nam',
    summary: 'Bộ phim "Chị chị em em 3" đã thu về 150 tỷ đồng sau 2 tuần công chiếu, trở thành phim Việt có doanh thu cao nhất mọi thời đại.',
    content: 'Sau 2 tuần công chiếu, bộ phim "Chị chị em em 3" của đạo diễn Kathy Uyên đã thu về 150 tỷ đồng, chính thức vượt qua "Bố già" để trở thành phim Việt có doanh thu cao nhất mọi thời đại.\n\nBộ phim có sự tham gia của các diễn viên Thanh Hằng, Ninh Dương Lan Ngọc, Hứa Vĩ Văn và Chi Pu. Nội dung phim xoay quanh câu chuyện về hai chị em với những mâu thuẫn, hiểu lầm và hành trình hàn gắn đầy cảm động.\n\nThành công của "Chị chị em em 3" không chỉ đến từ doanh thu phòng vé mà còn nhận được nhiều lời khen ngợi từ giới phê bình về kịch bản chặt chẽ, diễn xuất tinh tế của dàn diễn viên và hình ảnh đẹp mắt.\n\nĐạo diễn Kathy Uyên chia sẻ: "Thành công của phim là minh chứng cho thấy khán giả Việt đang ngày càng ủng hộ phim nội địa chất lượng cao. Đây là động lực lớn cho toàn bộ đội ngũ làm phim và điện ảnh Việt Nam nói chung."',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80',
    sourceUrl: 'https://example.com/chi-chi-em-em-3-2025',
    publishedAt: new Date(),
    category: 'giai-tri'
  }
];

async function seedDatabase() {
  try {
    // Kiểm tra xem đã có dữ liệu trong database chưa
    const count = await Article.count();
    
    // Chỉ thêm dữ liệu mẫu nếu database trống
    if (count === 0) {
      // Thêm dữ liệu mẫu
      for (const article of sampleArticles) {
        await Article.create(article);
      }
      
      logger.info(`Đã thêm ${sampleArticles.length} bài viết mẫu vào database`);
      console.log(`Đã thêm ${sampleArticles.length} bài viết mẫu vào database`);
    } else {
      logger.info(`Database đã có ${count} bài viết, không cần thêm dữ liệu mẫu`);
      console.log(`Database đã có ${count} bài viết, không cần thêm dữ liệu mẫu`);
    }
  } catch (error) {
    logger.error(`Lỗi khi thêm dữ liệu mẫu: ${error.message}`);
    console.error('Lỗi khi thêm dữ liệu mẫu:', error);
  }
}

// Chạy hàm seed
seedDatabase();