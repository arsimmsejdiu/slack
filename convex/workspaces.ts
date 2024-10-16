import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { generateJoinCode } from "../src/lib/utils";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized");
    }

    // Generate join code and perform database operations in parallel
    const [joinCode, workspaceId] = await Promise.all([
      generateJoinCode(),
      ctx.db.insert("workspaces", {
        name: args.name,
        userId,
        joinCode: "", // Temporary placeholder
      }),
    ]);

    // Update workspace with the generated join code and insert member in parallel
    await Promise.all([
      ctx.db.patch(workspaceId, { joinCode }),
      ctx.db.insert("members", {
        userId,
        workspaceId,
        role: "admin",
      }),
    ]);

    await Promise.all([
      ctx.db.insert("channels", {
        name: "general",
        workspaceId,
      }),
    ])

    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    //get all workspaces where the user is a member
    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    //generate workspaces
    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
  },
});

export const getById = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }

    return await ctx.db.get(args.workspaceId);
  },
});

export const update = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.workspaceId, { name: args.name });

    return args.workspaceId;
  },
});

export const remove = mutation({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const [members] = await Promise.all([
      ctx.db
        .query("members")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
        .collect(),
    ]);

    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    await ctx.db.delete(args.workspaceId);

    return args.workspaceId;
  },
});

// export const join = mutation({
//   args: {
//     workspaceId: v.id("workspaces"),
//     joinCode: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const userId = await auth.getUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     const workspace = await ctx.db.get(args.workspaceId);
//     if (!workspace) {
//       throw new Error("Workspace not found");
//     }

//     if (workspace.joinCode !== args.joinCode) {
//       throw new Error("Invalid join code");
//     }

//     const member = await ctx.db
//       .query("members")
//       .withIndex("by_workspace_id_user_id", (q) =>
//         q.eq("workspaceId", args.workspaceId).eq("userId", userId)
//       )
//       .unique();

//     if (member) {
//       throw new Error("You are already a member of this workspace");
//     }

//     await ctx.db.insert("members", {
//       userId,
//       workspaceId: args.workspaceId,
//       role: "member",
//     });

//     return args.workspaceId;
//   },
// });
