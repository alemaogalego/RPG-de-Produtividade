// Banco de Habilidades do Jogador
const skillsDB = {
    // === Habilidades Básicas (Rookie / Todos) ===
    'soco': { 
        id: 'soco', 
        name: "Soco", 
        dmg: 5, 
        cd: 0, 
        text_cd: "Sem Cooldown", 
        icon: "👊", 
        cost: 0, 
        desc: "Ataque básico rápido.",
        reqClass: "Any", // Disponível para todas as classes
        minLevel: 0,
        scaling: "forca"
    },
    'chute': { 
        id: 'chute', 
        name: "Chute", 
        dmg: 9, 
        cd: 2, 
        text_cd: "2 Turnos", 
        icon: "🦶", 
        cost: 0, 
        desc: "Ataque forte, mas cansa.",
        reqClass: "Any",
        minLevel: 0,
        scaling: "forca"
    },

    // === Habilidades de Mago ===
    'fireball': { 
        id: 'fireball', 
        name: "Fireball", 
        dmg: 20, 
        cd: 4, 
        text_cd: "4 Turnos", 
        icon: "🔥", 
        cost: 100, 
        desc: "Lança uma bola de fogo explosiva.",
        reqClass: "Mago",
        minLevel: 0,
        animBase: "assets/fx/fireball",
        animFrames: 8,
        category: "magic",
        scaling: "inteligencia"
    }
    
    // As habilidades foram removidas para reiniciar o progresso e desenvolvimento de novas.
};


// (As habilidades dos Bosses foram movidas para monsters.js)
