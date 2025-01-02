const Service = require('./Service');
const { Setor } = require('../database/models');
const {Pessoa} = require('../database/models');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
  }

  async getListagemPessoa(page = 1, limit = 12, filters = {}, include = []) {
    try {
      const offset = (page - 1) * limit;
      const options = {
        attributes: ['id', 'foto', 'nome', 'setor_id'],
        include,
        where: filters,
        limit,
        offset,
        order: [['id', 'DESC']]
      };
      
      const allItems = await this.getAll(null, null, options);
      const count = await Pessoa.count({ 
        where: filters,
        include
      });
      
      // Transformar a resposta para incluir o nome do setor ao invés do ID
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
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        itemsPerPage: limit
      };
    } catch (error) {
      throw new Error(`Error fetching paginated pessoas: ${error.message}`);
    }
  }
}

module.exports = PessoaService;