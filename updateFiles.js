const fs = require('fs');
const sysPath = require('path');
const templates = fs.readdirSync(sysPath.resolve(__dirname, "packages"));
let vueTemplates = templates.filter((template) => template.indexOf("vue") > -1)
let reactTemplates = templates.filter((template) => template.indexOf("vue") == -1)

copy("vue template", "vue")
copy("react template", "react")
copy("template")

async function copy(src, type) {
  // 读取目录中的所有文件/目录
  let paths = fs.readdirSync(sysPath.join(__dirname, src));
  for (let i = 0; i < paths.length; i++) {
    let _src = src + '/' + paths[i];
    let fileStat = await stat(sysPath.join(__dirname, _src))
    // 判断是否为文件
    if (fileStat.isFile()) {
      let tempPath = _src.split("/")
      tempPath.shift()
      tempPath = tempPath.join("/")
      let packages = type === undefined ? templates : type == "vue" ? vueTemplates : reactTemplates
      packages.forEach((packageName) => {
        let targetPath = sysPath.resolve(__dirname, `packages/${packageName}/${tempPath}`)
        fs.copyFile(sysPath.join(__dirname, _src), targetPath, (err) => {
          if (err) {
            throw new Error("复制出错")
          }
        })
      })
    }
    // 如果是目录则递归调用自身
    else if (fileStat.isDirectory()) {
      await copy(_src, type);
    }
  }
  ;
};

async function stat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}