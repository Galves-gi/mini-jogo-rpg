const logPartidaCombata = document.querySelector('[data-log-partida]')
const dado = document.querySelector('[data-dado]')
const combateValorDado = document.querySelector('[data-numero-aleatorio]')
const btnAtacar = document.querySelector('[data-btnAtacar]')
const btnCurar = document.querySelector('[data-btnCurar]')
const containerBotoesPersonagem = document.querySelector('[data-botoes-personagem]')
const btnLogPartida = document.querySelector("[data-btn-log-partida]");
const btnJogarNovamente = document.querySelector("[data-btn-jogar-novamente]")

const localPersonagem = JSON.parse(
    localStorage.getItem("personagemSelecionado")
)
const localAdversario = JSON.parse(
    localStorage.getItem("adversarioSelecionado")
)
let dadoAtivo = true;

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
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0" data-hppersonagem>
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
        <div class="flex-fill d-flex flex-column text-center p-0 m-0" >
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0" data-atkpersonagem>
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
        <div class="flex-fill d-flex flex-column text-center p-0 m-0" >
            <h3 class="carrossel-card-combate-info--bg-vermelho p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0" data-hpadversario>
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
        <div class="flex-fill d-flex flex-column text-center p-0 m-0" >
            <h3 class="carrossel-card-combate-info--bg-vermelho p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0" data-atkadversario>
              ${localAdversario.atkDice}
            </h4>
        </div>

    </div>
  `;
}

registrarLog('Aperta no dado para iniciar partida!')
Botoes(false)

dado.addEventListener("click", () => {
  if (!dadoAtivo) return;

  dadoAtivo = false; // não deixa click no dado depois de uma 1x
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

/* alterar os cards  
depois que o DOM gera, preciso selecionar-los
*/
function hpPersonagemEl() {
  return document.querySelector('[data-hppersonagem]');
}

function atkPersonagemEl() {
  return document.querySelector('[data-atkpersonagem]');
}

function hpAdversarioEl() {
  return document.querySelector('[data-hpadversario]');
}

function atkAdversarioEl() {
  return document.querySelector('[data-atkadversario]');
}

/* transforma o click em uma promise */
function esperarAcao() {
  return new Promise((resolve) => {

    function handler(event) {
      const botao = event.target.closest("[data-acao]"); // closest busca por um ancestral/ o msm elemento correspondente ao argumento
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

    await registrarLog(
      `${personagem.nome}, você quer atacar ou curar?`
    );

    const acao = await esperarAcao();

    if (acao === "atacar") {
      hpAdversarioEl()?.classList.add('destacar');
      atkPersonagemEl()?.classList.add('destacar');

      await registrarLog(`${personagem.nome}, escolheu atacar ${personagem.atkDice}!`);
      await esperar(3000);

      const danoDado = jogarDado(personagem.atkDice);
      const danoTotal = danoDado + Number(personagem.dano);

      adversario.hp -= danoTotal;

      cardCombateAdversario();
      await registrarLog(
        `${personagem.nome}, tira ${danoDado} e realiza o ataque ${personagem.atk} +${personagem.dano} dano, causando total ${danoTotal} de dano.`
      );
      hpAdversarioEl()?.classList.add('destacar');
      await esperar(5000);
    }

    if (acao === "curar") {

      await registrarLog(`${personagem.nome}, escolheu curar`);
      hpPersonagemEl()?.classList.add('destacar');
      await esperar(3000);

      const cura = jogarDado("1d8");
      personagem.hp += cura;

      if (personagem.hp > personagem.hpMax) {
        personagem.hp = personagem.hpMax;
      }

      cardCombatePersonagem();
      await registrarLog(
        `${personagem.nome}, se curou em ${cura} e atualizou o HP ${personagem.hp}`
      );
      hpPersonagemEl()?.classList.add('destacar');
      await esperar(3000);
    }

    if (adversario.hp <= 0) {
      adversario.hp = 0;

      cardCombateAdversario();
      hpAdversarioEl()?.classList.add('destacar');

      await registrarLog(`${adversario.nome} foi derrotado!`);
      await esperar(3000);

      abrirModal('vitoria')
      return 
    }

  hpAdversarioEl()?.classList.remove('destacar');
  atkPersonagemEl()?.classList.remove('destacar');
  hpPersonagemEl()?.classList.remove('destacar');

  setTimeout(() => turnoAdversario(adversario, personagem), 3000);
}

async function turnoAdversario(adversario, personagem) {
  Botoes(false)
  await registrarLog(`Turno de ${adversario.nome}`);
  await esperar(3000);

  hpPersonagemEl()?.classList.add('destacar');
  atkAdversarioEl()?.classList.add('destacar');

  await registrarLog(`${adversario.nome}, escolheu atacar ${adversario.atkDice}!`);
  await esperar(3000);

  const dano = jogarDado(adversario.atkDice);
  const danoTotal = dano + Number(adversario.dano)

  personagem.hp -= danoTotal;

  cardCombatePersonagem();
  await registrarLog(
    `${adversario.nome}, tira ${dano} e realiza o ataque ${adversario.atk} +${adversario.dano} dano, causando total ${danoTotal} de dano.`
  );
  hpPersonagemEl()?.classList.add('destacar');
  await esperar(5000);

  if (personagem.hp <= 0) {
      personagem.hp = 0;

      hpPersonagemEl()?.classList.add('destacar');
      cardCombatePersonagem();

      await registrarLog(`${personagem.nome} foi derrotado!`);
      await esperar(3000);

      abrirModal('derrota')
      return 
  }

  hpPersonagemEl()?.classList.remove('destacar');
  atkAdversarioEl()?.classList.remove('destacar');
  hpAdversarioEl()?.classList.remove('destacar');

  turnoPersonagem(localPersonagem, localAdversario);
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
document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("logCombate");
});

async function registrarLog(mensagem) {
  const logs = JSON.parse(localStorage.getItem("logCombate")) || [];

  logs.push(mensagem);

  localStorage.setItem("logCombate", JSON.stringify(logs));

  logPartidaCombata.innerHTML = mensagem;

  await new Promise((resolve) => requestAnimationFrame(resolve));
}


/* modal da partida */
btnLogPartida.addEventListener("click", () => {
  abrirModal("log");
});

btnJogarNovamente.addEventListener('click', ()=>{
  window.location.reload() // recarregar a página
})

function abrirModal(modo) {
  const titulo = document.querySelector("[data-modal-titulo]")
  const corpoLog = document.querySelector("[data-modal-log]")

  const logs = JSON.parse(localStorage.getItem("logCombate")) || [];

  if (modo === "vitoria") {
    titulo.textContent = "Vitória!";

    corpoLog.innerHTML = `
        A vila de Valdorin está salva! A fortaleza foi reconquistada, as tempestades cessam e as rachaduras mágicas começam a se fechar. Os dragões caíram diante de sua força — e o destino foi reescrito.
    `;
  }

  else if (modo === "derrota") {
    titulo.textContent = "Gamer Over";
    titulo.className = "text-danger";

    corpoLog.innerHTML = `
        A vila de Valdorin está à beira da destruição. Os dragões tomaram a fortaleza, as tempestades se intensificam e as rachaduras mágicas se abrem sem controle. As criaturas enlouquecidas agora avançam… Sem você, não há mais esperança.
    `;
  }

  else if (modo === "log") {
    titulo.textContent = "Log da partida";

    corpoLog.innerHTML = logs.length
      ? logs.map((log, i) => `<p>${i + 1}. ${log}</p>`).join("")
      : "<p>Nenhum evento registrado.</p>";
  }

  const modalEl = document.getElementById("staticBackdrop");
  const modal = new bootstrap.Modal(modalEl);

  modal.show();
}

cardCombateAdversario() 
cardCombatePersonagem()