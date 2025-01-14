const express = require('express');
const multer = require('multer');
const { createCanvas } = require('canvas');
const router = express.Router();

let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;
})();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 7 * 1024 * 1024 // 7MB
    }
});

// Função para processar o arquivo CSV com tabulação
function processarCSV(conteudo) {
    try {
        // Verifica se o conteúdo existe
        if (!conteudo) {
            throw new Error('Conteúdo do arquivo está vazio');
        }

        // Remove aspas extras e divide as linhas
        const linhas = conteudo
            .split('\n')
            .map(linha => linha.trim().replace(/"/g, '')) // Remove aspas
            .filter(linha => linha.length > 0);

        // Verifica se há linhas suficientes
        if (linhas.length < 2) {
            throw new Error('Arquivo não contém dados suficientes');
        }

        // Remove o cabeçalho
        const cabecalho = linhas.shift();
        
        // Processa as linhas de dados
        return linhas.map(linha => {
            const [mesAno, cliente, vezesComprou, valorTotal] = linha.split(';').map(item => item ? item.trim() : '');
            
            // Validação dos campos
            if (!mesAno || !cliente || !vezesComprou || !valorTotal) {
                throw new Error('Linha com dados incompletos: ' + linha);
            }

            return {
                mesAno,
                cliente,
                vezesComprou: parseInt(vezesComprou) || 0,
                valorTotal: parseFloat(valorTotal) || 0
            };
        });
    } catch (error) {
        console.error('Erro ao processar CSV:', error);
        throw new Error('Erro ao processar arquivo: ' + error.message);
    }
}

// Função para criar a imagem do relatório em formato de tabela
async function criarImagemRelatorio(dados) {
    const rows = processarCSV(dados);
    
    // Configuração do canvas
    const width = 650;
    const height = Math.max(400, rows.length * 40 + 100);
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

router.post('/enviarDiscord', upload.single('file'), async (req, res) => {
    const { content } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    try {
        // Lê o conteúdo do arquivo como string
        const fileContent = file.buffer.toString('utf-8');
        
        // Cria a imagem do relatório
        const imagemBuffer = await criarImagemRelatorio(fileContent);
        
        const formData = new FormData();
        formData.append('content', content || '📊 Relatório de Vendas do Café:');
        formData.append('file', new Blob([imagemBuffer]), 'relatorio.png');

        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: 'Relatório enviado com sucesso' });
        } else {
            res.status(500).json({ success: false, message: 'Erro ao enviar relatório' });
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;