# <a href="https://invoice-app-rt.vercel.app"  target="_blank">Invoice App - React TypeScript / Supabase backend</a>

### <a href="https://invoice-app-rt.vercel.app"  target="_blank">→ See the app: https://invoice-app-rt.vercel.app</a>

<p>
   This project is for portfolio showcase.

### Source of the UI Design (Figma)

The project UI Design represents a GURU challenge (dificulty level 5/5) on Frontend Mentor, where the <a href="https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl" target="_blank">Figma</a> UI Design project can be <a href="https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl" target="_blank">downloaded</a> under premium subscription. The entire app has been implemented from 0, without following any tutorial, demonstrating the implementation of a UI Design to a fully functional React App.

</p>

## Tech Stack

React • TypeScript • <a href="https://reactrouter.com/en/main" target="_blank">React Router</a> • <a href="https://react-hook-form.com/" target="_blank">React Hook Form </a> • <a href="https://zod.dev/" target="_blank"> Zod </a> • <a href="https://fakerjs.dev/" target="_blank">Faker
</a> • <a href="https://tailwindcss.com/" target="_blank">TailwindCSS
</a> • <a href="https://headlessui.com/" target="_blank">Headless UI
</a> • <a href="https://supabase.com/" target="_blank">Supabase</a> • <a href="https://vercel.com/" target="_blank">Vercel</a> •
<a href="https://vitejs.dev/" target="_blank">Vite</a>

## Features

- [x] Create / Update / Delete Invoices
  - [x] Saving a new invoice as Draft or Pending
  - [x] Change existing invoice status: draft / pending / paid
  - [x] Edit all the fields of an existing invoice
- [x] Filter invoices list by status
- [x] Slide-Over components renders with new route (/new or /invoice/:id/edit)
- [x] Modals and Slide-Over designed from 0 (no library used)
  - [x] Headless UI has been used just to accelare the development of popovers
- [x] Supabase as backend as a service
  - [x] Authentification (app is designed for portfolio showcase, therefor only auth as a demo user is allowed - the demo user is generated for each login)
  - [x] All the data is stored and synced with Supabase Database (PostgreSQL)
- [x] Lazy load and UI loading state with skeletons
- [x] React Hook Form for form management
- [x] Zod is used both for validating data in Forms and sending/receiving data from Supabase. It is used as unique source of truth
- [x] Random user profile image
- [x] Dark mode
