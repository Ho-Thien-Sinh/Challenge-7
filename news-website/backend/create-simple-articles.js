const Article = require('./models/Article');
const sequelize = require('./config/database');

async function createArticles() {
  try {
    // Mảng các bài viết mới với URL hình ảnh đơn giản
    const newArticles = [
      {
        title: 'Những tiến bộ mới nhất trong công nghệ pin xe điện',
        summary: 'Các công nghệ pin mới đang giúp xe điện đạt được phạm vi hoạt động dài hơn và thời gian sạc nhanh hơn.',
        content: `Công nghệ pin xe điện đang phát triển nhanh chóng, mang lại những tiến bộ đáng kể về phạm vi hoạt động, thời gian sạc và độ bền. Những đột phá này đang giúp xe điện trở nên thực tế và hấp dẫn hơn đối với người tiêu dùng.

Một trong những tiến bộ đáng chú ý nhất là sự phát triển của pin thể rắn. Khác với pin lithium-ion truyền thống sử dụng chất điện phân lỏng, pin thể rắn sử dụng chất điện phân rắn, mang lại nhiều lợi ích như mật độ năng lượng cao hơn, thời gian sạc nhanh hơn và độ an toàn tốt hơn. Toyota và Volkswagen là hai nhà sản xuất ô tô đang đầu tư mạnh vào công nghệ này.

Một xu hướng khác là việc sử dụng vật liệu cathode không chứa cobalt. Cobalt là một thành phần quan trọng trong pin lithium-ion hiện nay, nhưng nó đắt đỏ và việc khai thác thường gây ra những lo ngại về môi trường và nhân quyền. Các nhà sản xuất như Tesla đang chuyển sang sử dụng cathode lithium iron phosphate (LFP), giúp giảm chi phí và tác động môi trường.

Công nghệ sạc nhanh cũng đang được cải thiện đáng kể. Các trạm sạc mới nhất có thể cung cấp phạm vi hoạt động 200 dặm chỉ trong 10 phút sạc. Điều này giúp giảm một trong những rào cản lớn nhất đối với việc áp dụng xe điện: lo lắng về phạm vi hoạt động và thời gian sạc.

Ngoài ra, các kỹ thuật tái chế pin tiên tiến đang được phát triển để giải quyết vấn đề về tính bền vững. Các công ty như Redwood Materials, được thành lập bởi cựu CTO của Tesla, JB Straubel, đang phát triển các quy trình để thu hồi hơn 95% vật liệu từ pin đã qua sử dụng.

Những tiến bộ này đang giúp giảm chi phí pin, một yếu tố quan trọng trong giá thành xe điện. Theo BloombergNEF, giá pin đã giảm 89% từ năm 2010 đến năm 2020, và xu hướng này dự kiến sẽ tiếp tục.

Với những đột phá công nghệ này, ngành công nghiệp xe điện đang tiến gần hơn đến mục tiêu sản xuất xe điện có giá cả phải chăng, phạm vi hoạt động dài và thời gian sạc nhanh - những yếu tố cần thiết để xe điện trở thành lựa chọn chính của người tiêu dùng.`,
        imageUrl: 'https://placehold.co/800x450/34495e/ffffff?text=Electric+Vehicle+Batteries',
        sourceUrl: 'https://example.com/ev-batteries-' + Date.now(),
        publishedAt: new Date(),
        category: 'cong-nghe'
      },
      {
        title: 'Chiến lược đầu tư vào thị trường chứng khoán trong thời kỳ lãi suất cao',
        summary: 'Các nhà đầu tư đang điều chỉnh danh mục đầu tư để thích ứng với môi trường lãi suất cao kéo dài.',
        content: `Trong bối cảnh lãi suất cao kéo dài, các nhà đầu tư đang phải điều chỉnh chiến lược đầu tư vào thị trường chứng khoán để duy trì lợi nhuận và giảm thiểu rủi ro. Dưới đây là một số chiến lược đang được các chuyên gia tài chính khuyến nghị.

Trước hết, các nhà đầu tư đang chuyển hướng từ cổ phiếu tăng trưởng sang cổ phiếu giá trị. Cổ phiếu tăng trưởng, đặc biệt là trong lĩnh vực công nghệ, thường chịu tác động tiêu cực từ lãi suất cao vì phần lớn giá trị của chúng dựa trên kỳ vọng lợi nhuận trong tương lai. Ngược lại, cổ phiếu giá trị của các công ty có dòng tiền ổn định và định giá hợp lý thường hoạt động tốt hơn trong môi trường này.

Thứ hai, các ngành có khả năng chống lại lạm phát đang được ưa chuộng. Đây là những ngành có thể dễ dàng chuyển chi phí tăng cao sang cho khách hàng mà không làm giảm nhu cầu đáng kể, như tiêu dùng thiết yếu, chăm sóc sức khỏe và năng lượng. Đặc biệt, cổ phiếu ngân hàng thường hưởng lợi từ lãi suất cao vì điều này giúp tăng biên lãi ròng của họ.

Thứ ba, đầu tư vào cổ phiếu có lịch sử trả cổ tức ổn định và tăng trưởng đang trở thành một chiến lược phổ biến. Trong thời kỳ biến động thị trường, dòng thu nhập từ cổ tức có thể cung cấp một "đệm an toàn" và giúp tổng lợi nhuận dương ngay cả khi giá cổ phiếu giảm.

Thứ tư, đa dạng hóa danh mục đầu tư trở nên quan trọng hơn bao giờ hết. Điều này không chỉ bao gồm việc đa dạng hóa giữa các loại tài sản (cổ phiếu, trái phiếu, tiền mặt) mà còn giữa các ngành và khu vực địa lý. Các thị trường quốc tế, đặc biệt là những thị trường có chu kỳ lãi suất khác với Mỹ, có thể cung cấp cơ hội đa dạng hóa.

Thứ năm, các nhà đầu tư đang áp dụng chiến lược đầu tư theo đợt (dollar-cost averaging) để giảm thiểu tác động của biến động thị trường. Thay vì đầu tư một khoản tiền lớn cùng một lúc, họ chia nhỏ khoản đầu tư theo thời gian, giúp giảm rủi ro thời điểm thị trường.

Cuối cùng, quản lý rủi ro đang được ưu tiên hơn. Điều này bao gồm việc thiết lập mức dừng lỗ, cân nhắc kỹ lưỡng tỷ lệ đòn bẩy và duy trì một khoản tiền mặt hợp lý để tận dụng cơ hội khi thị trường điều chỉnh.

Mặc dù môi trường lãi suất cao tạo ra thách thức cho thị trường chứng khoán, nhưng với chiến lược phù hợp, các nhà đầu tư vẫn có thể tìm thấy cơ hội sinh lời. Điều quan trọng là phải linh hoạt, kiên nhẫn và tập trung vào mục tiêu đầu tư dài hạn thay vì bị cuốn vào những biến động ngắn hạn của thị trường.`,
        imageUrl: 'https://placehold.co/800x450/2ecc71/ffffff?text=Stock+Market+Investment',
        sourceUrl: 'https://example.com/stock-market-' + Date.now(),
        publishedAt: new Date(),
        category: 'kinh-doanh'
      }
    ];

    // Thêm các bài viết vào cơ sở dữ liệu
    for (const article of newArticles) {
      await Article.create(article);
      console.log(`Đã tạo bài viết: ${article.title}`);
    }

    // Lấy tất cả bài viết
    const articles = await Article.findAll();
    console.log(`Tổng số bài viết hiện tại: ${articles.length}`);
  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    process.exit();
  }
}

createArticles();