// Função para criar um card de tarefa
function createTaskCard(tarefa) {
    const card = document.createElement('div');
    card.classList.add('task-card');

    if (tarefa.concluido) {
        card.classList.add('task-concluida'); // Adiciona a classe para tarefas concluídas
    }

    const descricao = document.createElement('p');
    descricao.textContent = tarefa.descricao;

    const concluidoCheckbox = createCheckbox(tarefa);
    const deletarButton = createButton('Deletar');

    deletarButton.addEventListener('click', async () => {
        await deleteTask(tarefa.id);
    });

    card.appendChild(descricao);
    card.appendChild(concluidoCheckbox);
    card.appendChild(deletarButton);

    return card;
}

// Função auxiliar para criar um checkbox para conclusão da tarefa
function createCheckbox(tarefa) {
    const concluidoCheckbox = document.createElement('input');
    concluidoCheckbox.type = 'checkbox';
    concluidoCheckbox.checked = tarefa.concluido;
    concluidoCheckbox.addEventListener('change', async () => {
        await updateTaskStatus(tarefa.id, concluidoCheckbox.checked);
    });
    return concluidoCheckbox;
}

// Função auxiliar para criar um botão com texto especificado
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    return button;
}

// Função para carregar e exibir as tarefas
async function loadTasks() {
    const tarefasContainer = document.getElementById('tarefasContainer');
    tarefasContainer.innerHTML = '';

    const response = await fetch('/tarefas');
    const data = await response.json();

    data.tarefas.forEach(tarefa => {
        const card = createTaskCard(tarefa);
        tarefasContainer.appendChild(card);
    });
}

// Função para atualizar o status de conclusão da tarefa no servidor
async function updateTaskStatus(tarefaId, concluido) {
    const response = await fetch(`/tarefas/${tarefaId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concluido })
    });
    const data = await response.json();
    console.log(data);
    loadTasks(); // Recarrega as tarefas após a atualização
}

// Função para adicionar uma nova tarefa
async function addTask(descricao) {
    const response = await fetch('/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao })
    });
    const data = await response.json();
    console.log(data);
    loadTasks(); // Recarrega as tarefas após a adição
}

// Função para deletar uma tarefa
async function deleteTask(tarefaId) {
    const response = await fetch(`/tarefas/${tarefaId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
    loadTasks(); // Recarrega as tarefas após a exclusão
}

// Carrega as tarefas ao carregar a página
window.onload = loadTasks;

// Script para lidar com o envio do formulário
document.getElementById('tarefaForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    const descricao = document.getElementById('descricao').value;
    await addTask(descricao); // Adiciona uma nova tarefa
    document.getElementById('mensagem').innerText = 'Tarefa adicionada com sucesso.';
});
