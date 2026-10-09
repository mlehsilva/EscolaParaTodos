/**
 * ==========================================================================
 * CONFIGURAÇÃO E CONEXÃO COM O BANCO DE DADOS (db.js)
 * ==========================================================================
 */

const { Pool } = require('pg');
require('dotenv').config();

// Configura o pool de conexões usando as variáveis do .env ou valores padrão do docker
const pool = new Pool({
    user: process.env.DB_USER || 'admin_escola',
    password: process.env.DB_PASSWORD || 'senha_segura_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'escola_todos', // Ajustado para bater com seu docker-compose
});


/**
 * Cria a estrutura inicial das tabelas necessárias para o projeto
 */
const inicializarBanco = async () => {
    const queryTabelas = `
        -- Tabela de Usuários administrativos
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            usuario VARCHAR(100) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL,
            funcao VARCHAR(50) NOT NULL
        );

        -- Tabela de Mural de Avisos
        CREATE TABLE IF NOT EXISTS avisos (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(150) NOT NULL,
            conteudo TEXT NOT NULL,
            data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fixo BOOLEAN DEFAULT FALSE
        );

        -- Tabela de Materiais Didáticos
        CREATE TABLE IF NOT EXISTS materiais (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(200) NOT NULL,
            disciplina VARCHAR(100) NOT NULL,
            url TEXT NOT NULL,
            descricao_acessivel TEXT NOT NULL,
            data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        // Executa a criação das tabelas
        await pool.query(queryTabelas);
        console.log("💾 Estrutura do banco de dados (tabelas) verificada/criada com sucesso.");

        // Insere usuários de teste padrão caso a tabela esteja vazia
        const { rows } = await pool.query("SELECT COUNT(*) FROM usuarios");
        if (parseInt(rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO usuarios (usuario, senha, funcao) VALUES 
                ('diretoria@escola.com', 'admin123', 'admin'),
                ('professor@escola.com', 'prof123', 'professor')
            `);
            console.log("👥 Usuários padrão de teste inseridos no banco.");
        }
    } catch (erro) {
        console.error("❌ Erro ao inicializar tabelas do banco de dados:", erro);
    }
};

// Executa a inicialização de tabelas
inicializarBanco();

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
