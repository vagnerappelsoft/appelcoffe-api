const criarImagemRelatorio = require('../utils/discord/CriarImagemRelatorio');

let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;
})();

class DiscordController {
    async enviarRelatorioDiscord(req, res) {
        const { content } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        try {
            // Lê o conteúdo do arquivo como string
            const fileContent = file.buffer.toString('utf-8');
            
            // Cria a tabela formatada
            const tabelaFormatada = await criarImagemRelatorio(fileContent);
            
            // Prepara a mensagem com a tabela em formato de código
            const mensagem = {
                content: `${content || '📊 Relatório de Vendas do Café:'}\n\`\`\`\n${tabelaFormatada}\n\`\`\``
            };

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mensagem)
            });

            if (response.ok) {
                res.status(200).json({ success: true, message: 'Relatório enviado com sucesso' });
            } else {
                res.status(500).json({ success: false, message: 'Erro ao enviar relatório' });
            }
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ success: false, message: 'Erro ao processar relatório', error: error.message });
        }
    }
}

module.exports = new DiscordController();