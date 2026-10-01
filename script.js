const searchInput = document.getElementById("searchInput");

const newTicketButton = document.getElementById("newTicketButton");
const ticketForm = document.getElementById("ticketForm");
const submitTicket = document.getElementById("submitTicket");

const newUser = document.getElementById("newUser");
const newDepartment = document.getElementById("newDepartment");
const newIssue = document.getElementById("newIssue");
const newPriority = document.getElementById("newPriority");

const container = document.getElementById("ticketContainer");

const filterButtons = document.querySelectorAll(".filter-button");
const priorityButtons = document.querySelectorAll(".priority-filter");

let currentFilter = "All";
let currentPriority = "All";


const starterTickets = [
    {
        id: 1042,
        user: "Sarah Johnson",
        department: "Finance",
        category: "Hardware",
        issue: "Laptop will not connect to Wi-Fi",
        priority: "High",
        status: "Open",
        assigned: "Lauren",
        created: "Sept 30, 2026"
    },

    {
        id: 1043,
        user: "Mike Carter",
        department: "Human Resources",
        category: "Account Access",
        issue: "Password reset request",
        priority: "Low",
        status: "Resolved",
        assigned: "David",
        created: "Sept 29, 2026"
    },

    {
        id: 1044,
        user: "Lauren Surles",
        department: "Marketing",
        category: "Software",
        issue: "Adobe Creative Cloud installation",
        priority: "Medium",
        status: "Open",
        assigned: "Lauren",
        created: "Sept 30, 2026"
    }
];


const savedTickets = localStorage.getItem("tickets");

let tickets;

if (savedTickets) {
    tickets = JSON.parse(savedTickets);
} else {
    tickets = [...starterTickets];
    saveTickets();
}


function saveTickets() {
    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );
}


function displayTickets(ticketList = tickets) {

    container.innerHTML = "";

    ticketList.forEach(function (ticket) {

        const statusClass =
            ticket.status
                .toLowerCase()
                .replace(" ", "-");

        container.innerHTML += `

            <div class="ticket-card">

                <div class="ticket-header">

                    <h3>
                        #${ticket.id}
                    </h3>

                    <select
                        class="status-select ${statusClass}"
                        data-id="${ticket.id}"
                    >

                        <option
                            value="Open"
                            ${ticket.status === "Open" ? "selected" : ""}
                        >
                            Open
                        </option>

                        <option
                            value="In Progress"
                            ${ticket.status === "In Progress" ? "selected" : ""}
                        >
                            In Progress
                        </option>

                        <option
                            value="Resolved"
                            ${ticket.status === "Resolved" ? "selected" : ""}
                        >
                            Resolved
                        </option>

                    </select>

                </div>


                <h2>
                    ${ticket.issue}
                </h2>


                <p class="ticket-user">
                    ${ticket.user} • ${ticket.department}
                </p>


                <div class="ticket-details">

                    <p>
                        <strong>Category:</strong>
                        ${ticket.category}
                    </p>

                    <p>
                        <strong>Assigned:</strong>

                        <select
                            class="assigned-select"
                            data-id="${ticket.id}"
                        >
                            <option
                                value="Unassigned"
                                ${ticket.assigned === "Unassigned" ? "selected" : ""}
                            >
                                Unassigned
                            </option>

                            <option
                                value="Lauren"
                                ${ticket.assigned === "Lauren" ? "selected" : ""}
                            >
                                Lauren
                            </option>

                            <option
                                value="David"
                                ${ticket.assigned === "David" ? "selected" : ""}
                            >
                                David
                            </option>

                            <option
                                value="Maya"
                                ${ticket.assigned === "Maya" ? "selected" : ""}
                            >
                                Maya
                            </option>
                        </select>
                    </p>

                    <p>
                        <strong>Created:</strong>
                        ${ticket.created}
                    </p>

                </div>


                <span class="priority ${ticket.priority.toLowerCase()}">
                    ${ticket.priority}
                </span>

            </div>

        `;
    });

    updateStats();
}


function updateStats() {

    document.getElementById("totalTickets").textContent =
        tickets.length;

    document.getElementById("openTickets").textContent =
        tickets.filter(function (ticket) {
            return ticket.status === "Open";
        }).length;

    document.getElementById("resolvedTickets").textContent =
        tickets.filter(function (ticket) {
            return ticket.status === "Resolved";
        }).length;
}


function applyFilters() {

    const searchTerm =
        searchInput.value.toLowerCase();

    const filteredTickets =
        tickets.filter(function (ticket) {

            const matchesSearch =
                ticket.id.toString().includes(searchTerm) ||
                ticket.user.toLowerCase().includes(searchTerm) ||
                ticket.department.toLowerCase().includes(searchTerm) ||
                ticket.issue.toLowerCase().includes(searchTerm) ||
                ticket.category.toLowerCase().includes(searchTerm) ||
                ticket.priority.toLowerCase().includes(searchTerm) ||
                ticket.status.toLowerCase().includes(searchTerm) ||
                ticket.assigned.toLowerCase().includes(searchTerm);


            const matchesStatus =
                currentFilter === "All" ||
                ticket.status === currentFilter;


            const matchesPriority =
                currentPriority === "All" ||
                ticket.priority === currentPriority;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );
        });


    displayTickets(filteredTickets);
}


searchInput.addEventListener("input", function () {
    applyFilters();
});


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter =
            button.dataset.status;


        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });


        button.classList.add("active");

        applyFilters();
    });
});


priorityButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentPriority =
            button.dataset.priority;


        priorityButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });


        button.classList.add("active");

        applyFilters();
    });
});


newTicketButton.addEventListener(
    "click",
    function () {

        ticketForm.classList.toggle("hidden");
    }
);


submitTicket.addEventListener(
    "click",
    function () {

        if (
            newUser.value.trim() === "" ||
            newDepartment.value.trim() === "" ||
            newIssue.value.trim() === ""
        ) {

            alert("Please complete all ticket fields.");

            return;
        }


        const highestID =
            tickets.length > 0
                ? Math.max(
                    ...tickets.map(function (ticket) {
                        return ticket.id;
                    })
                )
                : 1041;


        const today =
            new Date().toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }
            );


        const newTicket = {

            id: highestID + 1,

            user:
                newUser.value.trim(),

            department:
                newDepartment.value.trim(),

            category:
                "General",

            issue:
                newIssue.value.trim(),

            priority:
                newPriority.value,

            status:
                "Open",

            assigned:
                "Unassigned",

            created:
                today
        };


        tickets.push(newTicket);

        saveTickets();

        applyFilters();


        newUser.value = "";
        newDepartment.value = "";
        newIssue.value = "";
        newPriority.value = "High";

        ticketForm.classList.add("hidden");
    }
);


document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.classList.contains(
                "status-select"
            )
        ) {

            const ticketID =
                Number(
                    event.target.dataset.id
                );


            const ticket =
                tickets.find(function (ticket) {
                    return ticket.id === ticketID;
                });


            if (ticket) {

                ticket.status =
                    event.target.value;

                saveTickets();

                applyFilters();
            }
        }


        if (
            event.target.classList.contains(
                "assigned-select"
            )
        ) {

            const ticketID =
                Number(
                    event.target.dataset.id
                );


            const ticket =
                tickets.find(function (ticket) {
                    return ticket.id === ticketID;
                });


            if (ticket) {

                ticket.assigned =
                    event.target.value;

                saveTickets();

                applyFilters();
            }
        }
    }
);


applyFilters();