package me.mizab.angry_villager_mod.mixin;

import net.minecraft.server.network.ServerPlayerEntity;
import net.minecraft.text.Text;
import net.minecraft.world.GameMode;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

//@Mixin(ServerPlayerEntity.class)
//public abstract class ServerEntityMixin {
//    @Shadow public abstract void sendMessage(Text message);
//
//    @Inject(method = "changeGameMode", at = @At("HEAD"))
//    public void changeGameMode(GameMode gameMode, CallbackInfoReturnable<Boolean> cir){
//        sendMessage(Text.literal("Changed"));
//    }
//}
