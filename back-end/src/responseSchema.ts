import { SchemaType } from '@google-cloud/vertexai';

export const responseSchema = {
    type: SchemaType.OBJECT,
    description: 'Represents a single beverage product, with support for multiple languages.',
    properties: {
        id: { type: SchemaType.NUMBER, description: 'Unique identifier for the product. If not present, leave as 0.' },
        slug: { type: SchemaType.STRING, description: 'A URL-friendly slug for the product. Use the naming convention: brand-country_code-sku-lineup-flavour. All lowercase and separated by hyphens.' },
        info: {
            type: SchemaType.OBJECT,
            properties: {
                brand: { type: SchemaType.STRING, description: 'The brand of the drink, e.g., Monster.' },
                line_up: { type: SchemaType.STRING, description: 'The specific product line, e.g., Juice, Punch, Ultra.' },
                name: { type: SchemaType.STRING, description: 'The name of the flavour, e.g., Pipeline Punch.' },
                country_code: { type: SchemaType.STRING, description: 'The two-letter ISO 3166-1 alpha-2 country code, e.g., PL, BE, DE.' },
                country: { type: SchemaType.STRING, description: 'The country name, e.g., Poland, Belgium.' },
                sku: { type: SchemaType.STRING, description: 'The Stock Keeping Unit or product code found on the can above the barcode.' },
                month: { type: SchemaType.STRING, description: 'The production month. This is always the first two numbers in the sku.' },
                year: { type: SchemaType.STRING, description: 'The production year. If the sku is a 4-digit code (e.g., 0719), this is the last two digits (19). If it is a 3-digit code (e.g., 108), it is the last digit (8).' },
                volume: { type: SchemaType.STRING, description: 'The volume of the can, e.g., 500 mL, 16 fl. oz.' },
                tab: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                top: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                producers: {
                    type: SchemaType.ARRAY,
                    description: 'Leave this as an empty string.',
                    items: { type: SchemaType.STRING }
                }
            }
        },
        flavour_descriptions: {
            type: SchemaType.ARRAY,
            description: "An array of flavour descriptions. Create one object for each language found on the can. If no English is present, translate the text and also add this to the array. Use ISO 639-1 language codes for 'lang'.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language (e.g., 'EN', 'NL', 'FR')." },
                    text: { type: SchemaType.STRING, description: "The flavour description text in the specified language." }
                }
            }
        },
        can_texts: {
            type: SchemaType.ARRAY,
            description: "An array of marketing texts from the can. Create one object for each language. If no English is present, translate the text and also add this to the array.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language." },
                    text: {
                        type: SchemaType.ARRAY,
                        description: "An array of text blocks or paragraphs in the specified language.",
                        items: { type: SchemaType.STRING }
                    }
                }
            }
        },
        ingredients_list: {
            type: SchemaType.ARRAY,
            description: "An array of ingredient lists. Create one object for each language found on the can. If no English is present, translate the text and also add this to the array.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language." },
                    text: { type: SchemaType.STRING, description: "The full ingredients list in the specified language." }
                }
            }
        },
        nutrition_tables: {
            type: SchemaType.ARRAY,
            description: "An array of nutritional information tables. If no specific information about a certain ingredient in the given structure is found, leave it empty. If no English is present, translate the text and also add this to the array.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    lang: { type: SchemaType.STRING, description: "The ISO 639-1 code for the language of this table (e.g., 'EN', 'PL', 'DE')." },
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
                        properties: {
                            energy: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            fat: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            saturated_fat: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            cholesterol: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            carbohydrates: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            sugars: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            dietary_fiber: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            protein: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            salt: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [NaCl] here." } }
                            },
                            calcium: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [Ca] here." } }
                            },
                            potassium: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put [K] here." } }
                            }
                        }
                    },
                    vitamins: {
                        type: SchemaType.OBJECT,
                        properties: {
                            header: {
                                type: SchemaType.STRING
                            },
                            vit_B2: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here e.g. (Riboflavin) for English." } }
                            },
                            vit_B3: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here e.g. (Niacin) for English." } }
                            },
                            vit_B5: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING }, xtra: { type: SchemaType.STRING, description: "Always put the full name of the vitamin in the corresponding language here e.g. (Pantothenic acid) for English." } }
                            },
                            vit_B6: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            vit_B12: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            }
                        }
                    },
                    energy_blend: {
                        type: SchemaType.OBJECT,
                        properties: {
                            header: {
                                type: SchemaType.STRING
                            },
                            caffeine: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            ginseng: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            guarana: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            inositol: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            glucuronolactone: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            }
                        }
                    },
                    amino_acids: {
                        type: SchemaType.OBJECT,
                        properties: {
                            header: {
                                type: SchemaType.STRING
                            },
                            L_arcanine: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            L_arginine: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            },
                            Taurine: {
                                type: SchemaType.OBJECT,
                                properties: { name: { type: SchemaType.STRING }, per_100mL: { type: SchemaType.STRING }, per_500mL: { type: SchemaType.STRING } }
                            }
                        }
                    }
                }
            }
        },
        imgs: {
            type: SchemaType.OBJECT,
            description: "Placeholder for image URLs. Leave these fields as empty strings.",
            properties: {
                front: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                back: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                left: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                right: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                top: { type: SchemaType.STRING, description: 'Leave this as an empty string.' },
                bottom: { type: SchemaType.STRING, description: 'Leave this as an empty string.' }
            }
        }
    }
};