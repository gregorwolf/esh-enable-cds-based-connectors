const fs = require('fs')
const nunjucks = require('nunjucks')
// Read CDS Views from textfile
var myArgs = process.argv.slice(2)
var viewsString = fs.readFileSync(myArgs[0],'utf8')
var views = viewsString.split("\n")
// Templates
var asddlxsNjk = fs.readFileSync('asddlxs.njk','utf8')
var asddlxsFilenameNjk = "z{{ CDSview | lower }}.ddlx.asddlxs"
var abapGitXMLNjk = fs.readFileSync('xml.njk','utf8')
var abapGitXMLFilenameNjk = "z{{ CDSview | lower }}.ddlx.xml"
// console.log(asddlxsNjk)
nunjucks.configure({ autoescape: true })
for (let index = 0; index < views.length; index++) {
  const element = views[index]
  if(element) {
    let data = { CDSview: element }
    let asddlxs = nunjucks.renderString(asddlxsNjk, data)
    let asddlxsFilename = nunjucks.renderString(asddlxsFilenameNjk, data)
    let abapGitXML = nunjucks.renderString(abapGitXMLNjk, data)
    let abapGitXMLFilename = nunjucks.renderString(abapGitXMLFilenameNjk, data)
    fs.writeFileSync("gen/"+asddlxsFilename, asddlxs)
    fs.writeFileSync("gen/"+abapGitXMLFilename, abapGitXML)  
  }
}
