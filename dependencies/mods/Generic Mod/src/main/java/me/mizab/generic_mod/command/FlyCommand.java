package me.mizab.generic_mod.command;

import com.mojang.brigadier.CommandDispatcher;
import com.mojang.brigadier.exceptions.CommandSyntaxException;
import net.minecraft.command.CommandRegistryAccess;
import net.minecraft.command.argument.EntityArgumentType;
import net.minecraft.server.command.CommandManager;
import net.minecraft.server.command.ServerCommandSource;
import net.minecraft.server.network.ServerPlayerEntity;
import net.minecraft.text.Text;

import java.util.Collection;

public class FlyCommand {
    public static void register(CommandDispatcher<ServerCommandSource> dispatcher, CommandRegistryAccess commandRegistryAccess, CommandManager.RegistrationEnvironment registrationEnvironment) {
        dispatcher.register(
                CommandManager.literal("fly")
                        .then(CommandManager.literal("enable")
                                .then(CommandManager.argument("targets", EntityArgumentType.players()).executes(context -> {
                                    return runToEnable(context.getSource(), EntityArgumentType.getPlayers(context, "targets"));
                                }))
                        ).then(CommandManager.literal("disable")
                                .then(CommandManager.argument("targets", EntityArgumentType.players()).executes(context -> {
                                    return runToDisable(context.getSource(), EntityArgumentType.getPlayers(context, "targets"));
                                }))
                        )
        );
    }

    private static int runToEnable(ServerCommandSource source, Collection<ServerPlayerEntity> targets) throws CommandSyntaxException {
        if (targets != null) {
            targets.forEach((target) -> {
                target.getAbilities().allowFlying = true;
//                target.getAbilities().flying = true;
                target.sendAbilitiesUpdate();
//                target.sendMessage(Text.literal("You can now fly"));
            });
            return 1;
        } else {
            source.sendError(Text.literal("Player Not Found"));
            return 0;
        }
    }

    private static int runToDisable(ServerCommandSource source, Collection<ServerPlayerEntity> targets) throws CommandSyntaxException {
        if (targets != null) {
            targets.forEach((target) -> {
                target.getAbilities().allowFlying = false;
//                target.getAbilities().flying = false;
                target.sendAbilitiesUpdate();
//                target.sendMessage(Text.literal("You can no longer fly"));
            });
            return 1;
        } else {
            source.sendError(Text.literal("Player Not Found"));
            return 0;
        }
    }
}

