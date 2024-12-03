const dados = [
// colocar o array dos passageiros aqui
];

async function preencherCampos() {
    for (let i = 0; i < dados.length; i++) {
        const item = dados[i];
        console.log("Preenchendo para:", item);

        const cpfDropdown = document.querySelector('div.relative.inline-block.border-1px.bg-white:nth-child(2) select.form-select'); // Dropdown de Tipo de Documento
        const documentoField = document.querySelector('div.bg-white.shadow > div:nth-child(1) > div:nth-child(2) input'); // Campo de Documento
        const nomeField = document.querySelector('div.bg-white.shadow > div:nth-child(1) > div:nth-child(3) input'); // Campo de Nome Completo
        const incrementarButton = document.querySelector('div.bg-white.shadow > div:nth-child(2) > div'); // Botão para incrementar
        const embarqueDropdown = document.querySelector('div.relative.inline-block.border-1px.bg-white:nth-child(1) select.form-select'); // Dropdown de Embarque

        if (!cpfDropdown || !documentoField || !nomeField || !incrementarButton || !embarqueDropdown) {
            console.error("Um ou mais campos não foram encontrados. Verifique os seletores.");
            continue;
        }

        const cpfOptions = Array.from(cpfDropdown.options);
        const cpfOption = cpfOptions.find(option => option.textContent.trim() === "CPF"); 

        if (cpfOption) {
            cpfOption.selected = true; 
            cpfDropdown.dispatchEvent(new Event('input', { bubbles: true })); 
            cpfDropdown.dispatchEvent(new Event('change', { bubbles: true })); 
        } else {
            console.error("Opção 'CPF' não encontrada no dropdown.");
            continue;
        }
        
        documentoField.value = item.cpf || '';
        documentoField.dispatchEvent(new Event('input', { bubbles: true }));
        
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        nomeField.value = item.nome || '';
        nomeField.dispatchEvent(new Event('input', { bubbles: true }));
        
        const embarqueOptions = Array.from(embarqueDropdown.options); 
        const primeiraOpcaoEmbarque = embarqueOptions[0]; 

        if (primeiraOpcaoEmbarque) {
            primeiraOpcaoEmbarque.selected = true; 
            embarqueDropdown.dispatchEvent(new Event('input', { bubbles: true })); 
            embarqueDropdown.dispatchEvent(new Event('change', { bubbles: true })); 
        } else {
            console.error("Nenhuma opção encontrada no dropdown de embarque.");
            continue;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        incrementarButton.click();
        
        await new Promise(resolve => setTimeout(resolve, 1500)); 
    }

    console.log("Automação concluída!");
}

preencherCampos();
