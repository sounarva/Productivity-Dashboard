// Pannel Operations
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

// Todo List
function todoList() {
    let allTasks = []

    if (localStorage.getItem("tasks")) {
        allTasks = JSON.parse(localStorage.getItem("tasks"))
    }

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
}

todoList()

// Daily Planner

function getToday() { // -- get today's date
    return new Date().toDateString();
}

function setDailyPlanner() { // -- set daily planner
    let today = document.querySelector("#currentDate").innerHTML


    setInterval(() => {
        let date = getToday()
        if (today !== date) {
            today = date
            document.querySelector("#currentDate").innerHTML = today
            localStorage.setItem("plans", JSON.stringify({}))
        }
    }, 1000)

    let times = Array.from({ length: 18 }, (_, id) => {
        return `${id + 6}:00 - ${id + 7}:00`
    })

    let dailyPlanner = document.querySelector(".daily-planner-panel")
    let wholeDaySum = ''
    let plans = JSON.parse(localStorage.getItem("plans")) || {}

    times.forEach((time, idx) => {
        wholeDaySum += `<div class="plan">
                    <h4>${time}</h4>
                    <input id=${idx} type="text" placeholder="..." value="${plans[idx] || ""}">
                </div>`
    })

    dailyPlanner.innerHTML = wholeDaySum

    let planInputs = document.querySelectorAll(".plan input")
    planInputs.forEach((elem) => {
        elem.addEventListener('input', (e) => {
            plans[elem.id] = elem.value
            localStorage.setItem("plans", JSON.stringify(plans))
        })
    })
}

setDailyPlanner()

// Motivational Quote
function motivationalQuote() {
    const motivationalQuote = document.querySelector(".motivation-2 h3")
    const motivationalAuthor = document.querySelector(".motivation-3 h4")

    async function fetchQuote() {
        let quote = await fetch("https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom", {
            headers: {
                "X-Api-Key": "zpxwiItNuZzJdDu6Of9RrA==xGbxLPUCuaJSbB1F"
            }
        })
        quote = await quote.json()
        motivationalQuote.innerHTML = quote[0].quote
        motivationalAuthor.innerHTML = "-&nbsp;&nbsp;&nbsp;" + quote[0].author
    }

    fetchQuote()
}

motivationalQuote()


// Pomodoro Timer
function pomodoroTimer() {
    let totalSeconds = 25 * 60
    let timerInterval = null
    let isWorkSession = true
    const time = document.querySelector(".pomodoro-panel h3")
    const work = document.querySelector('.work');
    const breakText = document.querySelector('.break');
    const startBtn = document.querySelector("#startBtn")
    const pauseBtn = document.querySelector("#pauseBtn")
    const resetBtn = document.querySelector("#resetBtn")

    function toBreak() {
        work.classList.remove('show');
        work.classList.add('hide');

        breakText.classList.remove('hide');
        breakText.classList.add('show');
    }

    function toWork() {
        breakText.classList.remove('show');
        breakText.classList.add('hide');

        work.classList.remove('hide');
        work.classList.add('show');
    }


    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60
        time.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    clearInterval(timerInterval)
                    isWorkSession = false
                    totalSeconds = 5 * 60
                    updateTimer()
                    toBreak()
                }
            }, 10)
        } else {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    clearInterval(timerInterval)
                    isWorkSession = true
                    totalSeconds = 25 * 60
                    updateTimer()
                    toWork()
                }
            }, 10)
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        clearInterval(timerInterval)
        isWorkSession = true
        totalSeconds = 25 * 60
        updateTimer()
        toWork()
    }

    startBtn.addEventListener("click", startTimer)
    pauseBtn.addEventListener("click", pauseTimer)
    resetBtn.addEventListener("click", resetTimer)
}

pomodoroTimer()

