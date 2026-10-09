/**
 * ==========================================================================
 * SCRIPT DO PAINEL DO PROFESSOR - BANCO REAL (js/professor.js)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 🔒 BARREIRA DE SEGURANÇA: Bloqueia acesso direto sem login
    const token = localStorage.getItem("escola_todos_token");
    const funcao = localStorage.getItem("escola_todos_funcao");

    if (!token || (funcao !== "professor" && funcao !== "admin")) {
        alert("Acesso negado! Esta área é exclusiva para professores autorizados.");
        window.location.href = "login.html";
        return;
    }

    // Gerenciamento do Formulário de Materiais
    const formMaterial = document.getElementById("form-upload-material");
    const nomeInput = document.getElementById("nome-material");
    const disciplinaSelect = document.getElementById("disciplina");
    const urlInput = document.getElementById("url-material");
    const descInput = document.getElementById("desc-material");

    const API_URL = "http://localhost:3000/api/materiais";

    if (formMaterial) {
        formMaterial.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const nome = nomeInput.value.trim();
            const disciplina = disciplinaSelect.value;
            const url = urlInput.value.trim();
            const descricaoAcessivel = descInput.value.trim();

            if (!nome || !disciplina || !url || !descricaoAcessivel) {
                if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
                    MotorAudio.falar("Erro: Todos os campos são obrigatórios.");
                }
                return;
            }

            try {
                // Envia os campos estruturados de acessibilidade para a tabela do banco
                const resposta = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome,
                        disciplina,
                        url,
                        descricaoAcessivel
                    })
                });

                if (!resposta.ok) throw new Error("Erro de comunicação ao inserir linha de material.");

                if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
                    MotorAudio.falar("Material compartilhado e armazenado no banco real.");
                }

                formMaterial.reset();
                alert("Material salvo no PostgreSQL com sucesso!");

            } catch (erro) {
                console.error("❌ Falha no upload:", erro);
                alert(`Erro interno na API: ${erro.message}`);
            }
        });
    }
});
