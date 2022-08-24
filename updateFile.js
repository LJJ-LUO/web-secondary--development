const fs = require('fs');
const sysPath = require('path');
const templates = fs.readdirSync(sysPath.resolve(__dirname, "packages"));
let vueTemplates = templates.filter((template) => {
  return template.indexOf("vue") > -1
})
let reactTemplates = templates.filter((template) => {
  return template.indexOf("vue") == -1
})
//TODO 如果多文件夹层级嵌套使用递归处理，此处简写
fs.readdir(sysPath.resolve(__dirname, "vue template"), (err, data) => {
  if (err) {
    throw new Error("没有此文件夹")
  }
  data.forEach((dirName) => {
    let fileNames = fs.readdirSync(sysPath.resolve(__dirname, `vue template/${dirName}`))
    fileNames.forEach((fileName) => {
      vueTemplates.forEach((vueTemplate) => {
        let filePath = sysPath.resolve(__dirname, `vue template/${dirName}/${fileName}`)
        let targetPath = sysPath.resolve(__dirname, `packages/${vueTemplate}/${dirName}/${fileName}`)
        console.log(filePath, targetPath);
        fs.copyFile(filePath, targetPath, (err) => {
          if (err) {
            throw new Error("复制出错")
          }
          console.log("success");
        })

      })
    })
  })
})