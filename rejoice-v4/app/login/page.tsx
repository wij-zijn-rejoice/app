"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabase";
export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError("E-mailadres of wachtwoord klopt niet.");else router.replace("/");setBusy(false)}
 return <main className="login"><form className="login-card" onSubmit={submit}><div className="brand-mark">R</div><h1>Welkom bij Rejoice</h1><p>Log in op de interne bandomgeving.</p>{error&&<div className="error">{error}</div>}<label>E-mailadres</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/><label style={{marginTop:12}}>Wachtwoord</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/><button className="btn" style={{width:"100%",marginTop:18}} disabled={busy}>{busy?"Inloggen…":"Inloggen"}</button></form></main>
}
