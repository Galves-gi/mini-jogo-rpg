const logPartidaCombata = document.querySelector('[data-log-partida]')
const dado = document.querySelector('[data-dado]')
const combateValorDado = document.querySelector('[data-numero-aleatorio]')
const btnAtacar = document.querySelector('[data-btnAtacar]')
const btnCurar = document.querySelector('[data-btnCurar]')
const containerBotoesPersonagem = document.querySelector('[data-botoes-personagem]')

const localPersonagem = JSON.parse(
    localStorage.getItem("personagemSelecionado")
)
const localAdversario = JSON.parse(
    localStorage.getItem("adversarioSelecionado")
)
localStorage.setItem("turno", "personagem")

let valorDado

/* mostrar os cards de combate */
/* personagem/ usuario */
function cardCombatePersonagem() {
  const cardCombatePersonagem = document.querySelector(
    '[data-card-personagem]'
  );

  if (!cardCombatePersonagem || !localPersonagem) return;

  cardCombatePersonagem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-verde">
        <img src="/assets/img-personagens/${localPersonagem.nome}.png"
             alt="imagem do jogador ${localPersonagem.nome}"
             class="imagem-jogador align-self-center">
    </div>

    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localPersonagem.hp}
            </h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localPersonagem.ac}
            </h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localPersonagem.atkDice}
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

  if (!cardCombateAdversario || !localAdversario) return;

  cardCombateAdversario.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-vermelho">
        <img src="https://www.dnd5eapi.co${localAdversario.imagem}"
             alt="imagem do adversário ${localAdversario.nome}"
             class="imagem-jogador align-self-center">
    </div>

    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-vermelho p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localAdversario.hp}
            </h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-vermelho p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localAdversario.ac}
            </h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-vermelho p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">
              ${localAdversario.atkDice}
            </h4>
        </div>

    </div>
  `;
}

registrarLog('Aperta no dado para iniciar partida!')
Botoes(false)

dado.addEventListener("click", () => {
  turnoPersonagem(localPersonagem, localAdversario);
})

/* habilitar e desabilitar os botões */
function Botoes(ativo) {
  if (ativo) {
    containerBotoesPersonagem.classList.remove("d-none");
    containerBotoesPersonagem.classList.add("d-flex");
  } else {
    containerBotoesPersonagem.classList.remove("d-flex");
    containerBotoesPersonagem.classList.add("d-none");
  }
}


function esperarAcao() {
  return new Promise((resolve) => {

    function handler(event) {
      const botao = event.target.closest("[data-acao]");
      if (!botao) return;

      btnAtacar.removeEventListener("click", handler);
      btnCurar.removeEventListener("click", handler);

      resolve(botao.dataset.acao);
    }

    btnAtacar.addEventListener("click", handler);
    btnCurar.addEventListener("click", handler);
  });
}

async function turnoPersonagem(personagem, adversario) {
  Botoes(true)
  await registrarLog(`Turno ${personagem.nome}`);
  await esperar(3000);

  await registrarLog(`${personagem.nome} joga 1d20.`);
  await esperar(3000);

  const valorAtaque = jogarDado("1d20");

  if (valorAtaque >= adversario.ac) {
    await registrarLog(
      `${personagem.nome} acertou o AC do adversário. Atacar ou curar?`
    );

    const acao = await esperarAcao();

    if (acao === "atacar") {
      await registrarLog(`${personagem.nome} escolheu atacar`);
        await esperar(3000);

      const danoDado = jogarDado(personagem.atkDice);
      const danoTotal = danoDado + Number(personagem.dano);

      adversario.hp -= danoTotal;

      await registrarLog(
        `${personagem.nome} tira ${danoDado} e realiza ${personagem.atk} +${personagem.dano} dano, causando ${danoTotal} de dano.`
      );
        await esperar(3000);
    }

    if (acao === "curar") {
      await registrarLog(`${personagem.nome} escolheu curar`);
        await esperar(3000);

      const cura = jogarDado("1d8");
      personagem.hp += cura;

      if (personagem.hp > personagem.hpMax) {
        personagem.hp = personagem.hpMax;
      }

      await registrarLog(
        `${personagem.nome} se curou em ${cura} e atualizou o HP ${personagem.hp})`
      );
        await esperar(3000);
    }

    if (adversario.hp <= 0) {
      adversario.hp = 0;

      await registrarLog(`${adversario.nome} foi derrotado!`);
        await esperar(3000);

      cardCombateAdversario();

      return;
    }

    cardCombateAdversario();
  } else {
    await registrarLog(
      `${personagem.nome} tira ${valorAtaque} e errou o ataque.`
    );
      await esperar(3000);
  }

  cardCombateAdversario();

  await registrarLog(`Turno de ${adversario.nome}`);
    await esperar(3000);
  setTimeout(() => turnoAdversario(adversario, personagem), 3000);
}

async function turnoAdversario(adversario, personagem) {
  Botoes(true)
  const ataque = jogarDado("1d20");

  await registrarLog(`${adversario.nome} ataca!`);
  await esperar(3000);

  if (ataque >= personagem.ac) {
    const dano = jogarDado(adversario.atkDice);

    personagem.hp -= dano;

    await registrarLog(
      `${adversario.nome} tira ${dano} e causa dano.`
    );
    await esperar(3000);

    if (personagem.hp <= 0) {
      personagem.hp = 0;
      await registrarLog(`${personagem.nome} foi derrotado!`);
      await esperar(3000);
      cardCombatePersonagem();
      return;
    }

    cardCombatePersonagem();
  } else {
    await registrarLog(`${adversario.nome} errou o ataque.`);
    await esperar(3000);
  }

  cardCombatePersonagem();
}


/* resultado do dado */
function jogarDado(dado) {
    const regex = /(\d+)d(\d+)([+-]\d+)?/i

    const cadaParteDado = dado.match(regex)

    if (!cadaParteDado) return null

    let qtddDeDado = Number(cadaParteDado[1])
    const faceDado = Number(cadaParteDado[2])
    let bonusDado = Number(cadaParteDado[3] ?? 0)

    //sortear
    while (qtddDeDado > 0) {
        const resultado = Math.floor(Math.random() * faceDado) + 1

        //console.log(`${resultado} resultado do Math.floor`);

        bonusDado = bonusDado + resultado
        qtddDeDado--
    }

    combateValorDado.innerHTML = `${bonusDado}`

    return bonusDado

}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* log da partida */
async function registrarLog(mensagem) {
  const logs = JSON.parse(localStorage.getItem("logCombate")) || [];

  logs.push(mensagem);

  localStorage.setItem("logCombate", JSON.stringify(logs));

  logPartidaCombata.innerHTML = mensagem;

  await new Promise((resolve) => requestAnimationFrame(resolve));
}


cardCombateAdversario() 
cardCombatePersonagem()