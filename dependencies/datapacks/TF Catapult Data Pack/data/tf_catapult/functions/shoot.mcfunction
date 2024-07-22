# AS AT player who hit slime
advancement revoke @s only tf_catapult:slime_hit

# Start animation on matching main armorstand
execute at @s anchored eyes positioned ^ ^ ^1.5 as @e[limit=1,sort=nearest,type=slime,tag=tfcp_release] at @s positioned ^0.1 ^-1.6 ^3.5 run scoreboard players set @e[type=armor_stand,tag=tf_catapult,tag=loaded,sort=nearest,limit=1,distance=0..2] tfcp_anim 10
