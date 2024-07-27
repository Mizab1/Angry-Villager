package me.mizab.generic_mod;

import me.mizab.generic_mod.command.FlyCommand;
import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GenericMod implements ModInitializer {
    public static final String MOD_ID = "generic_mod";
    public static final Logger logger = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        logger.info("Generic Mod is Initiated");
        CommandRegistrationCallback.EVENT.register(FlyCommand::register);
    }
}
