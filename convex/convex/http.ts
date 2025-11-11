import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { internal } from "./_generated/api";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.api.users.createUser, {
        clerkId: event.data.id,
        name: `${event.data.first_name} ${event.data.last_name}`,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
      });
      break;
    // Add other webhook events to handle here
    default:
      console.log("Unhandled webhook event:", event.type);
  }

  return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

async function validateRequest(
  req: Request
): Promise<WebhookEvent | undefined> {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set in environment variables");
  }

  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const wh = new Webhook(webhookSecret);
  try {
    const event = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return;
  }
}

export default http;
