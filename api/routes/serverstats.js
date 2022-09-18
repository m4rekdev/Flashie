const { Router } = require('express');
const router = new Router();
const systeminformation = require('systeminformation');
const authentication = require('../middleware/authentication.js');

router.get('/serverstats', authentication, async (req, res) => {
    const cpu = await systeminformation.cpu().then(({ speed, cores }) => ({ speed, cores }));
    const memory = await systeminformation.mem().then(({ total, free, used }) => ({ total, free, used }));
    const os = await systeminformation.osInfo().then(({ platform, distro, release, arch }) => ({ platform, distro, release, arch }));
    const load = await systeminformation.currentLoad().then(({ currentLoad: cpuLoad }) => ({ cpuLoad }));

    return res.status(200).send({
        status: 200,
        message: 'OK',
        content: {
            cpu,
            memory,
            os,
            load,
        },
    });
});

module.exports = router;