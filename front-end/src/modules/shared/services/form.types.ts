import type { AiTextData, LocalisedText, NutritionTable } from "./ocrWindow";

export interface FormInfoType {
    data: AiTextData['info'] | null;
    onChange: (field: keyof AiTextData['info'], value: string) => void;
}

export interface FormLocalisedType {
    title: string;
    items: LocalisedText[];
    sectionKey: 'ingredients_list' | 'warning_info';
    onChange: (section: 'ingredients_list' | 'warning_info', index: number, field: keyof LocalisedText, value: string) => void;
}

export interface FormNutritionType {
    tables: NutritionTable[];
    onChange: (tableIndex: number, path: (string | number)[], value: string) => void;
}   