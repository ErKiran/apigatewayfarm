const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  })

function UploadImage(req, res){
    const upload = multer({ storage }).single('name-of-input-key')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      res.json(req.file)
    })
  }

module.exports = {UploadImage}