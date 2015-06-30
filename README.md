# 100dollarwordgame-variant

Variant of old $100 dollar word calculation game

Demo (at least til I wipe it and forget to update here):
http://minnixos.com/demos/shofner/index.html

This was an exercise in learning how to creatively assemble several JS functions into a single game. It basically grew out of the '100 dollar word game' elementary students are often tasked with: calculating the worth of a word based on the summation of the numerical position values of its component letters (e.g. hat = h + a + t = 8 + 1 + 20 = 29).

This time-limited game forces the player to come up with words of specific randomly determined worths. Scoring is variable according to how close the player comes to the target value. Each player's word is checked for validity against a Dictionary.com API.

The visual wrapping of the game is ugly as sin but I can't be bothered to clean it up and make slick right now. 

Instructions are included in the file itself as well as a longer exposition explaining the origin. 

NOTE:

The dictionary.com API requires a key and I've nixed it out in the repository. Securing your own is easy and free (at least for a limited number of queries per day) on their developer site. Once you get it, you can drop it into the localjs.js file. I've commented in the code where it is to go. 

All code is included in this repository except for the two jquery functions I used :<br>
Remodal by Ilya Makarov ( http://vodkabears.github.io/remodal/ )<br>
CountdownTimer by Harshen Pandey ( https://github.com/harshen/jquery-countdownTimer ) 

These need to be in your root directory alongside index.html.

The versions of the above that I have on the demo are probably outdated. 


