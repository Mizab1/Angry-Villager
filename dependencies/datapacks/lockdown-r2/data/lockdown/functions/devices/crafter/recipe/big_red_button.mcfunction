# Determine how many items (Big Red Button) can be crafted
execute store result score $ld_result ld_result run data get block ~ ~ ~ Items[{Slot:10b}].Count
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:11b}].Count
scoreboard players operation $ld_result ld_result < $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:12b}].Count
scoreboard players operation $ld_result ld_result < $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:19b}].Count
scoreboard players operation $ld_result ld_result < $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:20b}].Count
scoreboard players operation $ld_result ld_result < $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:21b}].Count
scoreboard players operation $ld_result ld_result < $ld_var ld_result

# Output the calculated number of items
item replace block ~ ~ ~ container.16 with birch_button{LockdownItem:1b,LockdownData:{id:6,function_model:10024,block_model:10040,item_model:10040,block_id:1,item_id:1,channel:0},CustomModelData:10040,display:{Name:'{"text":"Big Red Button","italic":"false","color":"red"}',Lore:['{"text":"No Channel Assigned","color":"red"}']}}
execute store result block ~ ~ ~ Items[{Slot:16b}].Count byte 1 run scoreboard players get $ld_result ld_result
# Remove the calculated number of used items
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:10b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:10b}].Count byte 1 run scoreboard players get $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:11b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:11b}].Count byte 1 run scoreboard players get $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:12b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:12b}].Count byte 1 run scoreboard players get $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:19b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:19b}].Count byte 1 run scoreboard players get $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:20b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:20b}].Count byte 1 run scoreboard players get $ld_var ld_result
execute store result score $ld_var ld_result run data get block ~ ~ ~ Items[{Slot:21b}].Count
scoreboard players operation $ld_var ld_result -= $ld_result ld_result
execute store result block ~ ~ ~ Items[{Slot:21b}].Count byte 1 run scoreboard players get $ld_var ld_result

# Report crafting as successful
scoreboard players set $ld_success ld_success 1
