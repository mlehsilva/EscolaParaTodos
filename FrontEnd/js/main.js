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
            setTimeout(() => { 
                MotorAudio.falar("Modo deficiência visual ativado. Navegue utilizando a tecla Tab."); 
            }, 500);
            break;
        case 'deficiencia-auditiva':
            // Tratado nativamente nas folhas de estilo
            break;
        default:
            break;
    }

    // Salva no navegador que o usuário já escolheu uma configuração
    localStorage.setItem("escola_acessivel_modo", modo);
    
    // Oculta o painel de entrada
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

    // Se o usuário já selecionou um modo antes, pula o painel de boas-vindas
    if (modoSalvo && painelBoasVindas) {
        painelBoasVindas.style.display = "none";
    }
}
