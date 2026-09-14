import fs from "fs"

function writePromiseForSettimeout(ms) {
    return new Promise((resolve, rejects) => {
        setTimeout(resolve, ms);
    })
}

writePromiseForSettimeout(2000)
    .then(() => {
        console.log("Time out run!!!");
    })
    .catch(() => {
        console.log("Something went wrong!!!");
    })


function writeReadFileWithPromise(path, encode) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encode, (err, data) => {
            if (data) {
                resolve(data);
            }
            if (err) {
                reject(err);
            }
        })
    })
}

function thenCallback(data) {
    console.log(data); 
}

function catchCallback(err) {
    console.log(err); 
}

writeReadFileWithPromise('a.txt', 'UTF-8')
    .then(thenCallback)
    .catch(catchCallback)