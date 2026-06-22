# Gemify — Agile Delivery Log

A simulated cross-functional team is incrementally hardening and extending the
Gemify gemstone marketplace. Each sprint runs the same ceremony:

1. **Product Owner (PO)** proposes the sprint goal — a new feature or a
   fine-tune/streamline — always acting in the best interest of the product.
2. **Project Manager (PM)** breaks the goal into a plan and acceptance criteria.
3. **Development Team (DEV)** implements.
4. **QA Engineer (QA)** verifies against acceptance criteria; defects bounce
   back to DEV until clean.
5. **PM** signs off and reviews with the **PO**, who then opens the next sprint.

## Team
| Role | Responsibility |
| ---- | -------------- |
| Product Owner | Owns the vision and backlog priority; maximises product value |
| Project Manager | Plans sprints, tracks progress, removes blockers, sign-off |
| Development Team | Designs and builds the increment |
| QA Engineer | Validates quality, finds defects, gatekeeps the Definition of Done |

## Definition of Done
- Code follows existing conventions (`{ message, data }` envelopes, DTO
  validation, role guards, TypeORM modules).
- Feature is wired into `AppModule` and reachable.
- QA review passes with no open defects.
- Change is committed with a descriptive message.

## Sprint Index
| # | Type | Goal | Status |
| - | ---- | ---- | ------ |
| 1 | Feature | Complete the Gems catalog (full CRUD, search, moderation) | ✅ Done |
| 2 | Feature | Implement the Wishlist module end-to-end | ✅ Done |
| 3 | Feature | Implement Reviews with live rating aggregation | ✅ Done |
| 4 | Feature | Implement Orders / checkout with stock control | ✅ Done |
| 5 | Quality | Testing foundation (unit tests + CI gate) | ✅ Done |
| 6 | Fine-tune | Resilience & security hardening | ✅ Done |
| 7 | Feature | Storefront gem comparison & recently-viewed | ✅ Done |
| 8 | Fine-tune | Standardise responses & streamline | ✅ Done |
| 9 | Feature | Admin moderation workflow UI | ✅ Done |
| 10 | Fine-tune | Docs, seed data & retrospective | ✅ Done |
