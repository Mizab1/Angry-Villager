# AS AT loading catapult

tag @s add loading

kill @e[type=item,limit=1,sort=nearest,nbt={Item:{id:"minecraft:obsidian",Count:1b}},distance=0..2]

item replace entity @s[scores={tfcp_anim=-8}] armor.head with minecraft:command_block{CustomModelData:230003}
item replace entity @s[scores={tfcp_anim=-4}] armor.head with minecraft:command_block{CustomModelData:230002}
item replace entity @s[scores={tfcp_anim=-1}] armor.head with minecraft:command_block{CustomModelData:230001}

playsound minecraft:block.stem.break block @a ~ ~ ~ 0.8 0.5
playsound minecraft:block.stem.break block @a ~ ~ ~ 0.8 0.8
playsound minecraft:block.stem.step block @a ~ ~ ~ 1 0.8

tag @s[scores={tfcp_anim=-1}] add loaded
tag @s[scores={tfcp_anim=-1}] remove loading

scoreboard players add @s tfcp_anim 1
