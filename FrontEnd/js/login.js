/**
 * ==========================================================================
 * SCRIPT DE AUTENTICAÇÃO E LOGIN (FRONT-END)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const divErro = document.getElementById("erro-login");

    if (formLogin) {
        formLogin.addEventListener("submit", async (evento) => {
            // Impede a página de recarregar
            evento.preventDefault();

            // Limpa mensagens de erro anteriores
            divErro.style.display = "none";
            divErro.innerText = "";

            // Captura os dados digitados
            const usuario = document.getElementById("usuario").value.trim();
            const senha = document.getElementById("senha").value;

            // Validação simples de front-end antes de mandar para o servidor
            if (!usuario || !senha) {
                exibirErro("Por favor, preencha todos os campos.");
                return;
            }

            try {
                // Prepara a chamada para a sua futura API do Back-End
                // Alterar a URL quando o seu servidor Node.js estiver rodando
                const resposta = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ usuario, senha })
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    // Erro retornado pelo servidor (ex: senha incorreta)
                    throw new Error(dados.mensagem || "Usuário ou senha inválidos.");
                }

                // LOGIN COM SUCESSO!
                // Salva o token de segurança retornado pelo back-end no navegador
                localStorage.setItem("escola_todos_token", dados.token);

                if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
                    MotorAudio.falar("Acesso concedido. Redirecionando para o painel de administração.");
                }

                // Redireciona o usuário para o painel admin após 1.5 segundos
                setTimeout(() => {
                    window.location.href = "admin.html";
                }, 1500);

            } catch (erro) {
                // Trata falhas na requisição ou respostas de erro do servidor
                exibirErro(erro.message);
            }
        });
    }

    /**
     * Exibe a mensagem de erro na tela de forma acessível e aciona o leitor de telas
     * @param {string} mensagem - Texto do erro
     */
    function exibirErro(mensagem) {
        divErro.innerText = mensagem;
        divErro.style.display = "block";

        // Integração semântica com o seu motor de áudio nativo (Web Speech API)
        if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
            MotorAudio.falar(`Erro: ${mensagem}`);
        }
    }
});
