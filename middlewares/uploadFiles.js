const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/files',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb('Error: jpeg|jpg|png|gif|pdf only!');
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: (req, file, cd) => {
    checkFileType(file, cd);
  },
}).single('file');
