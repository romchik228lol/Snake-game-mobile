const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

// Размеры игрового поля (сетки)
const boxSize = 20;
let rows = Math.floor(canvas.height / boxSize); // Количество строк
let cols = Math.floor(canvas.width / boxSize); // Количество колонок

let snake = [
    {x: cols / 2, y: rows / 2}
];

let food = generateFood();
let dx = 0, dy = 0; // Направления движения змеи
let speed = 100; // Скорость обновления экрана (мс)
let score = 0;

// Генерация еды
function generateFood() {
    return {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
}

// Изменение направления движения
function changeDirection(direction) {
    switch (direction) {
        case 'LEFT':
            if (dx !== 1 && dy === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'RIGHT':
            if (dx !== -1 && dy === 0) {
                dx = 1;
                dy = 0;
            }
            break;
        case 'UP':
            if (dy !== 1 && dx === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'DOWN':
            if (dy !== -1 && dx === 0) {
                dx = 0;
                dy = 1;
            }
            break;
    }
}

// Обновление положения змеи
function update() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head); // Добавляем голову змеи спереди

    // Проверка столкновения с едой
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Генерируем новую еду
    } else {
        snake.pop(); // Убираем хвост
    }

    // Столкновение со стеной
    if (
        head.x < 0 || head.x >= cols ||
        head.y < 0 || head.y >= rows
    ) {
        alert(`Игра окончена!\nВаш счёт: ${score}`);
        location.reload(); // Перезагружаем страницу
    }

    // Самопересечение
    for (let segment of snake.slice(1)) {
        if (segment.x === head.x && segment.y === head.y) {
            alert(`Игра окончена!\nВаш счёт: ${score}`);
            location.reload(); // Перезагружаем страницу
        }
    }

    draw();
}

// Рисование
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.strokeStyle = '#ccc';
            ctx.strokeRect(c * boxSize, r * boxSize, boxSize, boxSize);
        }
    }

    // Рисуем змею
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);
    }

    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    setTimeout(update, speed);
}

// Стартовая точка игры
window.onload = function () {
    draw(); // Первоначальное обновление сцены
};
