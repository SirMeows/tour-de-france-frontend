export function renderCyclists(data) {
    data.then(cyclists => {
        const rows = createTableRows(cyclists);
        const tableElement = document.getElementById("get-cyclists-tbl");
        tableElement.innerHTML = rows
    })
}

function createTableRows(cyclists) {
    const rows = cyclists.map(cyclistDto =>
        `
        <tr>
            <td> ${cyclistDto.firstName}</td>
            <td> ${cyclistDto.lastName}</td>
            <td> ${cyclistDto.teamName}</td> 
        </tr>       
        `).join("\n")
    return rows;
}