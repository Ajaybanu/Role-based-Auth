import FileModel from "../models/fileModel.js";


// file upload
export const uploadFileController = async (req, res) => {
  try {
    const files = req.files;
    const user = req.user; 
    const fileRecords = files.map(file => ({
      user: user._id,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    }));
    const savedFiles = await File.create(fileRecords);

    res.status(201).json(savedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error in file upload' });
  }
};


//listing

export const listFilesController = async (req, res) => {
    try {
        const user = req.user; 
        const userFiles = await File.find({ user: user._id });
        res.status(200).json(userFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error in listing files' });
    }
  };

  //deleting file
  
  export const deleteFileController = async (req, res) => {
    try {
        const user = req.user; 
        const fileId = req.params.fileId;
        const file = await File.findOne({ _id: fileId, user: user._id });
        if (!file) {
          return res.status(404).json({ success: false, error: 'File not found or does not belong to the user' });
        }
        await File.deleteOne({ _id: fileId });
        res.status(200).json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error in deleting the file", error });
    }
  };