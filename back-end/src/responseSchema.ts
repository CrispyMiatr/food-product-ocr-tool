import { SchemaType } from '@google-cloud/vertexai';

export const responseSchema = {
    type: SchemaType.OBJECT,
    description: 'Represents a single beverage product, with support for multiple languages.',
    properties: {
        info: {
            type: SchemaType.OBJECT,
            properties: {
                brand: { type: SchemaType.STRING, description: 'The brand of the drink, e.g., Monster.' },
                name: { type: SchemaType.STRING, description: 'The name of the product.' },
                company: { type: SchemaType.STRING, description: 'The name of the overarching company, e.g. Pepsi-co, Nestle' },
                country_code: { type: SchemaType.STRING, description: 'ALWAYS leave this as an empty string "".' },
                country: { type: SchemaType.STRING, description: 'ALWAYS leave this as an empty string "".' },
                volume: { type: SchemaType.STRING, description: 'The volume of the product if present, e.g., 500 mL, 16 fl. oz.' },
                weight: { type: SchemaType.STRING, description: 'The weight of the can if present, e.g., 500 g, 1.1 lbs' },
                barcode: { type: SchemaType.STRING, description: 'The barcode numbers.' },
                website: { type: SchemaType.STRING, description: 'Add the website url if present on the product. If abscent, leave this field as an empty string "".' },
            },
        },
        warning_info: {
            type: SchemaType.ARRAY,
            description: "An array of warning information. Create one object for each language found on the product. If no English is present, translate the text and also add this to the array. Use ISO 639-1 language codes for 'lang'.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language in capital letters (e.g., 'EN', 'NL', 'FR')." },
                    text: { type: SchemaType.STRING, description: "The product warning information text in the specified language." }
                }
            }
        },
        ingredients_list: {
            type: SchemaType.ARRAY,
            description: "An array of ingredient lists. Create one object for each language found on the can. If no English is present, translate the text and also add this to the array.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language in capital letters (e.g., 'EN', 'NL', 'FR').." },
                    text: { type: SchemaType.STRING, description: "The full ingredients list in the specified language." }
                }
            }
        },
        nutrition_tables: {
            type: SchemaType.ARRAY,
            description: "An array of nutritional information tables. If no specific information about a certain ingredient in the given structure is found, add '/' to this field. If no English is present, translate the text and also add this to the array. Calculate the right amounts of nutrients for 500 mL if this information is not present.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language of this table in capital letters (e.g., 'EN', 'PL', 'DE')." },
                    header: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: { type: SchemaType.STRING, description: "The title of the nutrition facts, e.g., 'Typical values'." },
                            per_100mL: { type: SchemaType.STRING, description: "The header for the 'per 100ml' column." },
                            per_500mL: { type: SchemaType.STRING, description: "The header for the 'per 500ml' or 'per serving' column." }
                        }
                    },
                    basic_info: {
                        type: SchemaType.OBJECT,
                        description: 'Add any nutrition information that is present. If no nutrition value is present, keep the object, but add "/" to this field.',
                        properties: {
                            energy: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            fat: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            saturated_fat: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            cholesterol: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            carbohydrates: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            sugars: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            dietary_fiber: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            protein: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            salt: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [NaCl] here." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            calcium: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [Ca] here." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            potassium: {
                                type: SchemaType.OBJECT,
                                description: 'If no nutrition value is present, keep the object, but add 0 to this field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [K] here." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            }
                        },
                        required: ['energy', 'fat', 'saturated_fat', 'cholesterol', 'carbohydrates', 'sugars', 'dietary_fiber', 'protein', 'salt', 'calcium', 'potassium']
                    },
                    vitamins: {
                        type: SchemaType.OBJECT,
                        description: 'Add any vitamin information that is present. If no nutrition value is present, keep the object, but add "/" to this field.',
                        properties: {
                            header: {
                                type: SchemaType.STRING
                            },
                            vit_A: {
                                type: SchemaType.OBJECT,
                                description: 'ALWAYS use the vitamin letters as the name, e.g. Vitamin B12, Vitamin C. Add the full name in the xtra field as is instructed there.',
                                properties: { name: '{ type: SchemaType.STRING }', per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } },
                                required: ['name', 'per_100mL', 'per_500mL']
                            },
                            vit_B1: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. In English: Thiamine." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B2: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. In English: Riboflavin." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B3: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. In English: Niacin." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B5: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. In English: Pantothenic acid." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B6: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Pyridoxine." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B7: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Biotin." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B9: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Folic acid and folates." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_B12: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Cobalamins." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_C: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Ascorbic acid and ascorbates." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_D: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Calciferols." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_E: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Tocopherols and tocotrienols." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            },
                            vit_K: {
                                type: SchemaType.OBJECT,
                                description: 'Use the vitamin letters as the name, e.g. Vitamin B12. Vitamin C. Add the full name in the xtra field.',
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here if applicable. Reference: in English: Phylloquinones, menaquinones, and menadiones." } },
                                required: ['name', 'per_100mL', 'per_500mL', 'xtra']
                            }
                        }
                    },
                }
            }
        },
    }
};