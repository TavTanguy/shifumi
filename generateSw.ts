import { readFileSync, writeFileSync, readdirSync } from "fs";
interface AppInfo {
  name: string;
  version: string;
  publicFiles: string[];
}
const dirPublicFiles = "./dist/";

const packageInfo = JSON.parse(readFileSync("./package.json", { encoding: "utf-8" }));
const publicFiles: string[] = [];
(function exploreDir(path: string, setPath: string) {
  const arr = readdirSync(path, { encoding: "utf-8" });
  arr.map(el => {
    if (el.includes(".")) {
      if (el !== "sw.js") publicFiles.push(setPath + el);
    } else exploreDir(path + el + "/", setPath + el + "/");
  });
})(dirPublicFiles, "/");

const appInfos: AppInfo = {
  name: packageInfo.name,
  version: packageInfo.version,
  publicFiles
};

let sw = readFileSync("./sw/index.js", { encoding: "utf-8" });
sw = `const appInfo = ${JSON.stringify(appInfos)} /*` + sw;
writeFileSync("./dist/sw.js", sw, { encoding: "utf-8" });
