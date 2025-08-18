<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
import { RouterView } from "vue-router";
</script>

<template>
  <SignedIn>
    <RouterView />
  </SignedIn>
  <SignedOut>
    <div class="flex items-center justify-center h-screen">
      <SignInButton mode="modal" />
    </div>
  </SignedOut>
</template>
