/* responsividade */
(function(){
    const sobreposicao = document.getElementById('mensagemTelaDeitada')

    // Verifica se mostra o "mensagemTelaDeitada":
    // retorna true quando o dispositivo está em retrato e a largura é pequena(menor do que 768px)
    function deveMostrarSobreposicao(){
        const emRetrato = window.matchMedia('(orientation: portrait)').matches
        const pequeno = window.matchMedia('(max-width: 768px)').matches
        return emRetrato && pequeno
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

})()

/* animação inicial */
document.addEventListener("DOMContentLoaded", function () {
    const offcanvas = new bootstrap.Offcanvas('#offcanvasTop')

    offcanvas.show();

    setTimeout(() => {
        offcanvas.hide()
    }, 3000)
});
