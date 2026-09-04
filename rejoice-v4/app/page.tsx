"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {AppShell} from "@/components/AppShell";
import {Header} from "@/components/Header";
import {supabase} from "@/lib/supabase";
import {dateNL,dateTimeNL,euro} from "@/lib/utils";

export default function Dashboard(){
 const [booking,setBooking]=useState<any>(null),[event,setEvent]=useState<any>(null),[balance,setBalance]=useState(0),[count,setCount]=useState(0),[loading,setLoading]=useState(true);
 const [recent,setRecent]=useState<any[]>([]),[inv,setInv]=useState<any[]>([]);
 async function load(){
  setLoading(true); const now=new Date().toISOString();
  const [b,e,f,i]=await Promise.all([
   supabase.from("bookings").select("*").gte("event_date",new Date().toISOString().slice(0,10)).neq("status","Geannuleerd").order("event_date",{ascending:true}).limit(1).maybeSingle(),
   supabase.from("calendar_events").select("*").gte("starts_at",now).order("starts_at",{ascending:true}).limit(1).maybeSingle(),
   supabase.from("finance_transactions").select("amount,type,description,transaction_date").order("transaction_date",{ascending:false}).limit(50),
   supabase.from("inventory").select("id,title,description,photo_path").order("created_at",{ascending:false}).limit(4)
  ]);
  setBooking(b.data);setEvent(e.data);setInv(i.data||[]);setCount(i.data?.length||0);
  const tx=f.data||[];setRecent(tx.slice(0,5));setBalance(tx.reduce((n,x)=>n+(x.type==="income"?Number(x.amount):-Number(x.amount)),0));setLoading(false);
 }
 useEffect(()=>{load()},[]);
 return <AppShell><Header title="Dashboard" subtitle="Overzicht van Rejoice"/><div className="grid grid4">
  <div className="card stat"><div className="label">Volgende boeking</div><div className="value" style={{fontSize:18}}>{booking?dateNL(booking.event_date):"—"}</div><div className="hint">{booking?.client_name||"Nog geen boeking"}</div></div>
  <div className="card stat"><div className="label">Volgende afspraak</div><div className="value" style={{fontSize:18}}>{event?dateTimeNL(event.starts_at):"—"}</div><div className="hint">{event?.title||"Nog geen afspraak"}</div></div>
  <div className="card stat"><div className="label">Bandsaldo</div><div className="value">{loading?"…":euro(balance)}</div><div className="hint">op basis van ingevoerde transacties</div></div>
  <div className="card stat"><div className="label">Inventaris</div><div className="value">{count}</div><div className="hint">geregistreerde items</div></div>
 </div>
 <div className="grid grid2">
  <section><div className="section-title"><h2>Recente financiën</h2><Link className="btn secondary small" href="/financien">Alles bekijken</Link></div><div className="card list">{recent.length?recent.map((x:any)=><div className="row" key={x.id}><div><div className="row-title">{x.description}</div><div className="row-meta">{dateNL(x.transaction_date)}</div></div><div className={x.type==="income"?"positive":"negative"}>{x.type==="income"?"+":"−"} {euro(Number(x.amount))}</div></div>):<div className="empty">Nog geen transacties.</div>}</div></section>
  <section><div className="section-title"><h2>Laatste inventaris</h2><Link className="btn secondary small" href="/inventaris">Inventaris</Link></div><div className="card list">{inv.length?inv.map((x:any)=><div className="row" key={x.id}><div><div className="row-title">{x.title}</div><div className="row-meta">{x.description||"Geen beschrijving"}</div></div><span className="badge">Item</span></div>):<div className="empty">Nog geen inventaris.</div>}</div></section>
 </div>
 </AppShell>
}
