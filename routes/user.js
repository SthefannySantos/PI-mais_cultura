const DatabaseClient = require('../utils/database');
const express = require('express');
const bcrypt = require('bcrypt');

const db = new DatabaseClient();

const router = express.Router();

router.post('/createUser', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const emailCheckQuery = "SELECT id FROM tb_usuarios WHERE email = ?";
        const emailCheckResult = await db.executar(emailCheckQuery, [email]);

        if (emailCheckResult.length > 0) {
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const values = [name, email, hashedPassword];
        
        const query = "INSERT INTO tb_usuarios (nome, email, senha, nivel_acesso, ativo) VALUES (?, ?, ?, '0', 'S')";

        const result = await db.executar(query, values);

        res.status(201).json({ message: 'Cadastro feito com sucesso:'});

    } catch (err) {
        console.log('Erro ao registrar usuário:', err);
        return res.status(500).json({ message: 'Erro ao registrar usuário'});
    } 
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const queryMail = 'SELECT * FROM tb_usuarios WHERE email = ?';

        const validateEmail = await db.executar(queryMail, [email]);

        if(validateEmail.length === 0){
            return res.status(404).json({ message: 'Email não encontrado ou cadastrado'});
        }
    
        const userData = validateEmail[0];
        
        const isValidate = await bcrypt.compare(password, userData.senha);
        
        const url = userData.nivel_acesso == 2 ? '/admin/' : '/';

        const data = {
            id: userData.id,
            nome: userData.nome,
            email: userData.email,
            acesso: userData.nivel_acesso,
            url: url
        }

        if (isValidate){
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'Usuário ou senha incorretos'})
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

router.get('/artist/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const query = 'SELECT *  FROM tb_artistas WHERE id = ?';

        const result = await db.executar(query, [id]);

        const data = result[0];

        if (result.length === 0){
            res.status(404).json({ message: 'Artista não encontrado'});
        }

        res.status(200).json(data);

    } catch (err) {
        console.log('Erro ao consultar informações do artista');
        res.status(500).json({ message: 'Não foi possível acessar as informações do artista '})

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

router.get('/usersData', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT nome, email, id, nivel_acesso FROM tb_usuarios';

        const result = await db.executar(query, [id]);

        const data = result;

        if (result.length === 0){ res.status(404).json({ message: 'Usuários não encontrados'}); }

        res.status(200).json(data);

    } catch (err) {
        console.log('Erro ao consultar informações dos usuários');
        res.status(500).json({ message: 'Não foi possível acessar as informações dos usuários '})

    }
})

router.get('/artistsData', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT * FROM tb_artistas';

        const result = await db.executar(query, [id]);

        const data = result;

        if (result.length === 0){ res.status(404).json({ message: 'Artistas não encontrados'}); }

        res.status(200).json(data);

    } catch (err) {
        console.log('Erro ao consultar informações dos artistas');
        res.status(500).json({ message: 'Não foi possível acessar as informações dos artistas'})

    }
})

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do multer - destino e nome do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '..', 'uploads', 'artists');

        if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + Date.now() + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage });

router.post('/createArtist', upload.single('imagem'), async (req, res) => {
    const { id_user, nome_artista, descricao, atuacao, email, telefone, wpp, instagram, x } = req.body;
    const capa_artista = req.file ? `/uploads/artists/${req.file.filename}` : null;

    console.log(id_user, nome_artista, descricao, atuacao, email, telefone, wpp, instagram, x)

    const safeValue = (v) => (v === undefined || v === null || v === '' ? null : v);

    const fields = ['id_user', 'nome_artista', 'descricao', 'atuacao', 'profile_pic', 'email', 'telefone', 'wpp', 'instagram', 'x'];
    const values = [ safeValue(id_user), safeValue(nome_artista), safeValue(descricao), safeValue(atuacao), safeValue(capa_artista), safeValue(email), safeValue(telefone), safeValue(wpp), safeValue(instagram), safeValue(x) ];

    const placeholders = fields.map(() => '?').join(', ');
    const sqlInsert = `INSERT INTO tb_artistas (${fields.join(', ')}) VALUES (${placeholders})`;
    const sqlUpdate = `UPDATE tb_usuarios SET nivel_acesso = 1 WHERE id = ?`;

    try {
        await db.executar(sqlInsert, values);

        // Atualiza o nivel_acesso do usuário
        await db.executar(sqlUpdate, [id_user]);

        res.status(201).json({ message: 'Artista criado e nível de acesso atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Não foi possível registrar o artista ou atualizar o nível de acesso' });
    }
});

router.put('/editArtist', upload.single('imagem'), async (req, res) => {
    const { id, nome_artista, descricao, atuacao, email, telefone, wpp, instagram, x } = req.body;
    const novaImagem = req.file ? `/uploads/artists/${req.file.filename}` : null;

    if (!id) { return res.status(400).json({ message: 'ID do artista é obrigatório' }); }

    const safeValue = (v) => (v === undefined || v === null || v === '' ? null : v);

    let imagemAntiga = null;
    try {
        const [artista] = await db.executar('SELECT profile_pic FROM tb_artistas WHERE id = ?', [id]);
        if (artista) {
            imagemAntiga = artista.profile_pic;
        }
    } catch (err) {
        console.error(err);
    }

    const updates = [];
    const values = [];

    if (nome_artista !== undefined) { updates.push('nome_artista = ?'); values.push(safeValue(nome_artista)); }
    if (descricao !== undefined) { updates.push('descricao = ?'); values.push(safeValue(descricao)); }
    if (atuacao !== undefined) { updates.push('atuacao = ?'); values.push(safeValue(atuacao)); }
    if (email !== undefined) { updates.push('email = ?'); values.push(safeValue(email)); }
    if (telefone !== undefined) { updates.push('telefone = ?'); values.push(safeValue(telefone)); }
    if (wpp !== undefined) { updates.push('wpp = ?'); values.push(safeValue(wpp)); }
    if (instagram !== undefined) { updates.push('instagram = ?'); values.push(safeValue(instagram)); }
    if (x !== undefined) { updates.push('x = ?'); values.push(safeValue(x)); }

    if (novaImagem !== null) { 
        updates.push('profile_pic = ?'); 
        values.push(safeValue(novaImagem));

        if (imagemAntiga) { // Apaga a imagem antiga se existir
            const caminhoAntigo = path.join(__dirname, '..', imagemAntiga); // ajuste conforme sua estrutura
            fs.unlink(caminhoAntigo, (err) => {
                if (err) console.error('Erro ao apagar imagem antiga:', err);
            });
        }
    }

    if (updates.length === 0) { return res.status(400).json({ message: 'Nenhum campo para atualizar' }); }

    const sqlUpdateArtist = `UPDATE tb_artistas SET ${updates.join(', ')} WHERE id = ?`;
    values.push(id);

    try {
        await db.executar(sqlUpdateArtist, values);
        res.status(200).json({ message: 'Artista atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Não foi possível atualizar o artista' });
    }
});


module.exports = router