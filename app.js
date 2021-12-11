#!/usr/bin/env node

import organizeFolder, { addToFolder } from "./lib/organizeFolder.js";
import showMessage from "./lib/message.js";
import fs from "fs";
import fileDest from "./filedest.js";
import path from "path";
//taking the user input
const argumentsProvidedByUser = process.argv.slice(2);

if (argumentsProvidedByUser.length == 0) {
  showMessage("Too few arguments", "error");
  showMessage(`type <organizer organize --help> to get list of comments`,"success");
} else {
  if (argumentsProvidedByUser[1] === "--help") {
    showMessage(
      `
      organizer organize <sourcefolder>[optional] <destinationfolder>[optional] -m[optional](Moves the files instead of copying)
      
      organizer organize <sourcefile>[optional] <destinationfolder>[optional] --> organizes the single file in directory
      
      organizer organize --help --> shows details about all the commands
      `,
      "success"
    );
  } else {
    const doMove =
      argumentsProvidedByUser[argumentsProvidedByUser.length - 1] === "-m"
        ? true
        : false;
    //if path is provided then use it else use the current directory
    const sourcePath =
      !argumentsProvidedByUser[1] || argumentsProvidedByUser[1] === "-m"
        ? process.cwd()
        : argumentsProvidedByUser[1];
    const destinationPath = !argumentsProvidedByUser[2]
      ? process.cwd()
      : argumentsProvidedByUser[2];

    //checking if the path provided is a valid path or not
    if (
      argumentsProvidedByUser[1] !== "-m" &&
      (!fs.existsSync(destinationPath) || !fs.existsSync(sourcePath))
    ) {
      showMessage("please provide a valid path", "error");
    } else {
      showMessage("Organization started...", "success");
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
          addToFolder(sourcePath, folderDestinationPath, doMove);
        } else {
          organizeFolder(sourcePath, destinationPath, doMove);
        }
      } catch (error) {
        showMessage(error, "error");
      }
    }
  }
}
