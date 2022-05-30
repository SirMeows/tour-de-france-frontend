export function renderTeams(data) {
    data.then(teams => {
            renderRows(teams)
        })
}

function renderRows(teams) {
    const rows = createTableRows(teams);
    document.getElementById("get-all-teams-tbl").innerHTML = rows;
}

function createTableRows(teams) {
    const rows = teams.map(team =>
    `
    <tr>
        <td> ${team.id} </td>
        <td> <a className="nav-link active" href="#/show-cyclists-by-team/${team.id}" data-navigo="">${team.name}</a></td>
    </tr>
    `).join("\n")
    return rows;
}
