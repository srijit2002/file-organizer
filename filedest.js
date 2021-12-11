const fileDest=new Map();
//movie
fileDest.set("mp4","videos");
fileDest.set("mkv","videos");

//archieves
fileDest.set("zip","archieve");
fileDest.set("7z","archieve");
fileDest.set("rar","archieve");
fileDest.set("tar","archieve");
fileDest.set("gz","archieve");
fileDest.set("iso","archieve");

//docs
fileDest.set("doc","documents");
fileDest.set("docx","documents");
fileDest.set("xlsx","documents");
fileDest.set("xlx","documents");
fileDest.set("odt","documents");
fileDest.set("ods","documents");
fileDest.set("txt","documents");
fileDest.set("pdf","documents");
fileDest.set("csv","documents");

//music
fileDest.set("mp3","musics");

//images
fileDest.set("png","images");
fileDest.set("jpg","images");
fileDest.set("jpeg","images");
fileDest.set("svg","images");
fileDest.set("PNG","images");

//codes
fileDest.set("html","codes");
fileDest.set("css","codes");
fileDest.set("js","codes");
fileDest.set("scss","codes");
fileDest.set("java","codes");
fileDest.set("c","codes");
fileDest.set("cpp","codes");
fileDest.set("gitignore","codes");
fileDest.set("json","codes");
fileDest.set("yaml","codes");
fileDest.set("py","codes");
fileDest.set("ts","codes");
fileDest.set("md","codes");
fileDest.set("php","codes");
fileDest.set("tsx","codes");
fileDest.set("jsx","codes");
fileDest.set("jar","codes");


fileDest.set("msi","apps");
fileDest.set("exe","apps");
fileDest.set("jre","apps");

export default fileDest;
