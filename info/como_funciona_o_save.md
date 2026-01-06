# Como funciona o sistema de Save?

Sim! O projeto foi desenhado para que o usuário possa fechar a aba, desligar o computador e voltar no dia seguinte (ou semana que vem) e **tudo estará exatamente como ele deixou**.

## A Tecnologia: `LocalStorage`

Nós usamos um banco de dados integrado ao navegador chamado **LocalStorage**.
Diferente de variáveis normais que somem quando você atualiza a página (F5), o LocalStorage grava as informações no disco rígido do usuário.

### Quando o jogo salva?
O sistema salva automaticamente em dois momentos:
1.  **Ação do Jogador:** Sempre que você ganha XP, completa uma missão, compra um item ou muda de configuração, o jogo salva instantaneamente.
2.  **Passagem de Tempo:** O jogo verifica a cada 60 segundos se você recuperou vida ou se alguma missão expirou, salvando essas alterações.

### O que fica salvo?
Tudo o que está dentro do objeto `player`:
*   Nível, XP e Ouro.
*   Vida (HP) atual.
*   Habilidades compradas e equipadas.
*   Histórico de missões.
*   Sua Rotina Semanal configurada.

### Limitações Importantes
Como o save é **local** (no navegador):
1.  **Troca de Navegador:** Se você joga no Chrome e tenta abrir no Edge, o save não estará lá.
2.  **Limpeza de Cache:** Se você usar uma ferramenta tipo "CCleaner" ou "Limpar dados de navegação", pode apagar o save.
3.  **Modo Anônimo:** No modo anônimo, o save é apagado assim que a janela fecha.

> **Resumo:** Para o usuário comum, funciona como mágica. Ele não precisa criar conta, não precisa de senha, é só abrir e continuar a jornada!
