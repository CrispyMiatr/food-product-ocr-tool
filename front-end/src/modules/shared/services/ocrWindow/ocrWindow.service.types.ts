export interface Nutrient {
    name: string;
    per_100mL: string;
    per_500mL: string;
    xtra?: string;
}

export interface Vitamin {
    name: string;
    per_100mL: string;
    per_500mL: string;
    xtra?: string;
}

export interface LocalisedText {
    lang: string;
    text: string;
}

export interface NutritionTable {
    lang: string;
    header: {
        title: string;
        per_100mL: string;
        per_500mL: string;
    };
    basic_info: {
        energy: Nutrient;
        fat: Nutrient;
        saturated_fat: Nutrient;
        cholesterol: Nutrient;
        carbohydrates: Nutrient;
        sugars: Nutrient;
        dietary_fiber: Nutrient;
        protein: Nutrient;
        salt: Nutrient;
        calcium: Nutrient;
        potassium: Nutrient;
    };
    vitamins?: {
        header?: string;
        vit_A?: Vitamin;
        vit_B1?: Vitamin;
        vit_B2?: Vitamin;
        vit_B3?: Vitamin;
        vit_B5?: Vitamin;
        vit_B6?: Vitamin;
        vit_B7?: Vitamin;
        vit_B9?: Vitamin;
        vit_B12?: Vitamin;
        vit_C?: Vitamin;
        vit_D?: Vitamin;
        vit_E?: Vitamin;
        vit_K?: Vitamin;
    };
}

export interface AiTextData {
    info: {
        brand: string;
        name: string;
        company: string;
        country_code: string;
        country: string;
        volume: string;
        weight: string;
        barcode: string;
        website: string;
    };
    warning_info: LocalisedText[];
    ingredients_list: LocalisedText[];
    nutrition_tables: NutritionTable[];
}

export interface OcrWindowType {
    ocrText: string;
    aiText: AiTextData;
}