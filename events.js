const { EventEmitter } = require("events");

const Subscription = new EventEmitter();

Subscription.on("subscribe", subscribePerson);

Subscription.on("unsubscribe", unsubscribePerson);

function subscribePerson({ user }) {
  console.log("Subscribed!", user + " has subscribed woot woot..");
}

function unsubscribePerson({ email }) {
  console.log(
    "Unsubscribed.",
    "Remove " + email + " from the newsletter list."
  );
}

Subscription.emit("unsubscribe", { user: "Ben", email: "bemail@gmail.com" });
