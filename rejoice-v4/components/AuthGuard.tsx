"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthGuard({children}:{children:React.ReactNode}) {
  const path = usePathname();
  const router = useRouter();
  const [ready,setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({data}) => {
      if (!alive) return;
      if (!data.session && path !== "/login") router.replace("/login");
      else if (data.session && path === "/login") router.replace("/");
      setReady(true);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && path !== "/login") router.replace("/login");
      if (session && path === "/login") router.replace("/");
    });
    return () => { alive=false; subscription.unsubscribe(); };
  }, [path,router]);

  if (!ready) return <div className="splash"><div className="brand-mark">R</div><b>Rejoice</b><span>laden…</span></div>;
  return <>{children}</>;
}
