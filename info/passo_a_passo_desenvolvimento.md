# Passo a Passo do Desenvolvimento do Sistema de Combate e Lojas (RPG de Produtividade)

Este documento detalha cada arquivo e funcionalidade que desenvolvemos para criar o sistema de combate, lojas e interações do RPG de Produtividade, localizado na pasta `info/`.

---

## 2. Análise dos Arquivos Desenvolvidos

### **1. `main.html`**
Este é o coração do jogo. Ele contém toda a estrutura da interface, lógica central e conexão entre os módulos.

*   **Estrutura HTML:**
    *   **Sidebar:** Mostra status do jogador (HP, XP, Nível, Ouro), avatar e botões principais (Rotina, Grimório, Loja).
    *   **Boss Widget:** Painel especial que aparece no topo, controlando o contador para o chefe semanal e o botão de duelo.
    *   **Modal de Combate (`#combatModal`):** Uma janela sobreposta que simula a arena de batalha, com barras de vida, sprites do jogador e do chefe, e botões de habilidades.
    *   **Modal da Loja (`#shopModal`):** Interface onde o jogador gasta ouro para comprar novas técnicas.
    *   **Modal de Grimório (`#skillsModal`):** Permite ao jogador equipar até 4 habilidades para levar ao combate.

*   **Lógica JavaScript (dentro de `<script>`):**
    *   **Estado do Jogo (`player` obj):** Agora inclui `gold` (ouro), `equippedSkills` (habilidades ativas) e `ownedSkills` (habilidades compradas).
    *   **Sistema de Loja (`filterShop`, `buySkill`):**
        *   Filtra habilidades que o jogador ainda não tem.
        *   Verifica se o jogador tem ouro e nível suficiente.
        *   Deduz o ouro e adiciona a skill ao array `ownedSkills`.
    *   **Sistema de Equipar (`toggleSkillEquip`):** Limita o jogador a escolher apenas 4 habilidades táticas.
    *   **Motor de Combate (`startCombat`, `useSkill`, `bossTurn`):**
        *   **Turnos:** Controla quem ataca (Jogador -> Boss -> Jogador).
        *   **Cooldowns:** Impede o uso repetido de habilidades poderosas.
        *   **Efeitos:** Processa Stun (atordoamento) e Cura.
        *   **Animações:** Chama a função `playAnimation` para criar efeitos visuais voadores na tela.

---

### **2. `skills.js`**
Este arquivo atua como um "Banco de Dados" de todas as habilidades disponíveis no jogo.

*   **Estrutura (`skillsDB`):** Um objeto gigante onde cada chave é o ID de uma habilidade (ex: `fireball`, `soco`).
*   **Propriedades de cada Skill:**
    *   `dmg`: Dano causado.
    *   `cd`: Cooldown (tempo de recarga em turnos).
    *   `cost`: Preço na loja (0 para habilidades iniciais).
    *   `reqClass`: Restrição de classe (ex: "Mago" só pode ser comprado por Magos).
    *   `icon`: Emoji usado na interface.
    *   `animBase`: Caminho para imagens de animação (ex: bola de fogo).

---

### **3. `monsters.js`**
Define os inimigos que o jogador enfrentará.

*   **Estrutura (`monstersDB`):** Define os atributos base dos chefes (ex: `zoran`).
*   **Scaling Dinâmico (`createMonsterInstance`):**
    *   Esta função é crucial. Ela não cria um monstro com vida fixa.
    *   Ela lê o nível e atributos do jogador e *calcula* a vida do monstro para que o desafio seja sempre equilibrado, não importa quão forte o jogador esteja.

---

### **4. `style.css` (e `combat_anim.css`)**
Responsável pela beleza e efeitos visuais do jogo.

*   **`style.css`:** Define o layout escuro ("Dark Mode"), botões dourados e a responsividade.
*   **`combat_anim.css`:** Arquivo específico criado para gerenciar as animações de batalha.
    *   `@keyframes shake-red`: Faz a tela tremer vermelha quando o jogador toma dano.
    *   `@keyframes pulse-green`: Efeito de brilho verde para cura.
    *   `.flying-skill`: Classe usada via JavaScript para criar o elemento que "voa" do jogador até o inimigo.
    *   `.float-dmg`: Números flutuantes de dano (ex: "-15") que sobem e desaparecem.

---

### **5. `routine_styles.css`**
Estilização específica para o modal de Rotina Semanal.

*   **Abas de Dias (`.weekday-tabs`):** Botões para alternar entre Segunda, Terça, etc.
*   **Lista de Tarefas:** Visual diferenciado por cor dependendo do tipo (Força = Vermelho, Inteligência = Roxo).

---

## 3. Resumo do Fluxo de Jogo Criado

1.  **Início:** O jogador completa tarefas reais (estudar, treinar) e ganha **Ouro** e **XP**.
2.  **Loja:** Com o Ouro, ele abre a Loja (`shopModal`), vê as habilidades disponíveis para sua classe e compra novas técnicas (definidas no `skills.js`).
3.  **Preparação:** Antes do fim de semana, ele abre o Grimório (`skillsModal`) e escolhe as 4 melhores skills para a luta.
4.  **Combate (Fim de Semana):**
    *   O Boss aparece (sexta a domingo).
    *   O jogador clica em "Duelar".
    *   O sistema cria uma instância do monstro balanceada (`monsters.js`).
    *   A interface de combate abre. O jogador usa suas skills.
    *   O JS processa o dano, roda as animações (`combat_anim.css`) e o Boss revida.
    *   Se vencer, ganha muito XP e Ouro.

---

Este ecossistema permite que o jogo seja facilmente expandido apenas adicionando novas entradas nos arquivos `.js` sem precisar reescrever o código principal!
