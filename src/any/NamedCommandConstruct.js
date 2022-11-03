import { CollectionConstruct } from "@a06000208/handler";
import Collection from "@discordjs/collection";

/**
 * A generic command construct which uses commands with primary names and
 * aliases
 * @abstract
 */
class NamedCommandConstruct extends CollectionConstruct {
    constructor() {
        super();

        /**
         * Cached Command instances mapped by their ids.
         *
         * By default, the Command class uses handler's generateIdentifier
         * function for their ids. If this is undesirable, see
         * {@link NamedCommand} for information on how to change that.
         * @type {Collection<string, Command>}
         * @name CommandConstruct#cache
         */

        /**
         * Index of command names and aliases mapped to command ids
         * @type {Collection<string, string>}
         */
        this.index = new Collection();
    }

    /**
     * @param {NamedCommand} command
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(command) {
        Object.defineProperty(command, "construct", { value: this });
        this.index.set(command.name, command.id);
        command.aliases.forEach((alias) => this.index.set(alias, command.id));
        return super.load(command);
    }

    /**
     * @param {Command} command
     * @returns {boolean} Returns true upon success, false upon failure
     */
    unload(command) {
        this.index.delete(command.name);
        command.aliases.forEach((alias) => this.index.delete(alias));
        return super.unload(command);
    }

    /**
     * @param {string} idOrName The id, name, or alias of a command
     * @returns {?Command}
     */
    resolve(idOrName) {
        if (!idOrName) throw TypeError("missing idOrName parameter");
        return this.index.has(idOrName) ? this.cache.get(this.index.get(idOrName)) : this.cache.get(idOrName) || null;
    }

    /**
     * @param {string} idOrName The id, name, or alias of a command
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

export { NamedCommandConstruct };
