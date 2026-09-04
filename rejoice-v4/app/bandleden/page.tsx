"use client";
import {useEffect,useState} from "react";
import {AppShell} from "@/components/AppShell";import {Header} from "@/components/Header";import {supabase} from "@/lib/supabase";import {Mail} from "lucide-react";
export default function Bandleden(){
 const [rows,setRows]=useState<any[]>([]);
 useEffect(()=>{supabase.from("profiles").select("*").order("display_name").then(({data}: {data: any[] | null})=>setRows(data||[]))},[]);
 return <AppShell><Header title="Bandleden" subtitle="De leden van Rejoice"/><div className="grid grid2">{rows.map(r=><div className="card" key={r.id}><div className="toolbar"><div className="user-pill" style={{padding:"6px 10px 6px 6px"}}><span>{r.display_name.slice(0,1).toUpperCase()}</span></div><div><div className="row-title">{r.display_name}</div><div className="row-meta toolbar"><Mail size={12}/>{r.email||"Geen e-mail"}</div></div></div></div>)}{!rows.length&&<div className="empty">Nog geen profielen gevonden. Maak eerst de gebruikers aan in Supabase Auth.</div>}</div></AppShell>
}
