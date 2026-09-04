"use client";
import { Nav } from "./Nav";
import { AuthGuard } from "./AuthGuard";

export function AppShell({children}:{children:React.ReactNode}) {
  return <AuthGuard><div className="app"><Nav/><main className="main">{children}</main></div></AuthGuard>;
}
