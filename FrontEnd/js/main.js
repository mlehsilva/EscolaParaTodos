// Aguarda o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    verificarPreferencia();
});

/**
 * Salva a escolha inicial e esconde a tela de boas-vindas
 * @param {string} modo - O perfil de acessibilidade escolhido
 */
function configurarModo(modo) {
    const painelBoasVindas = document.getElementById("boas-vindas-acessivel");
    
    // Aplica as regras visuais baseadas na escolha
    switch(modo) {
        case 'baixa-visao':
            MotorVisual.alterarContraste(true);
            MotorVisual.alterarFonte('large');
            break;
        case 'daltonismo':
            MotorVisual.alternarDaltonismo(true);
            break;
        case 'deficiencia-visual':
            MotorVisual.alterarContraste(true);
            MotorVisual.alterarFonte('xlarge');
            // Proativamente avisa que o motor de áudio está ativo
            setTimeout(() => { MotorAudio.falar("Modo deficiência visual ativado. Navegue utilizando a tecla Tab."); }, 500);
            break;
        case 'deficiencia-auditiva':
            // Prioriza alertas visuais (já tratados de forma nativa no CSS/HTML sem movimento)
            break;
        default:
            // Modo padrão, nenhuma ação visual extra necessária
            break;
    }

    // Salva no navegador que o usuário já escolheu uma configuração
    localStorage.setItem("escola_acessivel_modo", modo);
    
    // Oculta o painel de entrada com transição visual simples
    if (painelBoasVindas) {
        painelBoasVindas.style.display = "none";
    }
}

/**
 * Verifica se já existe uma configuração prévia no localStorage do navegador
 */
function verificarPreferencia() {
    const modoSalvo = localStorage.getItem("escola_acessivel_modo");
    const painelBoasVindas = document.getElementById("boas-vindas-acessivel");

    if (modoSalvo && painelBoasVindas) {
        // Se já escolheu antes, aplica o modo salvo e pula a tela de introdução
        painelBoasVindas.style.display = "none";
        // Restaura as classes visuais baseadas no histórico
        if (modoSalvo === 'baixa-visao' || modoSalvo === 'deficiencia-visual') {
            MotorVisual.alterarContraste(true);
            MotorVisual.alterarFonte(modoSalvo === 'baixa-visao' ? 'large' : 'xlarge');
        } else if (modoSalvo === 'daltonismo') {
            MotorVisual.alternarDaltonismo(true);
        }
    }
}
