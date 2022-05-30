import { deleteCyclistRequest } from "../fetch-facade.js";

export function renderCyclists(data) {
    data.then(cyclists => {
        const rows = createTableRows(cyclists);
        const tableElement = document.getElementById("get-cyclists-tbl");
        rows.forEach(row =>  tableElement.appendChild(row));
    })
}

function createTableRows(cyclists) {
    return cyclists.map(cyclistDto => createTableRow(cyclistDto))
}

function createTableRow(cyclist) {
    const rowTemplate = document.getElementById("cyclist-row-template")
    const clonedTemplate = rowTemplate.content.cloneNode(true);
    const tdNodes = clonedTemplate.querySelectorAll("td");
    tdNodes.forEach(td => updateNode(td, cyclist));
    return clonedTemplate;
}

function updateNode(td, candidate){
    if(td.id.includes('edit')) {
        td.addEventListener('click', function(){
            handleEditClick(candidate.id)
        })
    } else if(td.id.includes('delete')) {
        td.addEventListener('click',  function(){
            handleDeleteClick(candidate.id)
        })
    } else {
        td.textContent = candidate[td.id];
    }
}

function handleEditClick(candidateId) {
    console.log('edit',candidateId)
}

function handleDeleteClick(candidateId) {
    deleteCyclistRequest(candidateId)
        .then(() => console.log('delete', candidateId))
}