// MCFunction("gameplay/create_text_displays", () => {
// * Start podium
//   raw(
//     `summon text_display -125 8.5 144 {billboard:"vertical",alignment:"center",Tags:["start_text"],text:'{"text":"Start Here","color":"gold","italic":false}'}`
//   );
//   raw(`setblock 2443 180 998 minecraft:diamond_block`);
//   raw(`setblock 2443 181 998 minecraft:polished_blackstone_button[face=floor]`);
// ! Add the command block manually

// * About
//   raw(
//     `summon text_display -125 10 140 {billboard:"vertical",alignment:"center",Tags:["title_text"],text:'{"text":"Angry Villager","color":"gold","italic":false}'}`
//   );
//   raw(
//     `summon text_display -125 8 140 {billboard:"vertical",line_width:400,alignment:"center",Tags:["about_text"],text:'[{"text":"This map is about player who is fighting with the villagers. \\n","color":"white","italic":false},{"text":"The player will evolve and unlocked new abilities. \\n"},{"text":"At the same time, the villagers will also evolve and defend themselves. \\n"},{"text":"The player\'s goal is to destroy every threat using tools and powers.\\n"},{"text":"\\n"},{"text":"All the best!","color":"dark_aqua"}]'}`
//   );

// Set world spawn (Go on the coords)
//   raw(`setworldspawn ~ ~ ~ ~`);

// * Celebration room
// raw(`summon text_display -140 -10.1 149.1 {Tags:["thanks_text"],text:'{"text":"Thank you for playing the map","color":"gold","bold":true}',background:67108863}`)
// raw(`summon text_display -140 -11 149.1 {Tags:["made_text"],text:'{"text":"Especially made for BeckBroJack","color":"blue"}',background:67108863}`)
// });
