const { createCanvas } = require('canvas');
const processarCSVTabela = require('../ProcessarCSVTabela');



async function criarImagemRelatorio(dados) {
    const rows = processarCSVTabela(dados);
    
    // Configuração do canvas
    const width = 650;
    const height = Math.max(250, rows.length * 40 + 100);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Configurar fundo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Configurações da tabela
    const startX = 50;
    const startY = 50;
    const rowHeight = 40;
    const colWidths = [100, 200, 120, 120];
    
    // Função auxiliar para desenhar célula
    function drawCell(text, x, y, width, isHeader = false) {
        ctx.fillStyle = isHeader ? '#f0f0f0' : '#ffffff';
        ctx.fillRect(x, y, width, rowHeight);
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, rowHeight);
        
        // Centralizar texto
        ctx.fillStyle = '#000000';
        ctx.font = isHeader ? 'bold 16px Arial' : '14px Arial';
        const textWidth = ctx.measureText(text).width;
        const textX = x + (width - textWidth) / 2;
        const textY = y + rowHeight/2 + 5;
        ctx.fillText(text, textX, textY);
    }
    
    // Desenhar cabeçalhos
    const headers = ['Mes/Ano', 'Cliente', 'Total Qtde', 'Valor Total'];
    let currentX = startX;
    headers.forEach((header, index) => {
        drawCell(header, currentX, startY, colWidths[index], true);
        currentX += colWidths[index];
    });
    
    // Desenhar linhas de dados
    let currentY = startY + rowHeight;
    rows.forEach((row) => {
        currentX = startX;
        
        // Mes/Ano
        drawCell(row.mesAno, currentX, currentY, colWidths[0]);
        currentX += colWidths[0];
        
        // Cliente
        drawCell(row.cliente, currentX, currentY, colWidths[1]);
        currentX += colWidths[1];
        
        // Vezes Comprou
        drawCell(row.vezesComprou.toString(), currentX, currentY, colWidths[2]);
        currentX += colWidths[2];
        
        // Valor Total
        drawCell(`R$ ${row.valorTotal.toFixed(2)}`, currentX, currentY, colWidths[3]);
        
        currentY += rowHeight;
    });
    
    
    
    // Converter canvas para buffer
    return canvas.toBuffer('image/png');
}

module.exports = criarImagemRelatorio