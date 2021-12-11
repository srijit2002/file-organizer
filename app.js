#!/usr/bin/env node

import organizeFolder,{ addToFolder } from "./organizeFolder.js";
import showError from "./error.js";
import fs from "fs";
import fileDest from "./filedest.js";
import path from "path"
//taking the user input
const argumentsProvidedByUser = process.argv.slice(2);

const command = argumentsProvidedByUser[0];
if (argumentsProvidedByUser[1] === "--help") {
  showError(
    `
    organizer organize <sourcefolder>[optional] <destinationfolder>[optional] --> organizes the folder in directory
    
    organizer organize <sourcefile>[optional] <destinationfolder>[optional] --> organizes the single file in directory
    
    organizer organize --set <extension-type> <folder-name> --> set new folder for file type (js, html etc).
    
    organizer organize --help -->shows details about all the commands
    `,
    "success"
  );
} else if (argumentsProvidedByUser[1] === "--set") {
  const extension = argumentsProvidedByUser[2];
  const folderType = argumentsProvidedByUser[3];
  if (!extension || !folderType) {
    showError("Too few arguments passed", "error");
    showError(
      "Type organizer organize --help to get details about the commands",
      "success"
    );
  } else {
    fileDest.set(extension, folderType);
  }
} else {
  //if path is provided then use it else use the current directory
  const sourcePath = !argumentsProvidedByUser[1]
    ? process.cwd()
    : argumentsProvidedByUser[1];
  const destinationPath = !argumentsProvidedByUser[2]
    ? process.cwd()
    : argumentsProvidedByUser[2];

  //checking if the path provided is a valid path or not
  if (!fs.existsSync(destinationPath) || !fs.existsSync(sourcePath)) {
    showError("please provide a valid path", "error");
  } else {
    showError("Organization started...", "success");
    try {
      if (fs.lstatSync(sourcePath).isFile()) {
        const fileType = path.extname(sourcePath).slice(1);

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
        addToFolder(sourcePath, folderDestinationPath);
      } else {
        organizeFolder(sourcePath, destinationPath);
      }
    } catch (error) {
      showError(error, "error");
    }
  }
}
