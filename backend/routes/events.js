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
            const dir = path.join(__dirname, '..', 'uploads', 'events');

            // Garante que a pasta exista antes de salvar
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

    router.post('/createEvent', upload.single('imagem'), async (req, res) => {
        const { titulo, descricao, local_evento, cidade, estado, categoria, artista, dt_evento, fim_inscricao, limite_participantes, map_link, nivel_solicitado, } = req.body;
        const capa_evento = req.file ? `/uploads/events/${req.file.filename}` : null;
        const mapLinkFinal = map_link || null;

        let organizador;
        let sql;
        let values;

        if (nivel_solicitado == 2) {
            organizador = artista;
            sql = `
                INSERT INTO tb_eventos  (titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, map_link, capa_evento) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            values = [titulo, descricao, local_evento, cidade, estado,  categoria, organizador, dt_evento, fim_inscricao, limite_participantes, mapLinkFinal, capa_evento];

        } else if(nivel_solicitado == 1){
            const querie = `SELECT * FROM tb_artistas WHERE id_user = ?`;
            const fetch = await db.executar(querie, [artista]);
            organizador = fetch[0].nome_artista;

            sql = `
                INSERT INTO tb_solicitacoes (id_user, titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, map_link, capa_evento) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            values = [artista, titulo, descricao, local_evento, cidade, estado,  categoria, organizador, dt_evento, fim_inscricao, limite_participantes, mapLinkFinal, capa_evento];
        }


        try {

            await db.executar(sql, values);

            res.status(201).json({ message: 'Evento criado com sucesso' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Não foi possível registrar o evento' });
        }
    });

    router.put('/updateEvent/:id', upload.single('imagem'), async (req, res) => {
        const { id } = req.params;
        const { titulo, descricao, local_evento, cidade, estado, categoria, artista, dt_evento, fim_inscricao, limite_participantes, map_link, nivel_solicitado } = req.body;
        const mapLinkFinal = map_link || null;

        let organizador;
        let sql;
        let values = [titulo, descricao, local_evento, cidade, estado, categoria, dt_evento, fim_inscricao, limite_participantes, mapLinkFinal];

        try {
            if (nivel_solicitado == 2) {
                organizador = artista;
                values.splice(6, 0, organizador); // adiciona organizador na posição correta

                sql = `
                    UPDATE tb_eventos
                    SET titulo = ?, descricao = ?, local_evento = ?, cidade = ?, estado = ?, categoria = ?, organizador_evento = ?, dt_evento = ?, fim_inscricao = ?, limite_participantes = ?, map_link = ?
                `;

                // Substituir imagem se houver arquivo novo
                if (req.file) {
                    const buscaSql = 'SELECT capa_evento FROM tb_eventos WHERE id = ?';
                    const [resultado] = await db.executar(buscaSql, [id]);

                    if (resultado && resultado.capa_evento) {
                        const caminhoAntigo = path.join(__dirname, '..', resultado.capa_evento);
                        if (fs.existsSync(caminhoAntigo)) fs.unlinkSync(caminhoAntigo);
                    }

                    sql += ', capa_evento = ?';
                    values.push(`/uploads/events/${req.file.filename}`);
                }

                sql += ' WHERE id = ?';
                values.push(id);

            } else if (nivel_solicitado == 1) {
                // Para nível 1, o organizador não muda
                const querie = `SELECT * FROM tb_artistas WHERE id_user = ?`;
                const fetch = await db.executar(querie, [artista]);
                organizador = fetch[0].nome_artista;

                values.splice(6, 0, organizador);

                sql = `
                    UPDATE tb_solicitacoes
                    SET titulo = ?, descricao = ?, local_evento = ?, cidade = ?, estado = ?, categoria = ?, organizador_evento = ?, dt_evento = ?, fim_inscricao = ?, limite_participantes = ?, map_link = ?, status = 'pendente'
                `;


                if (req.file) {
                    const buscaSql = 'SELECT capa_evento FROM tb_solicitacoes WHERE id = ?';
                    const [resultado] = await db.executar(buscaSql, [id]);

                    if (resultado && resultado.capa_evento) {
                        const caminhoAntigo = path.join(__dirname, '..', resultado.capa_evento);
                        if (fs.existsSync(caminhoAntigo)) fs.unlinkSync(caminhoAntigo);
                    }

                    sql += ', capa_evento = ?';
                    values.push(`/uploads/events/${req.file.filename}`);
                }

                sql += ' WHERE id = ?';
                values.push(id);
            }

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
                return res.status(404).json({ error: 'Evento não encontrado'});
            }

            const data = result[0];

            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ message: 'Não foi possível obter dados do evento'})
        }
    })

    router.get('/solicitationData/:id', async (req, res) => {
        const { id } = req.params;

        try{
            const sql = "SELECT * FROM tb_solicitacoes WHERE id = ?";

            const result = await db.executar(sql, [id]);
            
            if(result.length == 0){
                return res.status(404).json({ error: 'Evento não encontrado'});
            }

            const data = result[0];

            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ message: 'Não foi possível obter dados do evento'})
        }
    })

    router.get('/allSolicitations', async (req, res) => {
    
        try {
            const sql = 'SELECT * FROM tb_solicitacoes ORDER BY dt_evento DESC';
    
            const result = await db.executar(sql);
    
            if(result.length == 0){
                return res.status(404).json({ message: 'Não foi possível encontrar as solicitações'});
            }
    
            res.status(200).json(result);
    
        } catch (err) {
            res.status(404).json({ message: 'Não foi possível acessar as solicitações'});
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

    router.delete('/rejectSolicitation/:id', async (req, res) => {
        const { id } = req.params;

        try {
            // Buscar a imagem antes de deletar o evento
            const buscaSql = 'SELECT capa_evento FROM tb_solicitacoes WHERE id = ?';
            const [resultado] = await db.executar(buscaSql, [id]);

            if (resultado && resultado.capa_evento) {
                const caminhoImagem = path.join(__dirname, '..', resultado.capa_evento);
                if (fs.existsSync(caminhoImagem)) {
                    fs.unlinkSync(caminhoImagem); // apaga a imagem
                }
            }

            // Remove evento
            const sql = 'DELETE FROM tb_solicitacoes WHERE id = ?';
            await db.executar(sql, [id]);

            res.status(200).json({ message: 'Solicitação rejeitada com sucesso' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao rejeitar solicitação' });
        }
    });

    // Aprovar solicitação
    router.post('/approveSolicitation', async (req, res) => {
        const { id } = req.body;

        try {
            const buscaSql = 'SELECT * FROM tb_solicitacoes WHERE id = ?';
            const [resultado] = await db.executar(buscaSql, [id]);

            if (!resultado) {
                return res.status(404).json({ message: 'Solicitação não encontrada' });
            }

            const {
                titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, capa_evento,map_link, id_user
            } = resultado;

            const insertSql = `
            INSERT INTO tb_eventos (titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, total_inscritos, concluido, capa_evento, map_link, user_solicitacao, artista_cod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'N', ?, ?, ?, ?)
            `;

            await db.executar(insertSql, [
                titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, capa_evento, map_link, id, id_user
            ]);

            const deleteSql = 'DELETE FROM tb_solicitacoes WHERE id = ?';
            await db.executar(deleteSql, [id]);

            res.status(200).json({ message: 'Solicitação aprovada e movida para eventos com sucesso!' });
        } catch (err) {
            console.error('Erro ao aprovar solicitação:', err);
            res.status(500).json({ message: 'Erro ao aprovar solicitação' });
        }
    });


    module.exports = router