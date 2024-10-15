// Seleção de elementos no DOM
let chatbox = document.querySelector('.chatbox');
let input = document.querySelector('textarea');
let sendBTN = document.querySelector('#sendBTN');

// Arrays de imagens e descrições (aluguel, compra, venda)
const aluguelProperties = [
    { image: 'images/casa1.jpg', descricao: 'Casa com 3 quartos, 2 banheiros, 120m². Aluguel: R$ 1.200/mês. Termos: Contrato de 1 ano, caução de 2 meses.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa2.png', descricao: 'Apartamento com 2 quartos, 1 banheiro, 80m². Aluguel: R$ 900/mês. Termos: Contrato de 6 meses, sem caução.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa4.jpg', descricao: 'Casa com 4 quartos, 3 banheiros, 200m². Aluguel: R$ 2.500/mês. Termos: Contrato de 2 anos, caução de 3 meses.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa5.jpg', descricao: 'Apartamento duplex com 3 quartos, 2 banheiros, 150m². Aluguel: R$ 1.800/mês. Termos: Contrato de 1 ano, caução de 1 mês.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' }   
];

const compraProperties = [
    { image: 'images/casa1.jpg', descricao: 'Casa com 3 quartos, 2 banheiros, 120m². Valor de compra: R$ 350.000. Localização: Centro.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa2.png', descricao: 'Apartamento com 2 quartos, 1 banheiro, 80m². Valor de compra: R$ 250.000. Localização: Bairro Sul.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa4.jpg', descricao: 'Casa com 4 quartos, 3 banheiros, 200m². Valor de compra: R$ 600.000. Localização: Zona Norte.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' },
    { image: 'images/casa5.jpg', descricao: 'Apartamento duplex com 3 quartos, 2 banheiros, 150m². Valor de compra: R$ 450.000. Localização: Bairro Nobre.<br><button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>' }
];

// Adiciona listener ao botão de envio
sendBTN.addEventListener('click', sendMessage);

function sendMessage() {
    let message = input.value.trim();
    if (message !== '') {
        displayMessage(message, 'outgoing');
        input.value = '';
        handleUserMessage(message);
    }
}

// Função principal para lidar com a mensagem do usuário
function handleUserMessage(message) {
    const aluguelRegex = /aluguel|alugar|quero alugar uma casa/i;
    const compraRegex = /compra|comprar|quero comprar uma casa/i;

    if (aluguelRegex.test(message)) {
        displayAluguelOptions();
    } else if (compraRegex.test(message)) {
        displayCompraOptions();
    }
}

// Função genérica para exibir mensagens no chat
function displayMessage(message, type) {
    let chat = document.createElement('li');
    chat.className = `chat ${type}`;
    let p = document.createElement('p');
    p.textContent = message;
    chat.appendChild(p);
    chatbox.appendChild(chat);
    chatbox.scrollTop = chatbox.scrollHeight;  // Rolagem automática para o final do chat
}

// Exibição de opções de aluguel
function displayAluguelOptions() {
    let message = 'Opções de aluguel:';
    displayMessage(message, 'incoming');
    displayProperties(aluguelProperties);
}

// Exibição de opções de compra
function displayCompraOptions() {
    let message = 'Opções de compra:';
    displayMessage(message, 'incoming');
    displayProperties(compraProperties);
}

// Função para exibir as propriedades com botões de "Ver Detalhes"
function displayProperties(properties) {
    let propertyContainer = document.createElement('div');
    propertyContainer.className = 'property-container';
    
    properties.forEach((property, index) => {
        let img = document.createElement('img');
        img.src = property.image;
        img.alt = 'Imagem de propriedade';
        
        let detailsButton = document.createElement('button');
        detailsButton.textContent = 'Ver Detalhes';
        detailsButton.addEventListener('click', () => showPropertyDetails(property.descricao));

        let propertyDiv = document.createElement('div');
        propertyDiv.className = 'property-item';
        propertyDiv.appendChild(img);
        propertyDiv.appendChild(detailsButton);
        
        propertyContainer.appendChild(propertyDiv);
    });
    
    chatbox.appendChild(propertyContainer);
    chatbox.scrollTop = chatbox.scrollHeight;  // Mantém o chat rolando para o final
}

// Função para mostrar a descrição da propriedade
function showPropertyDetails(descricao) {
    let descriptionMessage = document.createElement('li');
    descriptionMessage.className = 'chat incoming';
    
    // Criando o parágrafo para a descrição
    let p = document.createElement('p');
    p.innerHTML = descricao;  // Usando innerHTML para processar o botão embutido
    descriptionMessage.appendChild(p);
    
    chatbox.appendChild(descriptionMessage);
    chatbox.scrollTop = chatbox.scrollHeight;

    // Adicionando evento de clique para o botão de WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = button.getAttribute('data-number');
            window.open(`https://wa.me/${phoneNumber}`, '_blank');
        });
    });
}

// Selecionando os botões de acesso rápido
let compraBTN = document.querySelector('#compraBTN');
let aluguelBTN = document.querySelector('#aluguelBTN');

// Adicionando eventos de clique
compraBTN.addEventListener('click', () => {
    handleQuickAccess('compra');
});

aluguelBTN.addEventListener('click', () => {
    handleQuickAccess('aluguel');
});

// Função para lidar com o clique dos botões de acesso rápido
function handleQuickAccess(option) {
    if (option === 'compra') {
        displayCompraOptions();
    } else if (option === 'aluguel') {
        displayAluguelOptions();
    }
}

// Selecionando o botão de ajuda no DOM
let helpBTN = document.querySelector('#helpBTN');

// Adicionando evento de clique para o botão de ajuda
helpBTN.addEventListener('click', displayHelpMessage);

// Função para exibir a mensagem de ajuda
function displayHelpMessage() {
    let helpMessage = `
        <strong>Como usar o chat:</strong><br>
        - Para ver opções de <strong>aluguel</strong>, digite: "Quero alugar uma casa" ou clique no botão "Aluguel".<br>
        - Para ver opções de <strong>compra</strong>, digite: "Quero comprar uma casa" ou clique no botão "Compra".<br>
        - Você pode clicar em "Ver Detalhes" para mais informações sobre uma propriedade e usar o botão do WhatsApp para entrar em contato diretamente.<br>
        - Caso precise de mais informações, entre em contato com nosso suporte pelo WhatsApp.<br><br>
        <button class="whatsapp-button" data-number="+5511999999999">WhatsApp do Atendente</button>
    `;
    
    let descriptionMessage = document.createElement('li');
    descriptionMessage.className = 'chat incoming';
    
    // Criando o parágrafo para a descrição
    let p = document.createElement('p');
    p.innerHTML = helpMessage;  // Usando innerHTML para processar o botão embutido
    descriptionMessage.appendChild(p);
    
    chatbox.appendChild(descriptionMessage);
    chatbox.scrollTop = chatbox.scrollHeight;  // Mantém a rolagem no final do chat

    // Adicionando evento de clique para o botão de WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = button.getAttribute('data-number');
            window.open(`https://wa.me/${phoneNumber}`, '_blank');
        });
    });
}
