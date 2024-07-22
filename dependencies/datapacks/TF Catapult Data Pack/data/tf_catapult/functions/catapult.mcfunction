#RUNS AT AS ALL CATAPULTS

# Teleport Parts to correct locations
execute positioned ^-0.1 ^1.6 ^-3.5 run tp @e[tag=tfcp_release,sort=nearest,limit=1,distance=0..3] ~ ~ ~ ~ ~
tp @e[tag=tfcp_hitbox,sort=nearest,limit=1,distance=0..3] ^ ^0.5 ^0.5 ~ ~

#Motion
execute positioned ^ ^ ^-2.5 if entity @a[scores={tfcp_sneak=1..},distance=0..1.5] positioned ^ ^ ^2.5 run function tf_catapult:move/forward

execute positioned ^ ^ ^3.5 if entity @a[scores={tfcp_sneak=1..},distance=0..1.5] positioned ^ ^ ^-3.5 run function tf_catapult:move/backward

execute positioned ^-1.5 ^ ^1 if entity @a[scores={tfcp_sneak=1..},distance=0..1.5] positioned ^1.5 ^ ^-1 run function tf_catapult:move/left

execute positioned ^1.5 ^ ^1 if entity @a[scores={tfcp_sneak=1..},distance=0..1.5] positioned ^-1.5 ^ ^-1 run function tf_catapult:move/right

# Animation
execute if score @s tfcp_anim matches 1.. run function tf_catapult:animate/shoot

execute if entity @e[type=item,nbt={Item:{id:"minecraft:obsidian",Count:1b}},distance=0..2] run scoreboard players set @s[tag=!loaded,tag=!loading] tfcp_anim -10

execute if score @s tfcp_anim matches ..-1 run function tf_catapult:animate/load

# Health and death
execute store result score @s tfcp_health run data get entity @e[distance=0..1,sort=nearest,limit=1,tag=tfcp_hitbox] Health
execute if score @s tfcp_health matches ..50 run function tf_catapult:death
