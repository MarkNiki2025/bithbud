import { createServer } from "node:http";
import { parse } from "url";
import next from "next";
import {
    checkAndHandleWebSocketRequest,
    initSocket,
    initializeResourceMetaCache,
} from "@fernir2/saas-kit/server";
import { envSettingKeys, getNumberEnvSetting, isDev } from "@fernir2/saas-kit";

const dev = isDev();
const port = getNumberEnvSetting(envSettingKeys.port) ?? 3000;

const app = next({ dev, port });
const nextRequestHandler = app.getRequestHandler();

async function run() {
    await app.prepare();

    const httpServer = createServer((req, res) => {
        checkAndHandleWebSocketRequest(req, res);

        nextRequestHandler(req, res, parse(req.url!, true));
    });

    initSocket(httpServer);

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });

    await initializeResourceMetaCache();
}

run();
