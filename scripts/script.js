document.addEventListener('DOMContentLoaded', () =>{
    //pegas as infos do html

    const form = document.getElementById('captura-dados')
    const despesaNome = document.getElementById('nome-despesa')
    const despesaTotal = document.getElementById('total-despesa')
    const despesaData = document.getElementById('data-despesa')
    const despesaCategoria = document.getElementById('select-despesa')

    const despesaLista = document.getElementById('lista-despesa')
    const valorTotal = document.getElementById('total-valor')

    //função pra carregar e salvar tudo
     const mostrarDespesas = () =>{

        const despesas = JSON.parse(localStorage.getItem(despesas)) || []

         despesaLista.innerHTML = ''

         let totalValor = 0

         despesas.forEach(despesas => {
             const despesaItem =document.createElement('div')
             despesaItem.className('despesa-item')

             const formattedDate = new Date(expense.date + 'T00:00:00').toLocaleDateString('pt-BR')

             despesaItem.innerHTML = `
                <span><strong>${despesaNome}</strong></span>
                <span>R$ ${parseFloat(despesaTotal).toFixed(2).replace('.', ',')}</span>
                <span>${formattedDate}</span>
                <span class="categorias">${expense.category}</span>`

             despesaLista.appendChild(despesaItem)

             totalValor += parseFloat(valorTotal)
         })
         valorTotal.textContent = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`

     }

     form.addEventListener('submit', (event) => {
         const novaDespesa ={
             id: Date.now(),
             nome: despesaNome.value,
             valor: despesaTotal.value,
             data: despesaData.value,
             categoria : despesaCategoria.value
         }

         const despesas =JSON.parse(localStorage.getItem('despesas')) || []

         despesas.push(novaDespesa)

         localStorage.setItem('despesas',  JSON.stringify(despesas))

         form.reset()

         despesaNome.focus()

         mostrarDespesas()
     })

    mostrarDespesas()

}