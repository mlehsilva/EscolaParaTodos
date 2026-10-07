const MotorVisual = {
    /**
     * Altera o tamanho da fonte do site aplicando classes no body
     * @param {string} tamanho - 'normal', 'large' ou 'xlarge'
     */
    alterarFonte: function(tamanho) {
        document.body.classList.remove('font-large', 'font-xlarge');
        
        if (tamanho === 'large') {
            document.body.classList.add('font-large');
        } else if (tamanho === 'xlarge') {
            document.body.classList.add('font-xlarge');
        }
        localStorage.setItem("preferencia_fonte", tamanho);
    },

    /**
     * Ativa ou desativa o Modo de Alto Contraste
     * @param {boolean} forcar - Força um estado específico se necessário
     */
    alterarContraste: function(forcar = null) {
        if (forcar !== null) {
            if (forcar) document.body.classList.add('high-contrast');
            else document.body.classList.remove('high-contrast');
        } else {
            document.body.classList.toggle('high-contrast');
        }
        
        // Salva o estado exato da classe no localStorage
        const status = document.body.classList.contains('high-contrast');
        localStorage.setItem("preferencia_contraste", status ? "ativo" : "inativo");
    },

    /**
     * Ativa ou desativa elementos visuais voltados para daltonismo
     */
    alternarDaltonismo: function(forcar = null) {
        if (forcar !== null) {
            if (forcar) document.body.classList.add('daltonismo-mode');
            else document.body.classList.remove('daltonismo-mode');
        } else {
            document.body.classList.toggle('daltonismo-mode');
        }
        
        const status = document.body.classList.contains('daltonismo-mode');
        localStorage.setItem("preferencia_daltonismo", status ? "ativo" : "inativo");
    }
};

/**
 * FUNÇÃO DE CORREÇÃO CRÍTICA: Executa imediatamente no carregamento de QUALQUEER página
 * Une o histórico do painel inicial com os cliques dos botões manuais
 */
function aplicarEstilosSalvos() {
    const modoSalvo = localStorage.getItem("escola_acessivel_modo");
    const contrasteSalvo = localStorage.getItem("preferencia_contraste");
    const fonteSalva = localStorage.getItem("preferencia_fonte");
    const daltonismoSalvo = localStorage.getItem("preferencia_daltonismo");

    // 1. Aplica o perfil macro se ele existir
    if (modoSalvo) {
        if (modoSalvo === 'baixa-visao') {
            document.body.classList.add('high-contrast');
            if (!fonteSalva) document.body.classList.add('font-large');
        } else if (modoSalvo === 'deficiencia-visual') {
            document.body.classList.add('high-contrast');
            if (!fonteSalva) document.body.classList.add('font-xlarge');
        } else if (modoSalvo === 'daltonismo' && !daltonismoSalvo) {
            document.body.classList.add('daltonismo-mode');
        }
    }

    // 2. Sobrescreve com as alterações manuais do usuário (Coringa para troca de páginas)
    if (contrasteSalvo === "ativo") {
        document.body.classList.add('high-contrast');
    } else if (contrasteSalvo === "inativo") {
        document.body.classList.remove('high-contrast');
    }

    if (fonteSalva) {
        document.body.classList.remove('font-large', 'font-xlarge');
        if (fonteSalva === 'large') document.body.classList.add('font-large');
        if (fonteSalva === 'xlarge') document.body.classList.add('font-xlarge');
    }

    if (daltonismoSalvo === "ativo") {
        document.body.classList.add('daltonismo-mode');
    } else if (daltonismoSalvo === "inativo") {
        document.body.classList.remove('daltonismo-mode');
    }
}

// Ouvinte que garante a execução assim que o HTML estrutural estiver pronto
document.addEventListener("DOMContentLoaded", aplicarEstilosSalvos);

/**
 * Remove todas as customizações guardadas e reseta o site para o padrão original
 */
function limparTodasConfiguracoes() {
    localStorage.removeItem("escola_acessivel_modo");
    localStorage.removeItem("preferencia_fonte");
    localStorage.removeItem("preferencia_contraste");
    localStorage.removeItem("preferencia_daltonismo");
    
    document.body.classList.remove('high-contrast', 'daltonismo-mode', 'font-large', 'font-xlarge');
    
    if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
        MotorAudio.falar("Todas as configurações foram redefinidas para o padrão.");
    }
    
    setTimeout(() => {
        window.location.reload();
    }, 800);
}
