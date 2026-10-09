/**
 * ==========================================================================
 * SCRIPT DO PAINEL DO ADMINISTRADOR - BANCO REAL (js/admin.js)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 🔒 BARREIRA DE SEGURANÇA: Bloqueia acesso direto sem login
    const token = localStorage.getItem("escola_todos_token");
    const funcao = localStorage.getItem("escola_todos_funcao");

    if (!token || funcao !== "admin") {
        alert("Acesso negado! Esta área é exclusiva para administradores.");
        window.location.href = "login.html";
        return;
    }

    // Elementos da Interface
    const formAviso = document.getElementById("form-novo-aviso");
    const tituloInput = document.getElementById("titulo-aviso");
    const conteudoInput = document.getElementById("conteudo-aviso");
    const painelStatus = document.getElementById("titulo-status");
    const listaControle = document.getElementById("lista-controle-avisos");
    
    const API_URL = "http://localhost:3000/api/avisos";

    /**
     * Busca os avisos salvos diretamente na API do PostgreSQL e monta a lista de controle
     */
    async function carregarMuralControle() {
        try {
            const resposta = await fetch(API_URL);
            if (!resposta.ok) throw new Error("Erro ao consultar a lista de avisos do banco.");
            
            const todosAvisos = await resposta.json();

            // Atualiza o contador de comunicados no cabeçalho resumo
            if (painelStatus) {
                const paragrafoContador = painelStatus.parentElement.querySelector("p");
                if (paragrafoContador) {
                    paragrafoContador.innerHTML = `<strong>Avisos Ativos:</strong> ${todosAvisos.length} comunicado(s) no banco real.`;
                }
            }

            if (todosAvisos.length === 0) {
                listaControle.innerHTML = "<p style='font-size:0.95rem; color:#757575;'>Nenhum aviso ativo no mural.</p>";
                return;
            }

            // Renderiza a lista com o ID real retornado pela tabela do banco de dados
            listaControle.innerHTML = todosAvisos.map(aviso => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #ECEFF1; padding: 10px; border-radius: 6px; color: #212121; font-size: 0.9rem;">
                    <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px;">
                        ${aviso.titulo}
                    </span>
                    <button class="btn-deslogar" 
                            style="padding: 5px 10px; font-size: 0.8rem; margin: 0;" 
                            onclick="deletarAvisoDoBanco('${aviso.id}')" 
                            aria-label="Deletar aviso: ${aviso.titulo}">
                        Apagar
                    </button>
                </div>
            `).join('');

        } catch (erro) {
            console.error("❌ Falha na comunicação:", erro);
            listaControle.innerHTML = "<p style='color:var(--cor-alerta); font-size:0.9rem;'>Erro ao carregar avisos do banco.</p>";
        }
    }

    /**
     * Faz a requisição DELETE para a API remover a linha do banco por ID
     */
    window.deletarAvisoDoBanco = async (id) => {
        if (!confirm("Deseja apagar este comunicado permanentemente do banco de dados PostgreSQL?")) return;

        try {
            const resposta = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!resposta.ok) throw new Error("Não foi possível excluir o item.");

            if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
                MotorAudio.falar("O comunicado foi removido do banco de dados.");
            }

            // Atualiza a interface
            carregarMuralControle();
            alert("Aviso removido com sucesso!");

        } catch (erro) {
            alert(`Erro ao excluir: ${erro.message}`);
        }
    };

    // Cadastro de Novo Aviso via POST HTTP
    if (formAviso) {
        formAviso.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const titulo = tituloInput.value.trim();
            const conteudo = conteudoInput.value.trim();

            if (!titulo || !conteudo) return;

            try {
                const resposta = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, conteudo })
                });

                if (!resposta.ok) throw new Error("Erro ao salvar no banco.");

                if (typeof MotorAudio !== 'undefined' && MotorAudio.falar) {
                    MotorAudio.falar("Novo comunicado gravado no banco de dados.");
                }

                formAviso.reset();
                carregarMuralControle();
                alert("Aviso salvo no banco de dados com sucesso!");

            } catch (erro) {
                alert(`Falha ao salvar: ${erro.message}`);
            }
        });
    }

    // Executa a carga inicial vinda da API
    carregarMuralControle();
});
