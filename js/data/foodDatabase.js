/**
 * BASE DE DATOS DE ALIMENTOS REALES CON INFORMACIÓN NUTRICIONAL EXACTA POR 100g
 * Valores analíticos reales para cálculo nutricional estricto de deportistas.
 */

const FOOD_DATABASE = [
    // ═══════════════════════════════════════════════════════════════
    // PROTEÍNAS MAGRAS Y PESCADOS (15 alimentos)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "pechuga-pollo",
        name: "Pechuga de Pollo (Cruda / Plancha)",
        category: "Proteína",
        per100g: { calories: 120, protein: 23.0, carbs: 0.0, fat: 2.5, fiber: 0.0 },
        tags: ["magro", "pollo", "carne", "proteina"]
    },
    {
        id: "pechuga-pavo",
        name: "Pechuga de Pavo Fresca",
        category: "Proteína",
        per100g: { calories: 105, protein: 24.0, carbs: 0.0, fat: 1.0, fiber: 0.0 },
        tags: ["pavo", "magro", "carne"]
    },
    {
        id: "ternera-magra",
        name: "Carne Picada de Ternera Magra (5% grasa)",
        category: "Proteína",
        per100g: { calories: 137, protein: 21.5, carbs: 0.0, fat: 5.0, fiber: 0.0 },
        tags: ["ternera", "carne", "hierro", "creatina"]
    },
    {
        id: "solomillo-ternera",
        name: "Solomillo de Ternera",
        category: "Proteína",
        per100g: { calories: 155, protein: 22.0, carbs: 0.0, fat: 7.0, fiber: 0.0 },
        tags: ["ternera", "solomillo", "carne"]
    },
    {
        id: "lomo-cerdo-magro",
        name: "Lomo de Cerdo Magro",
        category: "Proteína",
        per100g: { calories: 143, protein: 22.0, carbs: 0.0, fat: 5.5, fiber: 0.0 },
        tags: ["cerdo", "magro", "lomo"]
    },
    {
        id: "huevo-entero",
        name: "Huevo Entero de Gallina (M/L)",
        category: "Proteína / Grasa",
        per100g: { calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0.0 },
        tags: ["huevo", "desayuno", "colina"]
    },
    {
        id: "clara-huevo",
        name: "Clara de Huevo Líquida / Cocida",
        category: "Proteína",
        per100g: { calories: 52, protein: 11.0, carbs: 0.7, fat: 0.2, fiber: 0.0 },
        tags: ["clara", "magro", "albúmina"]
    },
    {
        id: "salmon-fresco",
        name: "Salmón Atlántico Fresco",
        category: "Proteína / Grasa",
        per100g: { calories: 208, protein: 20.0, carbs: 0.0, fat: 13.0, fiber: 0.0 },
        tags: ["pescado", "omega3", "salmon"]
    },
    {
        id: "atun-natural",
        name: "Atún Claro al Natural en Lata",
        category: "Proteína",
        per100g: { calories: 101, protein: 23.5, carbs: 0.0, fat: 0.8, fiber: 0.0 },
        tags: ["pescado", "lata", "atun"]
    },
    {
        id: "merluza-fresca",
        name: "Lomo de Merluza Fresca / Congelada",
        category: "Proteína",
        per100g: { calories: 72, protein: 16.5, carbs: 0.0, fat: 0.6, fiber: 0.0 },
        tags: ["pescado blanco", "merluza", "magro"]
    },
    {
        id: "bacalao-desmigado",
        name: "Bacalao Fresco / Desalado",
        category: "Proteína",
        per100g: { calories: 78, protein: 17.5, carbs: 0.0, fat: 0.7, fiber: 0.0 },
        tags: ["pescado blanco", "bacalao"]
    },
    {
        id: "lomo-latigo-langostino",
        name: "Langostinos / Gambas Peladas",
        category: "Proteína",
        per100g: { calories: 85, protein: 18.0, carbs: 0.5, fat: 1.0, fiber: 0.0 },
        tags: ["marisco", "gambas", "langostinos"]
    },
    {
        id: "queso-batido-0",
        name: "Queso Fresco Batido 0% M.G. / Skyr",
        category: "Proteína",
        per100g: { calories: 55, protein: 10.0, carbs: 3.5, fat: 0.1, fiber: 0.0 },
        tags: ["lacteo", "postre", "skyr", "caseina"]
    },
    {
        id: "yogur-griego-light",
        name: "Yogur Griego 0% / Light",
        category: "Proteína",
        per100g: { calories: 59, protein: 9.5, carbs: 4.0, fat: 0.2, fiber: 0.0 },
        tags: ["lacteo", "yogur", "griego"]
    },
    {
        id: "queso-cottage",
        name: "Queso Cottage Light (Requesón Magro)",
        category: "Proteína",
        per100g: { calories: 72, protein: 12.0, carbs: 2.7, fat: 1.5, fiber: 0.0 },
        tags: ["lacteo", "cottage", "requeson"]
    },
    {
        id: "whey-protein",
        name: "Proteína de Suero en Polvo (Whey Isolate / Concentrate)",
        category: "Suplemento",
        per100g: { calories: 375, protein: 80.0, carbs: 5.0, fat: 3.5, fiber: 0.0 },
        tags: ["suplemento", "batido", "whey", "post-workout"]
    },
    {
        id: "caseina-micelar",
        name: "Caseína Micelar en Polvo",
        category: "Suplemento",
        per100g: { calories: 360, protein: 78.0, carbs: 4.0, fat: 1.5, fiber: 0.0 },
        tags: ["suplemento", "noches", "caseina"]
    },

    // ═══════════════════════════════════════════════════════════════
    // CARBOHIDRATOS DE RENDIMIENTO (15 alimentos)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "avena-integral",
        name: "Avena Integral en Copos / Harina de Avena",
        category: "Carbohidrato",
        per100g: { calories: 370, protein: 13.5, carbs: 60.0, fat: 6.9, fiber: 10.0 },
        tags: ["desayuno", "avena", "complejo", "fibra"]
    },
    {
        id: "arroz-basmati",
        name: "Arroz Basmati / Jazmín (Peso en Crudo)",
        category: "Carbohidrato",
        per100g: { calories: 350, protein: 7.0, carbs: 77.0, fat: 0.6, fiber: 1.5 },
        tags: ["arroz", "post-workout", "limpio", "glucogeno"]
    },
    {
        id: "arroz-integral",
        name: "Arroz Integral (Peso en Crudo)",
        category: "Carbohidrato",
        per100g: { calories: 345, protein: 7.5, carbs: 72.0, fat: 2.2, fiber: 4.0 },
        tags: ["arroz", "integral", "fibra"]
    },
    {
        id: "crema-de-arroz",
        name: "Crema de Arroz Pre-gelatinizada",
        category: "Carbohidrato",
        per100g: { calories: 365, protein: 7.0, carbs: 82.0, fat: 0.8, fiber: 1.0 },
        tags: ["crema arroz", "pre-workout", "digestivo"]
    },
    {
        id: "patata-cocida",
        name: "Patata / Papa (Hervida / Asada)",
        category: "Carbohidrato",
        per100g: { calories: 77, protein: 2.0, carbs: 17.0, fat: 0.1, fiber: 2.2 },
        tags: ["patata", "saciedad", "potasio"]
    },
    {
        id: "boniato-camote",
        name: "Boniato / Batata / Camote",
        category: "Carbohidrato",
        per100g: { calories: 86, protein: 1.6, carbs: 20.0, fat: 0.1, fiber: 3.0 },
        tags: ["batata", "antiox", "bajo ig"]
    },
    {
        id: "pasta-integral",
        name: "Pasta Integral (Macarrones / Espaguetis en Crudo)",
        category: "Carbohidrato",
        per100g: { calories: 348, protein: 13.0, carbs: 65.0, fat: 2.0, fiber: 9.0 },
        tags: ["pasta", "integral", "resistencia"]
    },
    {
        id: "quinoa-real",
        name: "Quinoa Real (En Crudo)",
        category: "Carbohidrato",
        per100g: { calories: 368, protein: 14.0, carbs: 64.0, fat: 6.0, fiber: 7.0 },
        tags: ["quinoa", "pseudo-cereal", "aminoacidos"]
    },
    {
        id: "pan-masa-madre",
        name: "Pan 100% Integral de Masa Madre",
        category: "Carbohidrato",
        per100g: { calories: 245, protein: 9.0, carbs: 48.0, fat: 1.8, fiber: 6.0 },
        tags: ["pan", "masa madre", "desayuno"]
    },
    {
        id: "platano",
        name: "Plátano / Banano Fresco",
        category: "Fruta",
        per100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
        tags: ["fruta", "pre-workout", "potasio", "fructosa"]
    },
    {
        id: "manzana",
        name: "Manzana Fresca con Piel",
        category: "Fruta",
        per100g: { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4 },
        tags: ["fruta", "manzana", "pectina"]
    },
    {
        id: "frutos-rojos",
        name: "Frutos Rojos (Arándanos, Frambuesas, Fresas)",
        category: "Fruta",
        per100g: { calories: 43, protein: 0.9, carbs: 9.5, fat: 0.4, fiber: 4.5 },
        tags: ["fruta", "antiox", "fibra", "arandanos"]
    },
    {
        id: "tortitas-arroz",
        name: "Tortitas de Arroz Integral",
        category: "Carbohidrato",
        per100g: { calories: 380, protein: 8.0, carbs: 80.0, fat: 2.5, fiber: 3.5 },
        tags: ["tortitas", "snack", "rapido"]
    },
    {
        id: "copos-maiz-sin-azucar",
        name: "Copos de Maíz Sin Azúcar Añadido (Corn Flakes)",
        category: "Carbohidrato",
        per100g: { calories: 370, protein: 7.5, carbs: 83.0, fat: 0.8, fiber: 3.0 },
        tags: ["maiz", "cereal", "pre-workout"]
    },

    // ═══════════════════════════════════════════════════════════════
    // GRASAS SALUDABLES Y FRUTOS SECOS (10 alimentos)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "aove",
        name: "Aceite de Oliva Virgen Extra (AOVE)",
        category: "Grasa",
        per100g: { calories: 884, protein: 0.0, carbs: 0.0, fat: 100.0, fiber: 0.0 },
        tags: ["aceite", "saludable", "oleico", "aove"]
    },
    {
        id: "crema-cacahuete",
        name: "Crema de Cacahuete 100% Natural",
        category: "Grasa / Proteína",
        per100g: { calories: 588, protein: 25.0, carbs: 20.0, fat: 50.0, fiber: 8.0 },
        tags: ["cacahuete", "calorico", "crema"]
    },
    {
        id: "almendras-crudas",
        name: "Almendras Crudas Sin Sal",
        category: "Grasa",
        per100g: { calories: 579, protein: 21.0, carbs: 21.6, fat: 49.9, fiber: 12.5 },
        tags: ["frutos secos", "snack", "almendras", "vitamina e"]
    },
    {
        id: "nueces-peladas",
        name: "Nueces Peladas de California",
        category: "Grasa",
        per100g: { calories: 654, protein: 15.0, carbs: 13.7, fat: 65.2, fiber: 6.7 },
        tags: ["nueces", "omega3", "frutos secos"]
    },
    {
        id: "aguacate",
        name: "Aguacate Hass Fresco",
        category: "Grasa",
        per100g: { calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, fiber: 6.7 },
        tags: ["aguacate", "potasio", "grasa saludable"]
    },
    {
        id: "semillas-chia",
        name: "Semillas de Chía",
        category: "Grasa / Fibra",
        per100g: { calories: 486, protein: 16.5, carbs: 42.0, fat: 30.7, fiber: 34.4 },
        tags: ["chia", "semillas", "fibra", "omega3"]
    },
    {
        id: "semillas-lino",
        name: "Semillas de Lino Dorado / Marrón Molidas",
        category: "Grasa",
        per100g: { calories: 534, protein: 18.0, carbs: 28.0, fat: 42.0, fiber: 27.0 },
        tags: ["lino", "semillas", "lignanos"]
    },
    {
        id: "chocolate-negro-85",
        name: "Chocolate Negro 85% Cacao",
        category: "Grasa",
        per100g: { calories: 580, protein: 9.0, carbs: 20.0, fat: 46.0, fiber: 11.0 },
        tags: ["chocolate", "cacao", "antiox"]
    },

    // ═══════════════════════════════════════════════════════════════
    // LEGUMBRES Y PROTEÍNAS VEGETALES (6 alimentos)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "garbanzos-cocidos",
        name: "Garbanzos Cocidos (En Tarro / Cocinados)",
        category: "Legumbre",
        per100g: { calories: 130, protein: 7.5, carbs: 18.0, fat: 2.2, fiber: 5.5 },
        tags: ["legumbre", "garbanzos", "fibra"]
    },
    {
        id: "lentejas-cocidas",
        name: "Lentejas Cocidas / En conserva",
        category: "Legumbre",
        per100g: { calories: 116, protein: 9.0, carbs: 15.5, fat: 0.5, fiber: 4.0 },
        tags: ["lentejas", "legumbre", "hierro"]
    },
    {
        id: "tofu-firme",
        name: "Tofu Firme de Soja Orgánico",
        category: "Proteína Vegetal",
        per100g: { calories: 120, protein: 12.0, carbs: 2.0, fat: 7.0, fiber: 1.5 },
        tags: ["tofu", "soja", "vegan"]
    },
    {
        id: "tempeh-soja",
        name: "Tempeh de Soja Fermentado",
        category: "Proteína Vegetal",
        per100g: { calories: 193, protein: 19.0, carbs: 9.0, fat: 11.0, fiber: 4.5 },
        tags: ["tempeh", "vegan", "fermentado"]
    },
    {
        id: "edamame-soja",
        name: "Edamame (Vainas de Soja Verde)",
        category: "Proteína Vegetal",
        per100g: { calories: 122, protein: 11.0, carbs: 9.0, fat: 5.0, fiber: 5.0 },
        tags: ["edamame", "snack", "vegan"]
    },

    // ═══════════════════════════════════════════════════════════════
    // VERDURAS Y HORTALIZAS ESSENTIALS (6 alimentos)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "brocoli-fresco",
        name: "Brócoli Fresco (Al Vapor / Cocido)",
        category: "Verdura",
        per100g: { calories: 34, protein: 2.8, carbs: 4.0, fat: 0.4, fiber: 2.6 },
        tags: ["brocoli", "verdura", "sulforafano", "micro"]
    },
    {
        id: "espinacas-frescas",
        name: "Espinacas Frescas / Salteadas",
        category: "Verdura",
        per100g: { calories: 23, protein: 2.9, carbs: 1.4, fat: 0.4, fiber: 2.2 },
        tags: ["espinacas", "nitratos", "magnesio"]
    },
    {
        id: "espárragos-trigueros",
        name: "Espárragos Verdes Trigueros",
        category: "Verdura",
        per100g: { calories: 20, protein: 2.2, carbs: 1.8, fat: 0.2, fiber: 2.1 },
        tags: ["esparragos", "diuretico"]
    },
    {
        id: "champiñones-setas",
        name: "Champiñones / Setas Variadas",
        category: "Verdura",
        per100g: { calories: 22, protein: 3.1, carbs: 1.0, fat: 0.3, fiber: 1.0 },
        tags: ["setas", "champinon", "saciedad"]
    }
];
