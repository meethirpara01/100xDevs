import fs from 'fs';

// NORMAL SYNCHRONOUS WAY TO DO IT
// function trimTheContent(filepath, encoding) {
//     let content = fs.readFileSync(filepath, encoding);
//     content = content.trim();
//     fs.writeFileSync(filepath, content);
//     console.log("DONE!!!");
// }

// trimTheContent('content.txt', 'UTF-8');

// ANOTHER WAY IS ASYNC WITH CALLBACKS
function trimTheContent(filepath, cb) {
    fs.readFile(filepath, 'UTF-8', (err, data) => {
        if (data) {
            const content = data.trim();
            fs.writeFile(filepath, content, (err) => {
                if (err) {
                    console.log(err);
                }
                cb();
            });
        }
        if (err) {
            console.log(err);
        }
    });
}

trimTheContent('content.txt', () => {
    console.log("DONE!!!");
});