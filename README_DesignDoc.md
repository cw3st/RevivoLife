# RevivoLife Design Document

**Project Name**: RevivoLife  
**Date**: April 2025  
**Author**: cecdev  
**Reference**: [Software Requirements Specification (SRS)]  
**Methodology**: Agile  
**Tech Stack**: MongoDB, Node.js, Express.js, Next.js, TypeScript, React

---

## 1. Overview

RevivoLife is a web application designed to connect wellness-focused businesses with consumers. This document provides the high-level technical and visual design aligned with the SRS and wireframes created in Figma.

---

## 2. Design Goals

- Deliver a clean, wellness-themed user interface
- Ensure responsive and secure user experience
- Create scalable components and backend services
- Follow modern UI/UX best practices and accessibility standards

---

## 3. User Interface Design

### Wireframes
All UI elements and page layouts follow the wireframes designed in Figma (not linked here).

### Key Screens
- **Sign Up Page**
- **Sign In Page**
- **OAuth Login Section** (Google, Outlook, Apple)
- **Dashboard (Future Phase)**
- **Business Onboarding**

### Design System
- **Typography**: Sans-serif fonts with wellness tones
- **Colors**: Soft greens, whites, and earth tones
- **Components**: Reusable forms, buttons, inputs
- **Accessibility**: WCAG 2.1 compliant color contrast and semantic HTML

---

## 4. Architecture Design

### Frontend (Next.js + React + TypeScript)
- Uses App Router with dynamic routing
- Modular folder structure: `components/`, `pages/`, `hooks/`
- API interactions via Axios or Fetch
- State management using Context API or Zustand

### Backend (Node.js + Express.js)
- RESTful API structure
- Auth endpoints: `/signup`, `/signin`, `/oauth`
- Middleware for validation, rate limiting, and error handling

### Database (MongoDB Atlas)
- Collections:
  - `users`
  - `sessions`
  - `authLogs`

### Auth Flow
- JWT created on login
- Stored in HttpOnly cookie or localStorage
- OAuth tokens handled via NextAuth.js or similar

---

## 5. Component Breakdown

| Component      | Purpose                            | Technology             |
|----------------|------------------------------------|------------------------|
| `AuthForm`     | Handles sign in and sign up forms  | React, Tailwind, Yup   |
| `OAuthButtons` | OAuth login (Google, Apple, etc.)  | OAuth 2.0, NextAuth.js |
| `TokenService` | JWT encode/decode logic            | JWT, Express middleware|
| `APIClient`    | API call abstraction               | Axios/Fetch            |

---

## 6. Security Design

- Passwords hashed using Bcrypt
- JWT used for secure, stateless authentication
- OAuth secrets stored in environment variables
- Rate limiting on sensitive endpoints
- Sanitization and validation of all inputs
- HTTPS enforced for all network traffic

---

## 7. Performance Considerations

- Server-side rendering (SSR) for faster load times
- Code splitting for performance
- Lazy loading non-critical components (e.g. OAuth buttons)
- Indexed database queries for fast lookups

---

## 8. Deployment Strategy

| Layer      | Platform        |
|------------|-----------------|
| Frontend   | Vercel          |
| Backend    | Render or Heroku|
| Database   | MongoDB Atlas   |

CI/CD pipelines will be set up for seamless development and deployment.

---

## 9. Next Steps

- Link Figma wireframes to this document
- Finalize OAuth provider credentials
- Start implementing auth flow and UI pages
- Setup environment variables and deployment configs

---

**End of Design Document**
