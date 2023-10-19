import {NextFunction, Request, Response} from "express";


class FilesController {

    public async upload ( req: Request, res: Response, next: NextFunction){
        try {
            const accessToken = req.get("Authorization");

            console.log(accessToken);

            return res.status(201).json('Uploaded');
        }


        catch (e) {

            console.log(e.message)
        }
    }
}


export const filesController = new FilesController();