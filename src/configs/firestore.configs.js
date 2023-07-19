const admin = require('firebase-admin');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json'); // Điền đúng đường dẫn đến tệp serviceAccountKey.json

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://comic-3216f.appspot.com', // Thay 'your-firebase-storage-bucket-url' bằng URL bucket của bạn
});
const bucket = admin.storage().bucket();

// Thiết lập Multer để xử lý bất kỳ tệp đính kèm nào
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn kích thước tệp lên tới 5MB
    },
});

// Hàm tải file lên Firestore
function uploadImageToFirestore(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No image file.'));
            return;
        }

        const { originalname, mimetype, buffer } = file;
        const fileExtension = path.extname(originalname);
        const fileName = `${Date.now()}_${fileExtension}`;
        const fileBlob = bucket.file(fileName);

        const blobStream = fileBlob.createWriteStream({
            metadata: {
                contentType: mimetype,
            },
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(fileBlob.name)}?alt=media`;
            resolve(publicUrl);
        });

        blobStream.end(buffer);
    });
}

module.exports = { multer, uploadImageToFirestore };
