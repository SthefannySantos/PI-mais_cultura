    const DatabaseClient = require('../utils/database');
    const express = require('express');

    const db = new DatabaseClient();

    const router = express.Router();

    const multer = require('multer');
    const path = require('path');
    const fs = require('fs'); // manipular arquivos

    // Configuração do multer - destino e nome do arquivo
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads'));
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = file.fieldname + '-' + Date.now() + ext;
            cb(null, filename);
        }
    });

    const upload = multer({ storage });

    router.post('/createEvent', upload.single('imagem'), async (req, res) => {
        const { titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes } = req.body;
        const imagem_capa = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const sql = `INSERT INTO tb_eventos (titulo, descricao, local_evento, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, capa_evento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes, imagem_capa];

            await db.executar(sql, values);

            res.status(201).json({ message: 'Evento criado com sucesso' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Não foi possível registrar o evento' });
        }
    }); 

    router.put('/editEvent', upload.single('imagem'), async (req, res) => {
        const { titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes, id } = req.body;

        let values = [titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes];
        let imagemSql = '';

        try {
            if (req.file) {
                // Buscar imagem anterior
                const buscaSql = 'SELECT capa_evento FROM tb_eventos WHERE id = ?';
                const [resultado] = await db.executar(buscaSql, [id]);

                if (resultado && resultado.capa_evento) {
                    const caminhoAntigo = path.join(__dirname, '..', resultado.capa_evento);
                    if (fs.existsSync(caminhoAntigo)) {
                        fs.unlinkSync(caminhoAntigo); // apaga a imagem antiga
                    }
                }

                imagemSql = ', capa_evento = ?';
                values.push(`/uploads/${req.file.filename}`);
            }

            values.push(id); // ID sempre por último

            let sql = `UPDATE tb_eventos SET titulo = ?, descricao = ?, local_evento = ?, categoria = ?, organizador_evento = ?, dt_evento = ?, fim_inscricao = ?, limite_participantes = ?${imagemSql} WHERE id = ?`;

            await db.executar(sql, values);

            res.status(200).json({ message: 'Evento atualizado com sucesso' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Não foi possível atualizar o evento' });
        }
    });

    router.put('/concluirEvento/', async (req, res) => {
        const { id } = req.body;

        try {
            const sql = "UPDATE tb_eventos SET concluido = 'S' WHERE id = ?";

            const result = await db.executar(sql, [id]);

            res.status(200).json({ message: 'Evento concluido com sucesso'});
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível concluir o evento'});
        }
    })

    router.get('/eventsAvaliable', async (req, res) => {

        try{
            const sql = "SELECT * FROM tb_eventos WHERE concluido = 'N' ORDER BY dt_evento desc";

            const result = await db.executar(sql);
            
            if(result.length == 0){
                return res.status(204).json({ message: 'Não há eventos disponíveis'});
            }

            const data = result;

            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível obter dados dos eventos'})
        }
    })

    router.get('/eventsFinished', async (req, res) => {

        try{
            const sql = "SELECT * FROM tb_eventos WHERE concluido = 'S' ORDER BY dt_evento desc";

            const result = await db.executar(sql);
            
            if(result.length == 0){
                return res.status(204).json({ message: 'Não há eventos disponíveis'});
            }

            const data = result;

            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível obter dados dos eventos'})
        }
    })

    router.get('/allEvents', async (req, res) => {
    
        try {
            const sql = 'SELECT * FROM tb_eventos ORDER BY dt_evento DESC';
    
            const result = await db.executar(sql);
    
            if(result.length == 0){
                return res.status(404).json({ message: 'Não foi possível ou não há eventos inscritos pelo usuário'});
            }
    
            res.status(200).json(result);
    
        } catch (err) {
            res.status(404).json({ message: 'Não foi possível acessar os eventos'});
        }
    })

    router.get('/eventData/:id', async (req, res) => {
        const { id } = req.params;

        try{
            const sql = "SELECT * FROM tb_eventos WHERE id = ?";

            const result = await db.executar(sql, [id]);
            
            if(result.length == 0){
                res.status(404).json({ message: 'Evento não encontrado'});
            }

            const data = result[0];

            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível obter dados do evento'})
        }
    })

    router.delete('/deleteEvent/:id', async (req, res) => {
        const { id } = req.params;

        try {
            // Buscar a imagem antes de deletar o evento
            const buscaSql = 'SELECT capa_evento FROM tb_eventos WHERE id = ?';
            const [resultado] = await db.executar(buscaSql, [id]);

            if (resultado && resultado.capa_evento) {
                const caminhoImagem = path.join(__dirname, '..', resultado.capa_evento);
                if (fs.existsSync(caminhoImagem)) {
                    fs.unlinkSync(caminhoImagem); // apaga a imagem
                }
            }

            // Remove evento
            const sql = 'DELETE FROM tb_eventos WHERE id = ?';
            await db.executar(sql, [id]);

            // Remove inscrições relacionadas
            const sqlRemoveSubscription = 'DELETE FROM tb_inscricoes WHERE evento_id = ?';
            await db.executar(sqlRemoveSubscription, [id]);

            res.status(200).json({ message: 'Evento deletado com sucesso' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao excluir evento' });
        }
    });

    module.exports = router