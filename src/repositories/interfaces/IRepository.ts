export interface IRepository {
    connect(): Promise<void>;
    find<T>(
        model: unknown,
        findParams: unknown,
        sortParams: unknown,
        rpp: number,
        page: number
    ): Promise<T[]>;
    get<T>(model: unknown, id: string): Promise<T>;
    create<T>(model: unknown, doc: T): Promise<T>;
    delete(model: unknown, id: string): Promise<boolean>;
    count(model: any, findParams: unknown): Promise<number>;
}
