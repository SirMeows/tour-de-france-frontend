import { handleDeleteClick } from "./manage-cyclist.js"

export function renderCyclists(data) {
    data.then(cyclists => {
        const rows = createTableRows(cyclists);
        const tableElement = document.getElementById("get-cyclists-tbl");
        rows.forEach(row =>  tableElement.appendChild(row));
    })
}

function createTableRows(cyclists) {
    return sortAlphabetically(cyclists).map(cyclistDto => createTableRow(cyclistDto))
}

function createTableRow(cyclist) {
    const rowTemplate = document.getElementById("cyclist-row-template")
    const clonedTemplate = rowTemplate.content.cloneNode(true);
    const tdNodes = clonedTemplate.querySelectorAll("td");
    tdNodes.forEach(td => updateNode(td, cyclist));
    return clonedTemplate;
}

function updateNode(td, cyclist){
    if(td.id.includes('edit')) {
        let aTag = td.firstElementChild
        aTag.setAttribute("href", `#/edit-cyclist/${cyclist.id}`)
    } else if(td.id.includes('delete')) {
        td.addEventListener('click',  function() {
            handleDeleteClick(cyclist.id)
        })
    } else {
        td.textContent = cyclist[td.id];
    }
}

export function sortAlphabetically(cyclists) {
    return cyclists.sort((a,b) => a.lastName.localeCompare(b.lastName))
}