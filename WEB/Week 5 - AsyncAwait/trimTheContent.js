import fs from 'fs';

// NORMAL SYNCHRONOUS WAY TO DO IT
// function trimTheContentSync(filepath, encoding) {
//     let content = fs.readFileSync(filepath, encoding);
//     content = content.trim();
//     fs.writeFileSync(filepath, content);
//     console.log("DONE!!!");
// }

// trimTheContent('content.txt', 'UTF-8');

// ANOTHER WAY IS ASYNC WITH CALLBACKS
// function trimTheContentWithCallBack(filepath, cb) {
//     fs.readFile(filepath, 'UTF-8', (err, data) => {
//         if (data) {
//             const content = data.trim();
//             fs.writeFile(filepath, content, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 cb();
//             });
//         }
//         if (err) {
//             console.log(err);
//         }
//     });
// }

// trimTheContent('content.txt', () => {
//     console.log("DONE!!!");
// });


// ANOTHER WAY IS PROMISES
function trimTheContentWithPromise(filepath) {
    return new Promise((resolve, rejecte) => {
        fs.readFile(filepath, 'UTF-8', (err, data) => {
            if (err) {
                rejecte(err);
            }
            else {
                const content = data.trim();
                fs.writeFile(filepath, content, (err) => {
                    if (err) {
                        rejecte(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    })
}

function thenCallBack() {
    console.log("DONE!!!");
}

function errorCallBack(err) {
    console.log(err);
}

// trimTheContentWithPromise('content.txt')
//     .then(thenCallBack)
//     .catch(errorCallBack)



// ANOTHER WAY IS ASYNC AWAIT
// WE CAN ONLY WRITE PROMISE IN THE ASYNC FUNCTIONS UNLESS IT WILL THROUGH AN ERROR
async function trimTheContentWithAsyncAwait(filepath) {
    try {
        await trimTheContentWithPromise(filepath);
        console.log("DONE!!!");
    }
    catch (err) {
        console.log("ERROR WHILE CLEANING THE FILE");
        console.log(err);
    }
}

// trimTheContentWithAsyncAwait('content.txt');



// WRITE A PROMISIFIED FUNCTION THAT TAKES A FILE PREFIX AS AN INPUT AND CLEAN ALL THE PREFIX FILES.
function cleanManyFilesWithPrefix(prefix) {
    return new Promise((resolve, reject) => {
        trimTheContentWithPromise(`${prefix}1.txt`)
            .then(() => {
                return trimTheContentWithPromise(`${prefix}2.txt`);
            })
            .then(() => {
                return trimTheContentWithPromise(`${prefix}3.txt`);
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// THIS IS EVEN BETTER WITH trimTheContentWithPromise IF WE WRITE THIS SAME FUNCTION EVERY TIME THEN CODE BECOME UGLY AND LONG
// cleanManyFilesWithPrefix('contentPrefix')
//     .then(() => {
//         console.log("ALL 3 FILES CLEANED!!!");
//     })
//     .catch((err) => {
//         console.log("ERROR WHILE CLEANING THE FILES");
//         console.log(err);
//     })


// SO WE CAN USE ASYNC AWAIT SYNTAX TO MAKE IT MORE READABLE AND CLEAN
// async function cleanManyFilesWithPrefixAsyncAwait(prefix) {
//     try {
//         await trimTheContentWithPromise(`${prefix}1.txt`);
//         await trimTheContentWithPromise(`${prefix}2.txt`);
//         await trimTheContentWithPromise(`${prefix}3.txt`);
//         console.log("ALL 3 FILES CLEANED!!!");
//     }
//     catch (err) {
//         console.log("ERROR WHILE CLEANING THE FILES");
//         console.log(err);
//     }
// }

// cleanManyFilesWithPrefixAsyncAwait('contentPrefix');


// EVEN MORE BETTER
async function cleanManyFilesWithPrefixAsyncAwait1(prefix) {
    await trimTheContentWithPromise(`${prefix}1.txt`);
    await trimTheContentWithPromise(`${prefix}2.txt`);
    await trimTheContentWithPromise(`${prefix}3.txt`);
}

// THIS FUNCTION WILL CONVERT IN TO THIS KIND OF PROMISE FUNCTION
// REMEMBER ASYNC AWAIT FUNCTION ALWAYS RETURNS A PROMISE
function cleanManyFilesWithPrefixAsyncAwait2(prefix) {
    return new Promise(async (resolve, reject) => {
        try {
            await trimTheContentWithPromise(`${prefix}1.txt`);
            await trimTheContentWithPromise(`${prefix}2.txt`);
            await trimTheContentWithPromise(`${prefix}3.txt`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

// SO NOW WE CAN CALL THIS FUNCTION LIKE THIS
cleanManyFilesWithPrefixAsyncAwait1('contentPrefix')
    .then(() => {
        console.log("ALL 3 FILES CLEANED!!!");
    })
    .catch((err) => {
        console.log("ERROR WHILE CLEANING THE FILES");
        console.log(err);
    })


// WHEN YOU WANT TO CREATE A PROMISIFIED FUNCTION ON TOP OF PROMISIFIED FUNCTION IT IS EASY.
// WHEN YOU WANT TO CREATE A PROMISIFIED FUNCTION ON TOP OF NON PROMISIFIED FUNCTION IT IS MORE COMPLEX BECAUSE YOU HAVE TO HANDLE THE PROMISE RESOLUTION AND REJECTION MANUALLY.