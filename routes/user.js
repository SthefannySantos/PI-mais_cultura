const DatabaseClient = require('../utils/database');
const express = require('express');
const bcrypt = require('bcrypt');

const db = new DatabaseClient();

const router = express.Router();

router.post('/createUser', async (req, res) => {

    const { nome, email, senha } = req.body;

    try {

        const emailCheckQuery = "SELECT id FROM tb_usuarios WHERE email = ?";
        const emailCheckResult = await db.executar(emailCheckQuery, [email]);

        if (emailCheckResult.length > 0) {
            console.log('e-mail já cadastrado');
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const saltRounds = 10;

        const senhaHash = await bcrypt.hash(senha, saltRounds)

        const values = [nome, email, senhaHash];
        
        const query = "INSERT INTO tb_usuarios (nome, email, senha, nivel_acesso, ativo) VALUES (?, ?, ?, '0', 'S')";

        const result = await db.executar(query, values);

        res.status(201).json({ message: 'Cadastro feito com sucesso:'});

    } catch (err) {
        console.log('Erro ao registrar usuário:', err);
        return res.status(500).json({ message: 'Erro ao registrar usuário'});
    } 
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const queryMail = 'SELECT * FROM tb_usuarios WHERE email = ?';

        const validateEmail = await db.executar(queryMail, [email]);

        if(validateEmail.length === 0){
            return res.status(404).json({ message: 'Email não encontrado ou cadastrado'});
        }

        const userData = validateEmail[0]

        console.log(userData)

        const isValidate = await bcrypt.compare(senha, userData.senha);

        if (isValidate){
            res.status(200).json({ message: 'Seja bem-vindo ' + userData.nome });
        } else {
            res.status(404).json({ message: 'Não foi possivel completar o login'})
        }
    } catch (err) {
        res.status(500).json({ message: 'não foi possivel realizar o login'});
        
    }
})

router.get('/userInfo/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const query = 'SELECT nome, email FROM tb_usuarios WHERE id = ?';

        const result = await db.executar(query, [id]);

        const data = result[0];

        if (result.length === 0){
            res.status(404).json({ message: 'Usuário não encontrado'});
        }

        res.status(200).json(data);

    } catch (err) {
        console.log('Erro ao consultar informações do usuário');
        res.status(500).json({ message: 'Não foi possível acessar as informações do usuário '})

    }
})

router.put('/editUser', async (req, res) => {

    const { id, nome, email } = req.body;

    try {
        const values = [nome, email, id];

        const checkUserQuery = "SELECT id FROM tb_usuarios WHERE id = ?";
        const userExists = await db.executar(checkUserQuery, [id]);

        if (userExists.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        
        const query = "UPDATE tb_usuarios SET nome = ?, email = ? WHERE id = ?";

        const result = await db.executar(query, values);

        res.status(200).json({ message: 'Usuário atualizado com sucesso:', result});

    } catch (err) {
        console.log('Erro ao atualizar usuário:', err);
        return res.status(500).json({ message: 'Erro ao atualizar usuário'});
    } 
});

router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const query = 'DELETE FROM tb_usuarios WHERE id = ?';

        const result = await db.executar(query, [id]);

        if(result.affectedRows === 0){
            return res.status(404).json({ message: 'Usuário não encontrado'});
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso'});
    } catch (err) {
        console.log('Erro ao deletar usuário:', err);
        return res.status(500).json({ message: 'Erro ao deletar o usuário'})

    }
});

module.exports = router