const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const env = process.env.NODE_ENV || 'development';
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 segundos

const sequelize = new Sequelize(config[env]);

async function waitForDatabase(retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✓ Conexão com o banco de dados estabelecida com sucesso.');
      return true;
    } catch (error) {
      console.log(`Tentativa ${i + 1}/${retries}: Não foi possível conectar ao banco de dados.`);
      if (i < retries - 1) {
        console.log(`Aguardando ${RETRY_DELAY/1000} segundos antes de tentar novamente...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  console.error('✗ Falha ao conectar ao banco de dados após várias tentativas.');
  return false;
}

async function runDatabaseSetup() {
  try {
    // Aguarda o banco estar disponível
    const connected = await waitForDatabase();
    if (!connected) {
      console.error('Abortando configuração devido a falha na conexão com o banco.');
      process.exit(1);
    }

    // Executa todas as migrações
    console.log('Executando migrações...');
    await execPromise('npx sequelize-cli db:migrate');
    console.log('✓ Migrações executadas com sucesso');

    // Executa todos os seeds
    console.log('Executando seeds...');
    await execPromise('npx sequelize-cli db:seed:all');
    console.log('✓ Seeds executados com sucesso');

    console.log('Configuração do banco de dados concluída com sucesso!');
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro durante a configuração do banco de dados:', error);
    await sequelize.close();
    process.exit(1);
  }
}

runDatabaseSetup();
