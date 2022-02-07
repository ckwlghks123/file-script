const path = require("path");
const os = require("os");
const fs = require("fs");
const { info } = require("console");

const folder = path.join(__dirname, process.argv[2]);
console.log(__dirname);
if (!folder || !fs.existsSync(folder)) {
  console.error("type folder name");
  return;
}

fs.promises.readdir(folder).then(classFile).catch(console.log);

const capturedDir = path.join(folder, "captured");
const videoDir = path.join(folder, "video");
const duplicatedDir = path.join(folder, "duplicated");

function classFile(files) {
  files.forEach((file) => {
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

function move(file, dir) {
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  console.info(`move ${file} to ${dir}`);

  const oldPath = path.join(folder, file);
  const newPath = path.join(dir, file);
  fs.promises.rename(oldPath, newPath).catch(console.error);
}
