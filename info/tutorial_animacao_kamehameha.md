# Tutorial: Implementando Animação de Raio de Energia (Kamehameha)

Este guia explica como adicionar uma animação de "Raio de Energia" (Beam) ao seu sistema de combate atual. Diferente da "Bola de Fogo" (que é um projétil que viaja de A para B), o Raio se estende instantaneamente ou cresce do jogador até o alvo.

---

## 🚀 Opção A: Raio 100% Código (CSS Puro)
**Vantagem:** Muito leve, fácil de trocar a cor e não precisa baixar nada.

### 1. Atualizar o CSS (`combat_anim.css`)
Adicione este código para criar um raio usando gradientes de cor.

```css
/* =========================================
   OPÇÃO 1: RAIO CSS (GRADIENTE)
   ========================================= */

.energy-beam {
    position: absolute;
    height: 40px; /* Grossura do Raio */
    
    /* O Segredo: Gradiente que imita energia */
    background: linear-gradient(90deg, 
        rgba(0, 191, 255, 0.8) 0%, 
        rgb(255, 255, 255) 30%, 
        rgba(0, 191, 255, 0.8) 60%, 
        transparent 100%
    );
    
    border-radius: 20px;
    /* Glow/Brilho em volta */
    box-shadow: 0 0 20px rgba(0, 191, 255, 0.8), 
                0 0 40px rgba(0, 191, 255, 0.4) inset;
    
    transform-origin: left center; /* Cresce da esquerda */
    transform: scaleX(0); /* Invisível inicialmente */
    z-index: 101; 
    pointer-events: none;
    animation: beam-pulse 0.2s infinite linear;
}

/* Animação do Brilho tremendo */
@keyframes beam-pulse {
    0% { filter: brightness(1) hue-rotate(0deg); }
    50% { filter: brightness(1.5) hue-rotate(10deg); }
    100% { filter: brightness(1) hue-rotate(0deg); }
}

/* Bolinha de energia na mão */
.beam-head {
    position: absolute;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, white, rgba(0, 191, 255, 1));
    border-radius: 50%;
    transform: translate(-50%, -15%);
    box-shadow: 0 0 30px rgba(0, 191, 255, 1);
    z-index: 102;
}
```

---

## 🖼️ Opção B: Raio com Imagem Pronta (Sprite)
**Vantagem:** Visual de anime clássico/desenhado. Requer que você tenha um arquivo `.png` longo ou tileável na pasta `assets/fx/`.

### 1. Atualizar o CSS (`combat_anim.css`)
Adicione este código *além* ou *no lugar* do anterior se for usar imagem.

```css
/* =========================================
   OPÇÃO 2: RAIO COM IMAGEM
   ========================================= */

.energy-beam-sprite {
    position: absolute;
    height: 60px; /* Ajuste conforme a altura da sua imagem */
    
    /* IMAGEM DE FUNDO REPETINDO */
    background-image: url('assets/fx/beam_texture.png'); 
    background-repeat: repeat-x; /* Repete horizontalmente */
    background-size: contain; /* Ajusta pra caber na altura */
    
    transform-origin: left center;
    transform: scaleX(0);
    z-index: 101; 
    pointer-events: none;
    
    /* Animação opcional para mover a textura "correndo" */
    animation: beam-flow 0.5s infinite linear;
}

@keyframes beam-flow {
    from { background-position: 0 0; }
    to { background-position: 100px 0; }
}
```

---

## 2. Passo 2: Definir a Habilidade (`skills.js`)

Aqui você diz se a skill usa o raio CSS ou o raio de Imagem.

### Exemplo 1: Skill com Raio CSS (Padrão)
```javascript
'kamehameha_css': { 
    // ... outros status ...
    animType: "beam", 
    // Não precisa especificar imagem, vai usar o .energy-beam padrão
}
```

### Exemplo 2: Skill com Raio de Imagem
```javascript
'kamehameha_img': { 
    // ... outros status ...
    animType: "beam",
    // Esta propriedade avisa o JS para usar a classe de sprite
    beamSprite: true 
}
```

