//function to generate a random numeric value 
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max-min+1) + min);
    return value;
}

var getPlayerName = function(){
    var name = "";

    //add loop here
    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

//var playerInfo.name = window.prompt("What is your robot's name?");
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack : 10,
    money : 10,
    reset: function(){
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function(){
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
        
    },
    upgradeAttack: function(){
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
    }

};
console.log(playerInfo.name,playerInfo.attack,playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name:"Amy",
        attack: randomNumber(10,14)
    },
    {
        name:"Trumble",
        attack: randomNumber(10,14)
    }
];

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Enter the conditional recursive function call here!
    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip;
    }

    promptFight = promptFight.toLowerCase();
  
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        shop();
        return true;
      }
      
    }
    return false;
  }


var fight = function(enemy){
    console.log(enemy);
    
    while(enemy.health>0 && playerInfo.health > 0){

        if (fightOrSkip()){
            break;
        }

        //if player choses to fight, then fight
       
        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

         // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name +". " +enemy.name +" now has " + enemy.health + " health remaining.");

         //check enemy's health
        if (enemy.health <= 0){
            window.alert(enemy.name + " has died!");
            break;
        }
        else{
            window.alert(enemy.name + " still has " + enemy.health +" health left.");
        }

        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0,playerInfo.health - damage);

         // Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

         //check player's health
        if (playerInfo.health <= 0){
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else{
            window.alert(playerInfo.name + " still has " + playerInfo.health+" health left.");
        }
        
    }
};

var startGame = function(){
    
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            
            // reset enemy.health before starting new fight        
            pickedEnemyObj.health = randomNumber(40,60);
            
            // use debugger to pause script from running and check what's going on at that moment in the code
            

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (i < enemyInfo.length -1 && playerInfo.health > 0){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm){
                    shop();
                }
            }
        }

        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    
    endGame();
};

var endGame= function(){
    window.alert("The game has now ended. Let's see how you did!");
    
    //if player is still alive, player wins!
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money +".");
    }
    else{
        window.alert("You've lost your robot in battle");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm){
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
    
};

var shop = function(){
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action
    switch(shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;
            
        case 3:
            window.alert("Leaving the store.");

            //do nothing
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop again to force player to pick a valid option
            shop();
            break;

    }
};

startGame();
