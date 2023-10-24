const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//ENCRYPTED
const encrypted = async (data) => {
  // encryped รหัสผ่าน
  try {
    let algo = "aes256";
    let key = "pathomgrobfood123";

    let cipher = crypto.Cipher(algo, key);
    let encrypted = cipher.update(data, "utf8", "hex") + cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.log(error);
  }
};

//DECRYPTED
const decrypted = async (data) => {
  try {
    let algo = "aes256";
    let key = "pathomgrobfood123";

    let decipher = crypto.Decipher(algo, key);
    let decrypted =
      decipher.update(data, "hex", "utf8") + decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.log(error);
  }
};

//GENERATE-TOKEN
const generateToken = async (data) => {
  try {
    let key = "pathomgrobfood123";
    let token = jwt.sign({ data: data }, key, { expiresIn: "30m" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

function uploadFileByBase64(base64, lastnameFile) {
  // console.log(base64, "base64");
  const fs = require("fs");
  const data = base64; // Remove header    let base64file = data.split(';base64,').pop();    let header = data.split(';base64,');
  let base64file = data.split(";base64,").pop();
  // let header = data.split(";base64,");
  const filename = +new Date();
  console.log(base64file, "base64file");
  // fs.writeFile(
  //   "./file_upload/" + filename + "." + lastnameFile,
  //   base64file,
  //   function (err) {}
  // );
  fs.writeFile(
    "./file_upload/" + filename + "." + lastnameFile,
    data,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );

  let body = "/file_upload" + "/" + filename + "." + lastnameFile;

  return body;
}
function pathFileToBaes64(pathImage) {
  const fs = require("fs");
  const addFontPathImage = `data:image/png;base64,${pathImage}`;
  try {
    const data = fs.readFileSync("." + pathImage).toString();
    return data;
  } catch (err) {
    console.error(err);
  }
  // const fs = require("fs");
  // const data = fs.readFile("." + pathImage);
  // console.log(data);
  // const fs = require("fs");
  // const data = fs.readFile("." + pathImage, (err, inputD) => {
  //   if (err) throw err;
  //   return inputD.toString();
  // });
  //   const base64 = fs.readFile(
  //     "." + pathImage,
  //     { encoding: "base64" },
  //     (err, data) => {
  //       if (err) {
  //         console.error(err);
  //       }
  //       return data;
  //     }
  //   );
  //   console.log(base64);
  // }
}
module.exports = {
  // ส่งออก service
  commonService: {
    encrypted,
    decrypted,
    generateToken,
    uploadFileByBase64,
    pathFileToBaes64,
  },
};
