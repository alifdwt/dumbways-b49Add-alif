const multer = require("multer");
const path = require("path"); // Import modul 'path'

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); // Menggunakan path absolut untuk direktori "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({
  storage: store,
});

module.exports = upload;
