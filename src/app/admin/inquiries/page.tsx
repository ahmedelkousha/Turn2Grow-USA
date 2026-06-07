"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Mail, Phone, Building2, Trash2, Archive, CheckCheck } from "lucide-react";
import { AdminGate } from "@/components/AdminGate";
import { listInquiries, updateInquiry, deleteInquiry, type Inquiry } from "@/lib/firebase-data";

export default function AdminInquiriesPage() {
  return (
    <AdminGate>
      <InquiriesAdmin />
    </AdminGate>
  );
}

function InquiriesAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "inquiries"], queryFn: listInquiries });
  const [filter, setFilter] = useState<"all" | Inquiry["status"]>("all");

  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Inquiry["status"] }) => updateInquiry(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "inquiries"] }),
  });
  const del = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "inquiries"] }),
  });

  const items = (data ?? []).filter((i) => filter === "all" || i.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gradient">Inquiries</h1>
          <p className="mt-2 text-sm text-muted-foreground">Messages submitted through the contact form.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-surface p-1 text-xs">
          {(["all", "new", "read", "archived"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1.5 capitalize ${filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-surface p-8 text-center text-sm text-muted-foreground">
            No inquiries in this view.
          </div>
        ) : items.map((i) => (
          <article key={i.id} className="rounded-2xl border border-border/60 bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{i.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {i.email}</span>
                  {i.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {i.phone}</span>}
                  {i.company && <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" /> {i.company}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs ${i.status === "new" ? "bg-primary/15 text-primary" : "bg-background text-muted-foreground"}`}>{i.status}</span>
                {i.createdAt && <span className="text-xs text-muted-foreground">{i.createdAt.toDate().toLocaleString()}</span>}
              </div>
            </div>
            {i.topic && <p className="mt-3 text-xs uppercase tracking-wider text-primary">{i.topic}</p>}
            <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{i.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`mailto:${i.email}?subject=Re: your inquiry to Turn2Grow`} className="inline-flex items-center gap-1 rounded-full bg-gradient-orange px-3 py-1.5 text-xs font-medium text-primary-foreground">Reply</a>
              {i.status !== "read" && <button onClick={() => i.id && update.mutate({ id: i.id, status: "read" })} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs"><CheckCheck className="h-3 w-3" /> Mark read</button>}
              {i.status !== "archived" && <button onClick={() => i.id && update.mutate({ id: i.id, status: "archived" })} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs"><Archive className="h-3 w-3" /> Archive</button>}
              <button onClick={() => { if (i.id && confirm("Delete this inquiry?")) del.mutate(i.id); }} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /> Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
