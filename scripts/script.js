// Aguarda o HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DOS ELEMENTOS DO HTML ---
    // Seleciona os elementos do formulário e da lista que vamos manipular.
    const form = document.getElementById('captura-dados');
    const despesaNomeInput = document.getElementById('nome-despesa');
    const despesaValorInput = document.getElementById('valor-despesa'); // Seleciona o campo do valor
    const despesaDataInput = document.getElementById('data-despesa');
    const despesaCategoriaInput = document.getElementById('select-despesa');
    const despesaListaDiv = document.getElementById('lista-despesa');
    const valorTotalSpan = document.getElementById('total-valor');

    // --- 2. FUNÇÃO PARA EXIBIR AS DESPESAS NA TELA ---
    const mostrarDespesas = () => {
        // Pega o array de despesas do localStorage. Se não existir, cria um array vazio [].
        // A chave 'despesas' precisa estar entre aspas.
        const despesas = JSON.parse(localStorage.getItem('despesas')) || [];

        // Limpa a lista atual para não exibir itens duplicados.
        despesaListaDiv.innerHTML = '';

        // Inicia a variável que vai somar os valores.
        let totalValor = 0;

        // Itera sobre cada objeto 'despesa' dentro do array 'despesas'.
        despesas.forEach(despesa => {
            // Cria um novo elemento <div> para cada despesa.
            const despesaItem = document.createElement('div');
            // Adiciona uma classe para que possamos estilizar no futuro, se quisermos.
            despesaItem.className = 'despesa-item';

            // Formata a data para o padrão brasileiro (dd/mm/aaaa).
            const formattedDate = new Date(despesa.data + 'T00:00:00').toLocaleDateString('pt-BR');

            // Preenche o HTML do item com as informações corretas do objeto 'despesa'.
            despesaItem.innerHTML = `
                <span><strong>${despesa.nome}</strong></span>
                <span>R$ ${parseFloat(despesa.valor).toFixed(2).replace('.', ',')}</span>
                <span>${formattedDate}</span>
                <span class="categoria">${despesa.categoria}</span>
            `;

            // Adiciona o novo item à lista na tela.
            despesaListaDiv.appendChild(despesaItem);

            // Soma o valor da despesa atual ao total.
            totalValor += parseFloat(despesa.valor);
        });

        // Atualiza o texto do valor total na tela com a soma formatada.
        valorTotalSpan.textContent = `R$ ${totalValor.toFixed(2).replace('.', ',')}`;
    };

    // --- 3. EVENTO DE ENVIO DO FORMULÁRIO ---
    form.addEventListener('submit', (event) => {
        // Impede que a página recarregue ao enviar o formulário.
        event.preventDefault();

        // Cria um novo objeto com os valores dos campos do formulário.
        const novaDespesa = {
            id: Date.now(), // ID único baseado na data/hora atual.
            nome: despesaNomeInput.value,
            valor: despesaValorInput.value,
            data: despesaDataInput.value,
            categoria: despesaCategoriaInput.value
        };

        // Pega o array de despesas que já está salvo.
        const despesas = JSON.parse(localStorage.getItem('despesas')) || [];

        // Adiciona a nova despesa ao array.
        despesas.push(novaDespesa);

        // Salva o array atualizado de volta no localStorage.
        localStorage.setItem('despesas', JSON.stringify(despesas));

        // Limpa os campos do formulário.
        form.reset();
        // Coloca o cursor de volta no primeiro campo para facilitar.
        despesaNomeInput.focus();

        // Chama a função para atualizar a lista na tela.
        mostrarDespesas();
    });

    // --- 4. CARGA INICIAL ---
    // Chama a função uma vez quando a página é carregada para mostrar as despesas salvas.
    mostrarDespesas();
});
