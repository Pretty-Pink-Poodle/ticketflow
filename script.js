const tickets = [

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



const container =
document.getElementById("ticketContainer");



function displayTickets(ticketList = tickets){


    container.innerHTML = "";


ticketList.forEach(ticket => {


        container.innerHTML += `

<div class="ticket-card">

    <div class="ticket-header">

        <h3>
            #${ticket.id}
        </h3>

<select class="status-select ${ticket.status.toLowerCase().replace(" ", "-")}" data-id="${ticket.id}">

    <option value="Open" ${ticket.status === "Open" ? "selected" : ""}>
        Open
    </option>

    <option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""}>
        In Progress
    </option>

    <option value="Resolved" ${ticket.status === "Resolved" ? "selected" : ""}>
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
        ${ticket.assigned}
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



function updateStats(){

    document.getElementById("totalTickets").textContent =
    tickets.length;


    document.getElementById("openTickets").textContent =
    tickets.filter(ticket => ticket.status === "Open").length;


    document.getElementById("resolvedTickets").textContent =
    tickets.filter(ticket => ticket.status === "Resolved").length;

}



displayTickets();

const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", function () {

    const searchTerm = searchInput.value.toLowerCase();


    const filteredTickets = tickets.filter(ticket => {

        return (

            ticket.id.toString().includes(searchTerm) ||

            ticket.user.toLowerCase().includes(searchTerm) ||

            ticket.department.toLowerCase().includes(searchTerm) ||

            ticket.issue.toLowerCase().includes(searchTerm) ||

            ticket.category.toLowerCase().includes(searchTerm) ||

            ticket.priority.toLowerCase().includes(searchTerm) ||

            ticket.status.toLowerCase().includes(searchTerm)

        );

    });


    displayTickets(filteredTickets);

});

const newTicketButton =
document.getElementById("newTicketButton");


const ticketForm =
document.getElementById("ticketForm");


newTicketButton.addEventListener("click", function(){

    ticketForm.classList.toggle("hidden");

});

const submitTicket =
document.getElementById("submitTicket");


const newUser =
document.getElementById("newUser");


const newDepartment =
document.getElementById("newDepartment");


const newIssue =
document.getElementById("newIssue");


const newPriority =
document.getElementById("newPriority");



submitTicket.addEventListener("click", function(){


    const newTicket = {

        id: tickets[tickets.length - 1].id + 1,

        user: newUser.value,

        department: newDepartment.value,

        category: "General",

        issue: newIssue.value,

        priority: newPriority.value,

        status: "Open",

        assigned: "Unassigned",

        created: "Oct 1, 2026"

    };


    tickets.push(newTicket);


    displayTickets();

    ticketForm.classList.add("hidden");

    newUser.value = "";

    newDepartment.value = "";

    newIssue.value = "";


});

document.addEventListener("change", function(event){

    if(event.target.classList.contains("status-select")){


        const ticketID =
        Number(event.target.dataset.id);



        const ticket =
        tickets.find(ticket => ticket.id === ticketID);



        ticket.status =
        event.target.value;



        displayTickets();


    }

});