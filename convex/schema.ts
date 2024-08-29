import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  tasks: defineTable({
    completed: v.boolean(),
    text: v.string()
  })
});

export default schema;
