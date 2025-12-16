let allTasks = []

if (localStorage.getItem("tasks")) {
    allTasks = JSON.parse(localStorage.getItem("tasks"))
}

function panelOperations() {
    const allElems = document.querySelectorAll(".elem")
    const allTaskSections = document.querySelectorAll(".taskSection")
    const closePanelBtn = document.querySelectorAll(".closePanel")

    allElems.forEach((elem) => {
        elem.addEventListener("click", () => {
            allTaskSections[elem.id].style.display = "flex"
        })
    })

    closePanelBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            allTaskSections[btn.id].style.display = "none"
        })
    })
}

panelOperations()

function addTask() {
    const taskTitle = document.querySelector("#taskTitle")
    const taskDescription = document.querySelector("#taskDescription")
    const impBtn = document.querySelector("#impBtn")
    const addTaskBtn = document.querySelector("#addTaskBtn")

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const taskTitleValue = taskTitle.value
        const taskDescriptionValue = taskDescription.value
        const impBtnValue = impBtn.checked

        const task = {
            title: taskTitleValue,
            description: taskDescriptionValue,
            isImportant: impBtnValue,
        }

        allTasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(allTasks))

        taskTitle.value = ""
        taskDescription.value = ""
        impBtn.checked = false

        renderTask()
    })
}

function renderTask() {
    const right = document.querySelector(".right")
    let sum = ``

    allTasks.forEach((task, index) => {

        sum += `                    <div class="task">
                            <div class="taskInfo">
                                <h3>${task.title} <span class=${task.isImportant}>Important</span></h3>
                                <p>${task.description}</p>
                            </div>
                            <div class="taskActions">
                                <button
                                id=${index} class="completeBtn">Mark as completed</button>
                            </div>
                        </div>`
    })
    right.innerHTML = sum

    const completeBtn = document.querySelectorAll(".completeBtn")
    completeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            allTasks.splice(btn.id, 1)
            localStorage.setItem("tasks", JSON.stringify(allTasks))

            renderTask()
        })
    })
}

addTask()

renderTask()