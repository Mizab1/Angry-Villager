execute if block ^ ^ ^0.5 #tf_catapult:transparent if block ^ ^ ^1 #tf_catapult:transparent if block ^ ^ ^1.5 #tf_catapult:transparent run tp @s ^ ^ ^1.5 ~ ~3

execute if entity @s[tag=!hit] unless block ^ ^ ^0.5 #tf_catapult:transparent run function tf_catapult:projectile/hit
execute if entity @s[tag=!hit] unless block ^ ^ ^1 #tf_catapult:transparent run function tf_catapult:projectile/hit
execute if entity @s[tag=!hit] unless block ^ ^ ^1.5 #tf_catapult:transparent run function tf_catapult:projectile/hit
