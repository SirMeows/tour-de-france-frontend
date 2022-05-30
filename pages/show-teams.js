export function renderTeams(data) {
    data.then(teams => {
            renderRows(teams)
        })
}

function renderRows(teams) {
    const rows = createTableRows(teams);
    document.getElementById("get-all-teams-tbl").innerHTML = rows;
}
//TODO: Add navigo link to cyclists belonging to this team
function createTableRows(teams) {
    const rows = teams.map(team =>
    `
    <tr>
        <td> ${team.id} </td>
        <td> ${team.name} </td>
    </tr>
    `).join("\n")
    return rows;
}
