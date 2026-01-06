// Banco de Dados de Monstros e Bosses

const monstersDB = {
    'zoran': {
        name: "Zoran, o Destruidor de Prazos",
        image: "assets/avatars/zoran.png",
        baseHp: 300,
        hpPerLevel: 50,
        hpPerAttr: 5, // HP ganho por cada ponto de atributo do jogador (Auto-scaling)
        skills: [
            { name: "Soco Sombrio", dmg: 8, icon: "👊", msg: "te acertou um soco direto." },
            { name: "Chute Pesado", dmg: 12, icon: "🦶", msg: "te chutou para longe." },
            { name: "Rugido", dmg: 5, icon: "📢", msg: "rugiu, atordoando seus ouvidos!" }, 
            { name: "Pedrada", dmg: 15, icon: "🪨", msg: "jogou uma pedra gigante em você!" }
        ]
    }
    // Adicionar novos monstros aqui futuramente
};

/**
 * Gera uma instância de um monstro com status calculados baseado no jogador
 * @param {string} monsterId - ID do monstro no database
 * @param {object} playerObj - Objeto do jogador para scaling
 */
function createMonsterInstance(monsterId, playerObj) {
    const data = monstersDB[monsterId];
    if (!data) {
        console.error("Monstro não encontrado:", monsterId);
        return null;
    }

    // 1. Calcular HP
    // Soma total dos atributos do player
    let totalAttributes = playerObj.attributes.forca + playerObj.attributes.disciplina + playerObj.attributes.inteligencia;
    
    let hpFromAttributes = totalAttributes * data.hpPerAttr; 
    let levelMult = playerObj.level * data.hpPerLevel;
    
    const calculatedHp = data.baseHp + levelMult + hpFromAttributes;

    // 2. Preparar Skills
    // Se tiver mais de 4, sorteia. Se não, pega todas.
    let selectedSkills = [...data.skills];
    if (selectedSkills.length > 4) {
        selectedSkills.sort(() => 0.5 - Math.random());
        selectedSkills = selectedSkills.slice(0, 4);
    }

    return {
        id: monsterId,
        name: data.name,
        image: data.image,
        maxHp: calculatedHp,
        hp: calculatedHp,
        skills: selectedSkills
    };
}
