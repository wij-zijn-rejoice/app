"use client";
import {X} from "lucide-react";
export function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}){
 return <div className="modalback" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal">
  <div className="modalhead"><h2>{title}</h2><button className="iconbtn" onClick={onClose}><X size={17}/></button></div>{children}
 </div></div>
}
