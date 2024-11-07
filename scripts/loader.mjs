import fs from "fs";
import path from "path";

/**
 *
 * @param {string} filepath
 * @returns {import("./types").SPK.SpkFile}
 */
export function load_spk_raw(filepath) {
  if (typeof filepath !== "string") {
    throw new Error("filepath must be a string");
  }
  filepath = path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);
  const data = fs.readFileSync(filepath, "utf8");

  return JSON.parse(data);
}

/**
 *
 * @param {string} filepath
 * @returns
 */
export function read_spk_info(filepath) {
  filepath = path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);
  const spk_raw = load_spk_raw(filepath);
  const filename = path
    .relative(path.join(process.cwd(), "spks"), filepath)
    .replace(/\\/g, "/");
  return {
    id: spk_raw.data.id,
    ...spk_raw.data.meta.data,
    filename,
    url: `https://github.com/lenML/Speech-AI-Forge-spks/raw/refs/heads/main/spks/${filename}`,
  };
}
