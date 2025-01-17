const processarCSVTabela = require('../ProcessarCSVTabela');

async function criarImagemRelatorio(dados) {
    const rows = processarCSVTabela(dados);
    
    // Função para criar uma linha separadora
    const createSeparator = (lengths) => {
        return '+' + lengths.map(len => '-'.repeat(len + 2)).join('+') + '+';
    };

    // Função para criar uma linha de dados
    const createRow = (columns, lengths) => {
        return '| ' + columns.map((col, i) => 
            (col + ' '.repeat(lengths[i])).slice(0, lengths[i])
        ).join(' | ') + ' |';
    };

    // Determinar o comprimento máximo de cada coluna
    const headers = ['Mes/Ano', 'Cliente', 'Total Qtde', 'Valor Total'];
    const colLengths = headers.map((header, index) => {
        const columnData = rows.map(row => String(row[index] || ''));
        return Math.max(
            header.length,
            ...columnData.map(item => item.length)
        );
    });

    // Criar a tabela
    let table = [];
    
    // Adicionar cabeçalho
    table.push(createSeparator(colLengths));
    table.push(createRow(headers, colLengths));
    table.push(createSeparator(colLengths));
    
    // Adicionar linhas de dados
    rows.forEach(row => {
        const rowValues = [
            row.mesAno,
            row.cliente,
            row.vezesComprou.toString(),
            `R$ ${row.valorTotal.toFixed(2)}`
        ];
        table.push(createRow(rowValues, colLengths));
    });
    
    // Adicionar linha final
    table.push(createSeparator(colLengths));

    // Retornar a tabela formatada
    return table.join('\n');
}

module.exports = criarImagemRelatorio;