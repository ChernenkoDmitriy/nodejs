export interface IDataBase<T> {
    create: (params: object) => Promise<T>
    findOne: (params: object, ...rest) => Promise<T>;
    deleteMany: (...rest) => Promise<T>;
    deleteOne: (...rest) => Promise<T>;
    find: (...rest) => Promise<T[]>;
    findById: (...rest) => Promise<T>;
    findByIdAndDelete: (...rest) => Promise<T>;
    findByIdAndRemove: (...rest) => Promise<T>;
    findByIdAndUpdate: (...rest) => Promise<T>;
    findOneAndDelete: (...rest) => Promise<T>;
    findOneAndRemove: (...rest) => Promise<T>;
    findOneAndReplace: (...rest) => Promise<T>;
    findOneAndUpdate: (...rest) => Promise<T>;
    replaceOne: (...rest) => Promise<T>;
    updateMany: (...rest) => Promise<T>;
    updateOne: (...rest) => Promise<T>;
}
