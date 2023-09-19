const STORAGE_LEVEL_KEY = 'TSINSP_LOG_LEVEL';
const STORAGE_LEVEL_OVERRIDE_KEY = 'TSINSP_LOG_LEVEL_OVERRIDE';

type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

//Changes made here must be mirrored on backend
class LogLevel {
	static ERROR = new LogLevel(1, 'ERROR');
	static WARN = new LogLevel(2, 'WARN');
	static INFO = new LogLevel(3, 'INFO');
	static DEBUG = new LogLevel(4, 'DEBUG');

	id: number;
	enumKey: Level;

	constructor(id: number, enumKey: Level) {
		this.id = id;
		this.enumKey = enumKey;
	}

	static fromId(id: number | undefined) {
		switch (id) {
			case 1:
				return this.ERROR;
			case 2:
				return this.WARN;
			case 3:
				return this.INFO;
			case 4:
				return this.DEBUG;
			default:
				throw new Error(`Could not find LogLevel with id ${id}`);
		}
	}
}

// localStorage is not defined during server side rendering
const localStorageInstance = typeof localStorage !== 'undefined' ? localStorage : null;

const savedLogLevel = localStorageInstance?.getItem(STORAGE_LEVEL_KEY) as Level | undefined;
const savedOverride = localStorageInstance?.getItem(STORAGE_LEVEL_OVERRIDE_KEY);

/**
 * Logger class;
 * takes a name or a function/component as an argument and uses it as prefix
 *
 * example usage
 *
 * ...import Logger..
 *
 * const log = new Logger(MyComponent);
 * log.error('I have an', err);
 */
export default class Logger {
	static _rootLevel: LogLevel = LogLevel[savedLogLevel ? savedLogLevel : 'INFO'];

	// override default level for given logger name
	// logger name as key, level id as value
	static _overrideLevel: Map<string, number> = savedOverride
		? new Map(JSON.parse(savedOverride))
		: new Map();

	static reset() {
		localStorageInstance?.setItem(STORAGE_LEVEL_KEY, '');
		localStorageInstance?.setItem(STORAGE_LEVEL_OVERRIDE_KEY, '');
	}

	/**
	 * Can be called from console.
	 * Sets the root loglevel, or a specific logging level for a given logger
	 *
	 * example for setting root level:
	 * log.setLevel("warn")
	 *
	 * example for setting level for named logger:
	 * log.setLevel("UpdateProvider", "warn")
	 *
	 */

	static setLevel(levelStr: Level | Lowercase<Level>, name?: string): void {
		levelStr = levelStr.toUpperCase() as Level;

		if (!(levelStr in LogLevel)) {
			throw new Error(`Invalid level: ${levelStr}`);
		}

		const level = LogLevel[levelStr];

		if (name) {
			// set override for given logger name and save it to localStorage
			Logger._overrideLevel.set(name, level.id);
			const mapEntries = Logger._overrideLevel.entries();
			localStorageInstance?.setItem(STORAGE_LEVEL_OVERRIDE_KEY, JSON.stringify([...mapEntries]));
		} else {
			Logger._rootLevel = level;
			localStorageInstance?.setItem(STORAGE_LEVEL_KEY, levelStr);
		}
	}

	// ---------------------------------------------------------
	// Logger instance properties

	// window is not defined during server side rendering
	logger = typeof window !== 'undefined' ? window.console : undefined;
	name = '';

	constructor(name: string) {
		this.name = name;
	}

	/**
	 * Returns the current level for this logger
	 *
	 * If no level is configured for this specific logger,
	 * default to the root level.
	 */
	get level() {
		if (Logger._overrideLevel.has(this.name)) {
			return LogLevel.fromId(Logger._overrideLevel.get(this.name));
		}
		return Logger._rootLevel;
	}

	log(level: LogLevel, loggerSubName?: string, ...args: any) {
		if (this.level.id < level.id) {
			return;
		}

		// (must convert to logger method on console object)
		// debug/info/warn/error
		const loggerFunctionName = level.enumKey.toLowerCase() as Lowercase<Level>;

		this.logger?.[loggerFunctionName]?.call(
			this.logger,
			`${level.enumKey} [${this.name}]`,
			loggerSubName,
			...args
		);
	}

	debug(...args: any) {
		this.log(LogLevel.DEBUG, ...args);
	}

	info(...args: any) {
		this.log(LogLevel.INFO, ...args);
	}

	warn(...args: any) {
		this.log(LogLevel.WARN, ...args);
	}

	error(...args: any) {
		this.log(LogLevel.ERROR, ...args);
	}
}
