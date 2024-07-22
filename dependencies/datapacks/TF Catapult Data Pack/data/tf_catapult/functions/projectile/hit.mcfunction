#AS AT Projctile that impacted

# Small explosion
summon creeper ~ ~0.5 ~ {Silent:1b,NoAI:1b,DeathLootTable:"urbrainlol",ExplosionRadius:3b,Fuse:0,ignited:1b,Attributes:[{Name:generic.attack_damage,Base:0}]}

# Rock
summon marker ~ ~ ~ {Tags:["tfcp_block"]}
schedule function tf_catapult:projectile/block 2t

tag @s add hit
# Kill entity
kill @s
