import path from "node:path";

import fs from 'node:fs/promises';

const readFile =  async ():Promise<any[]> => {

    const pathFile = path.join(__dirname, `users.json`)

    const users = await fs.readFile(pathFile, 'utf8')
    return JSON.parse(users)
}


const writeFile =  async (content:any[]) => {

    const pathFile = path.join(__dirname, `users.json`)

    await fs.writeFile(pathFile, JSON.stringify(content))
}


export {
     readFile,
    writeFile
}