const fs = require('node:fs');
const cp = require('node:child_process');

function ignoreSvgFiles(src) {
    src = src || './src-widgets/';
    if (!src.endsWith('/')) {
        src += '/';
    }
    return [
        `!${src}build/static/media/Alarm Systems.*.svg`,
        `!${src}build/static/media/Amplifier.*.svg`,
        `!${src}build/static/media/Anteroom.*.svg`,
        `!${src}build/static/media/Attic.*.svg`,
        `!${src}build/static/media/Awnings.*.svg`,
        `!${src}build/static/media/Balcony.*.svg`,
        `!${src}build/static/media/Barn.*.svg`,
        `!${src}build/static/media/Basement.*.svg`,
        `!${src}build/static/media/Bathroom.*.svg`,
        `!${src}build/static/media/Battery Status.*.svg`,
        `!${src}build/static/media/Bedroom.*.svg`,
        `!${src}build/static/media/Boiler Room.*.svg`,
        `!${src}build/static/media/Carport.*.svg`,
        `!${src}build/static/media/Ceiling Spotlights.*.svg`,
        `!${src}build/static/media/Cellar.*.svg`,
        `!${src}build/static/media/Chamber.*.svg`,
        `!${src}build/static/media/Chandelier.*.svg`,
        `!${src}build/static/media/Climate.*.svg`,
        `!${src}build/static/media/Coffee Makers.*.svg`,
        `!${src}build/static/media/Cold Water.*.svg`,
        `!${src}build/static/media/Computer.*.svg`,
        `!${src}build/static/media/Consumption.*.svg`,
        `!${src}build/static/media/Corridor.*.svg`,
        `!${src}build/static/media/Curtains.*.svg`,
        `!${src}build/static/media/Dining Area.*.svg`,
        `!${src}build/static/media/Dining Room.*.svg`,
        `!${src}build/static/media/Dining.*.svg`,
        `!${src}build/static/media/Dishwashers.*.svg`,
        `!${src}build/static/media/Doors.*.svg`,
        `!${src}build/static/media/Doorstep.*.svg`,
        `!${src}build/static/media/Dressing Room.*.svg`,
        `!${src}build/static/media/Driveway.*.svg`,
        `!${src}build/static/media/Dryer.*.svg`,
        `!${src}build/static/media/Entrance.*.svg`,
        `!${src}build/static/media/Equipment Room.*.svg`,
        `!${src}build/static/media/Fan.*.svg`,
        `!${src}build/static/media/Floor Lamps.*.svg`,
        `!${src}build/static/media/Front Yard.*.svg`,
        `!${src}build/static/media/Gallery.*.svg`,
        `!${src}build/static/media/Garage Doors.*.svg`,
        `!${src}build/static/media/Garage.*.svg`,
        `!${src}build/static/media/Garden.*.svg`,
        `!${src}build/static/media/Gates.*.svg`,
        `!${src}build/static/media/Ground Floor.*.svg`,
        `!${src}build/static/media/Guest Bathroom.*.svg`,
        `!${src}build/static/media/Guest Room.*.svg`,
        `!${src}build/static/media/Gym.*.svg`,
        `!${src}build/static/media/Hairdryer.*.svg`,
        `!${src}build/static/media/Hall.*.svg`,
        `!${src}build/static/media/Handle.*.svg`,
        `!${src}build/static/media/Hanging Lamps.*.svg`,
        `!${src}build/static/media/Heater.*.svg`,
        `!${src}build/static/media/Home Theater.*.svg`,
        `!${src}build/static/media/Hoods.*.svg`,
        `!${src}build/static/media/Hot Water.*.svg`,
        `!${src}build/static/media/Humidity.*.svg`,
        `!${src}build/static/media/Iron.*.svg`,
        `!${src}build/static/media/Irrigation.*.svg`,
        `!${src}build/static/media/Kitchen.*.svg`,
        `!${src}build/static/media/Laundry Room.*.svg`,
        `!${src}build/static/media/Led Strip.*.svg`,
        `!${src}build/static/media/Light.*.svg`,
        `!${src}build/static/media/Lightings.*.svg`,
        `!${src}build/static/media/Living Area.*.svg`,
        `!${src}build/static/media/Living Room.*.svg`,
        `!${src}build/static/media/Lock.*.svg`,
        `!${src}build/static/media/Locker Room.*.svg`,
        `!${src}build/static/media/Louvre.*.svg`,
        `!${src}build/static/media/Mowing Machine.*.svg`,
        `!${src}build/static/media/Music.*.svg`,
        `!${src}build/static/media/names.*.txt`,
        `!${src}build/static/media/Nursery.*.svg`,
        `!${src}build/static/media/Office.*.svg`,
        `!${src}build/static/media/Outdoor Blinds.*.svg`,
        `!${src}build/static/media/Outdoors.*.svg`,
        `!${src}build/static/media/People.*.svg`,
        `!${src}build/static/media/Playroom.*.svg`,
        `!${src}build/static/media/Pool.*.svg`,
        `!${src}build/static/media/Power Consumption.*.svg`,
        `!${src}build/static/media/Printer.*.svg`,
        `!${src}build/static/media/Pump.*.svg`,
        `!${src}build/static/media/Rear Wall.*.svg`,
        `!${src}build/static/media/Receiver.*.svg`,
        `!${src}build/static/media/Sconces.*.svg`,
        `!${src}build/static/media/Second Floor.*.svg`,
        `!${src}build/static/media/Security.*.svg`,
        `!${src}build/static/media/Shading.*.svg`,
        `!${src}build/static/media/Shed.*.svg`,
        `!${src}build/static/media/Shutters.*.svg`,
        `!${src}build/static/media/Sleeping Area.*.svg`,
        `!${src}build/static/media/SmokeDetector.*.svg`,
        `!${src}build/static/media/Sockets.*.svg`,
        `!${src}build/static/media/Speaker.*.svg`,
        `!${src}build/static/media/Stairway.*.svg`,
        `!${src}build/static/media/Stairwell.*.svg`,
        `!${src}build/static/media/Storeroom.*.svg`,
        `!${src}build/static/media/Stove.*.svg`,
        `!${src}build/static/media/Summer House.*.svg`,
        `!${src}build/static/media/Swimming Pool.*.svg`,
        `!${src}build/static/media/Table Lamps.*.svg`,
        `!${src}build/static/media/Temperature Sensors.*.svg`,
        `!${src}build/static/media/Terrace.*.svg`,
        `!${src}build/static/media/Toilet.*.svg`,
        `!${src}build/static/media/Tv.*.svg`,
        `!${src}build/static/media/Upstairs.*.svg`,
        `!${src}build/static/media/Vacuum Cleaner.*.svg`,
        `!${src}build/static/media/Ventilation.*.svg`,
        `!${src}build/static/media/Wardrobe.*.svg`,
        `!${src}build/static/media/Washing Machines.*.svg`,
        `!${src}build/static/media/Washroom.*.svg`,
        `!${src}build/static/media/Water Consumption.*.svg`,
        `!${src}build/static/media/Water Heater.*.svg`,
        `!${src}build/static/media/Water.*.svg`,
        `!${src}build/static/media/Wc.*.svg`,
        `!${src}build/static/media/Weather.*.svg`,
        `!${src}build/static/media/Window.*.svg`,
        `!${src}build/static/media/Windscreen.*.svg`,
        `!${src}build/static/media/Workshop.*.svg`,
        `!${src}build/static/media/Workspace.*.svg`,
    ];
}

