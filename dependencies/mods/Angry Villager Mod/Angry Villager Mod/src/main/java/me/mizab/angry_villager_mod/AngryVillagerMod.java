package me.mizab.angry_villager_mod;

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.event.lifecycle.v1.ServerTickEvents;
import net.minecraft.server.network.ServerPlayerEntity;
import net.minecraft.server.world.ServerWorld;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AngryVillagerMod implements ModInitializer {
    public static final Logger LOGGER = LoggerFactory.getLogger("generic");

    @Override
    public void onInitialize() {
        LOGGER.info("FlyMod has been initialized!");

        // Register the server tick event to check for player status
        ServerTickEvents.END_WORLD_TICK.register(this::onEndWorldTick);
    }

    private void onEndWorldTick(ServerWorld world) {
        for (ServerPlayerEntity player : world.getPlayers()) {
            if (!player.getAbilities().allowFlying && player.getCommandTags().contains("can_fly")) {
                player.getAbilities().allowFlying = true;
                player.sendAbilitiesUpdate();
            } else {
                if (!player.getCommandTags().contains("can_fly") && player.getAbilities().allowFlying) {
                    player.getAbilities().allowFlying = false;
                    player.getAbilities().flying = false;
                    player.sendAbilitiesUpdate();
                }
            }
        }
    }
}



