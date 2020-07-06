const formidable = require('formidable');
const fs = require('fs')
const crypto = require('crypto');
const {Response} = require('../utils/response');
const logger = require('../logger');

  async function UploadImage(req, res) {
    try {
      const form = new formidable.IncomingForm({});
      form.parse(req);
      const fileName = crypto.randomBytes(8).toString('hex');
      form.on('fileBegin', (name, file) => {
        const isValidFormat = validateFile(file);
        if (!isValidFormat.success) {
          return res.json(isValidFormat);
        }
        file.path = `images/${isValidFormat.fileName}_${fileName}.${isValidFormat.fileExtension}`;
        filePath = file.path;
        form.on('file', (name, fileData) => {
          const sizeInMB = (fileData.size) / 1000000;
          if (sizeInMB > 25) {
            return res.json({
              success: false,
              msg: 'Maximum file Size is 25MB',
            });
          }
          if (fileData) {
            fs.createReadStream(fileData.path);
            return Response(res,200,"Success",filePath)
          }
        })

      })
  
      form.on('end', () => {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          throw new Error(err);
        }
      });
  
      form.on('error', (msg) => {
        try {
          if (msg) {
            return res.json({
              success: false,
              msg: 'Can\'t upload the file',
            });
          }
        } catch (err) {
          throw new Error(`Error while uploading file ${err}`);
        }
      });
    } catch (err) {
      throw new Error(`Can't upload the File ${err}`);
    }
  }



  function validateFile(file) {
    try {
      const allowdedFileExtensions = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/jpg',
        'image/tiff',
        'image/webp',
        'application/pdf',
        'application/doc',
        'application/docx',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      const fileExtension = file.name.split('.').pop();
      const fileName = file.name.split('.')[0].split(' ').join('_');
      if (file.name.includes('/')) {
        return {
          success: false,
          msg: 'Abnormal File Name',
        };
      }
      if (file.name.length > 255) {
        return {
          success: false,
          msg: 'Abnormal File Length',
        };
      }
      if (allowdedFileExtensions.includes(file.type)) {
        return {
          success: true,
          fileExtension,
          fileName,
        };
      }
      return {
        success: false,
        msg: 'Abnormal File',
      };
    } catch (err) {
      throw new Error(`Can't validate File Extension ${err}`);
    }
  }
  

module.exports = {UploadImage}