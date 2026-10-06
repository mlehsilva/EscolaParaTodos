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
    }
};

// CORREÇÃO: Autocarregamento seguro ao mudar de página
document.addEventListener("DOMContentLoaded", () => {
    // Só ativa o alto contraste se o usuário REALMENTE clicou e ativou antes
    const contrasteSalvo = localStorage.getItem("preferencia_contrast");
    if (contrasteSalvo === "ativo") {
        MotorVisual.alterarContraste(true);
    } else {
        MotorVisual.alterarContraste(false); // Garante que comece desativado
    }

    const fonteSalva = localStorage.getItem("preferencia_fonte");
    if (fonteSalva) {
        MotorVisual.alterarFonte(fonteSalva);
    }
});

