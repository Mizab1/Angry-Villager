# Generated with MC-Build

execute at @a run function internal:zzz/7
schedule function internal:zzz/10 50t append
summon armor_stand ~ ~ ~ {Rotation:[0f,-60f],NoGravity:1b,Invulnerable:1b,Invisible:1b,Tags:["missile"],Pose:{Head:[-20f,0f,1f]},ArmorItems:[{},{},{},{id:"minecraft:blue_dye",Count:1b}]}
execute as @e[type=armor_stand,tag=missile] at @s run tp @s ~ ~ ~ ~ -40
schedule function internal:zzz/12 50t append
schedule function internal:zzz/14 76t append