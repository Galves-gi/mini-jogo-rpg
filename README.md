# 🐉 Mini Jogo RPG — DragonTower

![Imagem de capa do DragonTower](./assets/img-readme/capa-dragontower.png)

---

## 🛠️ Badges

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS\&message=EM%20DESENVOLVIMENTO\&color=GREEN\&style=for-the-badge)

---

## 📑 Índice

* [Descrição do projeto](#-descrição-do-projeto)
* [Funcionalidades](#-funcionalidades)
* [Decisões Técnicas](#-Decisões Técnicas)
* [Como os usuários podem utilizá-lo](#-como-os-usuários-podem-utilizá-lo)
* [Autores](#-autores-do-projeto)

---

## 📘 Descrição do projeto

### Introdução

**DragonTower** é um mini-jogo de RPG de combate por turnos (*player vs monster*) com estética medieval. O projeto foi desenvolvido utilizando **HTML, CSS, Bootstrap e JavaScript**, consumindo a **API DnD 5e** para obter informações dinâmicas sobre dragões.

O objetivo principal é praticar **lógica de programação**, **manipulação do DOM**, **controle de estado com localStorage** e **consumo de API**, aplicados em um contexto de jogo.

### Status do projeto

🚧 **Em desenvolvimento** — foco atual na implementação e refinamento da lógica de combate em JavaScript.

### Link de exibição

🔗 [DragonTower](https://mini-jogo-rpg.vercel.app/)

---

## Fluxo do Jogo

### 1️⃣ Tela Inicial (Index)

* Apresenta o título **DragonTower** com animação inicial.
* Introduz a contextualização da história do jogo.

![Tela inicial](./assets/img-readme/index.gif)

---

### 2️⃣ Seleção de Personagem

* Exibe personagens jogáveis com atributos base:

  * HP
  * ATK
  * ATK Dice
  * Dano
* Armazena o personagem selecionado no **localStorage**.

![Seleção de personagem](./assets/img-readme/personagem.png)

---

### 3️⃣ Seleção de Dragão

* Lista dragões carregados dinamicamente da **API DnD 5e**.
* Exibe atributos principais dos monstros.
* Salva o dragão escolhido no **localStorage**.

![Seleção de dragão](./assets/img-readme/dragao.png)

---

### 4️⃣ Pré-jogo

* Exibe os combatentes selecionados.
* Permite alterar personagem ou dragão antes do combate.

![Tela de pré-jogo](./assets/img-readme/pre-jogo.png)

---

### 5️⃣ Combate por Turnos

* Sistema de turnos (Player vs Dragon).
* Exibição das informações do personagem e dragão:
  * HP atual
  * Ataque
  * Dano
* Sistema de rolagem de dados.
* Narrador textual descrevendo cada ação.
* Cálculo de dano baseado em atributos e dados.

![Tela de combate](./assets/img-readme/combate.mp4)

---

### 6️⃣ Modal de Fim de Partida

* Exibe o resultado: **vitória** ou **derrota**.
* Opções disponíveis:

  * Jogar novamente
  * Ver log da partida
  * Sair

![Modal fim de partida](./assets/img-readme/modal.png)

---

### 7️⃣ Modal de Log da Partida

* Registro completo do combate:

  * Rolagens de dados
  * Dano causado
  * Ordem dos turnos

![Log da partida](./assets/img-readme/log.png)

---

# ⚙️ Funcionalidades

## ♿ Acessibilidade

| Recurso          | O que faz                         | Onde usamos                              |
|-----------------|------------------------------------|-------------------------------------------|
| `aria-label`     | descreve o propósito do elemento   | dado, botões, entrada visual              |
| `tabindex="0"`   | permite foco via teclado           | imagens e divs interativas                |
| `role="button"`  | elemento é tratado como botão      | elementos clicáveis não `<button>`        |
| `aria-live="polite"` | anuncia texto atualizado       | log de combate                            |

---

## ⚔️ Controles Alternativos por Teclado

Além dos botões no combate, o jogador pode usar o teclado:

| Tecla | Ação   |
|-------|--------|
| **A** | Atacar |
| **C** | Curar  |

---

## 🎵 Música de Combate

Na hora do combate, há uma música de fundo para criar mais emoção durante a batalha e aprofundar a imersão do jogador.

---

## 🧭 Decisões Técnicas

### 📌 Manipulação do DOM com `dataset`

Todo o controle de elementos interativos foi feito utilizando **atributos `data-*`**, permitindo uma comunicação clara entre HTML e JavaScript sem depender de IDs fixos ou seletores frágeis.

Exemplo:
```html
<button data-acao="atacar">Atacar</button>
```

- No JavaScript:
```js
botao.dataset.acao // "atacar"
```

Motivo da escolha:

- Semântica mais clara
- Facilita manutenção e testes
- Permite reuso de componentes DOM

### 📂 Organização de Pastas e Arquivos

A estrutura do projeto foi planejada para manter cada responsabilidade em seu próprio arquivo, evitando excesso de código em um único lugar.

Motivo da escolha:

- Melhor legibilidade e escalabilidade
- Cada arquivo tem uma responsabilidade única
- Comentários adicionados nos arquivos ajudam no entendimento rápido


### 🖼️ Imagens otimizadas para .webp

Imagens grandes foram convertidas para WebP, reduzindo o tamanho dos arquivos e melhorando o carregamento sem perder qualidade significativa.

Benefícios:

- Desempenho melhor em dispositivos móveis
- Menos consumo de banda
- Carregamento mais rápido do jogo

### ⏳ Uso de async/await e try/catch

Todo o fluxo que envolve requisições assíncronas usa async/await para tornar o código mais legível e tratar erros de forma confiável.

Motivos:

- Clareza na leitura
- Tratamento de erro centralizado
- Evita callbacks aninhados

### 🎯 Consulta seletiva à API

Mesmo com grande quantidade de dados disponíveis, o jogo busca apenas informações necessárias para o gameplay, reduzindo processamento e transferências desnecessárias.

### 🌐 Endpoints Usados
| Endpoint                                                   | Descrição                                            |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| `https://www.dnd5eapi.co/api/monsters`                     | Retorna todas as informações de todos os monstros    |
| `https://www.dnd5eapi.co/api/monsters/${cadaDragon.index}` | Retorna informações específicas de cada dragão       |
| `https://www.dnd5eapi.co${dragon.imagem}`                  | URL utilizada para exibir a imagem do dragão no jogo |


---

## 🚀 Como os usuários podem utilizá-lo

### Instalação

1. Clone este repositório:

   ```bash
   git clone (https://github.com/Galves-gi/mini-jogo-rpg)
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd mini-jogo-rpg
   ```

3. Abra o arquivo `index.html` no navegador.

### Outras referências

* Documentação da API DnD 5e
* MDN Web Docs (HTML, CSS e JavaScript)

---

## 👩‍💻 Autora do projeto

* **Galves-gi**

---
