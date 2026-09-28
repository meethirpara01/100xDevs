import fs from "fs";

function parallelPromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "UTF-8", (err, data) => {
            if (data) {
                resolve();
            }
            else {
                reject(err);
            }
        })
    })
}

parallelPromise("content.txt")
    .then(() => {
        console.log("File 1 has been reader!!!");
    })
    
parallelPromise("contentPrefix2.txt")
    .then(() => {
        console.log("File 2 has been reader!!!");
    })
    
parallelPromise("contentPrefix3.txt")
    .then(() => {
        console.log("File 3 has been reader!!!");
    })

setTimeout(() => {
    console.log("3000 Second Passed!!!");
}, 3000);

setTimeout(() => {
    console.log("000 Second Passed!!!");
}, 0);

