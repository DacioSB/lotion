<script setup lang="ts">
import { useAuth } from '@clerk/vue';
import { useConvexClient } from 'convex-vue';
import { ref, watchEffect } from 'vue';

const { isLoaded, isSignedIn, getToken } = useAuth();
const convexClient = useConvexClient();

const isAuthenticated = ref(false);
const isLoading = ref(true);

watchEffect(async () => {
  if (!isLoaded.value) {
    isLoading.value = true;
    return;
  }

  if (isSignedIn.value) {
    try {
      const token = await getToken.value({ template: 'convex' });

      if (token) {
        await convexClient.setAuth(async () => token);
        isAuthenticated.value = true;
      } else {
        await convexClient.setAuth(async () => null);
        isAuthenticated.value = false;
      }
    } catch (error) {
      console.error('Failed to set Convex auth token:', error);
      await convexClient.setAuth(async () => null);
      isAuthenticated.value = false;
    }
    await convexClient.setAuth(async () => null);
    isAuthenticated.value = false;
  }
  
  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading">
    Loading authentication...
  </div>
  
  <div v-else>
    <slot />
  </div>
</template>