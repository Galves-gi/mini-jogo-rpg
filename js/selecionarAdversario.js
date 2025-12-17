async function buscarDragonsDnd() {
    try {
        const res = await fetch('https://www.dnd5eapi.co/api/monsters')

        if (!res.ok) {
            throw new Error("Erro ao buscar na DnD 5e");
        }

        const dados = await res.json()

        const filtrarDados = dados.results.filter(cadaDnd => cadaDnd.index.includes('dragon'))

        //buscar informações de cada dragon
        const listaDragonsPromise = filtrarDados.map(async cadaDragon =>{

            const res = await fetch(
        `https://www.dnd5eapi.co/api/monsters/${cadaDragon.index}`)

        if (!res.ok) {
            return null // ignorar dragons com erro
        }

         const detalheDragon = await res.json()
         const ataque = detalheDragon.actions[1]

         return{
            imagem: detalheDragon.image ?? '/assets/favicon.png',
            name: detalheDragon.name,
            hit_points: detalheDragon.hit_points,
            hit_dice: detalheDragon.hit_dice,
            ac: detalheDragon.armor_class?.[0]?.value ?? 'N/A',
            atk: ataque.name ?? 'Normal',
            pts: ataque.attack_bonus ?? '10',
            atkDice: ataque.damage[0]?.damage_dice ?? '1d20'
            
         }

        })

        const listaDragons = await Promise.all(listaDragonsPromise)

        return listaDragons

    } catch (error) {
        console.error(error)
    }
}


/* exibir no frontEnd */
const containerDragons = document.querySelector('[data-container-dragons]')

async function exibirDragons() {

    const listaDragon = await buscarDragonsDnd()

    listaDragon.forEach((dragon, index) => {
        const card = document.createElement('div')

        card.className =
        'carrossel-card carrossel-card--adversario d-flex flex-column justify-content-center align-content-center'

        card.dataset.nome = dragon.name
        card.dataset.imagem = dragon.imagem 
        card.dataset.hp = dragon.hit_points
        card.dataset.ac = dragon.ac
        card.dataset.atkDice = dragon.atkDice
        card.dataset.atk = dragon.atk
        card.dataset.dano = dragon.pts
        card.dataset.adversario = 'dragon'

        card.innerHTML = `
        <img src="https://www.dnd5eapi.co${dragon.imagem}" alt="${dragon.name}">

        <div class="w-auto m-0 p-0" style="color: var(--amarelo);">
            <h3 class="m-0 p-0 fs-5 text-center">${dragon.name}</h3>

            <h5 class="m-0 p-0">
            HP: <span>${dragon.hit_points}</span>
            </h5>

            <h5 class="m-0 p-0">
            AC: <span>${dragon.ac}</span>
            </h5>

            <h5 class="m-0 p-0">
            AtkDice: <span>${dragon.atkDice ?? '—'}</span>
            </h5>

            <h5 class="m-0 p-0">
            Atk: <span>${dragon.atk} - ${dragon.pts} pts</span>
            </h5>
        </div>
        `

        containerDragons.appendChild(card)
    })
    
}

/* pegar dragon selecionado */
const btnIrPreJogo = document.querySelector('[data-pre-jogo]')

let cardAdversarioSelecionado = null

containerDragons.addEventListener('click', event => {

  const cadaCard = event.target.closest('[data-adversario="dragon"]') // acessa somente os cards
  if (!cadaCard) return

  const cardsAdversario = containerDragons.querySelectorAll('[data-adversario="dragon"]')
  cardsAdversario.forEach(card =>
    card.classList.remove('ativo')
  )

  cadaCard.classList.add('ativo')

  cardAdversarioSelecionado = {
    imagem: cadaCard.dataset.imagem,
    nome: cadaCard.dataset.nome,
    hp: Number(cadaCard.dataset.hp),
    ac: Number(cadaCard.dataset.ac),
    atk: cadaCard.dataset.atk,
    atkDice: cadaCard.dataset.atkDice,
    dano: Number(cadaCard.dataset.dano)
  }

  console.log(cardAdversarioSelecionado)
})


btnIrPreJogo.addEventListener('click',()=>{

    if (!cardAdversarioSelecionado) {
        alert('Escolhe um adversario para jogar:')
        return
    }

    localStorage.setItem('adversarioSelecionado', JSON.stringify(cardAdversarioSelecionado))

    window.location.href = '/pages/doisOponentes.html'
})

exibirDragons()