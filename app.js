new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame(){
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack(){
            var damage = this.calcDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            })
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();
        },
        splAttack(){
            var damage = this.calcDamage(10,15);
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster with Special Power for ${damage}`
            })
            this.monsterAttacks();
        },
        monsterAttacks(){
            var damage = this.calcDamage(5,12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`
            })
        },
        heal(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }this.turns.unshift({
                isPlayer: true,
                text: "Player heals for 10"
            })

            this.monsterAttacks()

        },
        giveUp(){
            this.gameIsRunning = false;
        },
        calcDamage(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin(){
            if(this.monsterHealth <= 0){
                if(confirm('You Won! Play again?')){
                    this.startGame();
                }else{
                    this.gameIsRunning =false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You Lost! Play again?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;

        }
    },
})