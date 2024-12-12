import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
class Griit {

    constructor (repoPath = '.') {
        this.repoPath = path.join(repoPath, '.griit');
        this.objectsPath = path.join(this.repoPath, 'objects');  // .griit/objects
        this.headPath = path.join(this.repoPath, 'HEAD');        // .griit/HEAD
        this.indexPath = path.join(this.repoPath, 'index');      // .griit/index
        this.init();
    }

    async init() {
        await fs.mkdir(this.objectsPath, { recursive: true });
        try {
            await fs.writeFile(this.headPath, '', { flag: 'wx' });  //WX: Open for Writting. fails if file Exists
            // await fs.writeFile(this.indexPath, '', JSON.stringify([]), {flag: 'wx'});
            await fs.writeFile(this.indexPath, JSON.stringify([]), { flag: 'wx' }); // Proper JSON array as content
        } catch (error) {
            console.log("Already Initialized the .griit folder");
        }
    }

    hashObject(content) {
        return crypto.createHash('sha1').update(content, 'utf-8').digest('hex');
    }

    async add(fileToBeAdded) {
        // File To add: path/to/file
        const filedata = await fs.readFile(fileToBeAdded, { encoding: 'utf-8' }); // Read the file
        const fileHash = this.hashObject(filedata); // Hash the file
        console.log(fileHash);
        const newFileHashedObjectPath = path.join(this.objectsPath, fileHash);  // .griit/objects/HashedFile
        await fs.writeFile(newFileHashedObjectPath, filedata);
        await this.updateStagingArea(fileToBeAdded, fileHash);
        console.log(`Added ${fileToBeAdded}`);
    }

    async updateStagingArea(filePath, fileHash) {
        const index = JSON.parse(await fs.readFile(this.indexPath, { encoding: 'utf-8' })); // Read the index file
        index.push({ path: filePath, hash: fileHash }); // Add the file to the index
        await fs.writeFile(this.indexPath, JSON.stringify(index)); // Write the updated index back to the file
    }
}

const griit = new Griit();
griit.add('sample.txt');