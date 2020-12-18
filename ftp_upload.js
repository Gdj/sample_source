var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: "turfrain",
    password: "",
    host: "turfrain.co.kr",
    port: 21,
    localRoot: __dirname + "/",         // 업로드 경로
    remoteRoot: "/HDD2/www/samplecode/",           // 서버경로
    // include: ["*", "**/*"],               // 업로드 파일 형식
    include: ["*.*"],
    // 제외파일
    exclude: ["**/*.map", "node_modules", ".git", ".svn"],
    // true 인 경우 업로드하기 전에 대상에서 기존 파일을 모두 삭제합니다.
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
};
 
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));

/*
  실행 : 
  node ftp_upload
  
*/