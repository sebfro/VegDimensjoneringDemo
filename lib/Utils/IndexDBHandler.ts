interface DirectoryHandlerMedId {
	id: string;
	handler: FileSystemDirectoryHandle;
}

/**
 * const indexDBHandler = new IndexDBHandler('myDatabase', 'myStore');
 * await indexDBHandler.open();
 * await indexDBHandler.put(directoryHandler);
 * await indexDBHandler.close();
 */
export class IndexDBHandler {
	private readonly dbName: string;
	private readonly storeName: string;
	private db: IDBDatabase | null = null;

	constructor(dbName: string, storeName: string) {
		this.dbName = dbName;
		this.storeName = storeName;
	}

	public async open(): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = window.indexedDB.open(this.dbName, 1);

			request.onerror = () => {
				reject(request.error);
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				const db = (event.target as IDBOpenDBRequest).result;
				db.createObjectStore(this.storeName, { keyPath: 'id' });
			};
		});
	}

	public async close(): Promise<void> {
		if (this.db) {
			this.db.close();
			this.db = null;
		}
	}

	public async put(data: DirectoryHandlerMedId): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.db) {
				throw new Error('Database not open');
			}
			const transaction = this.db.transaction([this.storeName], 'readwrite');
			const objectStore = transaction.objectStore(this.storeName);
			const request = objectStore.put(data);

			request.onerror = () => {
				reject(request.error);
			};

			request.onsuccess = () => {
				resolve();
			};
		});
	}

	public async get(id: string): Promise<DirectoryHandlerMedId | undefined> {
		return new Promise((resolve, reject) => {
			if (!this.db) {
				throw new Error('Database not open');
			}
			const transaction = this.db.transaction([this.storeName], 'readonly');
			const objectStore = transaction.objectStore(this.storeName);
			const request = objectStore.get(id);

			request.onerror = () => {
				reject(request.error);
			};

			request.onsuccess = () => {
				resolve(request.result);
			};
		});
	}
}
