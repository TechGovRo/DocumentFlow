import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import includePaths from "rollup-plugin-includepaths";

var fs = require("fs");
var fse = require("fs-extra");
var path = require('path');

var rootDir = __dirname;
while (path.basename(rootDir) !== "DocumentFlow") {
    rootDir = path.dirname(rootDir);
}
rootDir = path.normalize(rootDir + "/");


let establishmentModules = ["accounts", "blog", "chat", "content", "documentation", "errors", "forum", "localization"];

let modules = ["docmanager"];

for (let module of establishmentModules) {
    modules.push("establishment/" + module);
}

let modulesDirectories = [
    path.join(rootDir, "node_modules/stem-core/src/"),
    path.join(rootDir, "node_modules/stem-core/src/base"),
    path.join(rootDir, "node_modules/stem-core/src/data-structures"),
    path.join(rootDir, "node_modules/stem-core/src/markup"),
    path.join(rootDir, "node_modules/stem-core/src/state"),
    path.join(rootDir, "node_modules/stem-core/src/ui"),
    path.join(rootDir, "node_modules/stem-core/src/time"),
    path.join(rootDir, "node_modules/stem-core/src/ui/tabs"),
];

for (let module of modules) {
    modulesDirectories.push(path.join(rootDir, module, "/static/js"));
    modulesDirectories.push(path.join(rootDir, module, "/static/js/state"));
}

modulesDirectories.push(path.join(rootDir, "establishment/content/static/js/markup"));

modulesDirectories.push(path.join(rootDir, "node_modules"));

let includePathOptions = {
    paths: modulesDirectories,
    external: ["DocFlowPublicState"],
    extensions: [".es6.js", ".jsx", ".js"],
};

// TODO: Change this to an official .babelrc for bundling
// fse.copy(path.join(rootDir, "stemjs/src/.babelrc"), path.join(rootDir, "node_modules/.babelrc"), function(error) {
//     if (error) {
//         console.log(error);
//     }
// });

export default {
    entry: "Bundle.es6.js",
    format: "umd",
    moduleId: "Bundle",
    moduleName: "Bundle",
    plugins: [
        includePaths(includePathOptions),
        babel(),
        // uglify(),
    ],
    dest: "bundle.js",
    // sourceMap: true,
};
