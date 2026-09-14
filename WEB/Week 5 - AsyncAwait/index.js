import fs from "fs";

function writePromisifiedVersionOfReadFile(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (data) {
                resolve(data);
            }
            if (err) {
                reject(err);
            }
        })
    })
}

// writePromisifiedVersionOfReadFile('a.txt', 'UTF-8')
//     .then((data) => {
//         console.log(data);
//         writePromisifiedVersionOfReadFile('b.txt', 'UTF-8')
//             .then((data) => {
//                 console.log(data);
//                 writePromisifiedVersionOfReadFile('c.txt', 'UTF-8')
//                     .then((data) => {
//                         console.log(data);
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// instead of wrting this long and ugly code we can use morden async await syntex for more than one iterations
async function main() {
    const file1Content = await writePromisifiedVersionOfReadFile('a.txt', 'UTF-8');
    const file2Content = await writePromisifiedVersionOfReadFile('b.txt', 'UTF-8');
    const file3Content = await writePromisifiedVersionOfReadFile('c.txt', 'UTF-8');

    console.log(file1Content);
    console.log(file2Content);
    console.log(file3Content);
}

main();
console.log('HII');
console.log('HELLO JII');
