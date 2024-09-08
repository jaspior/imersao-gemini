/** ~-~-~-~-~-~-~-~-~ Variaveis  ~-~-~-~-~-~-~-~-~**/
/** ############################################ **/
// Seleciona os elementos do DOM
const inputBusca = document.getElementById('inputBusca');
const botaoPesquisa = document.getElementById('botaoPesquisa');
const resultadoDiv = document.getElementById('resultado');
const tituloElemento = document.getElementById('titulo');
const subtituloElemento = document.getElementById('subtitulo');
const linkElemento = document.getElementById('link');

// Sidebar
const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const sidebarContent = document.querySelector('.sidebar-content');

//executa função ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    botaoPesquisa.click();
});

// Adiciona a classe 'collapsed' inicialmente para que a barra lateral comece fechada
//sidebar.classList.add('collapsed');



/** ~-~-~-~-~-~-~-~-~ Funções ~-~-~-~-~-~-~-~-~**/
/** ############################################ **/

// Evento de clique para o botão de alternar a sidebar
//toggleButton.addEventListener('click',function() { assim funciona também!

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Adiciona o evento de clique ao botão de pesquisa
botaoPesquisa.addEventListener('click', function () {
    const valorBusca = inputBusca.value.trim().toLowerCase(); // Remove espaços extras e converte para minúsculas

    // Limpar a sidebar antes de qualquer atualização
    sidebarContent.innerHTML = '';

    // Procura nos dados com uma comparação exata
    const resultado = dados.find(item => item.titulo.toLowerCase() === valorBusca);

    if (resultado) {
        // Atualiza o conteúdo da div 'resultado'
        tituloElemento.textContent = resultado.titulo;
        subtituloElemento.textContent = resultado.subtitulo;
        linkElemento.href = resultado.link;

        // Carrega os dados do lore.js com base no efeito
        const loreConteudo = lore[resultado.efeito];
        if (loreConteudo) {
            sidebarContent.innerHTML = `
               <img src=${loreConteudo.imagem} alt="Imagem da cidade Gemini" width="100" height="100">
                <p>${loreConteudo.textoSimples}</p>
                <p style="margin-top: 20px;">${loreConteudo.textoDetalhado}</p>
            `;

            // Enviar comando para o game.js (pode ser um console.log por enquanto)
            //console.log('Comando enviado para game.js com efeito:', resultado.efeito);
           
        } else {
            // Mostrar conteúdo padrão caso a chave "efeito" não exista no lore.js
            sidebarContent.innerHTML = `
                <div style="width: 100px; height: 100px; background-color: #f00; margin: 0 auto;"></div>
                <p>Conteúdo não disponível</p>
            `;
        }

        // Expandir automaticamente a sidebar
        sidebar.classList.remove('collapsed');

    } else {
        // Se não encontrar resultado, mostra os dados padrão
        tituloElemento.textContent = "Bem Vindo a Gemini-city";
        subtituloElemento.textContent = "A cyber-cidade do futuro!";
        linkElemento.href = "/cards/inicial.html";

        // Colocar algum conteúdo padrão na sidebar
        sidebarContent.innerHTML = `
            <img src="../imgs/default.png" alt="Imagem da cidade Gemini" width="100" height="100">
            <p>Olá!, Eu serei seu guia aqui....
            <br> Pesquise ali sobre a <mark><strong>cidade</strong></mark> para saber mais sobre ela!
            <br> E tenha uma boa estadia! 
            </p>
        `;
    }

    // Mostra a div
    resultadoDiv.style.display = 'block';
});

