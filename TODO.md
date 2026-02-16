# 🚀 RaceTracker Project Roadmap

## 🎨 Frontend (UI/UX)
- [ ] **Input Masking:** Implement input masking for Date and Time fields in Modals to improve user experience.
- [ ] **UX Polish:** Update input placeholders to be more intuitive and guide the user on the expected format.
- [ ] **Schedule Navigation:** Implement logic to navigate between weeks (Previous/Next) in the Schedule view. Currently, it only shows the current week, making past workouts inaccessible.
- [ ] **Dashboard Visualization:**
    - [ ] Replace static/fake data with real API integration.
    - [ ] Implement charts 

## ⚛️ Frontend (Architecture & Components)
- [ ] **Component Extraction:** Extract card rendering logic into a dedicated `RaceList` component to reduce the complexity of `Race.tsx`.
- [ ] **CRUD Actions:** Add "Edit" and "Delete" functionality to `RaceCard` and `WorkoutCard`.

## ⚙️ Backend & Database
- [ x ] **Prisma Singleton:** Implement the Singleton Pattern for Prisma Client to prevent multiple instances during hot-reloading and manage database connections efficiently.
- [ ] **Database Migration:** Migrate from SQLite to PostgreSQL (running on Docker) to prepare for production environment.
