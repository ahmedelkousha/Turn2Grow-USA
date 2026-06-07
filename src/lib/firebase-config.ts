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
  apiKey: "AIzaSyDlpx_NgIaensnMMPC6ZET-S0rQBg1RPFU",
  authDomain: "turn2grow-91cb0.firebaseapp.com",
  projectId: "turn2grow-91cb0",
  storageBucket: "turn2grow-91cb0.firebasestorage.app",
  messagingSenderId: "888191096924",
  appId: "1:888191096924:web:7016a60c2884f820976e99",
  measurementId: "G-8D0RRPJ2M2",
};

export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith("REPLACE_WITH_");
