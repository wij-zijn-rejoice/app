"use client";
import {useState} from "react";
import {supabase} from "@/lib/supabase";

export function BookingForm({onDone}:{onDone:()=>void}){
 const [busy,setBusy]=useState(false);
 async function save(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);const f=new FormData(e.currentTarget);const{data:{user}}=await supabase.auth.getUser();
  if(user) await supabase.from("bookings").insert({client:f.get("client"),date:f.get("date"),start_time:f.get("start"),end_time:f.get("end")||null,location:f.get("location"),agreed_fee:Number(f.get("fee")||0),status:f.get("status"),notes:f.get("notes"),created_by:user.id});
  setBusy(false);onDone();
 }
 return <form className="card" onSubmit={save}><div className="formgrid"><div><label>Klant / opdrachtgever *</label><input className="input" name="client" required/></div><div><label>Datum *</label><input className="input" name="date" type="date" required/></div><div><label>Starttijd</label><input className="input" name="start" type="time"/></div><div><label>Eindtijd</label><input className="input" name="end" type="time"/></div><div><label>Locatie</label><input className="input" name="location"/></div><div><label>Bedrag (€)</label><input className="input" name="fee" type="number" step="0.01"/></div><div><label>Status</label><select className="select" name="status"><option>Optie</option><option>Bevestigd</option><option>Afgerond</option><option>Geannuleerd</option></select></div><div className="full"><label>Notities</label><textarea name="notes" rows={3}/></div></div><div className="toolbar" style={{marginTop:14}}><button className="btn" disabled={busy}>{busy?"Opslaan…":"Boeking opslaan"}</button></div></form>
}

export function EventForm({onDone}:{onDone:()=>void}){
 const[busy,setBusy]=useState(false);
 async function save(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);const f=new FormData(e.currentTarget);const{data:{user}}=await supabase.auth.getUser();if(user)await supabase.from("calendar_events").insert({title:f.get("title"),start_datetime:new Date(String(f.get("start"))).toISOString(),end_datetime:new Date(String(f.get("end"))).toISOString(),location:f.get("location"),description:f.get("description"),created_by:user.id});setBusy(false);onDone()}
 return <form className="card" onSubmit={save}><div className="formgrid"><div className="full"><label>Titel *</label><input className="input" name="title" required/></div><div><label>Start *</label><input className="input" name="start" type="datetime-local" required/></div><div><label>Einde *</label><input className="input" name="end" type="datetime-local" required/></div><div className="full"><label>Locatie</label><input className="input" name="location"/></div><div className="full"><label>Omschrijving</label><textarea name="description" rows={3}/></div></div><div className="toolbar" style={{marginTop:14}}><button className="btn" disabled={busy}>{busy?"Opslaan…":"Afspraak opslaan"}</button></div></form>
}

export function FinanceForm({onDone}:{onDone:()=>void}){
 const[busy,setBusy]=useState(false);
 async function save(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);const f=new FormData(e.currentTarget);const{data:{user}}=await supabase.auth.getUser();if(user)await supabase.from("financial_transactions").insert({type:f.get("type"),amount:Number(f.get("amount")),date:f.get("date"),category:f.get("category"),description:f.get("description"),created_by:user.id});setBusy(false);onDone()}
 return <form className="card" onSubmit={save}><div className="formgrid"><div><label>Type</label><select className="select" name="type"><option value="income">Inkomst</option><option value="expense">Uitgave</option></select></div><div><label>Bedrag (€) *</label><input className="input" name="amount" type="number" step="0.01" required/></div><div><label>Datum *</label><input className="input" name="date" type="date" required/></div><div><label>Categorie</label><input className="input" name="category" placeholder="Optreden, materiaal…"/></div><div className="full"><label>Omschrijving</label><input className="input" name="description"/></div></div><div className="toolbar" style={{marginTop:14}}><button className="btn" disabled={busy}>{busy?"Opslaan…":"Transactie opslaan"}</button></div></form>
}
