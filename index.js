const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Conexión a MongoDB
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a la base de datos"))
.catch((error) => console.error('Error de conexión a la base de datos', error));

// Definición del esquema y modelo de Mongoose
const serieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: Number,
});
const Serie = mongoose.model('Serie', serieSchema);

app.use(bodyParser.json());

// Endpoint para crear una serie
app.post('/series', async (req, res) => {
    try {
        const newSerie = await Serie.create(req.body);
        res.json(newSerie)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la serie.' });
    }
});

// Endpoint para obtener todas las series
app.get('/series', async (req, res) => {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(404).json({ error: 'Error al obtener las series.' });
    }
});

// Endpoint para actualizar una serie por ID
app.put('/series/:id', async (req, res) => {
    try {
        const updatedSerie = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSerie);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la serie.' });
    }
});

// Endpoint para eliminar una serie por ID
app.delete('/series/:id', async (req, res) => {
    try {
        const deletedSerie = await Serie.findByIdAndDelete(req.params.id);
        res.json(deletedSerie);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la serie.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
