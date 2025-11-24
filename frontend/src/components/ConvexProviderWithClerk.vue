<script setup lang="ts">
import { useAuth, useClerk } from '@clerk/vue';
import { ConvexProvider } from 'convex-vue';
import { ConvexClient } from 'convex/browser';
import { ref, watchEffect } from 'vue';

const clerk = useClerk();
const { getToken, isLoaded, isSignedIn } = useAuth();

const convexClient = new ConvexClient(import.meta.env.VITE_CONVEX_URL!);

const isAuthenticated = ref(false); // Not directly used for rendering, but useful for debugging
const isLoading = ref(true);

watchEffect(async () => {
  if (!isLoaded.value) {
    // Clerk is still loading
    isLoading.value = true;
    return;
  }

  if (isSignedIn.value) {
    try {
      // Get the Clerk JWT token for Convex
      const token = await getToken({ template: 'convex' }); // Use the 'convex' JWT template
      if (token) {
        await convexClient.setAuth(token);
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      console.error('Failed to set Convex auth token:', error);
      isAuthenticated.value = false;
    }
  } else {
    // User is signed out, clear Convex auth
    await convexClient.setAuth(null);
    isAuthenticated.value = false;
  }
  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading">
    <!-- Loading state while authentication is being determined -->
    Loading authentication...
  </div>
  <div v-else>
    <ConvexProvider :client="convexClient">
      <slot />
    </ConvexProvider>
  </div>
</template>
