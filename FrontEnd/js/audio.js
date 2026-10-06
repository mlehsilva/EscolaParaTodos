const MotorAudio = {
    sintetizador: window.speechSynthesis,
    enunciado: null,

    /**
     * Executa a leitura de uma string de texto em voz alta
     * @param {string} texto - O conteúdo a ser lido
     */
    falar: function(texto) {
        // Interrompe qualquer leitura em andamento para não encavalar vozes
        this.parar();

        if (!texto) return;

        this.enunciado = new SpeechSynthesisUtterance(texto);
        this.enunciado.lang = 'pt-BR'; // Garante o sotaque em português correto
        this.enunciado.rate = 1.0;     // Velocidade da fala (1.0 é a normal)

        this.sintetizador.speak(this.enunciado);
    },

    /**
     * Cancela imediatamente qualquer áudio sendo reproduzido
     */
    parar: function() {
        if (this.sintetizador.speaking) {
            this.sintetizador.cancel();
        }
    },

    /**
     * Helper prático para ler diretamente o conteúdo interno de um elemento HTML
     * @param {string} seletorID - O ID do elemento que contém o texto (ex: 'descricao-biblioteca')
     */
    lerElemento: function(seletorID) {
        const elemento = document.getElementById(seletorID);
        if (elemento) {
            // Captura o texto visível do elemento
            this.falar(elemento.innerText);
        }
    }
};
