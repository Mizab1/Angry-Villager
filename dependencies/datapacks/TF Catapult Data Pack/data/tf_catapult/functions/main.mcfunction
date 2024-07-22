execute as @e[type=item,nbt={Item:{id:"minecraft:obsidian"}}] at @s if block ~ ~ ~ cauldron run function tf_catapult:summon/detect

# Run main projectile function on all projectiles
execute as @e[type=armor_stand,tag=tfcp_proj] at @s run function tf_catapult:projectile/move

# Run main catapult function on all catapults
execute as @e[type=armor_stand,tag=tf_catapult] at @s run function tf_catapult:catapult

# Reset crouch detection
scoreboard players reset @a[scores={tfcp_sneak=1..}] tfcp_sneak
