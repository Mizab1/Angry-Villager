# This function is intended for custom blocks that are actually glay glazed terracotta when placed.  Run by the player at the armor stand.

# Orient the armor stand and assign it a "facing" score for later use
execute if entity @s[y_rotation=-44..45] run data merge entity @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] {Pose:{Head:[0.0f,90.0f,0.0f]}}
execute if entity @s[y_rotation=46..135] run data merge entity @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] {Pose:{Head:[0.0f,180.0f,0.0f]}}
execute if entity @s[y_rotation=136..-135] run data merge entity @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] {Pose:{Head:[0.0f,270.0f,0.0f]}}
execute if entity @s[y_rotation=-134..-45] run data merge entity @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] {Pose:{Head:[0.0f,0.0f,0.0f]}}

execute if entity @s[y_rotation=-44..45] run scoreboard players set @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] ld_facing 1
execute if entity @s[y_rotation=46..135] run scoreboard players set @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] ld_facing 2
execute if entity @s[y_rotation=136..-135] run scoreboard players set @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] ld_facing 3
execute if entity @s[y_rotation=-134..-45] run scoreboard players set @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] ld_facing 4

# Set the block
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] run setblock ~ ~ ~ minecraft:light_gray_glazed_terracotta
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_klaxon] run setblock ~ ~ ~ minecraft:note_block
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_laser] run setblock ~ ~ ~ minecraft:note_block
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_transmitter] run setblock ~ ~ ~ minecraft:note_block
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_force_field] run setblock ~ ~ ~ minecraft:note_block
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_encoder] run setblock ~ ~ ~ minecraft:dispenser[facing=up,triggered=false]{CustomName:'{"text":"Encoding Station","color":"green","bold":"true"}',Items:[{Slot:0b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10059,display:{Name:'{"text":""}'},LockdownDelete:1b}},{Slot:1b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:1b}},{Slot:2b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:1b}},{Slot:3b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:1b}},{Slot:5b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10060,display:{Name:'{"text":"Write Code","color":"green","italic":"false"}'},LockdownDelete:1b}}]}
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_crafter] run setblock ~ ~ ~ minecraft:barrel[facing=up,open=false]{CustomName:'{"text":"Secure Crafting Table","color":"green","bold":"true"}',Items:[{Slot:0b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10062,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:4b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:5b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:6b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:7b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:8b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:9b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:13b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:14b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:15b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:17b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:18b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:22b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:23b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10060,display:{Name:'{"text":"Craft","color":"green","italic":"false"}'},LockdownDelete:2b}},{Slot:24b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:25b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}},{Slot:26b,id:"minecraft:rabbit_foot",Count:1b,tag:{CustomModelData:10061,display:{Name:'{"text":""}'},LockdownDelete:2b}}]}

# Destroy the block if its channel is 0 (indicating that it was not encoded when it should have been)
execute if score @s ld_channel_id matches 0 run tellraw @s ["",{"text":"This block must be assigned a channel in the ","color":"red"},{"text":"encoder","color":"gold"},{"text":" to work!","color":"red"}]]
execute if score @s ld_channel_id matches 0 run setblock ~ ~ ~ air destroy

# Klaxon special-case setup
execute as @e[type=minecraft:armor_stand,limit=1,sort=nearest,tag=ld_new_block] if entity @s[tag=ld_klaxon] run scoreboard players set @s ld_time 39
