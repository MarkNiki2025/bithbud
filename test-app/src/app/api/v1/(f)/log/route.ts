import { logDeleteRoute, logGetRoute, logPostRoute } from "@fernir2/saas-kit/server";

export const POST = logPostRoute;

export const GET = logGetRoute;

export const DELETE = logDeleteRoute;
