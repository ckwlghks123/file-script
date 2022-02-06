const path = require("path");
const os = require("os");
const fs = require("fs");

const folder = path.join(__dirname, process.argv[2]);
console.log(__dirname);
if (!folder || !fs.existsSync(folder)) {
  console.error("type folder name");
  return;
}

fs.promises.readdir(folder).then(classFile).catch(console.log);

function classFile(files) {
  file.forEach((file) => {
    console.log(file);
    if (isCaptured(file)) {
      move(file, capturedDir);
    } else if (isVideo(file)) {
      move(file, videoDir);
    } else if (isDuplicate(file, files)) {
      move(file, duplicatedDir);
    }
  });
}

function isCaptured(file) {
  const regex = /(png|aae)$/gm;
  const match = file.match(regex);

  return !!match;
}

function isVideo(file) {
  const regex = /(mov|mp4)$/gm;
  const match = file.match(regex);

  return !!match;
}

function isDuplicate(file, files) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }

  const edit = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edit));

  return !!found;
}

function move(file, dir) {}
