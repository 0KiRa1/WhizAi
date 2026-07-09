
// Middleware to cheque user id and has premium plan 

import { clerkClient } from "@clerk/express";


export const auth = async (req, res, next) => {
    try {
        console.log("AUTH OBJECT:", req.auth());

        const { userId, has } = req.auth();

        console.log("USER ID:", userId);

        const hasPremiumPlan = await has({ plan: "premium" });

        console.log("HAS PREMIUM:", hasPremiumPlan);

        const user = await clerkClient.users.getUser(userId);

        console.log("USER FETCHED:", user.id);

        if (!hasPremiumPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0,
                },
            });

            req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? "premium" : "free";

        next();
    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};