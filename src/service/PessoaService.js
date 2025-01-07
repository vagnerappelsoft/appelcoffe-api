const Service = require('./Service');
const { Setor } = require('../database/models');
const {Pessoa} = require('../database/models');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
  }


  async getByIdPessoa(params) {
    try {
      const item = await Pessoa.findOne({
        where: { id: params.id },
        include: [{
          model: Setor,
          as: 'Setor',
          attributes: ['nome']
        }]
      });

      if (!item) {
        throw new Error('Pessoa não encontrada');
      }

      const plainItem = item.get({ plain: true });
      return {
        id: plainItem.id,
        nome: plainItem.nome,
        foto: plainItem.foto,
        usuario: plainItem.usuario,
        senha: plainItem.senha,
        setor: plainItem.Setor.nome,
        permissao: plainItem.permissao
      };

    } catch (error) {
      throw new Error(`Error fetching pessoa: ${error.message}`);
    }
  }

  async getTodasPessoascomSetor() {
    try {
      const pessoas = await Pessoa.findAll({
        include: [{
          model: Setor,
          as: 'Setor',
          attributes: ['id', 'nome'],
          required: true
        }]
      });

      const transformedPessoas = pessoas.map(pessoa => {
        const plainPessoa = pessoa.get({ plain: true });
        return {
          id: plainPessoa.id,
          foto: plainPessoa.foto,
          nome: plainPessoa.nome,
          setor: {
            id: plainPessoa.Setor.id,
            nome: plainPessoa.Setor.nome
          },
          usuario: plainPessoa.usuario,
          senha: plainPessoa.senha,
          permissao: plainPessoa.permissao
        };
      });

      return transformedPessoas;
    } catch (error) {
      throw new Error(`Error fetching pessoas: ${error.message}`);
    }
  }

  async getListagemPessoa(page = 1, limit = 12, filters = {}, include = []) {
    try {
      const offset = (page - 1) * limit;
      
      // Merge dos includes padrão com os includes recebidos
      const mergedIncludes = include.map(inc => ({
        ...inc,
        required: true
      }));

      const allItems = await this.getAll(filters, null, {
        attributes: ['id', 'foto', 'nome', 'setor_id'],
        include: mergedIncludes,
        limit,
        offset,
        order: [['id', 'DESC']]
      });
      
      const count = await Pessoa.count({ 
        where: filters,
        include: mergedIncludes
      });
      
      const transformedItems = allItems.map(item => {
        const plainItem = item.get({ plain: true });
        return {
          id: plainItem.id,
          foto: plainItem.foto,
          nome: plainItem.nome,
          setor: plainItem.Setor.nome
        };
      });

      return {
        items: transformedItems,
        totalItems: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        itemsPerPage: parseInt(limit)
      };
    } catch (error) {
      throw new Error(`Error fetching paginated pessoas: ${error.message}`);
    }
  }
}

module.exports = PessoaService;