import {create, StateCreator} from "zustand";
import {createJSONStorage, persist, PersistOptions} from "zustand/middleware";

export type CustomPersist<T> = (
    config: StateCreator<T>,
    options: PersistOptions<T>,
) => StateCreator<T>;

/**
 * 持久化存储的封装方法：
 * @example
 * const useStore = createStateStore<存储类型>('storeName', {
 *     ...DefaultValue,
 * })
 * const {set,...rest} = useStore()
 * */
const createState = <T extends Record<string, any>>(
    name: string,
    defaultValue: Partial<T>,
) => {
    return create<Partial<T> & { set: (value: Partial<T>) => void }>(
        (
            persist as CustomPersist<
                Partial<T> & { set: (value: Partial<T>) => void }
            >
        )(
            (set) => ({
                ...defaultValue,
                set: (value: Partial<T>) =>
                    set((state) => {
                        return {...state, ...value};
                    }),
            }),
            {
                name,
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};

export default createState;
