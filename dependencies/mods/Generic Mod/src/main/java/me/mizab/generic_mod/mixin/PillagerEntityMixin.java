package me.mizab.generic_mod.mixin;

import net.minecraft.entity.mob.IllagerEntity;
import net.minecraft.entity.mob.PillagerEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.ModifyArg;

@Mixin(PillagerEntity.class)
public abstract class PillagerEntityMixin {
    @Shadow public abstract IllagerEntity.State getState();

    @ModifyArg(method = "shoot", at = @At(value = "INVOKE", target = "Lnet/minecraft/entity/mob/PillagerEntity;shoot(Lnet/minecraft/entity/LivingEntity;Lnet/minecraft/entity/LivingEntity;Lnet/minecraft/entity/projectile/ProjectileEntity;FF)V"), index = 4)
    private float injected(float x) {
        return 2.0F;
    }

}
