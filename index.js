#!/usr/bin/node
const { argv } = require('node:process');
const fs = require('node:fs');

const args = process.argv.slice(2); // Omite los primeros dos argumentos (node y script)
const command = args[0]; // Primer argumento (comando)
const param = args.slice(1).join(' '); // Combinar los argumentos restantes como un solo parámetro


let ANSI_COLORS = {
    RED: "\x1b[1;31m",
    GREEN: "\x1b[1;32m",
    PURPLE: "\x1b[1;35m",
    WHITE: "\x1b[1;37m",
    YELLOW: "\x1b[1;33m",
    BLUE: "\x1b[1;34m",
    CYAN: "\x1b[1;36m",
    RESET: "\x1b[0m"

}
const taskPathname = "./task.json"
let tasks = []

const readTaskFile = () => {
    // if (taskPathname) {
    if (fs.existsSync(taskPathname)) {
        const data = fs.readFileSync(taskPathname, 'utf-8', (err, data) => {
            if (err) {
                console.error(err)
                return

            }

        })
        return JSON.parse(data)


    } else {
        fs.writeFileSync(taskPathname, JSON.stringify([]), (err, dataToShow) => {

        })
    }

}

const writeTaskFile = (data) => {
    const dataToSend = fs.writeFileSync(taskPathname, data, (err, data) => {
        if (err) {
            console.error(err)
            return;
        }
    })

    // console.log(dataToSend)
}


const commands = {
    add: (param) => {

        let previousTask = readTaskFile(tasks)

        let newTask = {
            id: previousTask.length ? previousTask.length + 1 : 1,
            taskName: param,
            status: "todo",
            createdAt: new Date(),
            updateAt: new Date(),
        };
        previousTask.push(newTask,)

        previousTask.map(task => {
            console.log(`${task.id}.- ${task.taskName} - Estado : ${task.status}`)
        })
        let finalJsonTask = JSON.stringify(previousTask)

        writeTaskFile(finalJsonTask)
        // Lógica para el comando 'add'
    },
    remove: (param) => {
        console.log(`Removing: ${param}`);
        // Lógica para el comando 'remove'
    },
    help: (param) => {
        console.log("This is a list of commands to help you start "
            , '\n', '\n',
            "help h : it shows you the main commands that are in the CLI",
            '\n', '\n',
            "add : it would add a task ",
            '\n', '\n',

            "todo : show all the task ",
            '\n', '\n',
            "done : show all the taks with status done",
            '\n', '\n',
            "progress : show all the task with the status of  in progress",
            '\n', '\n',
            "update : update the state of a task",
            '\n',)
    },
    delete: (param) => {
        if (param == "") {
            console.log(`${ANSI_COLORS.RED}Borrando todas las tareas`)
            writeTaskFile("[]")
            console.log(`${ANSI_COLORS.RESET}`)
        }
        let allTheTask = readTaskFile(tasks)
        let newTask = allTheTask.filter(task => task.id !== +param)
        console.log(`curso con id : ${param} eliminado`)
        let saveTask = JSON.stringify(newTask)
        writeTaskFile(saveTask)




    },
    update: (param) => {

        console.log(param)
        let idTask = param.split(" ")[0]
        let text = param.slice(1)
        let allTasksFiles = readTaskFile(tasks)

        let taskToUpdate = allTasksFiles.filter(task => task.id == idTask)
        // console.log(taskToUpdate)
        taskToUpdate.taskName = text


        console.log(taskToUpdate)

        console.log(cambio)
        // allTasksFiles.push(taskToUpdate)
        // writeTaskFile(JSON.stringify(allTasksFiles))


    }
    ,
    tasks: (param) => {
        let allTasks = readTaskFile(tasks)

        if (allTasks != null || allTasks != undefined) {

          

            allTasks.map(task => {
                console.log(`${ANSI_COLORS.BLUE} ${task.id}.- ${task.taskName} - Estado : ${task.status}`)

            })
            console.log(`${ANSI_COLORS.RESET}`)
            

        } else {
            console.log("No hay tareas para mostrar")
            return 
        }

        console.log(`${ANSI_COLORS.RESET}`)

    }
    // Puedes agregar más comandos aquí
};


if (commands[command]) {
    commands[command](param);
} else {
    console.log(`Command "${command}" not recognized.`);
}


