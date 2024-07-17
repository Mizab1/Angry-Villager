package me.mizab.angry_villager_mod;

import me.mizab.angry_villager_mod.command.FlyDisableCommand;
import me.mizab.angry_villager_mod.command.FlyEnableCommand;
import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AngryVillagerMod implements ModInitializer {
    public static final String MOD_ID = "angry_villager_mod";
    public static final Logger logger = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        logger.info("Angry Villager is Initiated");

        CommandRegistrationCallback.EVENT.register(FlyEnableCommand::register);
        CommandRegistrationCallback.EVENT.register(FlyDisableCommand::register);
        // Register the event listener
//        ServerTickEvents.END_SERVER_TICK.register(server -> {
//            server.getPlayerManager().getPlayerList().forEach(player -> {
//                if (player.interactionManager.getGameMode() == GameMode.SURVIVAL && player.getCommandTags().contains("can_fly") && !player.getCommandTags().contains("flymod_processed")) {
//                    player.addCommandTag("flymod_processed");
////                    player.sendMessage(Text.literal("You can fly"));
//                    player.getAbilities().allowFlying = true;
//                    player.sendAbilitiesUpdate();
//                } else if (player.interactionManager.getGameMode() == GameMode.SURVIVAL && !player.getCommandTags().contains("can_fly") && !player.getCommandTags().contains("flymod_processed")) {
//                    player.addCommandTag("flymod_processed");
////                    player.sendMessage(Text.literal("You can't fly"));
//                    player.getAbilities().allowFlying = false;
//                    player.sendAbilitiesUpdate();
//                }
//            });
//        });
    }
}




