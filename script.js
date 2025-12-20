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
            }, 1000)
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
            }, 1000)
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