// Date Time & Weather | Hero Panel
function heroPanel() {
    const WEATHER_API_KEY = "05cbce35efd74d01a0d51921252012"
    const date = document.querySelector("#date")
    const currentTime = document.querySelector("#currentTime")
    const day = document.querySelector("#day")

    const temp = document.querySelector("#temp")
    const humidity = document.querySelector("#humidity")
    const pressure = document.querySelector("#pressure")
    const wind = document.querySelector("#windSpeed")


    function updatingDateAndTime() {
        const currentDate = new Date()
        const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" }).split(",")[0]
        day.innerHTML = dayName
        date.innerHTML = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
        currentTime.innerHTML = currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    }

    async function fetchWeatherData() {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Bhatpara&aqi=no`)
        let data = await response.json()
        temp.innerHTML = `${data.current.temp_c}°C`
        humidity.innerHTML = `Humidity : ${data.current.humidity}%`
        pressure.innerHTML = `Pressure : ${data.current.pressure_mb} hPa`
        wind.innerHTML = `Wind Speed : ${data.current.wind_kph} km/h`
    }

    updatingDateAndTime()
    setInterval(updatingDateAndTime, 1000)

    fetchWeatherData()
}

heroPanel()

// Daily Goals
function dailyGoals() {

    let goalsData = []

    const goalAddBtn = document.querySelector(".goal-panel-head-right button")
    const goalAddPanel = document.querySelector(".goal-add-panel")
    const goalAddFormBtn = document.querySelector(".add-goal-form #add")
    const goalCloseFormBtn = document.querySelector(".add-goal-form #closeGoalAddPanel")
    const dailyGoals = document.querySelector(".goal-panel .daily-goals")
    let goals = document.querySelectorAll(".goal-panel .daily-goals .goal")
    const noGoal = document.querySelector(".goal-panel .daily-goals .no-goal")
    const goalTitle = document.querySelector(".add-goal-form .goalTitle")
    const goalDesc = document.querySelector(".add-goal-form .goalDesc")

    if (localStorage.getItem("goalsData")) {
        goalsData = JSON.parse(localStorage.getItem("goalsData"))
    }

    function renderGoals() {
        dailyGoals.innerHTML = ""
        if (goalsData.length === 0) {
            dailyGoals.innerHTML = `<div class="no-goal">
                    <h2>Goals are yet to be added</h2>
                </div>`
        } else {
            let sum = ''
            goalsData.forEach((goal, index) => {
                sum += `<div id="${index}" class="goal">
                        <h2>${goal.title}</h2>
                        <p>${goal.desc}</p>
                    </div>`
            })
            dailyGoals.innerHTML = sum

            goals = document.querySelectorAll(".goal-panel .daily-goals .goal")

            goals.forEach((goal, index) => {
                if (goalsData[index].isCompleted) {
                    goal.style.opacity = "0.5"
                    goal.style.pointerEvents = "none"
                }
                goal.addEventListener("click", () => {
                    goal.style.opacity = "0.5"
                    goal.style.pointerEvents = "none"
                    goalsData[index].isCompleted = true
                    localStorage.setItem("goalsData", JSON.stringify(goalsData))
                })
            })
        }
    }

    renderGoals()


    function buttonFunctions() {

        goalAddBtn.addEventListener("click", () => {
            goalAddPanel.classList.remove("hide-form")
            goalAddPanel.classList.add("show-form")
        })

        goalAddFormBtn.addEventListener("click", () => {
            goalAddPanel.classList.remove("show-form")
            goalAddPanel.classList.add("hide-form")

            goalsData.push({
                "title": goalTitle.value,
                "desc": goalDesc.value,
                "isCompleted": false
            })

            localStorage.setItem("goalsData", JSON.stringify(goalsData))

            goalTitle.value = ""
            goalDesc.value = ""
            renderGoals()
        })

        goalCloseFormBtn.addEventListener("click", () => {
            goalAddPanel.classList.remove("show-form")
            goalAddPanel.classList.add("hide-form")
        })
    }

    buttonFunctions()

}

dailyGoals()