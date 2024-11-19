import express, { json } from "express";

const app = express();
app.use(express.json())
const produtos= [

]

app.listen(3000, ()=>{
    console.log(`escutando na porta 3000`);
});

app.get("/produtos", (req, res)=>{
    res.status(200).send(produtos)
})

function procurarProdutoIndex(nome) {
    return produtos.findIndex((produto) => produto.nome === nome);
}
function excluirProduto(nome){
    const index = procurarProdutoIndex(nome)
    if(index !== -1){
        produtos.splice(index,1)
    }
    throw new Error("produto nao encotrado")
}

function verificarProdutoExistente(nome){
    return produtos.some((produto) =>{
        return produto.nome === nome
    })
}

app.post("/produtos", (req, res)=>{
    const {nome, valor} = req.body
    if(!nome  || !valor ){
        return res.status(400).send("campos obrigatorios")
    }
    const produto = {
       nome: nome,
       valor: valor
    }
    const produtoExistente = verificarProdutoExistente(nome)
    if(produtoExistente){
        return res.status(400).send("produto existente")
    }
    
    produtos.push(produto)
    return res.status(201).send(produto)
})

app.delete("/produtos/:nome", (req, res)=>{
    const nome = req.params.nome
    if(!nome){
        return res.status(400).send("campo orbigatorio")
    }
    try{
        excluirProduto(nome)
        res.status(204).send()
    }catch(erro){
        res.status(400).send(erro.message)
    }


    
})
