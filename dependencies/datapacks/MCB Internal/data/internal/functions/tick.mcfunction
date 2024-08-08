# Generated with MC-Build

execute unless entity @e[type=armor_stand,tag=missile] run stopsound @a master item.trident.thunder
execute as @e[type=armor_stand,tag=missile,tag=!lockon] at @s run tp @s ^ ^ ^0.25 ~ ~
execute as @e[type=minecraft:armor_stand,tag=fire_missile] at @s anchored eyes run particle minecraft:flame ^ ^ ^-2 0.05 0.05 0.05 0.01 30
execute as @e[type=minecraft:armor_stand,tag=futuristic_missile] at @s anchored eyes run particle minecraft:dust 1.000 0.000 1.000 1 ^ ^ ^-2 0.05 0.05 0.05 0.01 30
execute as @e[type=armor_stand,tag=missile] at @s run function internal:zzz/0
execute as @e[type=minecraft:armor_stand,tag=missile] store result entity @s Pose.Head[0] float 0.001 run data get entity @s Rotation[1] 1000
execute as @e[type=armor_stand,tag=missile,tag=lockon] at @s facing entity @a feet run tp @s ^ ^ ^0.45 ~ ~