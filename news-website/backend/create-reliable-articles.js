const Article = require('./models/Article');
const sequelize = require('./config/database');

async function createArticles() {
  try {
    // Mảng các bài viết mới với URL hình ảnh đáng tin cậy
    const newArticles = [
      {
        title: 'Xu hướng công nghệ AI sẽ định hình tương lai năm 2025',
        summary: 'Các xu hướng AI mới nhất đang thay đổi cách chúng ta làm việc, sống và tương tác với công nghệ.',
        content: `Trí tuệ nhân tạo (AI) đang phát triển với tốc độ chóng mặt và năm 2025 hứa hẹn sẽ mang đến những bước tiến đột phá trong lĩnh vực này. Dưới đây là những xu hướng AI quan trọng nhất sẽ định hình tương lai công nghệ trong năm tới.

**1. AI tạo sinh (Generative AI) tiếp tục phát triển mạnh mẽ**

Sau sự bùng nổ của ChatGPT, Midjourney và các công cụ AI tạo sinh khác, năm 2025 sẽ chứng kiến sự tiến hóa của công nghệ này với khả năng sáng tạo nội dung chất lượng cao hơn, tự nhiên hơn và đa dạng hơn. Các mô hình đa phương thức (multimodal) có thể xử lý và tạo ra nội dung kết hợp văn bản, hình ảnh, âm thanh và video sẽ trở nên phổ biến.

**2. AI nhỏ gọn (Small AI) và AI cạnh (Edge AI)**

Không phải tất cả ứng dụng AI đều cần sức mạnh tính toán khổng lồ. Xu hướng phát triển các mô hình AI nhỏ gọn, tiết kiệm năng lượng nhưng vẫn đủ mạnh để xử lý các tác vụ cụ thể sẽ tăng trưởng mạnh. Điều này cho phép triển khai AI trên các thiết bị cạnh (edge devices) như điện thoại thông minh, thiết bị IoT và các hệ thống nhúng, giảm độ trễ và tăng cường bảo mật dữ liệu.

**3. AI tự chủ (Autonomous AI)**

Các hệ thống AI tự chủ có khả năng tự học, tự điều chỉnh và đưa ra quyết định mà không cần sự can thiệp của con người sẽ trở nên phổ biến hơn. Từ xe tự lái đến robot trong nhà máy và drone giao hàng, AI tự chủ sẽ thay đổi cách chúng ta vận chuyển, sản xuất và phân phối hàng hóa.

**4. AI có trách nhiệm và đạo đức (Responsible AI)**

Khi AI ngày càng ảnh hưởng đến cuộc sống hàng ngày, nhu cầu về các hệ thống AI có trách nhiệm, minh bạch và công bằng sẽ tăng cao. Các công ty và tổ chức sẽ đầu tư nhiều hơn vào việc phát triển AI có thể giải thích được (explainable AI), giảm thiểu thiên kiến và tuân thủ các tiêu chuẩn đạo đức.

**5. AI trong chăm sóc sức khỏe**

Lĩnh vực y tế sẽ chứng kiến sự áp dụng AI mạnh mẽ hơn nữa, từ chẩn đoán bệnh và phát triển thuốc đến y học cá nhân hóa và quản lý bệnh viện. Các thuật toán AI có thể phân tích hình ảnh y tế, dự đoán nguy cơ bệnh tật và đề xuất phương pháp điều trị tối ưu cho từng bệnh nhân.

**6. AI tăng cường con người (Human-AI Collaboration)**

Thay vì thay thế con người, AI sẽ ngày càng được sử dụng để tăng cường khả năng của con người. Các công cụ AI hỗ trợ sáng tạo, tự động hóa các tác vụ lặp đi lặp lại và cung cấp thông tin chi tiết từ dữ liệu phức tạp sẽ giúp con người làm việc hiệu quả hơn trong nhiều lĩnh vực.

**7. AI trong phát triển bền vững**

AI sẽ đóng vai trò quan trọng trong việc giải quyết các thách thức về biến đổi khí hậu và phát triển bền vững. Từ tối ưu hóa lưới điện và dự báo thời tiết chính xác đến giám sát môi trường và quản lý tài nguyên, AI có thể giúp chúng ta sử dụng hiệu quả hơn các nguồn lực hạn chế của Trái Đất.

Tuy nhiên, cùng với những cơ hội, sự phát triển nhanh chóng của AI cũng đặt ra nhiều thách thức. Các vấn đề về quyền riêng tư, an ninh mạng, thất nghiệp công nghệ và khoảng cách số sẽ cần được giải quyết thông qua sự hợp tác giữa chính phủ, doanh nghiệp và xã hội dân sự.

Năm 2025 hứa hẹn sẽ là một năm quan trọng trong hành trình phát triển AI, với những tiến bộ công nghệ mới và những ứng dụng sáng tạo có tiềm năng cải thiện cuộc sống của chúng ta theo nhiều cách khác nhau.`,
        imageUrl: 'https://via.placeholder.com/800x450/34495e/ffffff?text=AI+Technology+Trends',
        sourceUrl: 'https://example.com/ai-trends-' + Date.now(),
        publishedAt: new Date(),
        category: 'cong-nghe'
      },
      {
        title: 'Các chiến lược đầu tư thông minh trong thời kỳ lạm phát cao',
        summary: 'Những phương pháp hiệu quả để bảo vệ và phát triển tài sản trong môi trường kinh tế đầy biến động.',
        content: `Trong bối cảnh lạm phát tăng cao, việc bảo vệ và phát triển tài sản trở nên quan trọng hơn bao giờ hết. Dưới đây là những chiến lược đầu tư thông minh giúp bạn vượt qua thời kỳ lạm phát và đạt được mục tiêu tài chính dài hạn.

**1. Đầu tư vào tài sản thực**

Bất động sản, vàng, hàng hóa và các tài sản hữu hình khác thường là lựa chọn tốt trong thời kỳ lạm phát cao. Những tài sản này có xu hướng tăng giá theo lạm phát, giúp bảo vệ giá trị tài sản của bạn.

- **Bất động sản**: Đầu tư vào bất động sản cho thuê có thể mang lại dòng tiền ổn định và tăng giá trị theo thời gian. Trong môi trường lạm phát, giá thuê thường tăng, giúp bù đắp tác động của lạm phát.

- **Vàng và kim loại quý**: Từ lâu, vàng đã được coi là nơi trú ẩn an toàn trong thời kỳ bất ổn kinh tế. Mặc dù giá vàng có thể biến động trong ngắn hạn, nhưng về dài hạn, nó thường giữ được giá trị thực.

- **Hàng hóa thiết yếu**: Đầu tư vào các quỹ ETF hàng hóa hoặc cổ phiếu của các công ty sản xuất hàng hóa thiết yếu như năng lượng, nông sản và kim loại công nghiệp cũng là một cách để đối phó với lạm phát.

**2. Cổ phiếu chống lạm phát**

Không phải tất cả cổ phiếu đều chịu tác động tiêu cực từ lạm phát. Một số loại cổ phiếu thậm chí có thể hưởng lợi trong môi trường lạm phát cao:

- **Cổ phiếu giá trị**: Các công ty có dòng tiền ổn định, tỷ lệ cổ tức cao và định giá hợp lý thường hoạt động tốt trong thời kỳ lạm phát.

- **Cổ phiếu của các công ty có khả năng định giá**: Những doanh nghiệp có thể dễ dàng chuyển chi phí tăng cao sang cho khách hàng mà không làm giảm nhu cầu sẽ ít bị ảnh hưởng bởi lạm phát. Ví dụ: các công ty tiêu dùng thiết yếu, chăm sóc sức khỏe và năng lượng.

- **Cổ phiếu của các công ty tài nguyên**: Các công ty khai thác dầu khí, khai khoáng và lâm nghiệp thường hưởng lợi khi giá hàng hóa tăng do lạm phát.

**3. Trái phiếu được bảo vệ khỏi lạm phát**

Trái phiếu thông thường thường không phải là lựa chọn tốt trong thời kỳ lạm phát cao vì lãi suất cố định của chúng bị ăn mòn bởi lạm phát. Tuy nhiên, có một số loại trái phiếu được thiết kế đặc biệt để bảo vệ nhà đầu tư khỏi lạm phát:

- **Trái phiếu chống lạm phát của chính phủ (TIPS)**: Loại trái phiếu này điều chỉnh cả gốc và lãi theo chỉ số giá tiêu dùng (CPI), giúp bảo vệ nhà đầu tư khỏi lạm phát.

- **Trái phiếu lãi suất thả nổi**: Lãi suất của những trái phiếu này thay đổi theo lãi suất thị trường, thường tăng khi lạm phát tăng.

**4. Đa dạng hóa quốc tế**

Đầu tư vào các thị trường quốc tế có thể giúp phân tán rủi ro và tận dụng cơ hội từ các nền kinh tế có tốc độ lạm phát khác nhau:

- **Thị trường mới nổi**: Một số thị trường mới nổi có thể mang lại lợi nhuận cao hơn, bù đắp tác động của lạm phát ở thị trường nội địa.

- **Tiền tệ mạnh**: Đầu tư vào các đồng tiền của các quốc gia có chính sách tiền tệ thắt chặt và tỷ lệ lạm phát thấp có thể giúp bảo vệ giá trị tài sản.

**5. Đầu tư vào bản thân**

Một trong những cách tốt nhất để đối phó với lạm phát là đầu tư vào việc nâng cao kỹ năng và khả năng kiếm tiền của bạn:

- **Giáo dục và đào tạo**: Nâng cao trình độ chuyên môn có thể giúp bạn tăng thu nhập, vượt qua tác động của lạm phát.

- **Khởi nghiệp hoặc kinh doanh phụ**: Xây dựng nguồn thu nhập bổ sung thông qua kinh doanh nhỏ hoặc công việc tự do có thể tăng khả năng tài chính của bạn.

**Lời khuyên cuối cùng**

Không có chiến lược đầu tư nào hoàn hảo cho mọi người trong thời kỳ lạm phát. Điều quan trọng là xây dựng một danh mục đầu tư đa dạng phù hợp với mục tiêu tài chính, khả năng chịu đựng rủi ro và khung thời gian đầu tư của bạn.

Hãy nhớ rằng, đầu tư là một hành trình dài hạn. Thay vì phản ứng quá mức với các biến động ngắn hạn, hãy tập trung vào việc xây dựng một danh mục đầu tư vững chắc có thể vượt qua các chu kỳ kinh tế khác nhau, bao gồm cả thời kỳ lạm phát cao.`,
        imageUrl: 'https://via.placeholder.com/800x450/2ecc71/ffffff?text=Investment+Strategies',
        sourceUrl: 'https://example.com/investment-strategies-' + Date.now(),
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