function ignoreFiles(src, doNotIgnoreSvg, doNotIgnoreMap) {
    src = src || './src-widgets/';
    if (!src.endsWith('/')) {
        src += '/';
    }
    let list = [
        `!${src}build/static/js/node_modules*.*`,
        `!${src}build/static/js/vendors-node_modules*.*`,
        `!${src}build/static/js/main*.*`,
        `!${src}build/static/js/src_bootstrap*.*`,
    ];
    if (!doNotIgnoreMap) {
        list = list.concat([
            `!${src}build/static/*.map`,
            `!${src}build/static/**/*.map`,
        ]);
    }

    if (!doNotIgnoreSvg) {
        list = list.concat(ignoreSvgFiles(src));
    }

    return list;
}

function copyFiles(src) {
    src = src || './src-widgets/';
    if (!src.endsWith('/')) {
        src += '/';
    }

    return [
        `${src}build/static/js/*fast-xml*.*`,
        `${src}build/static/js/*react-swipeable*.*`,
        `${src}build/static/js/*moment_*.*`,
        `${src}build/static/js/*react-beautiful-dnd*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_index_jsx*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_node_modules_babel_runtime_helpers*.*`,
        `${src}build/static/js/*runtime_helpers_asyncToGenerator*.*`,
        `${src}build/static/js/*modules_color*.*`,
        `${src}build/static/js/*echarts-for-react_lib_core_js-node_modules_echarts_core_js-*.chunk.*`,
        `${src}build/static/js/*echarts_lib*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_node_modules_babel_runtime_helpers*.*`,
        `${src}build/static/js/*leaflet*.*`,
        `${src}build/static/js/*react-circular*.*`,
        `${src}build/static/js/*d3-array_src_index_js-node_modules_d3-collection_src_index_js-*.*`,
        `${src}build/static/js/*d3-dispatch_*.*`,
        `${src}build/static/js/*lodash_*.*`,
        `${src}build/static/js/*react-battery-gauge_dist_react-battery-gauge*.*`,
        `${src}build/static/js/*react-gauge-chart*.*`,
        `${src}build/static/js/*react-liquid-gauge*.*`,
        `${src}build/static/js/*helpers_esm_asyncToGener*.*`,
        `${src}build/static/js/*emotion_styled_dist*.*`,
        `${src}build/static/js/*mui_system_colorManipulator*.*`,
    ];
}

