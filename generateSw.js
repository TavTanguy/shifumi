"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var dirPublicFiles = "./dist/";
var packageInfo = JSON.parse(fs_1.readFileSync("./package.json", { encoding: "utf-8" }));
var publicFiles = [];
(function exploreDir(path, setPath) {
    var arr = fs_1.readdirSync(path, { encoding: "utf-8" });
    arr.map(function (el) {
        if (el.includes(".")) {
            if (el !== "sw.js")
                publicFiles.push(setPath + el);
        }
        else
            exploreDir(path + el + "/", setPath + el + "/");
    });
})(dirPublicFiles, "/");
var appInfos = {
    name: packageInfo.name,
    version: packageInfo.version,
    publicFiles: publicFiles
};
var sw = fs_1.readFileSync("./sw/index.js", { encoding: "utf-8" });
sw = "const appInfo = " + JSON.stringify(appInfos) + " /*" + sw;
fs_1.writeFileSync("./dist/sw.js", sw, { encoding: "utf-8" });
