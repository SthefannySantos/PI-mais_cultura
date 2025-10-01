const DatabaseClient = require('../utils/database');
const express = require('express');
const nodemailer = require('nodemailer');

const db = new DatabaseClient();

const router = express.Router();

router.post('/subscribeEvent', async (req, res) => {
    const { userId, eventId } = req.body;

    try{
        const sql = 'INSERT INTO tb_inscricoes (usuario_id, evento_id) VALUES (?,?)';

        const result = await db.executar(sql, [userId, eventId]);

        const sqlUpdate = 'UPDATE tb_eventos SET total_inscritos = total_inscritos + 1 WHERE id = ?';
        await db.executar(sqlUpdate, [eventId]);

        res.status(201).json({ message: 'Usuário inscrito com sucesso'});
    } catch (err) {
        res.status(500).json({message: 'Não foi possível se inscrever no evento'})
    }
})

router.get('/verifyUserSubscribed/:user/:event', async (req, res) => {
    const { user, event } = req.params;

    try {
        const sql = 'SELECT * FROM tb_inscricoes WHERE usuario_id = ? AND evento_id = ?';
        const rows = await db.executar(sql, [user, event]);

        const data = rows;

        if(data.length == 0){
            return res.status(200).json({ message: 'Disponivel'});
        } else {
            return res.status(200).json({ message: 'Inscrito'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível buscar usuário'});
    }
})

router.delete('/cancelSubscription/:user/:event', async (req, res) => {
    const { user, event } = req.params;

    try {
        const sql = 'DELETE FROM tb_inscricoes WHERE usuario_id = ? AND evento_id = ?';

        const result = await db.executar(sql, [user, event]);

        const sqlUpdate = 'UPDATE tb_eventos SET total_inscritos = total_inscritos - 1 WHERE id = ?';
        await db.executar(sqlUpdate, [event]);
        
        res.status(200).json({ message: 'Inscrição cancelada com sucesso'})

    } catch (err) {
        res.status(500).json({ message: 'Não foi possível cancelar a inscrição'})

    }
})

router.get('/userEventsSubscribed/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = ' SELECT e.* FROM tb_inscricoes i JOIN tb_eventos e ON i.evento_id = e.id WHERE i.usuario_id = ?';

        const result = await db.executar(sql, [id]);

        if(result.length == 0){
            return res.status(404).json({ message: 'Não foi possível ou não há eventos inscritos pelo usuário'});
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(404).json({ message: 'Não foi possível acessar os eventos'});
    }
})

router.post('/contact', async (req, res) => {
    const { name, email, contactType, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // seu próprio email
        subject: `[Contato] ${contactType}: ${subject}`,
        text: `
        Nome: ${name}
        Email: ${email}
        Tipo de contato: ${contactType}
        Assunto: ${subject}
        Mensagem: ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao enviar mensagem' });
    }
});

module.exports = router;