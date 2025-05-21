const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Tạo thư mục images nếu chưa tồn tại
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Danh sách URL hình ảnh cần tải từ Unsplash
const images = [
  {
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
    filename: 'giao-duc.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    filename: 'kinh-doanh.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop',
    filename: 'the-thao.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=450&fit=crop',
    filename: 'thoi-su.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800&h=450&fit=crop',
    filename: 'giai-tri.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
    filename: 'cong-nghe.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=450&fit=crop',
    filename: 'suc-khoe.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=450&fit=crop',
    filename: 'du-lich.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=450&fit=crop',
    filename: 'khoa-hoc.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
    filename: 'am-thuc.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=450&fit=crop',
    filename: 'thoi-trang.jpg'
  }
];

// Hàm tải hình ảnh
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filePath = path.join(imagesDir, filename);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Xóa file nếu có lỗi
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Tải tất cả hình ảnh
async function downloadAllImages() {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  console.log('All images downloaded successfully!');
}

downloadAllImages();