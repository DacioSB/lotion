import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { convexVue } from 'convex-vue' // Keep convexVue for its plugin functionality
import { clerkPlugin } from '@clerk/vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key")
}

const convexUrl = import.meta.env.VITE_CONVEX_URL
if (!convexUrl) {
  throw new Error("Missing Convex URL")
}

app.use(createPinia())
app.use(router)

app.use(clerkPlugin, {
  publishableKey,
})

app.use(convexVue, {
  url: convexUrl,
})

app.mount('#app')