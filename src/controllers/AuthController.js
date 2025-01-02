const jwt = require('jsonwebtoken');
const { Pessoa, Setor } = require('../database/models');
require('dotenv').config();

class AuthController {
    async login(req, res) {
        const { usuario, senha } = req.body;

        try {
            const pessoa = await Pessoa.findOne({ 
                where: { usuario },
                include: {
                    model: Setor,
                    as: 'Setor',
                    attributes: ['nome'],
                    required: true
                }
            });

            if (!pessoa) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            if (!pessoa.checkPassword(senha)) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            const token = jwt.sign({ id: pessoa.id, permissao: pessoa.permissao }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            

            return res.json({
                pessoa: {
                    id: pessoa.id,
                    nome: pessoa.nome,
                    usuario: pessoa.usuario,
                    permissao: pessoa.permissao,
                    setor: pessoa.Setor.nome,
                    foto: pessoa.foto,
                },
                token,
                tipo: `Usuário com permissão: ${pessoa.permissao}`
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new AuthController();