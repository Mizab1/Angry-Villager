# AS AT Dead armorstand catapult

# Teleport slimes to void
execute positioned ^-0.1 ^1.6 ^-3.5 run tp @e[tag=tfcp_release,sort=nearest,limit=1,distance=0..3] ~ -256 ~
tp @e[tag=tfcp_hitbox,sort=nearest,limit=1,distance=0..3] ~ -256 ~

# Drops
loot spawn ~ ~0.2 ~ loot tf_catapult:entities/catapult

# Sounds/particles
playsound minecraft:block.wood.step block @a ~ ~ ~ 2 1
playsound minecraft:block.wood.break block @a ~ ~ ~ 2 0.5
playsound minecraft:block.wood.place block @a ~ ~ ~ 2 0.5
playsound minecraft:block.wood.fall block @a ~ ~ ~ 2 0.8
playsound minecraft:block.barrel.close block @a ~ ~ ~ 2 0.8
playsound minecraft:entity.wither_skeleton.death block @a ~ ~ ~ 1.5 1.1
particle minecraft:cloud ~ ~1 ~ 0.5 0.5 0.5 0.2 15
particle minecraft:campfire_cosy_smoke ~ ~1 ~ 1 1 1 0.2 15
particle minecraft:large_smoke ~ ~1 ~ 1 1 1 0.05 5

kill @s
