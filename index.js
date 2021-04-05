const { response } = require('express');
const express = require('express');
const { adicionarPet, deletarCliente, atualizarDados } = require('./petshop');
const app = express();
const petshop = require('./petshop')//não precisa da extensão do arquivo



app.use(express.json())

app.get('/pets', (request, response) => { // traz todos os pets
    return response.send(petshop.listarPets())
});

app.get('/pets/:nome', (request,response) => { // tras um pet pelo nome
    const{nome}= request.params;// pega a informação da url e bory pega do corpo da solicitação
    return response.send(petshop.buscarPet(nome));
});

app.post('/pets', (request, response)=>{ // cria um novo pet
    return response.json(petshop.adicionarPet(request.body))
})

app.put('/pets/:nome', (request, response) => {// altera um pet
    const {nome} = request.params;//aqui pegamos nosso ID //req.params são dados que vem pela URL
    const { tipo, idade, raca, peso, tutor, contato, vacinado} = request.body; // retornando uma nova informação

    const mudancaPet= {
        nome,
        tipo,
        idade,
        raca,
        peso,
        tutor,
        contato,
        vacinado
    }
    return response.send(atualizarDados(nome, mudancaPet))

})

app.delete('/pets/:nome', (resquest, response) =>{ // deleta um pet pelo nome
    const {nome} = resquest.params;
    return response.send(deletarCliente(nome))
} )



app.listen(3000, ()=>{
    console.log('Servidor rodandos!')
});

