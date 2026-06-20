"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, X, Save } from "lucide-react";
import { AdminGate } from "@/components/AdminGate";
import {
  listCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy,
  type AdminCaseStudy,
} from "@/lib/firebase-data";
import { Button } from "@/components/ui/button";

export default function AdminCasesPage() {
  return (
    <AdminGate>
      <CasesAdmin />
    </AdminGate>
  );
}

const empty: AdminCaseStudy = {
  slug: "", client: "", industry: "Healthcare", title: "", summary: "",
  challenge: "", solution: "", results: [{ metric: "", label: "" }],
  services: [], duration: "",
};

function CasesAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "case_studies"], queryFn: listCaseStudies });
  const [editing, setEditing] = useState<AdminCaseStudy | null>(null);

  const save = useMutation({
    mutationFn: async (c: AdminCaseStudy) => {
      const { id, createdAt: _c, ...payload } = c;
      void _c;
      if (id) return updateCaseStudy(id, payload);
      return createCaseStudy(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
      qc.invalidateQueries({ queryKey: ["public", "case_studies"] });
      setEditing(null);
    },
  });
  const del = useMutation({
    mutationFn: deleteCaseStudy,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
      qc.invalidateQueries({ queryKey: ["public", "case_studies"] });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gradient">Case studies</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage client success stories.</p>
        </div>
        <Button onClick={() => setEditing(empty)} variant="orange" size="premium-sm" shape="full">
          <Plus className="h-4 w-4" /> New case study
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-surface">
        {isLoading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (data?.length ?? 0) === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">No case studies yet.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {data!.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{c.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.client} · {c.industry} · /{c.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(c)} className="text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { if (c.id && confirm("Delete this case study?")) del.mutate(c.id); }} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <CaseEditor cs={editing} busy={save.isPending} onClose={() => setEditing(null)} onSave={(c) => save.mutate(c)} />
      )}
    </div>
  );
}

function CaseEditor({ cs, busy, onClose, onSave }: { cs: AdminCaseStudy; busy: boolean; onClose: () => void; onSave: (c: AdminCaseStudy) => void }) {
  const [c, setC] = useState<AdminCaseStudy>(cs);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 backdrop-blur-sm">
      <div className="mx-auto my-10 max-w-3xl rounded-3xl border border-border/60 bg-surface p-6 shadow-elegant">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{c.id ? "Edit case study" : "New case study"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground"><X className="h-5 w-5" /></Button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(c); }} className="mt-5 space-y-4">
          <F label="Title"><input className={input} value={c.title} onChange={(e) => setC({ ...c, title: e.target.value })} required /></F>
          <F label="Slug (URL)"><input className={input} value={c.slug} onChange={(e) => setC({ ...c, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} required /></F>
          <div className="grid gap-4 sm:grid-cols-3">
            <F label="Client"><input className={input} value={c.client} onChange={(e) => setC({ ...c, client: e.target.value })} required /></F>
            <F label="Industry"><input className={input} value={c.industry} onChange={(e) => setC({ ...c, industry: e.target.value })} /></F>
            <F label="Duration"><input className={input} value={c.duration} onChange={(e) => setC({ ...c, duration: e.target.value })} placeholder="9 months" /></F>
          </div>
          <F label="Summary"><textarea className={input} rows={2} value={c.summary} onChange={(e) => setC({ ...c, summary: e.target.value })} required /></F>
          <F label="Challenge"><textarea className={input} rows={4} value={c.challenge} onChange={(e) => setC({ ...c, challenge: e.target.value })} /></F>
          <F label="Solution"><textarea className={input} rows={4} value={c.solution} onChange={(e) => setC({ ...c, solution: e.target.value })} /></F>
          <F label="Services (comma separated)">
            <input className={input} value={c.services.join(", ")} onChange={(e) => setC({ ...c, services: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
          </F>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Results (metric + label)</span>
              <button type="button" onClick={() => setC({ ...c, results: [...c.results, { metric: "", label: "" }] })} className="text-xs text-primary hover:underline">+ add result</button>
            </div>
            <div className="mt-2 space-y-2">
              {c.results.map((r, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
                  <input className={input} placeholder="51%" value={r.metric} onChange={(e) => { const next = [...c.results]; next[i] = { ...r, metric: e.target.value }; setC({ ...c, results: next }); }} />
                  <input className={input} placeholder="Reduction in chart time" value={r.label} onChange={(e) => { const next = [...c.results]; next[i] = { ...r, label: e.target.value }; setC({ ...c, results: next }); }} />
                  <button type="button" onClick={() => setC({ ...c, results: c.results.filter((_, j) => j !== i) })} className="rounded-md px-2 text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="premium-outline" size="premium-sm" shape="full" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={busy} variant="orange" size="premium-sm" shape="full">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const input = "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none";
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm font-medium">{label}</span><div className="mt-1.5">{children}</div></label>;
}
