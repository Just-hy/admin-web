"use strict";const n=require("electron"),o=require("path");let e;const t=()=>{e=new n.BrowserWindow({webPreferences:{devTools:!0,contextIsolation:!1,nodeIntegration:!0}}),n.app.isPackaged?e.loadFile(o.join(__dirname,"../index.html")):(console.log(process.env),e.loadURL(`http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`))};n.app.whenReady().then(t);