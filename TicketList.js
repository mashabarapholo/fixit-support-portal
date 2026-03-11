/**
 * TicketList.js
 * FixIt Support Portal — Ticket Management Module
 *
 * Feature branch: add-ticket-filter
 * Author: Mashaba Rapholo
 *
 * MERGE CONFLICT RESOLUTION LOG
 * ─────────────────────────────────────────────────────────────────────
 * Conflict detected on: 2025-06-18
 * File affected: TicketList.js (renderTickets function)
 * Conflict caused by: teammate updated the renderTickets() function on
 *   main to add a "priority" field while this branch added status
 *   filter logic to the same function simultaneously.
 *
 * Resolution strategy:
 *   Kept BOTH changes. Integrated the teammate's priority field into
 *   the ticket card template, and retained the filter logic from this
 *   branch. The final renderTickets() function now supports both
 *   status filtering AND displays the priority field.
 *
 * Resolved by: Mashaba Rapholo — git add TicketList.js && git commit
 * ─────────────────────────────────────────────────────────────────────
 */

// ── TICKET DATA STORE ──────────────────────────────────────────────────────
// Sample ticket data representing the current support queue.
// In production this would be fetched from an API.
const tickets = [
  { id: "TKT-001", title: "Laptop won't boot",          status: "Open",     priority: "High",   assignee: "Sipho Dlamini",   created: "2025-06-10" },
  { id: "TKT-002", title: "Cannot access shared drive", status: "Open",     priority: "Medium", assignee: "Naledi Moyo",     created: "2025-06-11" },
  { id: "TKT-003", title: "Outlook not syncing",        status: "Closed",   priority: "Low",    assignee: "Aryan Patel",     created: "2025-06-12" },
  { id: "TKT-004", title: "VPN connection dropped",     status: "Open",     priority: "High",   assignee: "Fatima Essop",    created: "2025-06-13" },
  { id: "TKT-005", title: "Printer offline on Floor 2", status: "Pending",  priority: "Medium", assignee: "James van Berg",  created: "2025-06-14" },
  { id: "TKT-006", title: "Password reset request",     status: "Closed",   priority: "Low",    assignee: "Thandi Mokoena",  created: "2025-06-15" },
  { id: "TKT-007", title: "New software install",       status: "Pending",  priority: "Medium", assignee: "Sipho Dlamini",   created: "2025-06-16" },
];

// ── FILTER LOGIC (core feature — add-ticket-filter branch) ─────────────────
/**
 * filterTickets()
 * Filters the tickets array by a given status string.
 * Passing "All" returns the complete unfiltered list.
 *
 * @param {string} status - "All" | "Open" | "Closed" | "Pending"
 * @returns {Array} Filtered array of ticket objects
 */
function filterTickets(status) {
  if (status === "All") return tickets;
  return tickets.filter(ticket => ticket.status === status);
}

// ── RENDER LOGIC ───────────────────────────────────────────────────────────
/**
 * renderTickets()
 * Builds and injects ticket card HTML into the DOM.
 * Supports status filtering and displays priority field.
 *
 * NOTE: Priority field added by teammate on main branch (commit a3f92b).
 *       Integrated here during merge conflict resolution (2025-06-18).
 *
 * @param {string} filterStatus - Status to filter by (default "All")
 */
function renderTickets(filterStatus = "All") {
  const container = document.getElementById("ticket-list");
  if (!container) return;

  const filtered = filterTickets(filterStatus);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty-msg">No tickets found for status: <strong>${filterStatus}</strong></p>`;
    return;
  }

  container.innerHTML = filtered.map(ticket => buildTicketCard(ticket)).join("");
  updateFilterCount(filtered.length);
}

/**
 * buildTicketCard()
 * Returns an HTML string for a single ticket card.
 * DRY helper — called by renderTickets() for each ticket.
 *
 * @param {Object} ticket - A ticket data object
 * @returns {string} HTML string
 */
function buildTicketCard(ticket) {
  const statusClass   = `status-${ticket.status.toLowerCase()}`;
  const priorityClass = `priority-${ticket.priority.toLowerCase()}`;

  return `
    <div class="ticket-card" data-id="${ticket.id}">
      <div class="ticket-header">
        <span class="ticket-id">${ticket.id}</span>
        <span class="badge ${statusClass}">${ticket.status}</span>
        <span class="badge ${priorityClass}">${ticket.priority}</span>
      </div>
      <h3 class="ticket-title">${ticket.title}</h3>
      <div class="ticket-meta">
        <span>👤 ${ticket.assignee}</span>
        <span>📅 ${ticket.created}</span>
      </div>
    </div>`;
}

// ── FILTER UI ──────────────────────────────────────────────────────────────
/**
 * initFilterButtons()
 * Attaches click listeners to all filter buttons.
 * Uses event delegation for performance — one listener on the parent.
 */
function initFilterButtons() {
  const filterBar = document.getElementById("filter-bar");
  if (!filterBar) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    // Deactivate all, activate clicked
    filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderTickets(btn.dataset.filter);
  });
}

/**
 * updateFilterCount()
 * Updates the visible count label after filtering.
 *
 * @param {number} count - Number of tickets currently displayed
 */
function updateFilterCount(count) {
  const label = document.getElementById("ticket-count");
  if (label) label.textContent = `${count} ticket${count !== 1 ? "s" : ""} shown`;
}

// ── INIT ────────────────────────────────────────────────────────────────────
// Entry point — runs when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  initFilterButtons();
  renderTickets("All");
});
// filterTickets() — filters by Open / Pending / Closed or returns all
// initFilterButtons() — attaches event listener to filter bar UI