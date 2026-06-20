// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================
// In Firebase console, make sure these are enabled:
//   - Authentication → Sign-in method → Email/Password
//   - Firestore Database → Create database (production mode)
//   - Storage → Get started (for blog cover image uploads)
//
// Create an admin user under Authentication → Users (Add user).
//
// Firestore security rules (Rules tab):
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /inquiries/{doc} {
//          allow create: if true;
//          allow read, update, delete: if request.auth != null;
//        }
//        match /{collection}/{doc} {
//          allow read: if collection in ['blog_posts', 'case_studies', 'services'];
//          allow write: if request.auth != null;
//        }
//      }
//    }
//
// Storage security rules (Storage → Rules):
//
//    rules_version = '2';
//    service firebase.storage {
//      match /b/{bucket}/o {
//        match /blog/{allPaths=**} {
//          allow read: if true;
//          allow write: if request.auth != null;
//        }
//      }
//    }
//
// These config values are PUBLIC (Firebase relies on security rules, not
// config secrecy). It is safe to commit them.
// ============================================================================

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured =
  !!firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("REPLACE_WITH_");
