# 🏫 Escola para Todos

> «Informação acessível, escola para todos.»

O **Escola para Todos** é uma plataforma web desenvolvida com o objetivo de tornar as informações do ambiente escolar mais acessíveis para pessoas com deficiência visual, baixa visão, daltonismo e deficiência auditiva. 

A proposta é reunir, em um único site, informações sobre os espaços da escola, avisos, recursos de acessibilidade e ferramentas que permitem ao usuário adaptar a interface de acordo com suas necessidades.

O projeto foi desenvolvido dentro da proposta *“Inclusão que Transforma – Da Ideia ao Protótipo”*, utilizando conceitos de desenvolvimento web e metodologias ágeis.

---

## 🎯 Objetivo

Criar uma plataforma digital que facilite o acesso às informações da escola e reduza barreiras de comunicação e navegação para estudantes e visitantes com diferentes necessidades de acessibilidade.

### Objetivos específicos
* Facilitar a localização dos espaços da escola.
* Disponibilizar informações de forma acessível.
* Permitir a personalização da interface.
* Oferecer recursos para pessoas com baixa visão e daltonismo.
* Utilizar recursos de leitura de texto (Text-to-Speech).
* Disponibilizar informações visuais e textuais para pessoas com deficiência auditiva.
* Evitar que informações importantes dependam exclusivamente de cores.
* Incentivar uma cultura escolar mais inclusiva.

---

## ♿ Público-Alvo

O projeto é destinado principalmente a:
* Pessoas com deficiência visual ou baixa visão.
* Pessoas com daltonismo.
* Pessoas com deficiência auditiva.
* Comunidade escolar (estudantes, professores, funcionários e visitantes) que desejem acessar informações de forma simples e organizada.

---

## 🚀 Funcionalidades

### 🏠 Página Inicial
Apresenta o projeto e oferece acesso rápido às seções de Mapa, Busca, Recursos de Acessibilidade e Avisos.

### 🗺️ Mapa da Escola
Permite visualizar os principais espaços da escola (Salas de aula, Biblioteca, Laboratórios, Banheiros, Secretaria, Quadra, Recepção) e consultar a localização, descrição e recursos de acessibilidade de cada um.

### 🔎 Busca de Locais
Permite pesquisar um espaço específico (ex: *"Biblioteca"*) e receber informações em texto e a opção de ouvir a descrição por áudio.

### ♿ Menu de Acessibilidade
Ferramentas ativas para personalização da interface:
* Aumento e redução do tamanho da fonte.
* Alto contraste e modos de cores alternativos.
* Leitor de telas integrado.
* Navegação simplificada por teclado.

### 📢 Avisos
Mural de comunicados da escola contendo título, data, horário, local, descrição e opção de leitura de texto por voz.

### ℹ️ Sobre
Espaço dedicado à história do projeto, problema identificado, objetivos, tecnologias e identificação da equipe.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** — Estruturação semântica das páginas.
* **CSS3** — Estilização, temas de contraste e responsividade.
* **JavaScript (ES6+)** — Interações, filtros de busca e lógica dos menus.
* **Web Speech API** — Recurso nativo para síntese de voz (leitura de textos).
* **WAI-ARIA** — Atributos para melhoria da acessibilidade em tecnologias assistivas.

---

## 📁 Estrutura do Projeto

```text
ESCOLA-PARA-TODOS/
│
├── index.html
│
├── pages/
│   ├── mapa.html
│   ├── locais.html
│   ├── acessibilidade.html
│   ├── avisos.html
│   └── sobre.html
│
├── css/
│   ├── style.css
│   ├── acessibilidade.css
│   └── responsivo.css
│
├── js/
│   ├── main.js
│   ├── acessibilidade.js
│   ├── mapa.js
│   ├── locais.js
│   └── avisos.js
│
├── assets/
│   ├── img/
│   │   ├── logo.png
│   │   └── mapa-escola.png
│   └── icons/
│
└── README.md
```

### 📄 Organização dos Arquivos

| Arquivo | Tipo | Função |
| :--- | :--- | :--- |
| `index.html` | Página | Inicialização e apresentação do projeto |
| `mapa.html` | Página | Mapa interativo e espaços da escola |
| `locais.html` | Página | Mecanismo de busca de locais |
| `acessibilidade.html` | Página | Central e guia de recursos de acessibilidade |
| `avisos.html` | Página | Central de comunicados da escola |
| `sobre.html` | Página | Informações institucionais e histórico do projeto |
| `style.css` | Estilo | Configurações visuais e layout global |
| `acessibilidade.css` | Estilo | Classes de alto contraste, fontes ampliadas e temas |
| `responsivo.css` | Estilo | Media queries para adaptação em dispositivos móveis |
| `main.js` | Script | Comportamentos globais do site |
| `acessibilidade.js` | Script | Lógica de manipulação do DOM e Web Speech API |
| `mapa.js` | Script | Interações visuais e navegação no mapa |
| `locais.js` | Script | Filtros e motor de busca interna |
| `avisos.js` | Script | Renderização e controle de reprodução dos avisos |

---

## 🎨 Princípios de Acessibilidade Adotados

O desenvolvimento é guiado pelas boas práticas de inclusão digital:
1. **HTML Semântico:** Uso correto de tags (`<main>`, `<nav>`, `<article>`) para leitura correta por softwares terceiros.
2. **Textos Alternativos:** Todas as imagens possuem o atributo `alt` descritivo.
3. **Independência de Cor:** Informações críticas e alertas nunca são transmitidos apenas pela mudança de cor.
4. **Navegabilidade:** Foco visível (`:focus`) e ordenação lógica para uso exclusivo do teclado.

---

## 👥 Gestão e Cronograma

O projeto é desenvolvido utilizando metodologias ágeis com um sistema baseado em **Kanban** via **Trello**, dividido nas seguintes etapas de fluxo:
`📋 A fazer` ➔ `🔄 Em andamento` ➔ `👀 Em revisão` ➔ `✅ Concluído`

### 📅 Etapas do Desenvolvimento
1. Levantamento do problema & Pesquisa sobre acessibilidade
2. Engenharia de requisitos & Planejamento da interface (Wireframes)
3. Desenvolvimento do HTML Semântico & CSS (Responsivo e Acessível)
4. Implementação do JavaScript & Web Speech API
5. Testes de Acessibilidade (Validadores automáticos e leitores de tela)
6. Correção de bugs, Homologação do protótipo & Apresentação

---

## 👩‍💻 Equipe

* **Área:** Desenvolvimento de Sistemas  
* **Tema:** Inclusão e acessibilidade digital  

* Maria Letícia da Silva (Líder de projeto)
* Guilherme Santana da Silva (Documentador)
* Joallyson Guilherme da Silva Marques (Programador)
* Felipe Vinicius de Lima Noronha (Programador)
* Pedro Gabriel Silva Siqueira (Programador)
* Arthur Vinícius Miranda César de Melo (Desing UI/UX)

---

## 📌 Status do Projeto

🚧 **Em desenvolvimento**  
O projeto encontra-se atualmente na etapa de codificação do protótipo funcional das telas e implementação dos scripts de acessibilidade.

---

## 📜 Licença

Projeto desenvolvido estritamente para fins educacionais e acadêmicos.
