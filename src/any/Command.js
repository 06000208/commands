/* eslint-disable no-unused-vars */
import { BlockModule } from "@a06000208/handler";
import { isArrayOfStrings } from "./misc.js";

/**
 * Function serving as the command's code
 * @callback run
 * @param {...*} parameters Provided by the caller
 */

/**
 * @typedef {Object} CommandData
 * @property {string[]} names The command's names. If you want your commands to
 * have one name and aliases instead, see NamedCommand
 * @property {?run} [run] One way of providing the run function. If omitted,
 * you must provide the run function using Command's second parameter.
 * @property {?string[]} [subcommands]
 */

/**
 * A generic command with any number of names
 *
 * By default, this uses handler's generateIdentifier function for it's ids. If
 * this is undesirable, extend the class and replace Block#_getIdentifier by
 * adding a static function of the same name.
 * @abstract
 */
class Command extends BlockModule {
    /**
     * @param {CommandData} data
     * @param {?run} [run] One way of providing the run function. If omitted,
     * you must provide the run function using the CommandData object. This
     * parameter is ignored when the run function is provided using the
     * CommandData object.
     */
    constructor(data, run) {
        super();
        if (!data) throw new TypeError("first parameter must be an object");
        if (!isArrayOfStrings(data.names)) throw new TypeError("names must be an array of strings containing at least one");
        if (!data.run && !run) throw new TypeError("a run function must be supplied");

        /**
         * The command's names. If you want your commands to have one name and
         * aliases instead, see NamedCommand
         * @type {string[]}
         * @name Command#names
         */
        this.names = data.names;

        /**
         * Function used as a command's run method
         * @type {run}
         * @abstract
         */
        this.run = data.run || run;

        /**
         * The construct which manages this command, so you can access it using
         * `this.construct` inside your run functions.
         *
         * This property is only set on load, and will be null after
         * instantiation.
         * @type {CommandConstruct|Command|null}
         */
        this.construct = null;
    }
}

export { Command };
