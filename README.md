# RUN RED RUN
#### Video Demo:  https://youtu.be/GOgFvjZoDNg

## ABOUT IT
Run, Red, Run is a web game developed using Phaser / Javascript. It's an infinite side scroller that only ends when you run out of lives. You control Red, trying to collect candies and escape the enemies along the way.

## GAME CHOICES
#### Only vertical movement:
When I decided to make the game compatible with cellphones, I needed to make the movements simpler, so I changed to only jumping.

To jump, one can press the space bar, the up-arrow on the keyboard, left-click with the mouse, or tap on a cellphone.

#### 3 lives:
I realized three lives would make the game more interesting, and people would be less annoyed in the rare case when two enemies appear so close that one can't avoid them both.

#### On/Off music:
Audio effects are crucial to immerse the user into the game.

Some people (like me!) prefer to mute the game, so I added this option.

#### Pause the game:
The game can be lengthy if you are good/lucky enough, so I added the button to pause the game.

#### Recover one life:
This idea came from a friend.

She said I could add the grandma somewhere in the game to give a bonus to the player, so I decided that this bonus would be one life back.

#### Awards:
I love the idea of playing a game and collecting awards.

Unfortunately, I already spent a lot of time doing the game and decided to put this on hold.

#### Difficulty of the game:
It is a hidden parameter.

I was not putting this, but my brother told me it would make the game more challenging, and I added it.

## PROJECT ORGANIZATION
The project is in three folders: assets, src and static. All the HTML pages are in the root directory.

### THE HTML PAGES
* **index.html:** It's the entrypoint; where one can access the game interface.
* **aboutme.html:** A brief explanation about who I am and why I decided to do this.
* **credits.html:** Where I thank everyone that contributed to this project, directly or indirectly.

### THE ASSETS FOLDER
It contains five folders, organizing everything used to build the game.
* **audio:** Audio files for the game (music and sound effects).
* **candies:** Image of candies used in the game.
* **environment:** Images used for the background. There are several layers to give the illusion of depth.
* **interface:** The icons and other images used to build the menu and buttons for the game.
* **sprites:** The spritesheets of the characters.

### THE SRC FOLDER
It contains all the scripts for the game. They were developed in JavaScript / Phaser.

#### main.js:
Creates the game using Phaser and the configuration provided in config.js.

#### config.js:
Game configuration, like the dimensions for the scene and the physics parameters.

#### preloadscene.js:
It's the initial scene that the user can have access.

It shows a menu where the user can select options and start the game. Some assets (like the environment and the audio) are already loaded here.

#### gamescene.js:
It's where all the logic of the game is. Load the rest of the assets and animate Red, the wolf, and the enemies.

There are three timed events: to add candy, enemy, or the grandma. Collecting candies adds to the score. Hitting an enemy makes you lose one life (of 3 total). Passing by the grandma gains a life again (if the user has less than 3).

There is a small menu on the bottom left side to pause/unpause the game, stop/restart the music or go back to the main menu (preload scene).

The upper left side shows the distance traveled, the candies collected and the lives remaining.

#### particleconfig.js:
The configuration used for the effects when collecting the candies.

### THE STATIC FOLDER
It contains the favicon and the stylesheet for the webpage.