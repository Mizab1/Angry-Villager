package me.mizab.angry_villager_mod.command;

import com.mojang.brigadier.CommandDispatcher;
import com.mojang.brigadier.exceptions.CommandSyntaxException;
import net.minecraft.command.CommandRegistryAccess;
import net.minecraft.command.argument.EntityArgumentType;
import net.minecraft.server.command.CommandManager;
import net.minecraft.server.command.ServerCommandSource;
import net.minecraft.server.network.ServerPlayerEntity;
import net.minecraft.text.Text;

import java.util.Collection;

public class FlyDisableCommand {
    public static void register(CommandDispatcher<ServerCommandSource> dispatcher, CommandRegistryAccess commandRegistryAccess, CommandManager.RegistrationEnvironment registrationEnvironment) {
        dispatcher.register(CommandManager.literal("unfly")
                .then(CommandManager.argument("targets", EntityArgumentType.players())
                        .executes(context -> {
                            return run(context.getSource(), EntityArgumentType.getPlayers(context, "targets"));
                        })
                )
        );
    }

    private static int run(ServerCommandSource source, Collection<ServerPlayerEntity> targets) throws CommandSyntaxException {
        if (targets != null) {
            targets.forEach((target) -> {
                target.getAbilities().allowFlying = false;
                target.getAbilities().flying = false;
                target.sendAbilitiesUpdate();
                target.sendMessage(Text.literal("You can no longer fly"));
            });
            return 1;
        } else {
            source.sendError(Text.literal("Player Not Found"));
            return 0;
        }
    }
}