---

## 3. Passo 3: Atualizar a Função de Animação (`main.html`)

Substitua sua função `playAnimation` por esta versão que suporta **ambos os tipos**.

```javascript
function playAnimation(skill, fromId, toId, callback) {
    const layer = document.getElementById('combatFxLayer');
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    
    if (!fromEl || !toEl) {
        if(callback) callback();
        return;
    }

    // --- Coordenadas ---
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const startX = fromRect.left + (fromRect.width / 2);
    const startY = fromRect.top + (fromRect.height / 2);
    const endX = toRect.left + (toRect.width / 2);
    const endY = toRect.top + (toRect.height / 2);

    // ============================================================
    // LÓGICA DO RAIO (BEAM)
    // ============================================================
    if (skill.animType === 'beam') {
        const beam = document.createElement('div');
        
        // DECISÃO: Usa CSS puro ou Sprite?
        if (skill.beamSprite) {
            beam.className = 'energy-beam-sprite';
        } else {
            beam.className = 'energy-beam';
            // Se for CSS puro, adiciona a "cabeça" do brilho
            const head = document.createElement('div');
            head.className = 'beam-head';
            beam.appendChild(head);
        }
        
        // Matemática (Distância e Ângulo)
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // Posicionamento
        beam.style.left = startX + 'px';
        // Ajuste vertical (-20 ou -30 para centralizar dependendo da altura da classe)
        beam.style.top = (startY - (skill.beamSprite ? 30 : 20)) + 'px'; 
        beam.style.width = distance + 'px';
        beam.style.transform = `rotate(${angle}deg) scaleX(0)`; 

        layer.appendChild(beam);

        // Disparo
        requestAnimationFrame(() => {
            beam.style.transition = "transform 0.3s ease-out"; 
            beam.style.transform = `rotate(${angle}deg) scaleX(1)`;
        });

        // Finalização (Fade Out)
        setTimeout(() => {
            beam.style.transition = "opacity 0.3s";
            beam.style.opacity = "0";
            
            // Efeito de Dano no Alvo
            const toElAnim = document.getElementById(toId).querySelector('img') || document.getElementById(toId);
            if(toElAnim) toElAnim.classList.add('shake-dmg');

            setTimeout(() => {
                beam.remove();
                if(toElAnim) toElAnim.classList.remove('shake-dmg');
                if(callback) callback(); 
            }, 300);

        }, 800); 

        return; 
    }

    // ============================================================
    // LÓGICA DE PROJÉTIL (ANTIGA)
    // ============================================================
    // ... manter seu código antigo de flying-skill aqui ...
    
    // Resume da parte antiga para referência:
    const flyer = document.createElement('div');
    flyer.className = 'flying-skill';
    // ... lógica de imagem/emoji ...
    if (skill.animBase && skill.animFrames) {
         // Lógica de Sprites...
         const img = document.createElement('img');
         flyer.appendChild(img);
         // ...
    } else if (skill.asset) {
         flyer.innerHTML = `<img src="${skill.asset}">`;
    } else {
         flyer.innerText = skill.icon || "👊";
    }

    flyer.style.left = startX + 'px';
    flyer.style.top = startY + 'px';
    layer.appendChild(flyer);

    const speed = combatState ? (combatState.speedMultiplier || 1) : 1;
    setTimeout(() => {
         flyer.style.transition = `all ${1000/speed}ms linear`;
         flyer.style.left = endX + 'px';
         flyer.style.top = endY + 'px';
    }, 10);
    
    setTimeout(() => {
        flyer.remove();
        if(callback) callback();
    }, 1000/speed + 100);
}
```

## 4. Dica de Pro 

Se quiser que o Kamehameha seja realmente épico, você pode adicionar um som!
No JS:
```javascript
const audio = new Audio('assets/kamehameha.mp3');
audio.play();
```
(Lembre-se de achar o arquivo de áudio e colocar na pasta assets).

Agora você tem um sistema de combate que suporta projéteis E raios de energia!
