const path = require('path');
const fs = require('fs');
const url = require('url');

const {
  fork
} = require('child_process');
const {
  NodeVM
} = require('vm2');
const Finder = require('./finder');
const EventBus = require('./event');
const Facade = require('./global');


const Find = new Finder('dapps/users/');

class UserDappsLoader {
  constructor() {
    this.items = []
    this.dapps = Find.getDirs()
    this.data = 'manifest.json'
  }

    async setKeyWords(dirname, object) {
        if (object && Array.isArray(object.keywords)) {
            try {
                for (let i = 0; i < object.keywords.length; i++) {
                    const query = object.keywords[i].query
                    const value = object.keywords[i].value

                    if (!query || !value) {
                        console.error(`[${dirname}]: keyword[${i}] incorrect`)
                    }

                    const data = await new Promise(resolve => {
                        Facade.db().search.find({
                            selector: {
                                hash: object.hash,
                                value: value
                            }
                        }).then(response => resolve(response.docs))
                    });

                    if (data.length) return;

                    const url = `arr://${object.unic}:mainet/?'${query}`;

                    await new Promise(resolve => {
                        Facade.db().search.post({
                            url: url,
                            query: query,
                            value: value,
                            hash: object.hash,
                            name: object.name,
                            icon: object.icon
                        }).then(resolve)
                    })
                }
            } catch (error) {
                console.error(`[${this.dapps[i]}] set keywords - ${error.name}: ${error.message}`)
            }
        } else {
            console.warn(`[${dirname}]: no keywords`)
        }
    }

    async sourceCode(dirname, object) {
        if (!object.unic) {
            console.error(`[${dirname}]: unic not specified`)
        }

        try {
            let code = 'Events.data = ' + JSON.stringify(object)
            code += Find.readFile(dirname + '/' + object.main)

            const _path = `users/${dirname}/`

            object.icon = _path + object.icon
            object.thumb = _path + object.thumb
            object.index = _path + object.index

            this.items.push(object)

            const Events = new EventBus()
            Events.data.hash = object.hash

            const child = fork(path.join(__dirname, 'helper'), {stdio: [0, 1, 2, 'ipc']})

            child.on('message', message => {
                Events.publish(message.to, message.message_type, message.payload)
            })

            Events.everytime(message => child.send(message))

            child.send({init: code})
        } catch (error) {
            console.error(`[${this.dapps[i]}] source code - ${error.name}: ${error.message}`)
            return;
        }

        await this.setKeyWords(dirname, object)
    }

    async onStart() {
        for (let i = 0; i < this.dapps.length; i++) {
            const string = Find.readFile(this.dapps[i] + '/' + this.data)

            try {
                var object = JSON.parse(string)
            } catch (error) {
                console.error(`[${this.dapps[i]}] parse manifest - ${error.name}: ${error.message}`)
                break
            }

            await this.sourceCode(this.dapps[i], object)
        }
    }
}

module.exports = UserDappsLoader