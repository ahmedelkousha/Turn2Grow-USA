import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy, where, limit, type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";

export type AdminBlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  body: string; // markdown-ish plain text, split by \n\n into paragraphs
  imageUrl?: string;
  createdAt?: Timestamp;
};

export type AdminCaseStudy = {
  id?: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  services: string[];
  duration: string;
  createdAt?: Timestamp;
};

export type Inquiry = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  topic?: string;
  message: string;
  status: "new" | "read" | "archived";
  createdAt?: Timestamp;
};

function db() {
  const d = getFirebaseDb();
  if (!d) throw new Error("Firebase is not configured. Update src/lib/firebase-config.ts with your project values.");
  return d;
}

// ----- Blog posts -----
export async function listBlogPosts(): Promise<AdminBlogPost[]> {
  const snap = await getDocs(query(collection(db(), "blog_posts"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminBlogPost, "id">) }));
}
export async function getBlogPost(id: string) {
  const s = await getDoc(doc(db(), "blog_posts", id));
  return s.exists() ? { id: s.id, ...(s.data() as Omit<AdminBlogPost, "id">) } : null;
}
export async function createBlogPost(data: Omit<AdminBlogPost, "id" | "createdAt">) {
  return addDoc(collection(db(), "blog_posts"), { ...data, createdAt: serverTimestamp() });
}
export async function updateBlogPost(id: string, data: Partial<AdminBlogPost>) {
  return updateDoc(doc(db(), "blog_posts", id), data);
}
export async function deleteBlogPost(id: string) {
  return deleteDoc(doc(db(), "blog_posts", id));
}
export async function getBlogPostBySlug(slug: string): Promise<AdminBlogPost | null> {
  const snap = await getDocs(query(collection(db(), "blog_posts"), where("slug", "==", slug), limit(1)));
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<AdminBlogPost, "id">) };
}
export async function getCaseStudyBySlug(slug: string): Promise<AdminCaseStudy | null> {
  const snap = await getDocs(query(collection(db(), "case_studies"), where("slug", "==", slug), limit(1)));
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<AdminCaseStudy, "id">) };
}

// ----- Case studies -----
export async function listCaseStudies(): Promise<AdminCaseStudy[]> {
  const snap = await getDocs(query(collection(db(), "case_studies"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminCaseStudy, "id">) }));
}
export async function getCaseStudy(id: string) {
  const s = await getDoc(doc(db(), "case_studies", id));
  return s.exists() ? { id: s.id, ...(s.data() as Omit<AdminCaseStudy, "id">) } : null;
}
export async function createCaseStudy(data: Omit<AdminCaseStudy, "id" | "createdAt">) {
  return addDoc(collection(db(), "case_studies"), { ...data, createdAt: serverTimestamp() });
}
export async function updateCaseStudy(id: string, data: Partial<AdminCaseStudy>) {
  return updateDoc(doc(db(), "case_studies", id), data);
}
export async function deleteCaseStudy(id: string) {
  return deleteDoc(doc(db(), "case_studies", id));
}

// ----- Inquiries -----
export async function createInquiry(data: Omit<Inquiry, "id" | "createdAt" | "status">) {
  return addDoc(collection(db(), "inquiries"), { ...data, status: "new", createdAt: serverTimestamp() });
}
export async function listInquiries(): Promise<Inquiry[]> {
  const snap = await getDocs(query(collection(db(), "inquiries"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Inquiry, "id">) }));
}
export async function updateInquiry(id: string, data: Partial<Inquiry>) {
  return updateDoc(doc(db(), "inquiries", id), data);
}
export async function deleteInquiry(id: string) {
  return deleteDoc(doc(db(), "inquiries", id));
}

// ----- Seed sample content from src/lib/site-data.ts -----
// Upserts by slug so it's safe to run more than once.
export async function seedSampleContent(): Promise<{
  blogCreated: number; blogSkipped: number;
  caseCreated: number; caseSkipped: number;
  serviceCreated: number; serviceSkipped: number;
}> {
  const { blogPosts, caseStudies, services } = await import("./site-data");
  let blogCreated = 0, blogSkipped = 0, caseCreated = 0, caseSkipped = 0, serviceCreated = 0, serviceSkipped = 0;

  for (const p of blogPosts) {
    const existing = await getDocs(query(collection(db(), "blog_posts"), where("slug", "==", p.slug), limit(1)));
    if (!existing.empty) { blogSkipped++; continue; }
    const body = p.content
      .map((b) => (b.heading ? `## ${b.heading}\n\n${b.body}` : b.body))
      .join("\n\n");
    await addDoc(collection(db(), "blog_posts"), {
      slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
      date: p.date, readTime: p.readTime, author: p.author,
      imageUrl: p.imageUrl ?? "",
      body,
      createdAt: serverTimestamp(),
    });
    blogCreated++;
  }

  for (const c of caseStudies) {
    const existing = await getDocs(query(collection(db(), "case_studies"), where("slug", "==", c.slug), limit(1)));
    if (!existing.empty) { caseSkipped++; continue; }
    await addDoc(collection(db(), "case_studies"), {
      slug: c.slug, client: c.client, industry: c.industry, title: c.title,
      summary: c.summary, challenge: c.challenge, solution: c.solution,
      results: c.results, services: c.services, duration: c.duration,
      createdAt: serverTimestamp(),
    });
    caseCreated++;
  }

  for (const s of services) {
    const existing = await getDocs(query(collection(db(), "services"), where("slug", "==", s.slug), limit(1)));
    if (!existing.empty) { serviceSkipped++; continue; }
    await addDoc(collection(db(), "services"), {
      slug: s.slug, title: s.title, short: s.short, hero: s.hero,
      overview: s.overview, imageUrl: s.imageUrl ?? "",
      outcomes: s.outcomes, features: s.features,
      process: s.process, faq: s.faq,
      createdAt: serverTimestamp(),
    });
    serviceCreated++;
  }

  return { blogCreated, blogSkipped, caseCreated, caseSkipped, serviceCreated, serviceSkipped };
}
