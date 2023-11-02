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
    let token = jwt.sign({ data: data }, key, { expiresIn: "60m" });
    return token;
  } catch (error) {
    console.log(error);
  }
};
function uploadFileByBase64(base64, lastnameFile) {
  const fs = require("fs");
  const data = base64; // Remove header    let base64file = data.split(';base64,').pop();    let header = data.split(';base64,');
  let base64file = data.split(";base64,").pop();

  const filename = +new Date();
  console.log(base64file, "base64file");

  fs.writeFile(
    "./file_upload/" + filename + "." + lastnameFile,
    base64file,
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
    //  fs.readFile("." + pathImage, { encoding: "base64" });
    const data = fs.readFileSync("." + pathImage, { encoding: "base64" });
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
function deleteFile(pathImage) {
  const fs = require("fs");
  fs.unlinkSync("." + pathImage, (err) => {
    if (err) {
      console.log(`An error occurred ${err.message}`);
    } else {
      console.log(`Deleted the file under ${pathImage}`);
    }
  });
}
module.exports = {
  // ส่งออก service
  commonService: {
    encrypted,
    decrypted,
    deleteFile,
    generateToken,
    uploadFileByBase64,
    pathFileToBaes64,
  },
};
