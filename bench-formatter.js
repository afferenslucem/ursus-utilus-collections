const fs = require('fs'),
    path = require('path');

function readFile(filename) {
    filePath = path.join(__dirname, filename);

    try {
        const data = fs.readFileSync(filePath)
        return data.toString('utf8');
    } catch (err) {
        console.error(err)
    }
}
const data = readFile('output.txt');

console.log(data)

const filtered = data.split('\n').filter(item => item != '' && !item.startsWith('>')).reverse();

console.log(filtered);