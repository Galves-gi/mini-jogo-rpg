/* mostrar no pré-jogo / dois oponentes */

/* personagem / usuario */
const cardPreJogoPersonagem = document.querySelector('[data-personagem-escolhido]')

const personagemSalvo = JSON.parse(localStorage.getItem('personagemSelecionado'))

cardPreJogoPersonagem.innerHTML = `
  <img src="/assets/img-personagens/${personagemSalvo.nome}.png"
       alt="imagem do personagem ${personagemSalvo.nome}">

  <div class="w-auto m-0 p-0" style="color: var(--amarelo);">
    <h3 class="m-0 p-0 fs-5 text-center">${personagemSalvo.nome}</h3>
    <h5 class="m-0 p-0">HP: <span>${personagemSalvo.hp}</span></h5>
    <h5 class="m-0 p-0">AC: <span>${personagemSalvo.ac}</span></h5>
    <h5 class="m-0 p-0">AtkDice: <span>${personagemSalvo.atkDice}</span></h5>
    <h5 class="m-0 p-0">
      Atk:
      <span>${personagemSalvo.atk} - ${personagemSalvo.dano}pts</span>
    </h5>
  </div>
`; 


/* adversario */
const cardPreJogoAdversario = document.querySelector('[data-adversario-escolhido]')

const adversarioSalvo = JSON.parse(localStorage.getItem('adversarioSelecionado'))

cardPreJogoAdversario.innerHTML = `
  <img src="https://www.dnd5eapi.co${adversarioSalvo.imagem}"
       alt="imagem do personagem ${adversarioSalvo.nome}">

  <div class="w-auto m-0 p-0" style="color: var(--amarelo);">
    <h3 class="m-0 p-0 fs-5 text-center">${adversarioSalvo.nome}</h3>
    <h5 class="m-0 p-0">HP: <span>${adversarioSalvo.hp}</span></h5>
    <h5 class="m-0 p-0">AC: <span>${adversarioSalvo.ac}</span></h5>
    <h5 class="m-0 p-0">AtkDice: <span>${adversarioSalvo.atkDice}</span></h5>
    <h5 class="m-0 p-0">
      Atk:
      <span>${adversarioSalvo.atk} - ${adversarioSalvo.dano}pts</span>
    </h5>
  </div>
`; 