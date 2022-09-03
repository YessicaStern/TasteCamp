import express from 'express';
import cors from 'cors';

let views=0;
const server=express();
server.use(cors());
server.use(express.json());
const receitas=[
    {  
        id:1,
        titulo: "Cuscuz com ovo",
        ingredientes: "Cuscuz e ovo",
        preparo: "junta tudo e come",
        views:0,
    },
    {
        id:2,
        titulo:"Pao com mortadela",
        ingredientes:"Pão e mortadela",
        preparo:"Corta a mortadela poe no pão e come",
        views:0,
    }]
server.get("/receitas", (request, response)=>{
    receitas.map(value=> value.views+=1);
    response.send(receitas);
})

server.get("/receitas/:idreceitas",(req,res)=>{
    const receita= receitas.find(value => value.id===Number(req.params.idreceitas));
    receita.views+=1;
    if(!receita){
        return res.status(404).send("receita não encontrada");
    }
    res.send(receita);
})

server.post("/receitas",(req,res)=>{
    const {ingredientes,preparo,titulo}= req.body;
    if( receitas.find(value => value.titulo===req.body.titulo) ){
        return res.status(409).send({erro: "Receita já existente"})
    }else if(!ingredientes ||  !preparo || !titulo){
        return res.status(422).send({erro: "Todos os campos são obrigatórios: titulo, ingredientes, preparo"});
    }
    receitas.push({id: receitas.length+1,views:0,ingredientes,preparo,titulo});
res.status(201).send(receitas);
}),

server.listen(4000);

/* /n pula liha de texto dentro do js
.find acha e retorna o que acha ou boolean testar
 */