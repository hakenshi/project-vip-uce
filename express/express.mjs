import express from "express";

const app = express();

const port = 8000

/*
* TODO:
*  implementar rota de turmas,
*  implementar rota para marcar atividade como concluida,
*  implementar rota para puxar as atividades do usuário
* */

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.status(200).json({
        message: "hello xd"
    })
})

app.listen(port, () => {
    console.log("Express api is running at http://localhost:" + port);
})
