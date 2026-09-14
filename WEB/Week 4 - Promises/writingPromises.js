class Promise2 {
    constructor (fn) {
        this.fn = fn;
        this.fn(() => {
            this.successCallback();
        }, () => {
            this.errCallback();
        })
    }

    then(s) {
        this.successCallback = s;
    }

    catch(e) {
        this.errCallback = e;
    }
}


function setTimeoutPromisified(ms) {
    return new Promise2(resolve => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000)
    .then(() => {
        console.log("Promise is run.");
    });

