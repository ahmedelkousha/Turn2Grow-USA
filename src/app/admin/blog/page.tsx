"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, X, Save, Upload, ImageOff } from "lucide-react";
import Image from "next/image";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { AdminGate } from "@/components/AdminGate";
import { getFirebaseStorage } from "@/lib/firebase";
import {
  listBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  type AdminBlogPost,
} from "@/lib/firebase-data";
import { Button } from "@/components/ui/button";

export default function AdminBlogPage() {
  return (
    <AdminGate>
      <BlogAdmin />
    </AdminGate>
  );
}

const empty: AdminBlogPost = {
  slug: "", title: "", excerpt: "", category: "Healthcare",
  date: new Date().toISOString().slice(0, 10), readTime: "5 min read",
  author: "Turn2Grow Editorial", body: "", imageUrl: "",
};

function BlogAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "blog_posts"], queryFn: listBlogPosts });
  const [editing, setEditing] = useState<AdminBlogPost | null>(null);

  const save = useMutation({
    mutationFn: async (post: AdminBlogPost) => {
      const { id, createdAt: _c, ...payload } = post;
      void _c;
      if (id) return updateBlogPost(id, payload);
      return createBlogPost(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog_posts"] });
      qc.invalidateQueries({ queryKey: ["public", "blog_posts"] });
      setEditing(null);
    },
  });
  const del = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog_posts"] });
      qc.invalidateQueries({ queryKey: ["public", "blog_posts"] });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gradient">Blog posts</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create, edit, and remove articles published on the site.</p>
        </div>
        <Button onClick={() => setEditing(empty)} variant="orange" size="premium-sm" shape="full">
          <Plus className="h-4 w-4" /> New post
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-surface">
        {isLoading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (data?.length ?? 0) === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">No posts yet. Click &quot;New post&quot; to create one.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {data!.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.category} · {p.date} · /{p.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(p)} className="text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { if (p.id && confirm("Delete this post?")) del.mutate(p.id); }} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <BlogEditor
          post={editing}
          busy={save.isPending}
          onClose={() => setEditing(null)}
          onSave={(p) => save.mutate(p)}
        />
      )}
    </div>
  );
}

function BlogEditor({ post, busy, onClose, onSave }: { post: AdminBlogPost; busy: boolean; onClose: () => void; onSave: (p: AdminBlogPost) => void }) {
  const [p, setP] = useState<AdminBlogPost>(post);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploadErr(null);
    const storage = getFirebaseStorage();
    if (!storage) { setUploadErr("Storage not configured."); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadErr("Image must be under 5 MB."); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const ref = storageRef(storage, path);
      await uploadBytes(ref, file, { contentType: file.type });
      const url = await getDownloadURL(ref);
      // best-effort cleanup of previously uploaded image
      if (p.imageUrl && p.imageUrl.includes("/o/blog%2F")) {
        try {
          const oldPath = decodeURIComponent(p.imageUrl.split("/o/")[1].split("?")[0]);
          await deleteObject(storageRef(storage, oldPath));
        } catch { /* ignore */ }
      }
      setP({ ...p, imageUrl: url });
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 backdrop-blur-sm">
      <div className="mx-auto my-10 max-w-3xl rounded-3xl border border-border/60 bg-surface p-6 shadow-elegant">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{p.id ? "Edit post" : "New post"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground"><X className="h-5 w-5" /></Button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(p); }} className="mt-5 space-y-4">
          <F label="Title"><input className={input} value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} required /></F>
          <F label="Slug (URL)"><input className={input} value={p.slug} onChange={(e) => setP({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} required placeholder="my-post-slug" /></F>
          <div className="grid gap-4 sm:grid-cols-3">
            <F label="Category"><input className={input} value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })} /></F>
            <F label="Date"><input type="date" className={input} value={p.date} onChange={(e) => setP({ ...p, date: e.target.value })} /></F>
            <F label="Read time"><input className={input} value={p.readTime} onChange={(e) => setP({ ...p, readTime: e.target.value })} /></F>
          </div>
          <F label="Author"><input className={input} value={p.author} onChange={(e) => setP({ ...p, author: e.target.value })} /></F>
          <F label="Cover image">
            <div className="space-y-3">
              {p.imageUrl ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
                  <Image src={p.imageUrl} alt="Cover preview" fill className="object-cover" />
                  <button type="button" onClick={() => setP({ ...p, imageUrl: "" })} className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs text-foreground backdrop-blur hover:bg-background">
                    <ImageOff className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl border border-dashed border-border bg-background/40 text-xs text-muted-foreground">No image yet</div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm hover:border-primary/40">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); e.target.value = ""; }} disabled={uploading} />
                </label>
                <span className="text-xs text-muted-foreground">or paste a URL</span>
              </div>
              <input className={input} placeholder="https://…" value={p.imageUrl ?? ""} onChange={(e) => setP({ ...p, imageUrl: e.target.value })} />
              {uploadErr && <p className="text-xs text-destructive">{uploadErr}</p>}
            </div>
          </F>
          <F label="Excerpt"><textarea className={input} rows={2} value={p.excerpt} onChange={(e) => setP({ ...p, excerpt: e.target.value })} required /></F>
          <F label="Body (separate paragraphs with a blank line; start a paragraph with '## ' for a heading)">
            <textarea className={input} rows={14} value={p.body} onChange={(e) => setP({ ...p, body: e.target.value })} required />
          </F>
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
