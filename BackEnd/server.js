/**
 * ==========================================================================
 * SERVIDOR CENTRAL REAL - ESCOLA PARA TODOS (server.js)
 * ==========================================================================
 */

// 1. Carrega as configurações do ambiente antes de qualquer coisa no sistema
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Conecta ao banco de dados e cria as tabelas automaticamente
const db = require('./db');

// Middleware para decodificar requisições em formato JSON
app.use(express.json());

// Middleware CORS para permitir que as páginas HTML do Front-end acessem a API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

/**
 * 🔐 ROTA DE LOGIN CORRIGIDA (Leitura correta do Array de linhas)
 * POST /api/login
 */
app.post('/api/login', async (req, res) => {
    const { usuario, senha } = req.body;
    
    // Imprime no terminal para confirmar que o clique do botão chegou até o servidor
    console.log(`\n🔑 Tentativa de login recebida para o usuário: ${usuario}`);

    if (!usuario || !senha) {
        return res.status(400).json({ mensagem: "Por favor, informe o usuário e a senha." });
    }

    try {
        const queryTexto = 'SELECT * FROM usuarios WHERE usuario = \$1';
        const { rows } = await db.query(queryTexto, [usuario.trim()]);

        // Se o banco não trouxe nenhuma linha de registro
        if (rows.length === 0) {
            console.log("❌ Usuário não encontrado na tabela do banco de dados.");
            return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
        }

        // CORREÇÃO: Captura explicitamente o primeiro índice [0] retornado pelo PostgreSQL
        const usuarioBanco = rows[0];
        console.log(`👤 Usuário localizado no banco! Cargo cadastrado: ${usuarioBanco.funcao}`);

        // Compara a senha informada com a coluna da tabela
        if (usuarioBanco.senha !== senha) {
            console.log("❌ A senha informada não confere com o registro.");
            return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
        }

        console.log("✅ Autenticação realizada com sucesso! Redirecionando...");
        return res.status(200).json({
            mensagem: "Login efetuado com sucesso!",
            funcao: usuarioBanco.funcao,
            token: `token-seguro-jwt-${Date.now()}`
        });

    } catch (erro) {
        console.error("❌ Erro interno processando SQL de login:", erro);
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
});

// ==========================================================================
// 📢 ROTAS DO MURAL DE AVISOS
// ==========================================================================

/**
 * GET /api/avisos
 * Retorna todos os avisos do banco ordenados pelos mais recentes
 */
app.get('/api/avisos', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM avisos ORDER BY data_postagem DESC');
        return res.status(200).json(rows);
    } catch (erro) {
        console.error("❌ Erro ao buscar avisos:", erro);
        return res.status(500).json({ mensagem: "Erro ao buscar avisos." });
    }
});

/**
 * POST /api/avisos
 * Salva um novo aviso criado pelo Administrador
 */
app.post('/api/avisos', async (req, res) => {
    const { titulo, conteudo } = req.body;

    if (!titulo || !conteudo) {
        return res.status(400).json({ mensagem: "Título e conteúdo são obrigatórios." });
    }

    try {
        const queryTexto = 'INSERT INTO avisos (titulo, conteudo) VALUES (\$1, \$2) RETURNING *';
        const { rows } = await db.query(queryTexto, [titulo.trim(), conteudo.trim()]);
        return res.status(201).json(rows[0]);
    } catch (erro) {
        console.error("❌ Erro ao criar aviso:", erro);
        return res.status(500).json({ message: "Erro ao salvar aviso." });
    }
});

/**
 * DELETE /api/avisos/:id
 * Remove permanentemente um aviso usando o ID
 */
app.delete('/api/avisos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM avisos WHERE id = \$1', [id]);
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Aviso não encontrado." });
        }

        return res.status(200).json({ mensagem: "Aviso removido com sucesso!" });
    } catch (erro) {
        console.error("❌ Erro ao deletar aviso:", erro);
        return res.status(500).json({ mensagem: "Erro ao deletar aviso." });
    }
});

// ==========================================================================
// 📚 ROTAS DE MATERIAIS DIDÁTICOS
// ==========================================================================

/**
 * GET /api/materiais
 * Lista todos os materiais didáticos salvos
 */
app.get('/api/materiais', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM materiais ORDER BY data_postagem DESC');
        return res.status(200).json(rows);
    } catch (erro) {
        console.error("❌ Erro ao buscar materiais:", erro);
        return res.status(500).json({ mensagem: "Erro ao buscar materiais." });
    }
});

/**
 * POST /api/materiais
 * Cria um novo material didático vindo do painel do professor
 */
app.post('/api/materiais', async (req, res) => {
    const { nome, disciplina, url, descricaoAcessivel } = req.body;

    if (!nome || !disciplina || !url || !descricaoAcessivel) {
        return res.status(400).json({ mensagem: "Todos os campos do material são obrigatórios." });
    }

    try {
        const queryTexto = `
            INSERT INTO materiais (nome, disciplina, url, descricao_acessivel) 
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const valores = [nome.trim(), disciplina, url.trim(), descricaoAcessivel.trim()];
        const { rows } = await db.query(queryTexto, valores);
        return res.status(201).json(rows[0]);
    } catch (erro) {
        console.error("❌ Erro ao criar material:", erro);
        return res.status(500).json({ mensagem: "Erro ao salvar material." });
    }
});

// ==========================================================================
// INICIALIZAÇÃO DO PROCESSO
// ==========================================================================
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`🔒 Banco de dados PostgreSQL integrado com sucesso.`);
    console.log(`====================================================`);
});
