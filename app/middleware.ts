import { NextRequest } from "next/server";
import { updateSession } from "./auth";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}