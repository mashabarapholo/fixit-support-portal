# 🛠 FixIt Support Portal

A web-based internal IT ticketing system. Allows staff to view, filter, and manage support tickets by status.

---

## 🚀 Getting Started

```bash
git clone https://github.com/[your-username]/fixit-support-portal.git
cd fixit-support-portal
# Open index.html in your browser — no build step required
```

---

## 📁 Project Structure

```
fixit-support-portal/
├── index.html       # Main UI
├── TicketList.js    # Ticket data, filter logic, and render module
├── styles.css       # All styling
└── README.md        # You are here
```

---

## 🌿 Active Features (Branch Log)

| Branch | Feature | Status |
|---|---|---|
| `main` | Base portal with ticket list display | ✅ Merged |
| `add-ticket-filter` | Filter tickets by status (Open / Pending / Closed) | ✅ Merged via PR #3 |

---

## 🔀 Branching Strategy

This project follows a **feature branch workflow**:

1. All new features are developed on named branches (`feature/` or descriptive names like `add-ticket-filter`)
2. Branches are pushed to GitHub and reviewed via Pull Request before merging to `main`
3. Merges use the **Squash and Merge** strategy to keep the commit history clean

---

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
feat:  new feature
fix:   bug fix
docs:  documentation only
style: formatting, no logic change
refactor: code restructure, no feature change
```

**Examples from this project:**
```
feat: add initial TicketList.js module with ticket data
feat: implement filterTickets() function for status filtering
feat: integrate filter UI buttons with renderTickets()
fix: resolve merge conflict in renderTickets() — keep both priority field and filter logic
```

---

## ⚠️ Merge Conflict Log

| Date | File | Conflict | Resolution |
|---|---|---|---|
| 2025-06-18 | `TicketList.js` | Teammate added `priority` field to `renderTickets()` on `main` while this branch added filter logic to the same function | Kept both changes — integrated priority display + filter logic into unified `renderTickets()` |

---

## 👤 Contributors

- **Mashaba Rapholo** — `add-ticket-filter` feature branch
- **Vincent Nchabeleng** — Priority field addition on `main`
