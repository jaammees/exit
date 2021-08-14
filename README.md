# exit
An entry in the webxr category of the  [2020 js13kgames competition](https://js13kgames.com/)

Play it here: https://js13kgames.com/entries/exit

Below is the post-mortem. For other entry post-mortems, see https://js13kgames.github.io/resources/

## Game Concept

![game video](https://raw.githubusercontent.com/jaammees/exit/images/media/exit.gif)

The idea for the game was to be a table top looking game where the player solves puzzles to guide creatures to an exit. The creatures wouldn't be controlled directly, but influenced by placing items on the table top. Influences for this were Lemmings, Chu Chu Rocket, Hitman Go.

The game was to be stealth game where the creatures would need to react the exit without being found by robots. The robots would have predictable behaviours which would allow the player to plan on how to avoid them.

Impossible Mission on Commodore 64:
![Robots](https://raw.githubusercontent.com/jaammees/racer/master/images/impossiblemission.png)

## Controls / Headset limitations

The intention was for the game to be usable on desktop, mobile and both 3 Degrees of Freedom and 6 Degrees of Freedom VR headsets. 

The common control method between all these devices is a pointer control with a single button.
Compatibility with 3 DoF VR devices and Desktop/Mobile with only a pointer meant the game couldn't rely on the user being able to walk around the play area. Teleportation is a solution to this, but I thought for a simple game, adding teleportation controls might complicate it.

## VR Considerations

Motion sickness can be a problem for VR games. Having the gameplay area appear as like a table in front of the player was an idea of how to get around this.  Motion in the game was limited to just the characters. 

Another aim was to not have the jarring effect of a sharp switch between levels, but also keep with the idea of limiting object movement. The idea to solve this was for each of the grid cubes which make up the current level to shrink to nothing and then the grid cells for the next level to expand to take their place.

At the time of developing the project there seemed to be a range of different controllers that were used for VR. In order to be usable on most devices, the controls were designed to work with either one hand or two and only use one button.

## Puzzle design

The aim for the design of the puzzles was to start easy, then increase the difficulty, but also add in levels which were 'easy but rewarding'. Each initial introduces a new concept and the later levels test the use of the concepts.

The puzzles should be playable on desktop computer, but 3d awareness in vr would give an advantage. The limitation of being playable on desktop and 3 DOF VR headsets did limit the layout for levels from what i was initially imagining. In hindsight, maybe the table should have been able to be rotated by the player. Testing would have to had been done to see if this would cause motion sickness.

## A-Frame Programming

This was my first project in A-Frame, so wasn't always sure if i was doing things the correct way. 
A-Frame was quite easy to use, all game objects are composed of simple shapes and are placed within a 3d grid.

## Device Testing
I had access to a Daydream headset/controller with a Pixel phone for testing. This is a 3 DOF device.

I also had access to a Vive headset. This is what i mainly used for testing. The set up for the Vive headset wasn't great (the base stations sat on top of piles of books) and which direction was 'forward' seemed to change each time I started the game

## Some things that went wrong

I left testing in VR too late in the project. For most of the timeframe of development I was developing and testing on a desktop computer.  When it came to testing in VR I found a few problems, such as you'd have to hold the controller at an uncomfortable angle to reach certain squares on the board, or in 3 DOF headsets it might be very difficult or impossible to see some squares because of of obstacles blocking them. As I'd left VR testing so late, I had to rush to redesign levels to suit the VR.

I ran out of time on the project and while rushing to finish forgot some of the items on my to do list, for example the characters were meant to be placeholders until I came up with something better.

## Some things that went right

Even though they weren't intended to be final, I think the characters and enemies look ok just made out of simple shapes. I think it was a good decision to aim for a game that was also playable on mobile and desktop. 