// Soldier
function Soldier(health, strength) {
  this.health = health;
  this.strength = strength;
}

Soldier.prototype.attack = function() {
  return this.strength;
}

Soldier.prototype.receiveDamage = function(damage) {
  this.health = this.health - damage;
  return;
};

// Viking
function Viking(name, health, strength) {
  Soldier.call(this, health, strength);
  this.name = name;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function(damage) {
  this.damage = damage;
  this.health = this.health - damage;
  if(this.health <= 0) {
    return `${this.name} has died in act of combat`;
  } else {
    return `${this.name} has received ${this.damage} points of damage`;
  }
};

Viking.prototype.battleCry = function() {
  return `Odin Owns You All!`;
}

// Saxon
function Saxon(health, strength) {
  Soldier.call(this, health, strength)
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;
    
Saxon.prototype.receiveDamage = function(damage) {
  this.damage = damage;
  this.health = this.health - damage;
  if(this.health <= 0) {
    return `A Saxon has died in combat`;
  } else {
    return `A Saxon has received ${this.damage} points of damage`;
  }
};
// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function(Viking){
  this.vikingArmy.push(Viking);
  return;
}
War.prototype.addSaxon = function(Saxon){
  this.saxonArmy.push(Saxon);
  return;
}

War.prototype.vikingAttack = function(){
  let viki = Math.floor(Math.random(this.vikingArmy));
  let sax = Math.floor(Math.random(this.saxonArmy));
  let saxonDam = this.saxonArmy[sax].receiveDamage(this.vikingArmy[viki].attack());
  this.saxonArmy.forEach( e => {
    if(e.health <= 0) {
      this.saxonArmy.splice(e, 1);
    }
  })
  return saxonDam;
}

War.prototype.saxonAttack = function(){
  let viki = Math.floor(Math.random(this.vikingArmy));
  let sax = Math.floor(Math.random(this.saxonArmy));
  let vikiDam = this.vikingArmy[viki].receiveDamage(this.saxonArmy[sax].attack());
  this.vikingArmy = this.vikingArmy.filter( e => {
    return e.health > 0;
  })
  return vikiDam;
}
War.prototype.showStatus = function(){
  return this.saxonArmy.length == 0 ? `Vikings have won the war of the century!` : 
  this.saxonArmy.length > 0 && this.vikingArmy.length > 0 ? `Vikings and Saxons are still in the thick of battle.` : 
  `Saxons have fought for their lives and survive another day...`
}