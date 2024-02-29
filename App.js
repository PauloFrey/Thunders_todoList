const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Define o diretório onde seus arquivos estáticos estão localizados
app.use(express.static(path.join(__dirname, 'src', 'views','home')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'src', 'views','home', 'index.html'));
});

app.use(express.json());

//Rotas
const tarefasRoutes = require('./src/routes/tarefasRoutes')
app.use('/',tarefasRoutes)

app.listen(PORT, ()=>{
    console.log(`Projeto rodando na porta: ${PORT}`)
})