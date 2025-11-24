<script setup lang="ts">
import { RouterView } from "vue-router";
import { SignedIn, SignedOut, UserButton, ClerkLoaded, ClerkLoading } from "@clerk/vue";
import ConvexProviderWithClerk from "./components/ConvexProviderWithClerk.vue"; // Keep the ConvexProviderWithClerk
</script>

<template>
  <ClerkLoading>
    <div class="flex items-center justify-center h-screen">
      <div>Loading...</div>
    </div>
  </ClerkLoading>
  <ClerkLoaded>
    <ConvexProviderWithClerk>
      <SignedIn>
        <div class="flex flex-col h-full">
          <header class="flex items-center justify-between p-4 bg-gray-100 border-b">
            <h1 class="text-xl font-bold">My Notion</h1>
            <UserButton after-sign-out-url="/" />
          </header>
          <main class="flex-grow">
            <RouterView />
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RouterView />
      </SignedOut>
    </ConvexProviderWithClerk>
  </ClerkLoaded>
</template>