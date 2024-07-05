import kit from 'terminal-kit';
import klawSync from 'klaw-sync';
import { basename } from 'path';
import { exec } from 'child_process';
import { resolve } from 'path';

const term = kit.terminal;
const examplePath = resolve('./examples')

async function singleRowMenu(items) {
    return new Promise((resolve, reject) => {
        term.singleRowMenu(items, (error, response) => {
            if (error) {
                reject(error);
                process.exit(1);
            }
            resolve(response.selectedText);
        });
    })
}

async function singleColumnMenu(items) {
    return new Promise((resolve, reject) => {
        term.singleColumnMenu(items, (error, response) => {
            if (error) {
                reject(error);
                process.exit(1);
            }
            resolve(response.selectedText);
        });
    })
}

function listSync(path, options) {
    return klawSync(path, options).map(({ path }) => basename(path))
}

term.clear();
term.cyan('选择示例:\n');

const examples = listSync(examplePath, { nofile: true });
const dir = await singleRowMenu(examples);
const files = listSync(resolve(examplePath, dir), { nodir: true })
const file = await singleColumnMenu(files);

term.green("\n执行: %s\n", `${dir}/${file}`);

exec(`node ${resolve(examplePath, dir, file)}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        process.exit(1);
    }
    console.log(`\n${stdout}`);
    process.exit(0);
});
