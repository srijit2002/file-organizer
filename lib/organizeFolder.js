import fs from "fs";
import path from "path";
import fileDest from "../filedest.js";
import showMessage from "./message.js";

const addToFolder = (sourceFile, destinationPath, doMove) => {
  //check if folder exists and if it does not create a new one
  try {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    const finalPath = path.join(destinationPath, path.basename(sourceFile));
    fs.copyFileSync(sourceFile, finalPath);
    if (doMove) fs.unlinkSync(sourceFile);
  } catch (error) {
    showMessage(error, "error");
  }
};

const organizeFolder = (sourcePath, destinationPath, doMove) => {
  const nameOfFilesInDirectory = fs.readdirSync(sourcePath);

  for (let fileName of nameOfFilesInDirectory) {
    const filePath = path.join(sourcePath, fileName);

    //first check if it is a file or not
    if (fs.lstatSync(filePath).isFile()) {
      //get the file type
      const fileType = path.extname(filePath).slice(1);

      //get the destination path
      let folderDestinationPath;
      if (fileDest.has(fileType)) {
        folderDestinationPath = path.join(
          destinationPath,
          fileDest.get(fileType)
        );
      } else {
        folderDestinationPath = path.join(destinationPath, "others");
      }

      //copy file to folder
      addToFolder(filePath, folderDestinationPath, doMove);
    }
  }
};

export default organizeFolder;
export { addToFolder };
