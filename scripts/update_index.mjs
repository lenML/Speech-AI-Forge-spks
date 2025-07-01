import fs from "fs";
import path from "path";
import { read_spk_info } from "./_loader.mjs";

/**
 *
 * @param {string} dirPath
 * @param {string[]} arrayOfFiles
 * @returns
 */
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 如果是目录，则递归遍历
      getAllFiles(filePath, arrayOfFiles);
    } else if (filePath.endsWith(".json")) {
      // 如果是 .json 文件，则添加到数组
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

async function main() {
  const spk_dir = path.join(process.cwd(), "spks");

  let files = getAllFiles(spk_dir).map((x) => read_spk_info(x));

  // files 根据 created_date 排序，新的在前
  files = files.sort((a, b) => b.created_date - a.created_date);

  const index_info = JSON.parse(fs.readFileSync("./index_info.json", "utf8"));
  index_info.files = files;
  fs.writeFileSync("./index.json", JSON.stringify(index_info, null, 2));

  console.log(`wrote index.json with ${files.length} spks`);
}

main().catch(console.error);
