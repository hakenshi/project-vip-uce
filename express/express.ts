import express, {Request, Response} from "express";
import db from "../prisma/db";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import {nextSecret} from "../src/lib/utils";
const app = express();
const port = 8000

app.use(cors({
    origin: "localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/turma/:id', async (request: Request, response: Response) => {
    try {
        const {id} = request.params;
        const turmas = await db.classes.findFirstOrThrow({
            where: {
                id: parseInt(id)
            }
        })
        response.status(200).json(turmas)
    } catch (error) {
        response.status(404).json({
            error
        })
    }
})

app.post('/login', async (request: Request, response: Response) => {

    const {email, senha} = request.body;

    try {
        const user = await db.users.findFirstOrThrow({
            where:{
                email,
            }
        })
        const password = await bcrypt.compare(senha, user.password);

        if (!password) {
            response.status(404).json({
                message: "Email ou senha incorretos"
            })
        }

        const token = jwt.sign(user, nextSecret, {expiresIn: '24h'});

        response.status(200).json({
            user, token
        })
    }
    catch (e:any){
        if (e.name == "NotFoundError"){
            response.status(404).json({
                message: "Usuaŕio não encontrado."
            })

            response.status(500).json({
                message: "Algo deu errado",
                error: e
            })
        }
    }
})

app.get('/atividade/:id', async (req,res)=>{
    const{id} = req.params

    const atividades = await db.classesActivities.findMany({
        where:{
            classId: parseInt(id)
        }
    })
    res.status(200).json(atividades)

})

app.get('/', (request, response) => {
    response.status(200).json({
        message: "hello xd"
    })
})
app.listen(port, () => {
    console.log("Express api is running at http://localhost:" + port);
})
