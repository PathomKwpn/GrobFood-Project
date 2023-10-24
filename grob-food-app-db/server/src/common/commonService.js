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

async function uploadFileByBase64(base64, lastnameFile) {
  const fs = require("fs");
  const data = base64; // Remove header    let base64file = data.split(';base64,').pop();    let header = data.split(';base64,');
  const filename = +new Date();
  fs.writeFile(
    "./file_upload/" + filename + "." + lastnameFile,
    base64file,
    { encoding: "base64" },
    function (err) {}
  );
  let body = {
    path_file: "/file_upload" + "/" + filename + "." + lastnameFile,
    header: header[0] + ";base64,",
  };
  return body;
}
async function pathFileToBaes64(pathImage) {
  const fs = require("fs").promises;
  return fs
    .readFile("." + pathImage, { encoding: "base64" })
    .then((results_base64) => {
      return results_base64;
    })
    .catch((err) => {
      console.log(err);
    });
  return "error"; // or you may return null or throw the error    });}
} // or you may return null or throw the error    });} module.exports.pathFileToBaes64 = pathFileToBaes64;
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
