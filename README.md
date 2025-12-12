# Mini Jogo RPG — Turn-Based Combat (HTML/CSS/JS)

Uma implementação de mini-jogo de combate por turnos com estética medieval-moderna, feita em HTML, CSS e JavaScript. O projeto consume a API DnD 5e para carregar monstros e estatísticas.

**Status:** Protótipo

---

## 📝 Sobre

Este repositório contém um protótipo de um sistema de combate por turnos (player vs monster). O objetivo é demonstrar mecânicas de jogo (turnos, rolagem de dados, cálculo de dano) e uma UI temática.

## Direção de Arte

### 2.1 Paleta de Cores

- `#0A1A2F`
- `#0D0D11`
- `#003F47`
- `#F2C14E`
- `#740211`

### 2.2 Tipografia

- **Cinzel (700 – Bold)** — usada para títulos, labels e headers.
- **carrossel-cardo (400 – Regular)** — aplicada em textos corridos, narrativa e descrições.

## Arquitetura das Telas

### 3.1 Index (Introdução)

- Exibe contextualização da história.
- Apresenta o universo e introduz o combate contra dragões.

### 3.2 Seleção de Personagem

- Exibição de personagens jogáveis.
- Seleção e carregamento das informações base (vida, ataque, defesa).

### 3.3 Seleção de Dragão

- Listagem de monstros carregados da API DnD 5e.
- Opção de seleção manual.
- Função de sorteio “Modo Aleatório”.

### 3.4 Tela de Combate

- Mecânica de turnos (Player vs. Monster).
- Exibição de atributos: HP, ataque, defesa.
- Sistema de rolagem de dados (d20, modificadores, dano).
- Lógica de ataque e cálculo de dano.
- Atualização visual (barras de vida, animações).

### 3.5 Modal de Fim de Partida

- Exibe resultado (vitória/derrota).
- Opções para reiniciar ou retornar ao menu.

### 3.6 Modal de Log da Partida

- Registro completo das ações:
  - Rolagens
  - Dano aplicado
  - Sequência dos turnos
  - Eventos aleatórios

## 🚀 Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- (opcional) DnD 5e API para dados de monstros

## 📁 Estrutura do Projeto (exemplo)

```
assets/

css/
  style.css
js/

index.html
README.md
```

## ▶️ Como abrir (local)

1. Abra a pasta do projeto no seu computador.
2. Abra o arquivo `index.html` ou `teste.html` no navegador.

No PowerShell você pode usar:

```powershell
Start-Process .\teste.html
```

ou apenas clicar duas vezes no arquivo no Explorador de Arquivos.

## ✍️ Diretrizes de contribuição

- Faça um fork deste repositório.
- Crie uma branch com sua feature: `git checkout -b feature/nome-da-feature`.
- Faça commits pequenos e claros.
- Abra um pull request descrevendo o que foi alterado.

## ⚖️ Licença

Coloque aqui a licença do projeto (ex.: MIT) ou remova esta seção se não aplicável.
