const cardsPersonagens = document.querySelectorAll('[data-personagem]')
const btnIrPreJogo = document.querySelector('[data-pre-jogo]')

let cardPersonagemSelecionado = null

/* pegar personagem selecionado */
cardsPersonagens.forEach(cadaCard =>{
    cadaCard.addEventListener('click', ()=>{

        cardsPersonagens.forEach(card => {
            card.classList.remove('ativo');
        });

        cadaCard.classList.add('ativo')

        cardPersonagemSelecionado ={
                nome: cadaCard.dataset.nome,
                hp: Number(cadaCard.dataset.hp),
                ac: Number(cadaCard.dataset.ac),
                atk: cadaCard.dataset.atk,
                atkDice: cadaCard.dataset.atkDice,
                dano: cadaCard.dataset.dano,
        }
        console.log(cardPersonagemSelecionado);
    })
})

btnIrPreJogo.addEventListener('click',()=>{
    localStorage.setItem('personagemSelecionado', JSON.stringify(cardPersonagemSelecionado))

    window.location.href = '/pages/doisOponentes.html'
})

    