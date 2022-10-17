// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default async function handler(req, res) {
    let blogs = await fs.promises.readdir("./blogdata")
    let myfiles = []
    for (let index = 0; index < blogs.length; index++) {
        const element = blogs[index];
        let data = await fs.promises.readFile(('blogdata/'+element),'utf-8')
        myfiles.push(JSON.parse(data))
    }
    //console.log(myfiles)
    res.status(200).json(myfiles)

}
