"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function Header({title,subtitle,action}:{title:string;subtitle?:string;action?:React.ReactNode}) {
  const [name,setName]=useState("Rejoice");
  useEffect(()=>{supabase.auth.getUser().then(async({data:{user}})=>{
    if(!user)return; const {data}=await supabase.from("profiles").select("display_name").eq("id",user.id).maybeSingle();
    setName(data?.display_name || user.email?.split("@")[0] || "Rejoice");
  })},[]);
  return <header className="topbar"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div><div className="top-actions">{action}<div className="user-pill"><span>{name.slice(0,1).toUpperCase()}</span>{name}</div></div></header>
}
