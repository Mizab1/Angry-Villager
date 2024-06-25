package me.mizab.angry_villager_mod.mixin;

import net.minecraft.entity.mob.PillagerEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.ModifyArg;

@Mixin(PillagerEntity.class)
public class PillagerEntityMixin {
   @ModifyArg(method = "shoot", at = @At(value = "INVOKE", target = "Lnet/minecraft/entity/mob/PillagerEntity;shoot(Lnet/minecraft/entity/LivingEntity;Lnet/minecraft/entity/LivingEntity;Lnet/minecraft/entity/projectile/ProjectileEntity;FF)V"), index = 4)
   private float injected(float x) {
      return 2.0F;
   }
}
