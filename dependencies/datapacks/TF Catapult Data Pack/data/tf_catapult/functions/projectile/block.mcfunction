execute as @e[tag=tfcp_block] at @s run summon falling_block ~ ~ ~ {BlockState:{Name:"minecraft:obsidian"},Time:1,HurtEntities:1b,FallDistance:5f,DropItem:1b,FallHurtAmount:4f}

kill @e[tag=tfcp_block]