function deleteFoldersRecursive(path, exceptions) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);
        for (const file of files) {
            const curPath = `${path}/${file}`;
            if (exceptions && exceptions.find(e => curPath.endsWith(e))) {
                continue;
            }

            const stat = fs.statSync(curPath);
            if (stat.isDirectory()) {
                deleteFoldersRecursive(curPath, exceptions);
                if (exceptions?.length) {
                    // check if the directory is empty
                    const files = fs.readdirSync(curPath).filter(file => file !== '.' && file !== '..');
                    if (files.length) {
                        continue;
                    }
                }
                fs.rmdirSync(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        }
    }
}

function npmInstall(src) {
    src = src || './src-widgets/';
    return new Promise((resolve, reject) => {
        // Install node modules
        const cwd = src.replace(/\\/g, '/');

        const cmd = `npm install -f`;
        console.log(`"${cmd} in ${cwd}`);

        // System call used for update of js-controller itself,
        // because during an installation the npm packet will be deleted too, but some files must be loaded even during the installation process.
        const exec = cp.exec;
        const child = exec(cmd, {cwd});

        child.stderr.pipe(process.stderr);
        child.stdout.pipe(process.stdout);

        child.on('exit', (code /* , signal */) => {
            // code 1 is a strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                reject(`Cannot install: ${code}`);
            } else {
                console.log(`"${cmd} in ${cwd} finished.`);
                // command succeeded
                resolve();
            }
        });
    });
}

function buildWidgets(root, src) {
    if (root.endsWith('/')) {
        root = root.substring(0, root.length - 1);
    }
    src = src || `${root}/src-widgets/`;
    const version = JSON.parse(fs.readFileSync(`${root}/package.json`).toString('utf8')).version;
    const data    = JSON.parse(fs.readFileSync(`${src}package.json`).toString('utf8'));

    data.version = version;

    fs.writeFileSync(`${src}package.json`, JSON.stringify(data, null, 4));

    return new Promise((resolve, reject) => {
        const options = {
            stdio: 'pipe',
            cwd: src,
        };

        console.log(options.cwd);

        let script = `${src}node_modules/@craco/craco/dist/bin/craco.js`;
        if (!fs.existsSync(script)) {
            script = `${root}/node_modules/@craco/craco/dist/bin/craco.js`;
        }
        if (!fs.existsSync(script)) {
            console.error(`Cannot find execution file: ${script}`);
            reject(`Cannot find execution file: ${script}`);
        } else {
            const child = cp.fork(script, ['build'], options);
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.on('close', code => {
                console.log(`child process exited with code ${code}`);
                code ? reject(`Exit code: ${code}`) : resolve();
            });
        }
    });
}

module.exports = {
    ignoreSvgFiles,
    ignoreFiles,
    copyFiles,
    buildWidgets,
    npmInstall,
    deleteFoldersRecursive,
};
