const express = require('express');
const { adicionarPet } = require('./petshop');
const app = express();
const petshop = require('./petshop')//não precisa da extensão do arquivo



app.use(express.json())

app.get('/pets', (request, response) => {
    return response.send(petshop.buscarPet())
});

app.get('/pets/:nome', (request,response) => {
    const{nome}= request.params;
    return response.send(petshop.buscarPet(nome));
});

app.post('/pets', (req, res)=>{
    return res.json(petshop.adicionarPet(req.body))
    return response.json()
})


app.listen(3000, ()=>{
    console.log('Servidor rodandos!')
});

