const socket = io();

// Toggle music
document.getElementById('toggleMusicBtn').addEventListener('click', function () {
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

// Change background color
document.getElementById('backgroundSelect').addEventListener('change', function () {
    const bgValue = this.value;
    const body = document.body;

    switch (bgValue) {
        case '1':
            body.style.backgroundColor = '#ADD8E6'; // Blue
            body.style.color = '#00008B'; // Dark Blue
            break;
        case '2':
            body.style.backgroundColor = '#90EE90'; // Green
            body.style.color = '#006400'; // Dark Green
            break;
        case '3':
            body.style.backgroundColor = '#FFFFE0'; // Yellow
            body.style.color = '#8B4513'; // Brown
            break;
        case '4':
            body.style.backgroundColor = '#FFB6C1'; // Pink
            body.style.color = '#8B0000'; // Dark Red
            break;
        case '5':
            body.style.backgroundColor = '#D3D3D3'; // Gray
            body.style.color = '#A9A9A9'; // Dark Gray
            break;
    }
});

// Send a message
document.getElementById('sendMessageBtn').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value || 'Anonymous';
    const message = document.getElementById('messageInput').value;

    if (message.trim() !== '') {
        socket.emit('chat message', { name, message });
        document.getElementById('messageInput').value = ''; // Clear input
    }
});

// Receive and display messages
socket.on('chat message', (data) => {
    const chatLog = document.getElementById('chatLog');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
});
