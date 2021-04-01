//modulo proprio
var moment = require('moment'); //require
var fs = require('fs'); ///filesystem - modulo nativo
let bancoDados = fs.readFileSync("./bancoDados.json");

bancoDados = JSON.parse(bancoDados);

const petshop = {
     atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoPets.json', petsAtualizado, 'utf-8');
      },
         listarPets: () => {
            bancoDados.pets.forEach(function (pet) {
              let{nome, idade, tipo, raca, vacinado} = pet
              console.log(`O nome do meu pet é ${nome}, ${idade}, ${tipo}, ${(vacinado) ? 'vacinado': 'não vacinado'}`)
            })
          },
          vacinarPet = (nome) => {
            let pet = buscarPet(nome);
            if (!pet.vacinado) {
              pet.vacinado = true;
              console.log(`${pet.nome} foi vacinado(a)`);
              atualizarBanco();
            } else {
              console.log(`${pet.nome} já estava vacinado(a)`);
            }
          },
           campanhaVacina = () => {
            var contagem = 0;
            bancoDados.pets.map(function (pet) {
              let{nome, vacinado} = pet;
              if (!vacinado) {
                vacinarPet(nome);
                contagem++;
              }
              return pet;
            })
            console.log(`${contagem} pets foram vacinados nessa campanha!`);
            console.log()
          },
           filtrarTipoPet = (tipoPet) => {
            let petsEncontrados = bancoDados.pets.filter((pet) => {
              let {tipo} = pet
              return tipo == tipoPet;
          });
          
          return petsEncontrados;
          },
         filtrarTutor = (nomeTutor) => {
            let petsTutor = bancoDados.pets.filter((pet) => {
              let {tutor, nome} = pet
                return tutor == nomeTutor;
            });
            console.log(`Pets do tutor ${nomeTutor}:`)
            petsTutor.forEach((pet) => {
                console.log(`${pet.nome} - ${pet.tipo}`)
            })
          },
          clientPrimeium = (pet) => {
            let {servicos} = pet
            const contServ = servicos.map(servicos => 1)
            if (contServ != 0) {
              let test = contServ.reduce((acumula, maisUm) => {
                return acumula + maisUm;
              })
              switch (test) {
                case 1:
                  console.log(`Você realizou ${test} serviço(s)!`)
                  console.log("Realize mais um serviço para obter 10% de desconto")
                  break
                case 2:
                  console.log(`Você realizou ${test} serviço(s)!`)
                  console.log("Parabéns você obteve 10% de desconto!")
                  break
                case 3:
                  console.log(`Você realizou ${test} serviço(s)!`)
                  console.log("Parabéns, você obteve 20% de desconto!")
                  break
                default:
                  console.log(`Você realizou ${test} serviço(s)!`)
                  console.log("Parabéns, você obteve 30% de desconto!")
              }
            } else {
              console.log("Gostaria de realizar algum serviço?")
            }
          },
           addClient = (novopet) => {
            bancoDados.pets.push(...novopet);
            atualizarBanco();
            novopet.forEach(pet => {
              console.log(`${pet.nome} foi adicionado com sucesso`);
            console.log();
            });
          },
           darBanhoPet = () => {
            let pet = buscarPet(nomepet);
            let {nome} = pet;
            pet.servicos.push({
              'nome': 'banho',
              'data': moment().format('DD-MM-YYYY')
            });
            atualizarBanco();
            console.log(`${nome} está de banho tomado`);
            console.log()
          },
           tosarPet = () => {
            let pet = buscarPet;
            pet.servicos.push({
              'serviço': 'tosar',
              'data': moment().format('DD-MM-YYYY')
            });
            atualizarBanco();
            console.log(`${pet.nome} está com cabelinho na régua :)`);
            console.log()
          },
          apararUnhasPet = () => {
            let pet = buscarPet;
            pet.servicos.push({
              'serviço': 'aparar unhas',
              'data': moment().format('DD-MM-YYYY')
            });
            atualizarBanco();
            console.log(`${pet.nome} está de unhas aparadas`);
            console.log()
          },
          atenderCliente = (pet, servico) => {
            console.log(`Olá, ${pet.nome}`);
            (servico) ? servico() : console.log('só vim dar uma olhadinha');
          
            console.log('Tchau, até mais!');
          }
}

    module.exports = petshop; // diz que o petshop.js é um modulo que posso exporta e reutilizar em outro lugar