'use strict';
// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()/100;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    this.x += 185 * (dt + this.speed)
    this.x > 505 && (this.x = -101)
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 404/2;
    this.y = 435;
};

Player.prototype.update = function (dt) {
    allEnemies.forEach(function(enemy){
        let x = Math.abs(player.x - enemy.x)
        let y = Math.abs(player.y - enemy.y)
        if (x < 80 && y < 55  ){
            player.x = 404/2
            player.y = 435
        }
    })

}
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(action){
    switch(action){
        case "up":
        this.y -= 85.5;
        this.y < 10 && (this.y = 435, alert("到达河边"), this.x = 404/2);
        break;
        case "down":
        this.y += 85.5;
        this.y > 435 && (this.y = 435);
        break;
        case "left":
        this.x -= 50.5;
        this.x < 0 && (this.x = 0);
        break;
        case "right":
        this.x += 50.5;
        this.x > 404 && (this.x = 404/2);
        break;
    }
}

let player = new Player();
let enemy_number = parseInt(Math.random()*(7-4+1)+4,10)
let allEnemies = []

while ( enemy_number <= 8){
    let enemy = new Enemy();
    enemy.x = 40 * (Math.random()*100) +1;
    enemy.y = [65, 150, 235][parseInt(Math.random()*(2+1),10)]
    allEnemies.push(enemy)
    enemy_number++;
}



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
