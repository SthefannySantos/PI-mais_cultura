    const DatabaseClient = require('../utils/database');
    const express = require('express');

    const db = new DatabaseClient();

    const router = express.Router();

    router.post('/createEvent', async (req, res) => {
        const { titulo, desc, localEvento, categotia, organizador, dt_evento, fim_inscricao, maxParticipantes } = req.body;

        const values = [titulo, desc, localEvento, categotia, organizador, dt_evento, fim_inscricao, maxParticipantes];

        try {
            const sql = "INSERT INTO tb_eventos (titulo, descricao, local_evento, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            const result = await db.executar(sql, values);

            res.status(201).json({ message: 'Evento criado com sucesso'});
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível registrar um evento'});
        }
    })

    router.put('/editEvent', async (req, res) => {
        const { titulo, desc, localEvento, categotia, organizador, dt_evento, fim_inscricao, maxParticipantes, id } = req.body;

        const values = [titulo, desc, localEvento, categotia, organizador, dt_evento, fim_inscricao, maxParticipantes, id];

        try {
            const sql = "UPDATE tb_eventos SET titulo = ?, descricao = ?, local_evento = ?, categoria = ?, organizador_evento = ?, dt_evento = ?, fim_inscricao = ?, limite_participantes = ? WHERE id = ?";

            const result = await db.executar(sql, values);

            res.status(200).json({ message: 'Evento atualizado com sucesso'});
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível atualizar o evento'});
        }
    })

    router.put('/concluirEvento/:id', async (req, res) => {
        const { id } = req.params;

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
                return res.status(404).json({ message: 'Não há eventos disponíveis'});
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
                return res.status(404).json({ message: 'Não há eventos disponíveis'});
            }

            const data = result;

            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível obter dados dos eventos'})
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

        try{
            const sql = "DELETE FROM tb_eventos WHERE id = ?"

            const result = db.executar(sql, [id]);

            res.status(200).json({ message: 'Evento deletado com sucesso'})
        } catch (err) {
            res.status(500).json({ message: 'Erro ao excluir evento'})
        }
    })

    module.exports = router