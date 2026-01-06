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
        minLevel: 0
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
        minLevel: 0
    }
    
    // As habilidades foram removidas para reiniciar o progresso e desenvolvimento de novas.
};

// Banco de Habilidades dos Bosses
// Estrutura: Chave = ID do Boss (ou categoria de level)
const bossSkillsData = {
    // Zoran (Lv 0 - 10)
    'zoran': [
        { name: "Soco", dmg: 3, icon: "👊", msg: "te acertou um soco direto." }
    ]
    // Outros bosses futuros...
};

// Atalho para o Boss atual usado no main.html
const bossSkillPool = bossSkillsData['zoran'];