package me.mizab.angry_villager_mod;

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.event.lifecycle.v1.ServerTickEvents;
import net.minecraft.world.GameMode;

public class AngryVillagerMod implements ModInitializer {

    @Override
    public void onInitialize() {
        // Register the event listener
        ServerTickEvents.END_SERVER_TICK.register(server -> {
            server.getPlayerManager().getPlayerList().forEach(player -> {
                if (player.interactionManager.getGameMode() == GameMode.SURVIVAL && player.getCommandTags().contains("can_fly") && !player.getCommandTags().contains("flymod_processed")) {
                    player.addCommandTag("flymod_processed");
//                    player.sendMessage(Text.literal("You can fly"));
                    player.getAbilities().allowFlying = true;
                    player.sendAbilitiesUpdate();
                } else if (player.interactionManager.getGameMode() == GameMode.SURVIVAL && !player.getCommandTags().contains("can_fly") && !player.getCommandTags().contains("flymod_processed")) {
                    player.addCommandTag("flymod_processed");
//                    player.sendMessage(Text.literal("You can't fly"));
                    player.getAbilities().allowFlying = false;
                    player.sendAbilitiesUpdate();
                }
            });
        });
    }
}




