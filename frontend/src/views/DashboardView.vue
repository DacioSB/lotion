<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from "convex-vue";
import { api } from "../../../convex/convex/_generated/api";

const { data: documents } = useConvexQuery(api.api.documents.get, {});
const { mutate: createDocument } = useConvexMutation(api.api.documents.create);

const onCreate = () => {
  createDocument({ title: "Untitled" });
};
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">My Documents</h1>
      <button @click="onCreate" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create a document</button>
    </div>
    <div v-if="documents === undefined">Loading...</div>
    <div v-else-if="documents.length === 0">No documents yet.</div>
    <ul v-else>
      <li v-for="doc in documents" :key="doc._id" class="mb-2">
        {{ doc.title }}
      </li>
    </ul>
  </div>
</template>