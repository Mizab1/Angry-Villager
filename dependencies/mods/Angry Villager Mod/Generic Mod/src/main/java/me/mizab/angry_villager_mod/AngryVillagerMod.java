package me.mizab.angry_villager_mod;

import me.mizab.angry_villager_mod.command.FlyCommand;
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
        CommandRegistrationCallback.EVENT.register(FlyCommand::register);
    }
}




