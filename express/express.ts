import express, {Request, Response} from "express";
import db from "../prisma/db";

const app = express();
const port = 8000

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

app.get('/atividade/:id', async (req,res)=>{
    const{id} = req.params
    // @ts-ignore
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
