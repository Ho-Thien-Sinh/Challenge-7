const Article = require('./models/Article');
const sequelize = require('./config/database');

async function createArticles() {
  try {
    // Mảng các bài viết mới
    const newArticles = [
      {
        title: 'Khám phá vẻ đẹp của Vịnh Hạ Long - Di sản thiên nhiên thế giới',
        summary: 'Vịnh Hạ Long - kỳ quan thiên nhiên với hàng nghìn hòn đảo đá vôi và hang động kỳ thú, điểm đến không thể bỏ qua khi du lịch Việt Nam.',
        content: `Vịnh Hạ Long nằm ở phía Đông Bắc Việt Nam, thuộc tỉnh Quảng Ninh, cách Hà Nội khoảng 170km. Đây là một trong những di sản thiên nhiên thế giới được UNESCO công nhận và là điểm du lịch nổi tiếng bậc nhất Việt Nam.

Với diện tích khoảng 1.553 km² bao gồm 1.969 hòn đảo đá vôi, trong đó có 989 đảo có tên và 980 đảo chưa được đặt tên, Vịnh Hạ Long tạo nên một quần thể cảnh quan thiên nhiên tuyệt đẹp. Các đảo đá vôi với nhiều hình thù kỳ lạ như Hòn Đầu Người, Hòn Rồng, Hòn Gà Chọi... đã trở thành biểu tượng của du lịch Việt Nam.

Ngoài vẻ đẹp của các đảo đá, Vịnh Hạ Long còn nổi tiếng với hệ thống hang động tuyệt đẹp như hang Sửng Sốt, hang Đầu Gỗ, hang Thiên Cung... Mỗi hang động đều mang một vẻ đẹp riêng với những nhũ đá, măng đá được hình thành qua hàng triệu năm.

Du khách đến Vịnh Hạ Long có thể tham gia nhiều hoạt động thú vị như: du thuyền ngắm cảnh, chèo thuyền kayak, tham quan làng chài, tắm biển tại các bãi tắm đẹp như Ti Tốp, Soi Sim, hay thưởng thức hải sản tươi ngon đặc trưng của vùng biển Quảng Ninh.

Thời điểm lý tưởng để khám phá Vịnh Hạ Long là từ tháng 3 đến tháng 11, khi thời tiết dễ chịu và ít mưa. Đặc biệt, ngắm bình minh hoặc hoàng hôn trên vịnh là trải nghiệm không thể bỏ qua khi đến đây.`,
        imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80',
        sourceUrl: 'https://example.com/vinh-ha-long-' + Date.now(),
        publishedAt: new Date(),
        category: 'du-lich'
      },
      {
        title: 'Công nghệ AI đang thay đổi ngành y tế như thế nào?',
        summary: 'Trí tuệ nhân tạo (AI) đang mang đến những bước tiến đột phá trong chẩn đoán, điều trị và quản lý bệnh nhân, hứa hẹn một tương lai y tế thông minh hơn.',
        content: `Trí tuệ nhân tạo (AI) đang tạo ra cuộc cách mạng trong ngành y tế toàn cầu, mang đến những tiến bộ vượt bậc trong chẩn đoán, điều trị và chăm sóc bệnh nhân.

Một trong những ứng dụng nổi bật nhất của AI trong y tế là hỗ trợ chẩn đoán hình ảnh. Các thuật toán học máy có thể phân tích hình ảnh X-quang, CT scan, MRI với độ chính xác cao, giúp phát hiện sớm các dấu hiệu của ung thư, đột quỵ, và nhiều bệnh lý khác. Nghiên cứu gần đây cho thấy một số hệ thống AI có thể phát hiện ung thư vú từ hình ảnh mammogram với độ chính xác ngang bằng hoặc thậm chí cao hơn các bác sĩ X-quang giàu kinh nghiệm.

Trong lĩnh vực dược phẩm, AI đang đẩy nhanh quá trình phát triển thuốc mới. Các công ty như DeepMind của Google đã sử dụng AI để dự đoán cấu trúc protein - một bước quan trọng trong việc thiết kế thuốc. Điều này có thể rút ngắn thời gian phát triển thuốc từ nhiều năm xuống còn vài tháng, tiết kiệm hàng tỷ đô la chi phí nghiên cứu.

AI cũng đang cách mạng hóa việc chăm sóc cá nhân hóa. Bằng cách phân tích dữ liệu lớn từ hồ sơ y tế điện tử, thông tin di truyền và dữ liệu từ các thiết bị đeo, AI có thể đề xuất phương pháp điều trị phù hợp nhất cho từng bệnh nhân. Ví dụ, trong điều trị ung thư, AI có thể phân tích DNA của khối u để xác định phương pháp điều trị hiệu quả nhất.

Trong quản lý bệnh viện, các hệ thống AI giúp tối ưu hóa lịch trình, giảm thời gian chờ đợi và cải thiện hiệu quả sử dụng nguồn lực. Chatbot y tế được hỗ trợ bởi AI có thể trả lời các câu hỏi cơ bản của bệnh nhân, sàng lọc các trường hợp khẩn cấp và giảm tải cho nhân viên y tế.

Tuy nhiên, việc áp dụng AI trong y tế cũng đặt ra nhiều thách thức về đạo đức, quyền riêng tư và an toàn dữ liệu. Các nhà làm chính sách và chuyên gia y tế đang nỗ lực xây dựng khung pháp lý phù hợp để đảm bảo AI được sử dụng một cách có trách nhiệm và công bằng trong chăm sóc sức khỏe.

Trong tương lai, AI hứa hẹn sẽ tiếp tục mang đến những đột phá trong y tế, từ robot phẫu thuật tự động đến hệ thống dự đoán và ngăn ngừa dịch bệnh, mở ra kỷ nguyên mới của y học chính xác và cá nhân hóa.`,
        imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d15482442f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80',
        sourceUrl: 'https://example.com/ai-y-te-' + Date.now(),
        publishedAt: new Date(),
        category: 'cong-nghe'
      },
      {
        title: 'Phát hiện loài cá mập mới tại vùng biển sâu Thái Bình Dương',
        summary: 'Các nhà khoa học vừa phát hiện một loài cá mập phát sáng mới tại vùng biển sâu Thái Bình Dương, mở ra những hiểu biết mới về đa dạng sinh học đại dương.',
        content: `Một nhóm các nhà hải dương học quốc tế vừa công bố phát hiện một loài cá mập mới tại vùng biển sâu Thái Bình Dương, ở độ sâu khoảng 1.000 mét. Loài cá mập này, được đặt tên khoa học là Etmopterus luminosus, thuộc họ cá mập đèn lồng (Lanternshark) và có khả năng phát sáng sinh học đặc biệt.

Với chiều dài trung bình khoảng 40cm, Etmopterus luminosus là một trong những loài cá mập nhỏ nhất thế giới. Điểm đặc biệt của loài này là hệ thống tế bào phát sáng sinh học (bioluminescence) phân bố dọc theo thân, tạo ra ánh sáng xanh lam yếu ớt trong môi trường nước sâu tối tăm.

Tiến sĩ Maria Rodriguez, trưởng nhóm nghiên cứu từ Viện Hải dương học Scripps, cho biết: "Khả năng phát sáng của loài cá mập này có thể phục vụ nhiều mục đích, từ ngụy trang, thu hút con mồi đến giao tiếp với đồng loại. Đây là một ví dụ tuyệt vời về sự thích nghi của sinh vật với môi trường sống khắc nghiệt ở vùng biển sâu."

Phát hiện này là kết quả của chuyến thám hiểm kéo dài 3 tháng tại khu vực Rãnh Mariana và các vùng biển sâu lân cận thuộc Thái Bình Dương. Các nhà khoa học đã sử dụng tàu lặn không người lái (ROV) được trang bị camera độ phân giải cao và thiết bị lấy mẫu đặc biệt để nghiên cứu sinh vật biển sâu.

Ngoài loài cá mập mới, nhóm nghiên cứu cũng phát hiện thêm 15 loài sinh vật biển sâu khác chưa từng được mô tả trước đây, bao gồm các loài cá, giáp xác và sao biển. Những phát hiện này nhấn mạnh thực tế rằng đại dương sâu vẫn là một trong những khu vực ít được khám phá nhất trên hành tinh.

Tiến sĩ Rodriguez nhấn mạnh: "Mỗi chuyến thám hiểm đến vùng biển sâu đều mang lại những phát hiện mới, cho thấy chúng ta mới chỉ hiểu được một phần nhỏ về đa dạng sinh học của đại dương. Những phát hiện này không chỉ có giá trị khoa học mà còn nhấn mạnh tầm quan trọng của việc bảo tồn các hệ sinh thái biển sâu trước các mối đe dọa như khai thác khoáng sản đáy biển và biến đổi khí hậu."

Các mẫu vật của loài cá mập mới sẽ được lưu trữ tại Bảo tàng Lịch sử Tự nhiên Smithsonian để phục vụ nghiên cứu trong tương lai.`,
        imageUrl: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80',
        sourceUrl: 'https://example.com/ca-map-moi-' + Date.now(),
        publishedAt: new Date(),
        category: 'khoa-hoc'
      },
      {
        title: 'Cách làm bánh xèo miền Trung giòn ngon đúng vị',
        summary: 'Khám phá bí quyết làm bánh xèo miền Trung với vỏ bánh giòn, nhân đầy đặn và nước chấm đậm đà, mang hương vị đặc trưng của ẩm thực Việt Nam.',
        content: `Bánh xèo miền Trung, đặc biệt là bánh xèo Quảng Nam và Đà Nẵng, có đặc điểm nhỏ hơn, giòn hơn và có màu vàng đậm hơn so với bánh xèo miền Nam. Dưới đây là công thức chi tiết để làm món bánh xèo miền Trung thơm ngon đúng vị.

**Nguyên liệu:**

*Phần vỏ bánh:*
- 300g bột gạo
- 100g bột nghệ (hoặc 1 muỗng cà phê bột nghệ)
- 400ml nước lọc
- 100ml nước cốt dừa
- 1/2 muỗng cà phê muối
- 1 muỗng cà phê bột nở (không bắt buộc)

*Phần nhân bánh:*
- 200g thịt heo vai (thái mỏng)
- 200g tôm tươi (bóc vỏ, rửa sạch)
- 100g giá đỗ
- 1 củ hành tây (thái mỏng)
- 2 cây hành lá (thái nhỏ)
- Gia vị: muối, tiêu, bột ngọt, nước mắm

*Rau ăn kèm:*
- Xà lách
- Diếp cá
- Húng quế
- Rau thơm các loại
- Chuối chát (thái mỏng)
- Khế chua (thái mỏng)

*Nước chấm:*
- 3 muỗng canh nước mắm ngon
- 2 muỗng canh đường
- 2 muỗng canh nước cốt chanh
- 1 muỗng canh giấm
- 2 tép tỏi băm nhỏ
- 1-2 quả ớt băm nhỏ
- 100ml nước lọc ấm

**Cách làm:**

*Bước 1: Chuẩn bị bột bánh*
- Trộn đều bột gạo, bột nghệ, muối và bột nở (nếu có) trong một tô lớn.
- Từ từ đổ nước lọc vào, khuấy đều để tránh vón cục.
- Thêm nước cốt dừa, khuấy đều và để bột nghỉ ít nhất 30 phút.

*Bước 2: Chuẩn bị nhân bánh*
- Ướp thịt heo với một ít muối, tiêu, bột ngọt và nước mắm trong 15 phút.
- Tôm rửa sạch, để ráo nước.
- Giá đỗ nhặt bỏ rễ, rửa sạch và để ráo.
- Hành tây thái mỏng, hành lá thái nhỏ.

*Bước 3: Làm nước chấm*
- Hòa tan đường trong nước ấm.
- Thêm nước mắm, nước cốt chanh, giấm, tỏi băm và ớt băm.
- Khuấy đều và nếm thử, điều chỉnh vị theo khẩu vị.

*Bước 4: Đổ bánh*
- Đặt chảo chống dính lên bếp, để lửa vừa.
- Cho một ít dầu ăn vào chảo, đợi dầu nóng.
- Cho một ít thịt heo và tôm vào chảo, xào nhanh.
- Múc một muỗng canh bột bánh đổ vào chảo, xoay chảo để bột tráng đều thành một lớp mỏng.
- Rắc một ít giá đỗ, hành tây và hành lá lên trên.
- Đậy nắp chảo khoảng 2 phút.
- Mở nắp, để lửa nhỏ thêm 1-2 phút cho bánh giòn.
- Gấp đôi bánh lại và chuyển ra đĩa.

*Bước 5: Thưởng thức*
- Bánh xèo miền Trung thường được ăn kèm với rau sống, chuối chát và khế chua.
- Cuốn một miếng bánh nhỏ cùng rau sống, chuối chát và khế chua.
- Chấm vào nước mắm và thưởng thức.

**Mẹo:**
- Bột nên để nghỉ ít nhất 30 phút để bánh được giòn hơn.
- Chảo phải thật nóng trước khi đổ bột để bánh không bị dính.
- Không đổ bột quá dày sẽ làm bánh khó chín và không giòn.
- Nên ăn bánh xèo khi còn nóng để cảm nhận được độ giòn tối đa.

Bánh xèo miền Trung với vỏ bánh vàng giòn, nhân đầy đặn và nước chấm đậm đà chắc chắn sẽ làm hài lòng cả gia đình và bạn bè trong những bữa tiệc cuối tuần.`,
        imageUrl: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80',
        sourceUrl: 'https://example.com/banh-xeo-' + Date.now(),
        publishedAt: new Date(),
        category: 'am-thuc'
      },
      {
        title: 'Xu hướng thời trang bền vững đang thay đổi ngành công nghiệp may mặc',
        summary: 'Thời trang bền vững đang trở thành xu hướng chủ đạo, thúc đẩy các thương hiệu và người tiêu dùng hướng tới lối sống thân thiện hơn với môi trường.',
        content: `Trong những năm gần đây, thời trang bền vững (sustainable fashion) đã trở thành một trong những xu hướng nổi bật nhất trong ngành công nghiệp may mặc toàn cầu. Không chỉ là một trào lưu nhất thời, đây là một phong trào mang tính cách mạng, thúc đẩy sự thay đổi từ gốc rễ trong cách chúng ta sản xuất, tiêu thụ và định giá quần áo.

**Tác động của ngành công nghiệp thời trang đến môi trường**

Ngành công nghiệp thời trang hiện là một trong những ngành gây ô nhiễm lớn thứ hai trên thế giới, chỉ sau ngành dầu khí. Theo Liên Hợp Quốc, ngành này tiêu thụ nhiều năng lượng hơn ngành hàng không và vận tải biển cộng lại, đồng thời thải ra khoảng 10% lượng khí thải carbon toàn cầu.

Sản xuất quần áo tiêu tốn một lượng nước khổng lồ - ví dụ, để sản xuất một chiếc áo phông cotton cần khoảng 2,700 lít nước, tương đương với lượng nước một người uống trong 2.5 năm. Chưa kể, các chất nhuộm và hóa chất từ các nhà máy dệt may thải ra môi trường gây ô nhiễm nguồn nước nghiêm trọng.

**Xu hướng thời trang bền vững**

Nhận thức được những tác động tiêu cực này, ngày càng nhiều thương hiệu và người tiêu dùng đang hướng tới thời trang bền vững. Dưới đây là một số xu hướng chính đang định hình lại ngành công nghiệp này:

1. **Vật liệu bền vững**: Các thương hiệu đang chuyển sang sử dụng các loại vải thân thiện với môi trường như cotton hữu cơ, linen, hemp, hoặc các vật liệu tái chế từ chai nhựa, lưới đánh cá, vỏ dừa... Công ty Piñatex đã phát triển một loại da thuần chay từ sợi lá dứa, trong khi Orange Fiber tạo ra vải từ phế phẩm của quả cam.

2. **Thời trang tuần hoàn**: Mô hình kinh tế tuần hoàn trong thời trang nhấn mạnh việc tái sử dụng, tái chế và chia sẻ quần áo. Các nền tảng như Depop, ThredUp và Vestiaire Collective đã biến việc mua sắm quần áo second-hand trở nên thời thượng. Các thương hiệu như Patagonia, Eileen Fisher và H&M đều có chương trình thu hồi quần áo cũ để tái chế.

3. **Sản xuất đạo đức**: Người tiêu dùng ngày càng quan tâm đến điều kiện làm việc của công nhân may mặc. Các thương hiệu như Everlane và Reformation đang dẫn đầu về tính minh bạch, công khai thông tin về nhà máy, chi phí sản xuất và điều kiện làm việc.

4. **Thời trang chậm**: Ngược lại với "fast fashion" (thời trang nhanh) là khái niệm "slow fashion" (thời trang chậm) - tập trung vào chất lượng thay vì số lượng, thiết kế bền vững theo thời gian thay vì theo xu hướng nhất thời. Các thương hiệu như Cuyana với khẩu hiệu "Fewer, better things" (Ít hơn, tốt hơn) đang thúc đẩy triết lý này.

5. **Công nghệ xanh**: Công nghệ đang đóng vai trò quan trọng trong việc giảm tác động môi trường của ngành thời trang. Từ quy trình nhuộm không dùng nước của DyeCoo đến công nghệ blockchain giúp truy xuất nguồn gốc sản phẩm của Provenance, công nghệ đang tạo ra những giải pháp sáng tạo cho các vấn đề bền vững.

**Thương hiệu tiên phong**

Nhiều thương hiệu lớn đang dẫn đầu phong trào thời trang bền vững:

- **Stella McCartney**: Là một trong những thương hiệu xa xỉ đầu tiên cam kết không sử dụng da thật, lông thú và keo dán có nguồn gốc động vật.

- **Patagonia**: Nổi tiếng với cam kết môi trường mạnh mẽ, Patagonia sử dụng nhiều vật liệu tái chế và có chương trình sửa chữa quần áo miễn phí.

- **Reformation**: Thương hiệu này theo dõi tác động môi trường của mỗi sản phẩm thông qua "RefScale" và công khai thông tin này với khách hàng.

- **Veja**: Thương hiệu giày Pháp này sử dụng cao su tự nhiên, cotton hữu cơ và da thuộc thực vật, đồng thời đảm bảo điều kiện làm việc công bằng cho người lao động.

**Tương lai của thời trang bền vững**

Mặc dù đã có những tiến bộ đáng kể, nhưng ngành công nghiệp thời trang vẫn còn một chặng đường dài để trở nên thực sự bền vững. Các chuyên gia cho rằng cần có sự thay đổi hệ thống, bao gồm cả quy định của chính phủ, đổi mới công nghệ và thay đổi hành vi người tiêu dùng.

Tuy nhiên, với sự gia tăng nhận thức về vấn đề môi trường và xã hội, cùng với áp lực từ người tiêu dùng, đặc biệt là thế hệ Z và Millennials, tương lai của thời trang bền vững đang rất hứa hẹn. Theo một báo cáo của McKinsey, 67% người tiêu dùng coi việc sử dụng vật liệu bền vững là một yếu tố quan trọng khi mua sắm thời trang.

Thời trang bền vững không chỉ là một xu hướng nhất thời mà đang trở thành tiêu chuẩn mới cho ngành công nghiệp may mặc toàn cầu. Khi ranh giới giữa đạo đức, thẩm mỹ và chức năng ngày càng mờ nhạt, chúng ta có thể kỳ vọng vào một tương lai nơi thời trang không chỉ làm đẹp cho con người mà còn bảo vệ hành tinh của chúng ta.`,
        imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80',
        sourceUrl: 'https://example.com/thoi-trang-ben-vung-' + Date.now(),
        publishedAt: new Date(),
        category: 'thoi-trang'
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