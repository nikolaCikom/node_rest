import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const modifiedname = originalname.replace(/\s/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + modifiedname);
  },
});

const upload = multer({ storage: storage });

export default upload;
