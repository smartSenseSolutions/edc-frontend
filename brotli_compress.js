let fs = require("fs");
let zlib = require("zlib");

fs.readdirSync("dist/edc-frontend").forEach((file) => {
  if (file.endsWith(".js") || file.endsWith(".css") || file.endsWith(".html")) {
    const result = zlib.brotliCompressSync(
      fs.readFileSync("dist/edc-frontend/" + file)
    );
    fs.writeFileSync("dist/edc-frontend/" + file + ".br", result);
  }
});
