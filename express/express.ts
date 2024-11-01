import express, {Request, Response} from "express";
import db from "../prisma/db";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import {nextSecret} from "../src/lib/utils";
import {Server} from "socket.io";
<<<<<<< Updated upstream
import { log } from "node:console";
=======

>>>>>>> Stashed changes
const app = express();
const port = 8000

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/turma/notificao/:id', async (request: Request, response: Response) => {
    try {
        const {id} = request.params
        response.status(200).json(await db.notifications.findMany({
            where: {
                id: parseInt(id)
            }
        }))
    } catch (error) {
        response.status(404).json({
            error
        })
    }
})

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
            where: {
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
    } catch (e: any) {
        if (e.name == "NotFoundError") {
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

app.get('/atividade/:id', async (req, res) => {
    const {id} = req.params

    const atividades = await db.classesActivities.findMany({
        where: {
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
const server = app.listen(port, () => {
    console.log("Express api is running at http://localhost:" + port);
})

const io = new Server(server, {
    cors: {
        origin: "localhost:3000",
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log("socket.io rodando.")

    socket.on('auth-user', (classId, callback) => {
        socket.join(`turma-${classId}`)
        console.log("usuário conectado com sucesso.")
        callback({success: true})
    })

    socket.on('nova-atividade', async (atividadeId: number) => {
        try {
            const atividade = await db.classesActivities.findFirstOrThrow({
                where: {
                    id: atividadeId
                },
                include: {
                    class: true
                }
            });

            const notification = await db.notifications.create({
                data: {
                    classId: atividade.classId,
                    notificationType: "MESSAGE"
                }
            })

            io.to(`turma-${atividade.classId}`).emit(`turma-${atividade.classId}`, {
                notification: `${notification.notificationType}`
            });
            console.log(`Notificação enviada para a turma ${atividade.classId}`)
        } catch (error) {
            console.error('Erro ao processar nova atividade:', error);
        }
    });
});
