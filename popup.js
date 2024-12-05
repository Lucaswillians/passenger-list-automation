async function preencherCampos(dados) {
    for (let i = 0; i < dados.length; i++) {
        const item = dados[i];
        console.log("Preenchendo para:", item);

        const cpfDropdown = document.querySelector('div.relative.inline-block.border-1px.bg-white:nth-child(2) select.form-select');
        const documentoField = document.querySelector('div.bg-white.shadow > div:nth-child(1) > div:nth-child(2) input');
        const nomeField = document.querySelector('div.bg-white.shadow > div:nth-child(1) > div:nth-child(3) input');
        const incrementarButton = document.querySelector('div.bg-white.shadow > div:nth-child(2) > div');
        const embarqueDropdown = document.querySelector('div.relative.inline-block.border-1px.bg-white:nth-child(1) select.form-select');

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

        await new Promise(resolve => setTimeout(resolve, 200)); 

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
        
        await new Promise(resolve => setTimeout(resolve, 200));

        incrementarButton.click();

        await new Promise(resolve => setTimeout(resolve, 500)); 
    }

    console.log("Automação concluída!");
}

document.addEventListener('DOMContentLoaded', function () {
    const preencherBtn = document.getElementById("preencherBtn");

    if (preencherBtn) {
        preencherBtn.addEventListener("click", () => {
            console.log("Botão pressionado!");

            const pessoasTexto = document.getElementById("pessoas").value.trim();
            console.log("Texto capturado:", pessoasTexto);

            if (!pessoasTexto) {
                alert("Por favor, insira pelo menos uma pessoa.");
                return;
            }

            const dados = pessoasTexto.split("\n").map(item => {
                const [nome, cpf] = item.split(",").map(e => e.trim());
                return { nome, cpf };
            });

            console.log("Dados processados:", dados);

            if (dados.length === 0) {
                alert("Nenhum dado válido encontrado.");
                return;
            }

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: preencherCampos,
                    args: [dados] 
                });
            });
        });
    } else {
        console.error("Botão não encontrado! Verifique o HTML.");
    }
});
