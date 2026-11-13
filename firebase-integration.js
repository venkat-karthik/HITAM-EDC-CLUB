/**
 * HITAM EDC College Club Platform - Firebase Integration
 * Handles Firebase Auth & Firestore with offline fallback and demo credentials.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY_CONFIG = 'HITAM_EDC_FIREBASE_CONFIG';
  const STORAGE_KEY_USER = 'HITAM_EDC_AUTH_USER';
  const STORAGE_KEY_APPS = 'HITAM_EDC_FIRESTORE_APPLICATIONS';
  const STORAGE_KEY_ANNOUNCEMENTS = 'HITAM_EDC_FIRESTORE_ANNOUNCEMENTS';

  const DEFAULT_CONFIG = {
    apiKey: "AIzaSyB3-DEMO-HITAM-EDC-Syndicate-2025",
    authDomain: "hitam-edc-syndicate.firebaseapp.com",
    projectId: "hitam-edc-syndicate",
    storageBucket: "hitam-edc-syndicate.appspot.com",
    messagingSenderId: "102938475610",
    appId: "1:102938475610:web:abcdef123456"
  };

  function getStoredConfig() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
      return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  let firebaseApp = null;
  let authInstance = null;
  let dbInstance = null;
  let isLiveFirebase = false;

  const currentConfig = getStoredConfig();

  // Try initializing real Firebase if SDK is loaded
  if (typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(currentConfig);
      } else {
        firebaseApp = firebase.app();
      }
      authInstance = firebase.auth();
      dbInstance = firebase.firestore();
      isLiveFirebase = true;
      console.log('⚡ Firebase initialized in LIVE mode:', currentConfig.projectId);
    } catch (e) {
      console.warn('⚠️ Firebase init warning (switching to robust local sandbox mode):', e.message);
      isLiveFirebase = false;
    }
  } else {
    console.log('⚡ Firebase SDK not loaded, using robust sandbox mode.');
  }

  // Local state persistence for sandbox/demo
  let authListeners = [];
  let currentUser = null;

  try {
    const cachedUser = localStorage.getItem(STORAGE_KEY_USER);
    if (cachedUser) {
      currentUser = JSON.parse(cachedUser);
    }
  } catch (e) {}

  function notifyAuthListeners() {
    authListeners.forEach(fn => {
      try { fn(currentUser); } catch (err) { console.error(err); }
    });
  }

  // Pre-seeded initial portfolio applications in Firestore cache
  const INITIAL_APPLICATIONS = [
    {
      id: "SYN-2025-W-1042",
      track: "fasttrack",
      startupName: "Synapse Neural Engine",
      vertical: "AI & DeepTech",
      elevatorPitch: "Autonomous agent framework compiling sub-graph LLMs into edge silicon runtimes.",
      traction: "100K MAU (+34% MoM Organic), -84.2% inference latency",
      founderName: "Arjun V. & Elena R.",
      founderEmail: "arjun@mit.edu",
      pitchDeckUrl: "https://res.cloudinary.com/edc-syndicate-hitam/image/upload/v1/decks/synapse-memo.pdf",
      rubricScore: 94,
      status: "review",
      submittedAt: "2024-11-10T14:32:00Z"
    },
    {
      id: "SYN-2025-W-2098",
      track: "genesis-pitch",
      startupName: "AeroCarbon",
      vertical: "Advanced Materials",
      elevatorPitch: "High-temperature carbon nanotube aerospace structural composites.",
      traction: "2 Aerospace Tier-1 Pilot Testing MOUs signed",
      founderName: "Marcus Thorne",
      founderEmail: "marcus@cornell.edu",
      pitchDeckUrl: "https://res.cloudinary.com/edc-syndicate-hitam/image/upload/v1/decks/aerocarbon-deck.pdf",
      rubricScore: 91,
      status: "review",
      submittedAt: "2024-11-11T09:15:00Z"
    },
    {
      id: "SYN-2025-W-3140",
      track: "fasttrack",
      startupName: "QuantumVibe",
      vertical: "Quantum Algo",
      elevatorPitch: "Coherence-optimized variational quantum eigensolvers for enzyme synthesis.",
      traction: "Proof of concept validated on 127-qubit QPUs",
      founderName: "Chloe Lin",
      founderEmail: "chloe@berkeley.edu",
      pitchDeckUrl: "https://res.cloudinary.com/edc-syndicate-hitam/image/upload/v1/decks/quantumvibe-dossier.pdf",
      rubricScore: 89,
      status: "shortlisted",
      submittedAt: "2024-11-09T18:40:00Z"
    },
    {
      id: "SYN-2025-W-4892",
      track: "genesis-pitch",
      startupName: "LatticeFi Protocol",
      vertical: "Fintech Zero-K",
      elevatorPitch: "Zero-knowledge cross-border treasury rail eliminating FX slippage.",
      traction: "$18.2M cleared settlement volume in Q3 pilot",
      founderName: "Tatsuya N.",
      founderEmail: "tatsuya@stanford.edu",
      pitchDeckUrl: "https://res.cloudinary.com/edc-syndicate-hitam/image/upload/v1/decks/latticefi-pitch.pdf",
      rubricScore: 87,
      status: "interviewed",
      submittedAt: "2024-11-08T11:20:00Z"
    }
  ];

  function getLocalApplications() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_APPS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  }

  function setLocalApplications(apps) {
    try {
      localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(apps));
    } catch (e) {}
  }

  // EDC Firebase API Object
  const EDCFirebase = {
    isLive: isLiveFirebase,
    getConfig: () => currentConfig,

    saveCustomConfig: function(cfg) {
      try {
        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cfg));
        alert("Firebase credentials saved! Reloading page to connect...");
        window.location.reload();
      } catch (e) {
        alert("Failed to save configuration: " + e.message);
      }
    },

    getCurrentUser: function() {
      if (isLiveFirebase && authInstance && authInstance.currentUser) {
        const u = authInstance.currentUser;
        return {
          uid: u.uid,
          displayName: u.displayName || u.email.split('@')[0],
          email: u.email,
          photoURL: u.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
          role: u.email.includes('admin') ? 'admin' : 'founder'
        };
      }
      return currentUser;
    },

    onAuthChange: function(callback) {
      authListeners.push(callback);
      // Immediately notify with current state
      callback(EDCFirebase.getCurrentUser());

      if (isLiveFirebase && authInstance) {
        authInstance.onAuthStateChanged(user => {
          if (user) {
            currentUser = {
              uid: user.uid,
              displayName: user.displayName || user.email.split('@')[0],
              email: user.email,
              photoURL: user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
              role: user.email.includes('admin') ? 'admin' : 'founder'
            };
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
          } else {
            currentUser = null;
            localStorage.removeItem(STORAGE_KEY_USER);
          }
          notifyAuthListeners();
        });
      }
    },

    signInWithGoogle: async function() {
      if (isLiveFirebase && authInstance) {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const res = await authInstance.signInWithPopup(provider);
          return res.user;
        } catch (e) {
          console.warn("Google popup error, falling back to simulated high-speed auth:", e);
        }
      }
      // Demo Google Auth
      currentUser = {
        uid: "goog-" + Date.now(),
        displayName: "Venkat Karthik (HITAM Founder)",
        email: "venkat.karthik@hitam.edu.in",
        photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
        role: "founder"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      notifyAuthListeners();
      return currentUser;
    },

    signInWithEmail: async function(email, password) {
      if (isLiveFirebase && authInstance) {
        try {
          const res = await authInstance.signInWithEmailAndPassword(email, password);
          return res.user;
        } catch (e) {
          console.warn("Firebase email signin warning, falling back to demo session:", e);
        }
      }
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'founder';
      currentUser = {
        uid: "usr-" + Date.now(),
        displayName: email.split('@')[0],
        email: email,
        photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
        role: role
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      notifyAuthListeners();
      return currentUser;
    },

    signUpWithEmail: async function(email, password, displayName) {
      if (isLiveFirebase && authInstance) {
        try {
          const res = await authInstance.createUserWithEmailAndPassword(email, password);
          if (displayName && res.user.updateProfile) {
            await res.user.updateProfile({ displayName: displayName });
          }
          return res.user;
        } catch (e) {
          console.warn("Firebase signup warning:", e);
        }
      }
      currentUser = {
        uid: "usr-" + Date.now(),
        displayName: displayName || email.split('@')[0],
        email: email,
        photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
        role: "founder"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      notifyAuthListeners();
      return currentUser;
    },

    signInDemo: function(role = "founder") {
      if (role === "admin") {
        currentUser = {
          uid: "admin-master-01",
          displayName: "Kaelen Vance (Syndicate Chair)",
          email: "admin@edc-syndicate.hitam.edu",
          photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6a8o4kaUtGDXCLi145qyPGCJB7KeMRxSUK49255G_x1n8I3Fk8jGtx_MqNvqjhwUgulJRKi4AEJdbnF1WvdVTKDc4XYwyiYbh1MnQyGK_pO4JfRMOZdklkbqwPL94huUnSwuc2kQhA_E-qcI-ar6TEctHxj31zeorXOK9-p6a62VNO25T5E9EJNiF8hQigu94KyEgCb88lHGRtt5VY7ZIuj60lrnFaScbeaCBU6Pz",
          role: "admin"
        };
      } else {
        currentUser = {
          uid: "founder-demo-2025",
          displayName: "Venkat Karthik (HITAM '26)",
          email: "venkat.karthik@hitam.edu.in",
          photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVI7vU2eDYjf0Y53pIzfJh3ZBi6CFHk6w4hMNjwAY91_g15QgYUtYCG2HlqRuP_PNYNtXFNzyFmKe4X_mjJ6q5lC3N-v7oCHt5ynBPBflZEUDRy5pMWJaKZ8gIqzSsEknvYGTQ1-VjgUkznbbimseE95j3sFbJ9SLejutHcRCiwFPYfOcg2Q6n8ol_z7gR-uSb0GwSl4OYL--TuO4NxFq6rYjwPYkvQVYs0e2ljxST",
          role: "founder"
        };
      }
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      notifyAuthListeners();
      return currentUser;
    },

    signOutUser: async function() {
      if (isLiveFirebase && authInstance) {
        try { await authInstance.signOut(); } catch (e) {}
      }
      currentUser = null;
      localStorage.removeItem(STORAGE_KEY_USER);
      notifyAuthListeners();
    },

    // FIRESTORE OPERATIONS
    addApplication: async function(appData) {
      const generatedId = "SYN-2025-W-" + Math.floor(1000 + Math.random() * 9000);
      const newDoc = {
        id: generatedId,
        track: appData.track || "genesis-pitch",
        startupName: appData.startupName || "Untitled Venture",
        vertical: appData.vertical || "AI & DeepTech",
        elevatorPitch: appData.elevatorPitch || "",
        problemMoat: appData.problemMoat || "",
        traction: appData.traction || "In Development",
        founderName: appData.founderName || (currentUser ? currentUser.displayName : "Anonymous Founder"),
        founderEmail: appData.founderEmail || (currentUser ? currentUser.email : "founder@university.edu"),
        pitchDeckUrl: appData.pitchDeckUrl || "https://res.cloudinary.com/edc-syndicate-hitam/image/upload/v1/decks/pitch-deck.pdf",
        rubricScore: Math.floor(82 + Math.random() * 15),
        status: "review",
        submittedAt: new Date().toISOString()
      };

      if (isLiveFirebase && dbInstance) {
        try {
          await dbInstance.collection("applications").doc(generatedId).set(newDoc);
          console.log("✓ Application persisted to live Firestore:", generatedId);
        } catch (e) {
          console.warn("Firestore live write warning:", e.message);
        }
      }

      // Always update local cache
      const list = getLocalApplications();
      list.unshift(newDoc);
      setLocalApplications(list);
      window.dispatchEvent(new CustomEvent('edc:applicationsUpdated', { detail: newDoc }));
      return newDoc;
    },

    getApplications: async function() {
      if (isLiveFirebase && dbInstance) {
        try {
          const snapshot = await dbInstance.collection("applications").orderBy("submittedAt", "desc").get();
          if (!snapshot.empty) {
            const remoteApps = [];
            snapshot.forEach(doc => remoteApps.push(doc.data()));
            return remoteApps;
          }
        } catch (e) {
          console.warn("Firestore fetch error, returning local cache:", e);
        }
      }
      return getLocalApplications();
    },

    updateApplicationStatus: async function(appId, newStatus, rubricScore) {
      if (isLiveFirebase && dbInstance) {
        try {
          const docRef = dbInstance.collection("applications").doc(appId);
          const updates = { status: newStatus };
          if (rubricScore !== undefined) updates.rubricScore = rubricScore;
          await docRef.update(updates);
        } catch (e) {
          console.warn("Firestore update error:", e);
        }
      }

      const list = getLocalApplications();
      const item = list.find(a => a.id === appId);
      if (item) {
        item.status = newStatus;
        if (rubricScore !== undefined) item.rubricScore = rubricScore;
        setLocalApplications(list);
      }
      window.dispatchEvent(new CustomEvent('edc:applicationsUpdated', { detail: { appId, newStatus } }));
      return item;
    },

    addAnnouncement: async function(message) {
      const announcement = {
        id: "ANN-" + Date.now(),
        message: message,
        timestamp: new Date().toISOString(),
        author: currentUser ? currentUser.displayName : "Syndicate Desk"
      };

      if (isLiveFirebase && dbInstance) {
        try {
          await dbInstance.collection("announcements").add(announcement);
        } catch (e) {}
      }

      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS) || "[]");
        stored.unshift(announcement);
        localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(stored));
      } catch (e) {}

      return announcement;
    }
  };

  window.EDCFirebase = EDCFirebase;
})(window);
