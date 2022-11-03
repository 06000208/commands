import { CollectionConstruct } from "@a06000208/handler";
import Collection from "@discordjs/collection";

/**
 * A generic command construct which uses commands with any number of name(s)
 * @abstract
 */
class CommandConstruct extends CollectionConstruct {
    constructor() {
        super();

        /**
         * Cached Command instances mapped by their ids.
         *
         * By default, the Command class uses handler's generateIdentifier
         * function for their ids. If this is undesirable, see {@link Command}
         * for information on how to change that.
         * @type {Collection<string, Command>}
         * @name CommandConstruct#cache
         */

        /**
         * Index of command names mapped to command ids
         * @type {Collection<string, string>}
         */
        this.index = new Collection();
    }

    /**
     * @param {Command} command
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(command) {
        Object.defineProperty(command, "construct", { value: this });
        command.names.forEach((name) => this.index.set(name, command.id));
        return super.load(command);
    }

    /**
     * @param {Command} command
     * @returns {boolean} Returns true upon success, false upon failure
     */
    unload(command) {
        command.names.forEach((name) => this.index.delete(name));
        return super.unload(command);
    }

    /**
     * @param {string} idOrName The id or name of a command
     * @returns {?Command}
     */
    resolve(idOrName) {
        if (!idOrName) throw TypeError("missing idOrName parameter");
        return this.index.has(idOrName) ? this.cache.get(this.index.get(idOrName)) : this.cache.get(idOrName) || null;
    }

    /**
     * @param {string} idOrName The id or name of a command
     * @param {...*} [parameters]
     * @returns {boolean} Returns true after running the command, false if no command could be found
     */
    async run(idOrName, parameters) {
        const command = this.resolve(idOrName);
        if (!command) return false;
        await command.run(...parameters);
        return true;
    }
}

export { CommandConstruct };

