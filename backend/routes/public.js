const { capitalizeWords } = require('../utils/capitalize');
const DatabaseClient = require('../utils/database');
const express = require('express');

const db = new DatabaseClient();
const router = express.Router();

router.get('/cidades', async (req, res) => {
    try {
        const sql = `
            SELECT DISTINCT TRIM(cidade) AS cidade
            FROM tb_eventos
            WHERE cidade IS NOT NULL AND TRIM(cidade) != ''
            ORDER BY cidade ASC
        `;

        const result = await db.executar(sql);

        if (result.length === 0) {
            return res.status(204).json({ message: 'Não há cidades cadastradas' });
        }

        const cidades = result.map(item => capitalizeWords(item.cidade));

        return res.status(200).json(cidades);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Não foi possível acessar as cidades' });
    }
});

router.get('/categorias', async (req, res) => {
    try {
        const categorias = ['teatro', 'musica', 'danca', 'cinema', 'literatura'];
        return res.status(200).json(categorias);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Não foi possível acessar as categorias' });
    }
});

router.get('/eventos', async (req, res) => {
    const { cidade, categoria, titulo, artista, concluido } = req.query;

    try {
        let sql = `
            SELECT
                id, titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, total_inscritos, capa_evento, map_link, valor
            FROM tb_eventos
            WHERE 1=1
        `;

        const values = [];

        if (concluido && ['S', 'N'].includes(concluido)) {
            sql += ' AND concluido = ?';
            values.push(concluido);
        } else {
            sql += " AND concluido = 'N'";
        }

        if (cidade) {
            sql += ' AND TRIM(LOWER(cidade)) = TRIM(LOWER(?))';
            values.push(cidade);
        }

        if (categoria) {
            sql += ' AND TRIM(LOWER(categoria)) = TRIM(LOWER(?))';
            values.push(categoria);
        }

        if (titulo) {
            sql += ' AND TRIM(LOWER(titulo)) LIKE TRIM(LOWER(?))';
            values.push(`%${titulo}%`);
        }

        if (artista) {
            sql += ' AND TRIM(LOWER(organizador_evento)) LIKE TRIM(LOWER(?))';
            values.push(`%${artista}%`);
        }

        sql += ' ORDER BY dt_evento ASC';

        const result = await db.executar(sql, values);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

router.get('/eventos/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const sql = `
            SELECT
                id, titulo, descricao, local_evento, cidade, estado, categoria, organizador_evento, dt_evento, fim_inscricao, limite_participantes, total_inscritos, capa_evento, map_link, valor FROM tb_eventos
            WHERE id = ?
        `;

        const result = await db.executar(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Não foi possível acessar o evento' });
    }
});

router.get('/artistas', async (req, res) => {
    const { nome, atuacao } = req.query;

    try {
        let sql = `
            SELECT id, nome_artista, atuacao, descricao, profile_pic, instagram, x FROM tb_artistas WHERE 1=1
        `;

        const values = [];

        if (nome) { sql += ' AND TRIM(LOWER(nome_artista)) LIKE TRIM(LOWER(?))'; values.push(`%${nome}%`); }

        if (atuacao) { sql += ' AND TRIM(LOWER(atuacao)) LIKE TRIM(LOWER(?))'; values.push(`%${atuacao}%`); }

        sql += ' ORDER BY nome_artista ASC';

        const result = await db.executar(sql, values);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Não foi possível acessar os artistas' });
    }
});

router.get('/artistas/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const sql = `
            SELECT id, nome_artista, atuacao, descricao, profile_pic, instagram, x FROM tb_artistas WHERE id = ?
        `;

        const result = await db.executar(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Artista não encontrado' });
        }

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Não foi possível acessar o artista' });
    }
});

module.exports = router;