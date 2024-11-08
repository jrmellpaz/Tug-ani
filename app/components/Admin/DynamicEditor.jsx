"use client";
 
import dynamic from "next/dynamic";
 
export const Editor = dynamic(() => import("@/app/components/Admin/Editor"), { ssr: false });