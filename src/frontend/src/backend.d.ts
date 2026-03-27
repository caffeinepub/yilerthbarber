import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Haircut {
    name: string;
    description: string;
    category: Category;
    priceUSD: number;
}
export enum Category {
    trend = "trend",
    intermediate = "intermediate",
    basic = "basic"
}
export interface backendInterface {
    getBCVRate(): Promise<number>;
    getHaircutPriceInVES(name: string): Promise<number | null>;
    getHaircutsArray(): Promise<Array<Haircut>>;
    getHaircutsByPrice(): Promise<Array<Haircut>>;
    updateBCVRate(newRate: number): Promise<void>;
}
