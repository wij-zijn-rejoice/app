"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, ClipboardList, Euro, FileText, Home, Package, Settings, Users, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

const items = [
  ["/","Dashboard",Home],["/agenda","Agenda",CalendarDays],["/boekingen","Boekingen",ClipboardList],
  ["/financien","Financiën",Euro],["/documenten","Documenten",FileText],["/inventaris","Inventaris",Package],
  ["/bandleden","Bandleden",Users],["/instellingen","Instellingen",Settings]
] as const;

export function Nav() {
  const path=usePathname(); const router=useRouter();
  async function logout(){await supabase.auth.signOut();router.replace("/login");}
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark">R</div><div><strong>Rejoice</strong><small>Band app</small></div></div>
    <nav>{items.map(([href,label,Icon])=><Link key={href} href={href} className={path===href?"navitem active":"navitem"}><Icon size={18}/><span>{label}</span></Link>)}</nav>
    <button className="logout" onClick={logout}><LogOut size={17}/>Uitloggen</button>
  </aside>
}
