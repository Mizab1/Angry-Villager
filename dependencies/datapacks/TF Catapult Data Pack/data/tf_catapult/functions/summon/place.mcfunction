
# Summon armorstand
summon armor_stand ^4 ^-3 ^ {NoGravity:0b,Invisible:1b,NoBasePlate:1b,Tags:["tf_catapult","loaded"],DisabledSlots:4144959,ArmorItems:[{},{},{},{id:"minecraft:command_block",Count:1b,tag:{CustomModelData:230001}}]}

# Correct Rotation
execute if block ~1 ~ ~ oak_slab as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run tp @s ~ ~ ~ ~-90 ~
execute if block ~-1 ~ ~ oak_slab as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run tp @s ~ ~ ~ ~90 ~
execute if block ~ ~ ~-1 oak_slab as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run tp @s ~ ~ ~ ~180 ~

# Summon Slime Hitboxes
execute as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run summon slime ^ ^1.5 ^-3.5 {Silent:1b,Tags:["tfcp_release"],DeathLootTable:"yourbrainlol",NoAI:1b,Health:999999f,Size:0,ActiveEffects:[{Id:14b,Amplifier:1b,Duration:999999,ShowParticles:0b},{Id:11b,Amplifier:100b,Duration:999999,ShowParticles:0b}],Attributes:[{Name:generic.max_health,Base:999999}]}
#give slime score for advancement detection
scoreboard players set @e[tag=tfcp_release] tfcp_id 1

execute as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run summon slime ^ ^0.5 ^ {Silent:1b,Tags:["tfcp_hitbox"],DeathLootTable:"yourbrainlol",NoAI:1b,Health:150f,Size:2,ActiveEffects:[{Id:14b,Amplifier:1b,Duration:999999,ShowParticles:0b}],Attributes:[{Name:generic.max_health,Base:150}]}


# Delete Structure
fill ^ ^ ^ ^1 ^ ^ air
fill ^ ^-1 ^ ^4 ^ ^-1 air
fill ^3 ^-2 ^1 ^5 ^-3 ^-1 air

# Sounds
playsound minecraft:block.wood.step block @a ^ ^ ^ 2 0.5
playsound minecraft:block.wood.step block @a ^ ^ ^ 2 1
playsound minecraft:block.wood.step block @a ^ ^ ^ 2 1.5
playsound minecraft:block.wood.break block @a ^ ^ ^ 2 0.5
playsound minecraft:block.wood.break block @a ^ ^ ^ 2 1
playsound minecraft:block.wood.break block @a ^ ^ ^ 2 1.5
playsound minecraft:block.wood.place block @a ^ ^ ^ 2 0.5
playsound minecraft:block.wood.place block @a ^ ^ ^ 2 1
playsound minecraft:block.wood.place block @a ^ ^ ^ 2 1.5
playsound minecraft:block.wood.break block @a ^ ^ ^ 2 2
playsound minecraft:block.wood.fall block @a ^ ^ ^ 2 1
playsound minecraft:block.barrel.open block @a ^ ^ ^ 2 1.3
playsound minecraft:block.barrel.open block @a ^ ^ ^ 2 1.7
playsound minecraft:block.barrel.close block @a ^ ^ ^ 2 1.5
playsound minecraft:block.barrel.close block @a ^ ^ ^ 2 1.2
# Particles
execute as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run particle minecraft:campfire_cosy_smoke ^ ^1 ^ 1 1 1 .1 20 normal
execute as @e[type=armor_stand,sort=nearest,limit=1,tag=tf_catapult] at @s run particle minecraft:block oak_planks ^ ^1 ^ 1 1 1 0 20 normal

# Delete Item
# kill @s
