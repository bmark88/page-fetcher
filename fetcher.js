const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// const path = require('path');

const request = require('request');
const url = process.argv.slice(2)[0];
const filePathToWrite = process.argv.slice(2)[1];
request(url, (error, response, body) => {

  fs.lstat(filePathToWrite, (err, stats) => {

    if (err) {
      console.log('err', err);
      fs.writeFile(filePathToWrite, `${body}`, () => {
        console.log(`Downloaded and saved ${body.length} bytes to ${filePathToWrite}`)
      });
      rl.close();
    } else {
      if (fs.existsSync(filePathToWrite)) {
        rl.question('The file already exists, would you like to overwrite the file? (Y/N)  ', (answer) => {
          if (answer === 'Y') {
            fs.writeFile(filePathToWrite, `${body}`, () => {
                console.log(`Downloaded and saved ${body.length} bytes to ${filePathToWrite}`)
            });
            rl.close();
          }

          rl.close();
        })
      } else {
        fs.writeFile(filePathToWrite, `${body}`, () => {
          console.log(`Downloaded and saved ${body.length} bytes to ${filePathToWrite}`)
        });

        rl.close();
      }
    }
  });
});