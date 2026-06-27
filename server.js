

const express = require("express");
const WebSocket = require("ws");
const app = express();
app.use(require("express").static(__dirname));

const server = app.listen(3000, () => {
    console.log("سرور باب اسفنجی روی پورت 3000 اجرا شد!");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("یک بازیکن وصل شد!");

    ws.on("message", msg => {
        // پیام بازیکن‌ها برای هم ارسال می‌شود
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
});
