/* responsividade */
const sobreposicao = document.getElementById('mensagemTelaDeitada')

// retorna true quando o dispositivo está em retrato e a largura é pequena(menor do que 768px)
function deveMostrarSobreposicao() {
  return window.matchMedia('(orientation: portrait)').matches;
}

// Observa a posição da tela
function atualizarSobreposicao(){
  if (deveMostrarSobreposicao()){
    sobreposicao.classList.add('ativar')
  } else {
    sobreposicao.classList.remove('ativar')
  }
}

// Executa ao carregar a página
atualizarSobreposicao()

// Atualiza quando a orientação ou o tamanho mudam
window.addEventListener('resize', atualizarSobreposicao)
window.addEventListener('orientationchange', atualizarSobreposicao)

//---------------------------------------------------------------------------------

const carrosseis = document.querySelectorAll(".carrossel-container")

carrosseis.forEach(container =>{
    const carouselCard = container.querySelector(".carrossel-container_cards")
    const botaoVoltar = container.querySelector(".botao-voltar")
    const botaoProx = container.querySelector(".botao-prox")

    botaoVoltar.addEventListener('click', ()=>{
        carouselCard.scrollLeft -= 300
    })

    botaoProx.addEventListener('click', ()=>{
        carouselCard.scrollLeft += 300
    })

})

//---------------------------------------------------------------------------------