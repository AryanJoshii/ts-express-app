import { NextFunction, Request, Response } from "express"

let usersList: string[] = [];

export const whoSaidHii = {
    controller: (req: Request, res: Response) => {
        res.status(200).json({ list: usersList })
    }
}

export const sayHii = {
    validator: (req: Request, res: Response, next: NextFunction) => {
        if (req.body.name === undefined || req.body.name === "") {
            return res.status(400).json({ error: "BAD_REQUEST", message: "Name can not be empty!" })
        }
        next();
    },
    controller: (req: Request, res: Response) => {
        try {
            usersList.unshift(req.body.name);
            res.status(200).json({ status: "OK", list: usersList })
        } catch (error) {
            res.status(500).json({ error: "SOME_SERVER_ERROR" })
        }
    }
}