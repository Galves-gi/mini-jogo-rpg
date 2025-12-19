const logPartidaCombata = document.querySelector('[data-log-partida]')
const combateValorDado = document.querySelector('[data-numero-aleatorio]')
const btnAtacar = document.querySelector('[data-btnAtacar]')

let valorDado

/* mostrar os cards de combate */
/* personagem/ usuario */
function cardCombatePersonagem() {
  const cardCombatePersonagem = document.querySelector(
    '[data-card-personagem]'
  );

  const personagemSalvo = JSON.parse(
    localStorage.getItem('personagemSelecionado')
  );

  if (!cardCombatePersonagem || !personagemSalvo) return;

  cardCombatePersonagem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-verde">
        <img src="/assets/img-personagens/${personagemSalvo.nome}.png"
             alt="imagem do jogador ${personagemSalvo.nome}"
             class="imagem-jogador align-self-center">
    </div>

    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${personagemSalvo.hp}
            </h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${personagemSalvo.ac}
            </h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${personagemSalvo.atkDice}
            </h4>
        </div>

    </div>
  `;
}


/* adversario */
function cardCombateAdversario() {
  const cardCombateAdversario = document.querySelector(
    '[data-card-adversario]'
  );

  const adversarioSalvo = JSON.parse(
    localStorage.getItem('adversarioSelecionado')
  );

  if (!cardCombateAdversario || !adversarioSalvo) return;

  cardCombateAdversario.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-verde">
        <img src="https://www.dnd5eapi.co${adversarioSalvo.imagem}"
             alt="imagem do adversário ${adversarioSalvo.nome}"
             class="imagem-jogador align-self-center">
    </div>

    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${adversarioSalvo.hp}
            </h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${adversarioSalvo.ac}
            </h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${adversarioSalvo.atkDice}
            </h4>
        </div>

    </div>
  `;
}

const personagem = JSON.parse(
    localStorage.getItem("personagemSelecionado")
);
const adversario = JSON.parse(
    localStorage.getItem("adversarioSelecionado")
);

registrarLog('Aperta "Atacar" para iniciar partida!')

/* iniciar partida */
btnAtacar.addEventListener("click", () => {
    juizDoJogo(personagem,adversario)
});

/* resultado do dado */
function jogarDado(dado) {
    const regex = /(\d+)d(\d+)([+-]\d+)?/

    const cadaParteDado = dado.match(regex)

    if (!cadaParteDado) return null

    let qtddDeDado = Number(cadaParteDado[1])
    const faceDado = Number(cadaParteDado[2])
    let bonusDado = Number(cadaParteDado[3] ?? 0)

    //sortear
    while (qtddDeDado > 0) {
        const resultado = Math.floor(Math.random() * faceDado) + 1

        console.log(`${resultado} resultado do Math.floor`);

        bonusDado = bonusDado + resultado
        qtddDeDado--
    }

    combateValorDado.innerHTML = `${bonusDado}`

    return bonusDado

}

console.log(jogarDado('2d4+2'));


/* juiz do combate */
function juizDoJogo(ataca,defende) {

    let turno = 'personagem' //personagem começa

    console.log('começou o jogo');

    while (ataca.hp > 0 && defende.hp > 0 ) {

        console.log('entrou no loop');

        if (turno === "personagem") {

            registrarLog(`${ataca.nome} inicia o jogo. Ataca: ${ataca.atkDice}`)

            valorDado = jogarDado(ataca.atkDice)


            if (valorDado >= defende.ac) {
                registrarLog(`${ataca.nome} realiza o ataque ${ataca.atk}.`)

                defende.hp -= valorDado - ataca.dano

                if (defende.hp <= 0) {
                    registrarLog(`${defende.nome} foi derrotado!.`)

                    return
                }

            }else{
                registrarLog(`${ataca.nome} tira ${valorDado} e errou o ataque.`)

                turno = 'adversario'
            }
        }else{
             registrarLog(`${defende.nome} joga o dado: ${defende.atkDice}`)

             valorDado = jogarDado(defende.atkDice)

             if (valorDado >= ataca.ac) {
                registrarLog(`${defende.nome} realiza o ataque ${defende.atk}.`)

                ataca.hp -= valorDado - defende.dano

                if (ataca.hp <= 0) {
                    registrarLog(`${ataca.nome} foi derrotado!`)

                    return
                }
             }else{
                registrarLog(`${defende.nome} tira ${valorDado} e errou o ataque.`)

                turno = "personagem"
             }
        }
    }



}

/* log da partida */
function registrarLog(mensagem) {
    logPartidaCombata.innerHTML = ''
    const logs = JSON.parse(localStorage.getItem("logCombate")) || [];

    const novoLog = mensagem 
    logs.push(novoLog);

    localStorage.setItem("logCombate", JSON.stringify(logs));

    return  logPartidaCombata.innerHTML += `${novoLog}`;

}



cardCombateAdversario() 
cardCombatePersonagem()