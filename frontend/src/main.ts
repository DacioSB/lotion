import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { convexVue } from 'convex-vue'
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
app.use(convexVue, { url: convexUrl})
app.use(clerkPlugin, {
  publishableKey,
})

app.mount('#app')