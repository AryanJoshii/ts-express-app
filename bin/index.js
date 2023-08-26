#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMPLATE_FOLDER_PATH = './template';
const DEPS = "express cookie-parser cors dotenv";
const DEV_DEPS = "typescript ts-node nodemon @types/express @types/node @types/cors @types/cookie-parser";
const args = process.argv.slice(2);

const color = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgblack: "\x1b[30m",
    fgred: "\x1b[31m",
    fggreen: "\x1b[32m",
    fgyellow: "\x1b[33m",
    fgblue: "\x1b[34m",
    fgmagenta: "\x1b[35m",
    fgcyan: "\x1b[36m",
    fgwhite: "\x1b[37m",
    fggray: "\x1b[90m",

    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m",
    bggray: "\x1b[100m",
}

let withYarnPackage = false;
const yarnOptionIdx = args.indexOf("--yarn");
if (yarnOptionIdx > -1) {
    withYarnPackage = true;
    args.splice(yarnOptionIdx, 1);
}

function generateExpressTSApp() {
    try {
        colorConsole("process", "Generating your express-typescript boilerplate...")
        colorConsole("process", "Creating project directory...")
        copyFilesToProjectDir();
        colorConsole("done", "Project directory created successfully.")
        colorConsole("process", "Installing modules...")
        installModules();
        colorConsole("done", "Project setup complete.")
    } catch (error) {
        colorConsole("error", error);
        process.exit();
    }
}

function copyFilesToProjectDir() {
    try {
        if (args[0] === undefined) {
            colorConsole("error", `Provide directory name to generate boilerplate in it (or . to generate in current directory)`);
            process.exit();
        }
        copyFilesAndDisplay(args[0]);
    } catch (error) {
        throw error;
    }
}


function installModules() {
    try {
        const installDeps = withYarnPackage ? `yarn add ${DEPS}` : `npm i ${DEPS}`
        const installDevDeps = withYarnPackage ? `yarn add ${DEV_DEPS} -D` : `npm i -D ${DEV_DEPS}`
        execSync(installDeps, { cwd: args[0], stdio: [0, 1, 2] });
        execSync(installDevDeps, { cwd: args[0], stdio: [0, 1, 2] });
    } catch (error) {
        throw error;
    }
}

function copyFilesAndDisplay(projectPath) {
    try {
        const destPath = path.join(process.cwd(), projectPath);
        const templatePath = path.join(__dirname, TEMPLATE_FOLDER_PATH);
        fs.cpSync(templatePath, destPath, { recursive: true, errorOnExist: true, force: false });
    } catch (error) {
        throw error;
    }
}

function colorConsole(type, message) {
    const consoleColor = type === "done" ? color.bggreen : type === "error" ? color.bgred : color.bgyellow;
    const consoleText = type === "done" ? "DONE" : type === "error" ? "ERROR" : "PROCESSING";
    console.log(`${consoleColor}${color.fgblack}${consoleText}${color.reset}`, message, "\n")
}

generateExpressTSApp();
