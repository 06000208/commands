/* eslint-disable no-unused-vars */
import { BlockModule } from "@a06000208/handler";

/**
 * Function representing the command's code
 * @callback run
 * @param {...*} parameters Provided by the caller
 */

/**
 * @typedef {Object} NamedCommandData
 * @property {string} name The command's primary name
 * @property {string[]} [aliases] Optional aliases which may represent the
 * command and be used to call it
 * @property {?run} [run] One way of providing the run function. If omitted,
 * you must provide the run function using NamedCommand's second parameter.
 */

/**
 * A generic named command which may have aliases
 *
 * By default, this uses handler's generateIdentifier function for it's ids. If
 * this is undesirable, extend the class and replace Block#_getIdentifier by
 * adding a static function of the same name.
 * @abstract
 */
class NamedCommand extends BlockModule {
    /**
     * @param {NamedCommandData} data
     * @param {?run} [run] One way of providing the run function. If omitted,
     * you must provide the run function using the NamedCommandData object. This
     * parameter is ignored when the run function is provided using the
     * NamedCommandData object.
     */
    constructor(data, run) {
        super();
        if (!data) throw new TypeError("first parameter must be an object");
        if (!data.name) throw new TypeError("a name must be supplied");
        if (!data.run && !run) throw new TypeError("a run function must be supplied");

        /**
         * The command's name
         * @type {string}
         * @name Command#names
         */
        this.name = data.name;

        /**
         * Optional aliases which are treated the same as the command's name
         * @type {string[]}
         */
        this.aliases = data.aliases || [];

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

export { NamedCommand };
