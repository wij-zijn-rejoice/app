export const euro=(n:number)=>new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(n||0);
export const dateNL=(s:string)=>new Intl.DateTimeFormat("nl-NL",{day:"numeric",month:"short",year:"numeric"}).format(new Date(s));
export const dateTimeNL=(s:string)=>new Intl.DateTimeFormat("nl-NL",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date(s));
export function googleCalendarUrl(e:{title:string;starts_at:string;ends_at?:string|null;description?:string|null;location?:string|null}){
 const fmt=(s:string)=>new Date(s).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
 const p=new URLSearchParams({action:"TEMPLATE",text:e.title,dates:`${fmt(e.starts_at)}/${fmt(e.ends_at||e.starts_at)}`});
 if(e.description)p.set("details",e.description); if(e.location)p.set("location",e.location);
 return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
