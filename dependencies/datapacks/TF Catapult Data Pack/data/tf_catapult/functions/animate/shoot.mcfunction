# AS AT shooting catapult

item replace entity @s[scores={tfcp_anim=8}] armor.head with minecraft:command_block{CustomModelData:230002}
item replace entity @s[scores={tfcp_anim=4}] armor.head with minecraft:command_block{CustomModelData:230003}
item replace entity @s[scores={tfcp_anim=1}] armor.head with minecraft:command_block{CustomModelData:230008}

# Summon projectile
execute if score @s tfcp_anim matches 3 run summon armor_stand ^ ^4 ^.5 {NoGravity:1b,Invisible:1b,NoBasePlate:1b,Tags:["tfcp_proj"],DisabledSlots:4144959,ArmorItems:[{},{},{},{id:"minecraft:obsidian",Count:1b,tag:{CustomModelData:230001}}]}

# Fix rotation
execute positioned ^ ^3 ^.5 at @e[tag=tfcp_proj,sort=nearest,limit=1,distance=0..1] rotated as @s run tp @e[tag=tfcp_proj,sort=nearest,limit=1,distance=0..1] ^ ^ ^ ~ ~-35

# Sounds and particles
execute if score @s tfcp_anim matches 3 run particle minecraft:cloud ^ ^4 ^.5 0.1 0.1 0.1 0.2 15
execute if score @s tfcp_anim matches 3 run playsound minecraft:block.barrel.open block @a ~ ~ ~ 1 0.8
execute if score @s tfcp_anim matches 3 run playsound minecraft:entity.ender_dragon.flap block @a ~ ~ ~ 2 0.75
playsound minecraft:block.stem.break block @a ~ ~ ~ 0.5 0.5
playsound minecraft:block.stem.break block @a ~ ~ ~ 0.5 0.5
playsound minecraft:block.stem.step block @a ~ ~ ~ 0.5 0.5

tag @s[scores={tfcp_anim=1}] remove loaded

scoreboard players remove @s tfcp_anim 1
