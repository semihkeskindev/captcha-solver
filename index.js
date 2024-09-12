const sharp = require('sharp');
const Tesseract = require('tesseract.js');

// Captcha görüntüsünü işleyip OCR aracılığıyla okumak için fonksiyon
async function processCaptcha(imagePath) {
    try {
        const outputImagePath = 'processed_captcha.png'; // PNG'ye dönüştürülmüş ve işlenmiş captcha

        // GIF dosyasını PNG formatına çevirip gri tonlama, kontrast ve parlaklık işlemi yap
        await sharp(imagePath)
            .png() // PNG formatına çevir
            .grayscale() // Gri tonlama
            .modulate({ brightness: 1.2, contrast: 1.5 }) // Parlaklık ve kontrastı artır
            .toFile(outputImagePath); // İşlenmiş PNG dosyasını kaydet

        console.log(`Görsel başarıyla ${outputImagePath} olarak kaydedildi.`);

        // OCR işlemi başlat
        Tesseract.recognize(
            outputImagePath,
            'eng', // Dil ayarı
            {
                //logger: m => console.log(m), // İşlem sürecini izlemek için
            }
        ).then(({ data: { text } }) => {
            console.log(`Captcha kodu: ${text.trim()}`);
        });

    } catch (error) {
        console.error('Hata oluştu:', error);
    }
}

// Örnek kullanım
processCaptcha('./captcha.gif');  // captcha1.gif dosyanızın yolunu girin
