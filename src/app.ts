import express, {NextFunction, Request, Response} from "express";
import cors from "cors";


import * as mongoose from "mongoose";
import { configs } from "./configs/config";
import {User} from "./models/User.model";
import {UserValidator} from "./validators/user.validator";
import {ApiError} from "./errors/api.errors";
import {userRouter} from "./router/user.router";

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5001;



app.listen(PORT, ()=>{
    mongoose.connect(`${configs.DB_URI}`)
    console.log(`Server has successfully started on PORT ${PORT}`);
})



app.use("/users", userRouter);

// app.get('/users', async (req, res,next: NextFunction)=>{
//
//     try {
//         const resUsers = await User.find()
//
//         res.json({
//             data: resUsers,
//         })
//     }
//     catch (e) {
//         next(e)
//     }
//
//
// })
//
// app.post('/users', async (req, res,next: NextFunction) => {
//
//     try {
//
//         const { error, value } = UserValidator.create.validate(req.body.user);
//
//
//         if (error) {
//             throw new ApiError(error.message, 400);
//         }
//         const createdUser = await User.create(value);
//         res.status(201).json({
//             message: createdUser,
//         });
//     }
//
//     catch (e) {
//        next(e)
//     }
//
// })
//
//
// app.delete('/users', async (req, res,next: NextFunction) => {
//     try {
//         const {id} = req.body;
//
//         if (!mongoose.isObjectIdOrHexString(id)) {
//             throw new ApiError("Not valid ID", 400);
//         }
//         const user = await User.findByIdAndDelete(id);
//         if (!user){
//             throw new ApiError("User not found", 404);
//         }
//         res.sendStatus(204);
//     } catch (e) {
//        next(e)
//     }
// });
//
// app.patch('/users', async (req, res,next: NextFunction) => {
//
//     try {
//         const {id, name} = req.body.data;
//         const user = await User.find({_id:id});
//         if (!user){
//             throw new ApiError("User not found", 404);
//         }
//         const newUser = {...user,name:name}
//         await User.findByIdAndUpdate(id,newUser)
//
//
//         res.sendStatus(204)
//     } catch (e) {
//        next(e)
//     }
// });


app.use((err:any, req:Request, res:Response, next:NewableFunction)=>{
    const status = err.status || 500;
    res.status(status).json(err.message);
})

