const checkPermission = (permissoesPermitidas) => {
    return (req, res, next) => {
        try {
            const { permissao } = req.userPermissao;
            
            if(!permissoesPermitidas.includes(permissao)) {
              return res.status(403).json({ error: 'Sem permissão para realizar essa operação',
                  permissaoNecessaria: permissoesPermitidas,
                  permissaoRecebida: permissao });
            }
            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = checkPermission;