export function renderCyclists(data) {
    data.then(cyclists => {
        const rows = createTableRows(cyclists);
        const tableElement = document.getElementById("get-cyclists-tbl");
        tableElement.innerHTML = rows
    })
}

function createTableRows(cyclists) {
    const rows = cyclists.map(cyclistDto =>
        //TODO: Get team name by id
        `
        <tr>
            <td> ${cyclistDto.firstName}</td>
            <td> ${cyclistDto.lastName}</td>
            <td> </td>
            
            
        </tr>       
        `).join("\n")
    return rows;
}