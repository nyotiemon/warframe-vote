import { Injectable } from '@angular/core';

@Injectable()
export class GrabDataService {
    grabbedData: any = [];

    constructor() { }

    toJS = (lua) => {
        return new Promise((resolve, reject) => {
            // convert keys properly, convert = to :
            lua = lua.replace(/(?:(?:(?:\[")(.+)(?:"\]))|([a-zA-Z_]\w+))\s*=\s*/g, '"$1$2": ');

            // remove comment section after double dash
            lua = lua.replace(/--.*\n/g, "");

            // pull strings out
            let i = 0;
            let strings = [];
            lua = lua.replace(/"(.+?(?:[^\\]|\\.))"/g, (sub) => {
                strings.push(sub);
                return `$s${i++}$`;
            });

            lua = lua.replace(/nil/g, 'null'); // replace nil with null
            lua = lua.replace(/([^\w])(\.\d)/g, '$10$2'); // clean up decimal points

            let j = 0;
            let objects = [];

            let lastJ = -1;
            while (lastJ !== j) { // replace objects
                lastJ = j;
                lua = lua.replace(/{[^{]+?}/, (sub) => {
                    objects.push(sub);
                    return `$o${j++}$`;
                });
            }

            objects = objects.map(o => {
                if (/{(\s*([^:]+?),?)}/.test(o))
                    return o.replace('{', '[').replace('}', ']');
                else
                    return o;
            });

            j = 0;
            lastJ = -1;
            while (lastJ !== j) { // put objects back
                lastJ = j;
                lua = lua.replace(/\$o(\d+)\$/g, (sub, $1) => {
                    j++;
                    return objects[$1];
                });
            }

            lua = lua.replace(/\$s(\d+)\$/g, (sub, $1) => strings[$1]); // put strings back

            lua = lua.replace(/,(\s*(?:}|]))/g, '$1'); // clean up extra commas

            resolve(JSON.parse(lua));
        });
    };

    load = (url) => {
        return new Promise((resolve, reject) => {
            // Do the usual XHR stuff
            let req = new XMLHttpRequest();
            req.open('GET', url);
            if (!req) {
                console.log('CORS not supported');
            }

            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function () {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    };

    fetchAndParseRemoteData = () => {
        return new Promise((resolve, reject) => {
            const url = 'https://cors-anywhere.herokuapp.com/http://warframe.wikia.com/wiki/Module:Weapons/data?action=raw'; // bad solution to solve CORS in XMLHttpRequest

            this.load(url)
                .then((thebody: string) => {
                    const match = thebody.match(/{(?:.|\n)+}/);
                    if (!match) throw new Error('cant find data!');

                    const table = match[0];
                    const obj = this.toJS(table).then((jsonData) => {
                        console.log('/r/tippytaps/ ');
                        this.grabbedData = jsonData;

                        resolve(jsonData);
                    });
                })
                .catch(function (error) {
                    console.log('omo! ');
                    reject(error);
                });
        });
    };
};