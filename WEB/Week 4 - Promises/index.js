const fs = require('fs');s

function fsReadFilePromisefied(filepath, encoding) {
    let p = new Promise((resolve, reject) => {
        fs.readFile(filepath, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    return p;
}

function callback(datfdsfdfaa) {
    console.log(datfdsfdfaa);
}

function errorCallback(err) {
    console.error(err);
}

fsReadFilePromisefied('a.txt', 'utf8')
    .then(callback)
    .catch(errorCallback);


// callback hell
// setTimeout(() => {
//     console.log("Hello");
//     setTimeout(() => {
//         console.log("Hello JI");
//         setTimeout(() => {
//             console.log("Hello Ji ji");
//         }, 3000)
//     }, 2000)
// }, 1000);


// another way to write callback hell
// function callbackhellfn3() {
//     console.log("Third function run.");
// }

// function callbackhellfn2() {
//     console.log("Second function run.");
//     setTimeout(callbackhellfn3, 3000);
// }

// function callbackhellfn1() {
//     console.log("First function run.");
//     setTimeout(callbackhellfn2, 2000);
// }

// setTimeout(callbackhellfn1, 1000);


// with promises
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function callbackhellfunction() {
    console.log("Hello Ji");
}

function callbackhellwithPromise1() { // but with this all function are independent that it run seprate 
    // line by line it will go in callback queue
    // first one run 1.
    // with first and another one second become 2.
    // with first two function will become 3.
    // that's why their is no gap.
    setTimeoutPromisified(1000).then(callbackhellfunction);
    setTimeoutPromisified(2000).then(callbackhellfunction);
    setTimeoutPromisified(3000).then(callbackhellfunction);
}

function callbackhellwithPromise2() {
    setTimeoutPromisified(1000).then(() => {
        callbackhellfunction();
        setTimeoutPromisified(2000).then(() => {
            callbackhellfunction();
            setTimeoutPromisified(3000).then(callbackhellfunction);
        });
    });
}

// Better way to write it 
function callbackhellwithPromise3() {
    setTimeoutPromisified(1000)
        .then(() => {
            callbackhellfunction();
            return setTimeoutPromisified(2000);
        })
        .then(() => {
            callbackhellfunction();
            return setTimeoutPromisified(3000)
        })
        .then(() => {
            callbackhellfunction();
        })
        .catch((err) => {
            console.error(err);
        });
};

callbackhellwithPromise3();