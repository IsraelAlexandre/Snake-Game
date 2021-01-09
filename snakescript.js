let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    /*Faz-se necessário criar posições aleatórias para a comida aparecer*/
    /*Math.floor retorna apenas números inteiros, isto é 1, 2, 3, 4.. Sem parte quebrada que serão criados pelo math.random*/
    x: Math.floor(Math.random() * 15 + 1) * box, //16 para a comida não aparecer fora do canvas
    y: Math.floor(Math.random() * 15 + 1) * box
}


function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box);
}


function criarCobrinha() {
    for(i=0; i< snake.length; i++){
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}



document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right" ) direction = "left";//37 é direita
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
    /*Ela só muda se a posição não for contrária. Princípio de funcionamento: O usuário aperta a tecla,o addEventListener vai chamar a função update e vai passar como argumento o evento de tecla que foi setado nas linhas de comando acima*/
}


function iniciarJogo() {


      /*Temos o ponto 0 de x e de y; A cobra vai até 16 de um lado e até 16 do outro, ao passar de um lado, iremos criar a condicional pra ela voltar do outro*/
    if(snake[0].x > 15* box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i< snake.length; i++){
            //Se as posições da cabeça da cobra e do corpo forem as mesmas, game over
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                clearInterval(jogo);
                alert('Game Over :(')
            }
    }

    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x; //posição 0 de x e posição 0 de y
    let snakeY = snake[0].y;//Setando a posição para acobrinha ter um ponto de partida

    if(direction == "right") snakeX += box;  //Se a posição for right, um quadrado vai ser acrescido na right
    if(direction == "left") snakeX -= box; //Se left, adiciona na left; notação de plano cartesiano r+ left -
    if(direction == "up") snakeY -= box;
    if(direction == "down")snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop(); //Retira o último elemento do array
    } else {
        food.x= Math.floor(Math.random() * 15 + 1) * box; //16 para a comida não aparecer fora do canvas
        food.y= Math.floor(Math.random() * 15 + 1) * box;

    }



    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead); //Acrescenta a frente da cobrinha um novo quadrado

}

let jogo = setInterval(iniciarJogo, 100); /*A cada 100ms a função iniciar jogo é renovada e continua o jogo, evitando travamento*/


