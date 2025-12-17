/* mostrar os cards de combate */
/* personagem/ usuario */
const cardCombatePersonagem = document.querySelector('[data-card-personagem]')

const personagemSalvo = JSON.parse(localStorage.getItem('personagemSelecionado'))

cardCombatePersonagem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-verde">
        <img src="/assets/img-personagens/${personagemSalvo.nome}.png" alt="imagem do jogador ${personagemSalvo.nome}" class="imagem-jogador align-self-center">
    </div>


    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${personagemSalvo.hp}</h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${personagemSalvo.ac}</h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${personagemSalvo.atkDice}</h4>
        </div>

    </div>
`; 


/* adversario */
/* mostrar os cards de combate */
const cardCombateAdversario = document.querySelector('[data-card-adversario]')

const adversarioSalvo = JSON.parse(localStorage.getItem('adversarioSelecionado'))

cardCombateAdversario.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-auto p-2 m-0 carrossel-card-combate-info--bg-verde">
        <img src="https://www.dnd5eapi.co${adversarioSalvo.imagem}" alt="imagem do jogador ${adversarioSalvo.nome}" class="imagem-jogador align-self-center">
    </div>


    <!-- seção de informações -->
    <div class="w-100 d-flex gap-1 mt-1 carrossel-card-combate_secao-info">

        <!-- HP -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">HP</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${adversarioSalvo.hp}</h4>
        </div>

        <!-- AC -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">AC</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${adversarioSalvo.ac}</h4>
        </div>

        <!-- ATK -->
        <div class="flex-fill d-flex flex-column text-center p-0 m-0">
            <h3 class="carrossel-card-combate-info--bg-verde p-0 m-0">ATK</h3>
            <h4 class="carrossel-card-combate-info--bg-amarelo p-0 m-0">${adversarioSalvo.atkDice}</h4>
        </div>

    </div>
`; 


