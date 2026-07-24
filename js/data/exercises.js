/**
|--------------------------------------------------------------------------
| BASE DE DATOS MASIVA: 50+ EJERCICIOS CIENTÍFICOS CON BIOMECÁNICA COMPLETA
| Cada ejercicio con imagen específica por grupo muscular, pasos de ejecución,
| errores comunes, tempo, descanso y RIR recomendado.
|--------------------------------------------------------------------------
| IMÁGENES POR GRUPO MUSCULAR:
|   Pecho        → img/ex_bench.jpg
|   Espalda      → img/ex_pullup.jpg
|   Hombros      → img/ex_overhead_press.jpg  /  img/ex_lateral_raise.jpg
|   Cuádriceps   → img/ex_squat.jpg  /  img/ex_leg_press.jpg
|   Isquios/Glúteo → img/ex_deadlift.jpg
|   Bíceps       → img/ex_biceps_curl.jpg
|   Tríceps      → img/ex_triceps_pushdown.jpg
|--------------------------------------------------------------------------
*/

const EXERCISES_DATABASE = [

    // ═══════════════════════════════════════════════════════════════
    //  PECHO  (8 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "bench-press-barbell",
        name: "Press de Banca Plano con Barra",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Hombros", "Tríceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 180, tempo: "3-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Túmbate con los pies firmemente apoyados y la espalda arqueada de forma natural.",
            "Retrae las escápulas hacia atrás y abajo creando un puente escapular.",
            "Baja la barra de forma controlada (3 seg) hasta la línea del esternón medio.",
            "Empuja en diagonal hacia arriba bloqueando los codos sin rebotar."
        ],
        tips: "Retracción escapular obligatoria. Codos a 45° para proteger el hombro.",
        mistakes: "Rebotar la barra en el pecho, despegar los glúteos, codos a 90°."
    },
    {
        id: "incline-dumbbell-press",
        name: "Press Inclinado con Mancuernas (30°)",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Hombros", "Tríceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Ajusta el banco a 30° (no más de 45° para no desviar trabajo al deltoides).",
            "Sube las mancuernas al nivel del pecho con las muñecas neutras.",
            "Baja controlando hasta sentir un estiramiento profundo en el pectoral clavicular.",
            "Empuja apretando el pecho sin chocar las mancuernas arriba."
        ],
        tips: "Enfocado en la porción clavicular del pectoral mayor.",
        mistakes: "Inclinación excesiva (>45°), rango parcial sin estiramiento."
    },
    {
        id: "decline-barbell-press",
        name: "Press Declinado con Barra",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Tríceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 150, tempo: "3-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Fija los pies en los soportes del banco declinado (-15° a -30°).",
            "Retrae las escápulas y baja la barra hasta la parte baja del esternón.",
            "Empuja explosivamente manteniendo el arco escapular."
        ],
        tips: "Activa la porción esternal e inferior del pectoral mayor.",
        mistakes: "Llevar la barra demasiado arriba hacia la clavícula."
    },
    {
        id: "weighted-dips-chest",
        name: "Fondos en Paralelas Lastrados (Énfasis Pecho)",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Tríceps", "Hombros"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 150, tempo: "3-0-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Agárrate a las barras paralelas y eleva el cuerpo.",
            "Inclina el torso 30° hacia adelante para dirigir el estímulo al pecho.",
            "Desciende hasta que los codos formen 90° de forma controlada.",
            "Empuja con el pectoral para volver arriba."
        ],
        tips: "La inclinación del torso es clave: recto = tríceps, inclinado = pecho.",
        mistakes: "Descender demasiado sin movilidad de hombro, torso recto."
    },
    {
        id: "chest-flyes-cable",
        name: "Cruce de Poleas (Cable Fly) De Pie",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-2-1",
        image: "img/ex_bench.jpg",
        steps: [
            "Poleas a la altura de los hombros, da un paso adelante.",
            "Con los codos ligeramente flexionados, junta las manos frente al pecho.",
            "Aprieta el pectoral 1 segundo en la máxima contracción.",
            "Regresa controlando la fase excéntrica (2 seg)."
        ],
        tips: "Máxima aducción horizontal del húmero. Tensión constante.",
        mistakes: "Doblar excesivamente los codos convirtiéndolo en un press."
    },
    {
        id: "pec-deck-machine",
        name: "Aperturas en Máquina Pec-Deck (Contractora)",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_bench.jpg",
        steps: [
            "Ajusta el asiento para que los brazos queden a la altura de los hombros.",
            "Junta los cojines al frente apretando el pectoral.",
            "Mantén la contracción 1 segundo y vuelve controlando."
        ],
        tips: "Tensión constante sin sobrecargar el hombro anterior.",
        mistakes: "Usar impulso con el torso, no controlar la excéntrica."
    },
    {
        id: "incline-cable-fly",
        name: "Apertura en Polea Baja Inclinada (Low-to-High Fly)",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-2-1",
        image: "img/ex_bench.jpg",
        steps: [
            "Poleas abajo, banco a 30° o de pie con torso inclinado.",
            "Lleva las manos desde abajo hacia arriba en arco juntándolas sobre el pecho.",
            "Aprieta la porción clavicular del pectoral 1 segundo arriba."
        ],
        tips: "Fantástico para la fibra clavicular superior del pectoral.",
        mistakes: "Usar demasiado peso perdiendo la conexión mente-músculo."
    },
    {
        id: "dumbbell-pullover",
        name: "Pullover con Mancuerna en Banco",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Espalda"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Túmbate transversal en el banco sujetando una mancuerna con ambas manos.",
            "Lleva la mancuerna detrás de la cabeza sintiendo un estiramiento profundo.",
            "Regresa con un arco controlado apretando pecho y serratos."
        ],
        tips: "Estira pecho, serratos y dorsal. Excelente movilidad torácica.",
        mistakes: "Flexionar los codos excesivamente, usar demasiado peso."
    },

    // ═══════════════════════════════════════════════════════════════
    //  ESPALDA  (8 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "pullups-weighted",
        name: "Dominadas Pronadas Lastradas",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps", "Hombros"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 150, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Cuélgate con agarre ligeramente más ancho que los hombros.",
            "Deprime las escápulas antes de iniciar la tracción.",
            "Tira dirigiendo los codos hacia las caderas hasta que el pecho toque la barra.",
            "Desciende de forma totalmente controlada hasta extensión completa."
        ],
        tips: "El rey de la espalda. Pecho a la barra, no barbilla.",
        mistakes: "Kipping (inercia), no extender completamente abajo."
    },
    {
        id: "barbell-row",
        name: "Remo Pendlay con Barra (Torso 90°)",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps", "Isquios"],
        type: "Multiarticular", defaultRir: 2, restSeconds: 150, tempo: "2-0-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Inclínate hasta que el torso esté casi paralelo al suelo.",
            "Tracciona la barra explosivamente hacia el ombligo apretando escápulas.",
            "Apoya la barra en el suelo entre repeticiones (Pendlay) o mantén tensión."
        ],
        tips: "Columna neutra, torso rígido. Excelente para densidad de espalda.",
        mistakes: "Levantar el torso para mover el peso, curvar la lumbar."
    },
    {
        id: "single-arm-dumbbell-row",
        name: "Remo Unilateral con Mancuerna",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_pullup.jpg",
        steps: [
            "Apoya la rodilla y mano contraria en un banco.",
            "Tracciona la mancuerna en arco llevando el codo hacia la cadera.",
            "Siente el estiramiento profundo del dorsal al bajar."
        ],
        tips: "Gran amplitud de recorrido unilateral. Corrige asimetrías.",
        mistakes: "Rotar excesivamente el torso, tirar solo con el bíceps."
    },
    {
        id: "lat-pulldown-wide",
        name: "Jalón al Pecho Agarre Ancho (Lat Pulldown)",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "3-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Siéntate con los muslos bloqueados bajo los cojines.",
            "Agarra la barra ancha y tracciona hacia la parte alta del pecho.",
            "Junta las escápulas atrás y controla la subida (3 seg excéntrica)."
        ],
        tips: "Alternativa perfecta a dominadas para controlar la carga exacta.",
        mistakes: "Tirar hacia la nuca (lesión cervical), balanceo lumbar."
    },
    {
        id: "lat-pulldown-neutral",
        name: "Jalón al Pecho Agarre Neutro / Cerrado",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Usa un agarre estrecho con palmas enfrentadas (neutro).",
            "Tracciona hacia el pecho llevando los codos cerca del cuerpo.",
            "Enfatiza la parte baja del dorsal ancho y romboides."
        ],
        tips: "Excelente para la porción inferior del dorsal y redondo mayor.",
        mistakes: "Inclinar el torso hacia atrás excesivamente."
    },
    {
        id: "seated-cable-row",
        name: "Remo en Polea Baja Sentado (Gironda)",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Siéntate con los pies en la plataforma y agarra el accesorio.",
            "Tracciona hacia el abdomen juntando las escápulas atrás.",
            "Regresa controlando sin dejar que la columna se flexione."
        ],
        tips: "Densidad de espalda media: romboides y trapecio medio.",
        mistakes: "Hiperextender la columna, usar inercia con el torso."
    },
    {
        id: "t-bar-row",
        name: "Remo en T-Bar (Landmine Row)",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps", "Isquios"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 150, tempo: "2-0-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Coloca un extremo de la barra en una esquina o soporte landmine.",
            "Inclínate con la espalda recta y tracciona la barra hacia el pecho.",
            "Aprieta las escápulas arriba y baja controlando."
        ],
        tips: "Movimiento de tracción densa. Excelente para grosor de espalda.",
        mistakes: "Curvar la zona lumbar, elevar el torso."
    },
    {
        id: "face-pulls",
        name: "Face Pulls en Polea con Cuerda",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Hombros"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Polea a la altura de la cara con accesorio de cuerda.",
            "Tira hacia la frente separando los extremos de la cuerda.",
            "Rota externamente los hombros al final del movimiento.",
            "Regresa despacio manteniendo la tensión."
        ],
        tips: "Fundamental para salud del manguito rotador y deltoides posterior.",
        mistakes: "Usar demasiado peso, no rotar externamente al final."
    },

    // ═══════════════════════════════════════════════════════════════
    //  HOMBROS  (7 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "overhead-press",
        name: "Press Militar de Pie con Barra (OHP)",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Tríceps", "Abdomen"],
        type: "Multiarticular", defaultRir: 2, restSeconds: 180, tempo: "2-1-1-0",
        image: "img/ex_overhead_press.jpg",
        steps: [
            "Barra sobre los deltoides anteriores, agarre un poco más ancho que hombros.",
            "Aprieta abdomen y glúteos para crear un pilar rígido.",
            "Empuja verticalmente pasando por delante del rostro.",
            "Bloquea arriba con la barra directamente sobre la cabeza."
        ],
        tips: "El compuesto de hombros por excelencia. Rigidez total del core.",
        mistakes: "Arquear excesivamente la lumbar, doblar rodillas para impulso."
    },
    {
        id: "dumbbell-shoulder-press",
        name: "Press de Hombros Sentado con Mancuernas",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Tríceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_overhead_press.jpg",
        steps: [
            "Siéntate en banco a 90° con las mancuernas a la altura de las orejas.",
            "Empuja las mancuernas verticalmente sin chocarlas arriba.",
            "Baja de forma controlada hasta que los codos queden a 90°."
        ],
        tips: "Permite mayor rango de movimiento que la barra.",
        mistakes: "Abrir demasiado los codos, arquear la espalda."
    },
    {
        id: "arnold-press",
        name: "Press Arnold con Mancuernas",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Tríceps"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_overhead_press.jpg",
        steps: [
            "Comienza con las mancuernas frente a la cara, palmas hacia ti.",
            "Rota las palmas hacia afuera mientras empujas arriba.",
            "Bloquea arriba con las palmas mirando al frente.",
            "Invierte el movimiento controlando la bajada."
        ],
        tips: "Activa las 3 cabezas del deltoides con la rotación.",
        mistakes: "Rotar demasiado rápido, no controlar la excéntrica."
    },
    {
        id: "lateral-raises-dumbbell",
        name: "Elevaciones Laterales con Mancuernas",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-0-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "De pie, mancuernas a los lados con codos ligeramente flexionados.",
            "Eleva los brazos lateralmente en el plano escapular (30° adelante).",
            "Sube hasta la altura de los hombros y baja controlando."
        ],
        tips: "El aislamiento rey del deltoides lateral. No subas por encima del hombro.",
        mistakes: "Usar inercia balanceando el torso, subir los trapecios."
    },
    {
        id: "lateral-raises-cable",
        name: "Elevaciones Laterales en Polea Baja",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Polea baja en el lado contrario al brazo que trabaja.",
            "Eleva el brazo lateralmente manteniendo el codo fijo.",
            "Máxima tensión en la cima del movimiento (1 seg pausa)."
        ],
        tips: "La polea mantiene tensión constante en todo el rango — superior a mancuernas.",
        mistakes: "Usar el cuerpo para generar inercia."
    },
    {
        id: "rear-delt-fly-machine",
        name: "Aperturas Posteriores en Máquina (Rear Delt Fly)",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Espalda"],
        type: "Aislamiento", defaultRir: 0, restSeconds: 60, tempo: "2-1-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Siéntate mirando hacia el pad de la máquina pec-deck invertida.",
            "Agarra los manillares y abre los brazos hacia atrás.",
            "Aprieta el deltoides posterior y trapecio en la máxima contracción."
        ],
        tips: "Clave para equilibrio estético y salud del manguito rotador.",
        mistakes: "Usar inercia, no llegar a la máxima contracción."
    },
    {
        id: "upright-row-cable",
        name: "Remo al Mentón en Polea (Upright Row)",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Trapecios"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 90, tempo: "2-0-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Agarre estrecho en la polea baja (o barra/cuerda).",
            "Eleva tirando con los codos hacia arriba y afuera.",
            "No subas más allá de la altura de los hombros."
        ],
        tips: "Variante en polea es más segura que con barra libre.",
        mistakes: "Subir demasiado (impingement), agarre demasiado estrecho."
    },

    // ═══════════════════════════════════════════════════════════════
    //  PIERNAS — CUÁDRICEPS  (7 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "back-squat-barbell",
        name: "Sentadilla Trasera Profunda con Barra",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Isquios", "Glúteos", "Abdomen"],
        type: "Multiarticular", defaultRir: 2, restSeconds: 180, tempo: "3-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Barra sobre los trapecios, pies a la anchura de los hombros.",
            "Inspira profundo y crea presión intraabdominal (bracing).",
            "Desciende rompiendo el paralelo con rodillas alineadas con los pies.",
            "Empuja el suelo con toda la planta del pie para subir."
        ],
        tips: "El rey de los ejercicios de pierna. Rompe siempre el paralelo.",
        mistakes: "Valgo de rodilla, levantar talones, flexión lumbar."
    },
    {
        id: "front-squat-barbell",
        name: "Sentadilla Frontal con Barra (Front Squat)",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Abdomen", "Glúteos"],
        type: "Multiarticular", defaultRir: 2, restSeconds: 180, tempo: "3-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Barra apoyada sobre los deltoides anteriores, codos altos.",
            "Torso lo más vertical posible durante todo el descenso.",
            "Desciende profundo manteniendo los codos arriba.",
            "Empuja subiendo con el pecho erguido."
        ],
        tips: "Mayor activación del cuádriceps que la sentadilla trasera.",
        mistakes: "Dejar caer los codos (la barra se cae), no tener movilidad."
    },
    {
        id: "leg-press-45",
        name: "Prensa de Piernas 45° (Leg Press)",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Isquios", "Glúteos"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "3-1-1-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Espalda y cabeza pegadas al respaldo, pies a la anchura de hombros.",
            "Desciende flexionando rodillas hasta 90° o más.",
            "Empuja sin bloquear completamente las rodillas arriba."
        ],
        tips: "Permite mover mucho peso con seguridad para la columna.",
        mistakes: "Despegar la lumbar del respaldo, bloqueo agresivo de rodillas."
    },
    {
        id: "bulgarian-split-squat",
        name: "Sentadilla Búlgara con Mancuernas",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos", "Isquios"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Pie trasero elevado en un banco, pie delantero adelantado.",
            "Desciende hasta que la rodilla trasera casi toque el suelo.",
            "Empuja con el pie delantero manteniendo el torso erguido."
        ],
        tips: "Máximo aislamiento unilateral. Corrige desequilibrios.",
        mistakes: "Paso demasiado corto (sobrecarga rodilla), inclinarse demasiado."
    },
    {
        id: "hack-squat-machine",
        name: "Sentadilla Hack en Máquina",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "3-1-1-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Espalda apoyada en el pad, hombros bajo los soportes.",
            "Pies bajos y juntos para enfatizar cuádriceps.",
            "Desciende profundo y empuja sin bloquear rodillas."
        ],
        tips: "Aísla los cuádriceps eliminando la demanda de estabilización lumbar.",
        mistakes: "Colocar los pies demasiado arriba (se convierte en glúteo)."
    },
    {
        id: "leg-extensions",
        name: "Extensión de Cuádriceps en Máquina",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Ajusta el pad justo encima de los tobillos.",
            "Extiende las piernas apretando el cuádriceps 1 segundo arriba.",
            "Baja controlando la excéntrica (2 seg)."
        ],
        tips: "Aislamiento directo del recto femoral y vasto lateral.",
        mistakes: "Usar inercia, no realizar la pausa de contracción."
    },
    {
        id: "walking-lunges",
        name: "Zancadas Caminando con Mancuernas",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos", "Isquios"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 90, tempo: "2-0-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Mancuernas a los lados, da un paso largo hacia adelante.",
            "Desciende hasta que la rodilla trasera casi toque el suelo.",
            "Empuja con el pie delantero para dar el siguiente paso."
        ],
        tips: "Excelente para coordinación, equilibrio y activación de glúteo.",
        mistakes: "Paso demasiado corto, tronco inclinado, rodilla pasando el pie."
    },

    // ═══════════════════════════════════════════════════════════════
    //  PIERNAS — ISQUIOTIBIALES & GLÚTEOS  (5 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "romanian-deadlift",
        name: "Peso Muerto Rumano con Barra (RDL)",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: ["Espalda", "Glúteos"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 150, tempo: "3-1-1-0",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Sostén la barra erguido con agarre prono a la anchura de hombros.",
            "Desplaza la cadera hacia atrás manteniendo rodillas semi-flexionadas.",
            "Baja la barra pegada a los muslos hasta sentir estiramiento en isquios.",
            "Contrae isquios y glúteos para volver a erguirte."
        ],
        tips: "Flexión de cadera profunda. Siente el estiramiento en isquios.",
        mistakes: "Doblar las rodillas excesivamente (no es sentadilla), redondear espalda."
    },
    {
        id: "deadlift-barbell",
        name: "Peso Muerto Convencional con Barra",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: ["Espalda", "Cuádriceps", "Abdomen"],
        type: "Multiarticular", defaultRir: 2, restSeconds: 180, tempo: "2-1-1-0",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Pies a la anchura de las caderas, barra pegada a las espinillas.",
            "Agarra la barra justo por fuera de las piernas, activa dorsales.",
            "Empuja el suelo con los pies manteniendo la espalda recta.",
            "Bloquea la cadera arriba apretando los glúteos."
        ],
        tips: "El rey de la fuerza total. Empuja el suelo, no tires de la barra.",
        mistakes: "Redondear la lumbar, alejar la barra del cuerpo."
    },
    {
        id: "hip-thrust-barbell",
        name: "Hip Thrust con Barra en Banco",
        category: "Piernas", muscleGroup: "Glúteos",
        secondaryMuscles: ["Isquios"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-1",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Espalda alta apoyada en el banco, barra sobre la cadera con pad.",
            "Pies a la anchura de los hombros, tibias verticales.",
            "Empuja la cadera hacia arriba apretando los glúteos 1 segundo.",
            "Baja controlando hasta que el glúteo casi toque el suelo."
        ],
        tips: "El rey del aislamiento de glúteo mayor. Retroversión pélvica arriba.",
        mistakes: "Hiperextender la lumbar, no hacer retroversión pélvica."
    },
    {
        id: "leg-curl-lying",
        name: "Curl Femoral Tumbado en Máquina",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Túmbate boca abajo, pad sobre los tobillos.",
            "Flexiona las rodillas llevando los talones hacia los glúteos.",
            "Aprieta los isquios 1 segundo y baja controlando."
        ],
        tips: "Aislamiento directo de los isquiotibiales.",
        mistakes: "Levantar la cadera del pad, usar inercia."
    },
    {
        id: "seated-leg-curl",
        name: "Curl Femoral Sentado en Máquina",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Siéntate con el pad sobre los tobillos y el soporte sobre los muslos.",
            "Flexiona las rodillas llevando los talones bajo el asiento.",
            "Controla la excéntrica (2 seg) para maximizar el daño muscular."
        ],
        tips: "Mayor estiramiento de los isquios que la versión tumbada.",
        mistakes: "Mover la espalda hacia atrás para ganar impulso."
    },

    // ═══════════════════════════════════════════════════════════════
    //  PIERNAS — PANTORRILLAS  (2 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "standing-calf-raises",
        name: "Elevaciones de Gemelos de Pie en Máquina",
        category: "Piernas", muscleGroup: "Pantorrillas",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 60, tempo: "2-1-2-1",
        image: "img/ex_squat.jpg",
        steps: [
            "Puntas de los pies en el borde de la plataforma, talones colgando.",
            "Empuja hacia arriba estirando los tobillos al máximo.",
            "Mantén 1 segundo arriba y baja lentamente estirando el gastrocnemio."
        ],
        tips: "Pausa de 2 seg abajo para estiramiento, 1 seg arriba contracción.",
        mistakes: "Rango parcial, velocidad excesiva, flexionar rodillas."
    },
    {
        id: "seated-calf-raises",
        name: "Elevaciones de Sóleo Sentado en Máquina",
        category: "Piernas", muscleGroup: "Pantorrillas",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 60, tempo: "2-1-2-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Siéntate con las rodillas a 90°, pad sobre los muslos.",
            "Empuja hacia arriba con las puntas de los pies.",
            "Pausa de 1 segundo en la cima, baja estirando 2 segundos."
        ],
        tips: "Enfocado en el sóleo (fibra lenta = más repeticiones).",
        mistakes: "No usar rango completo de movimiento."
    },

    // ═══════════════════════════════════════════════════════════════
    //  BRAZOS — BÍCEPS  (5 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "barbell-biceps-curl",
        name: "Curl de Bíceps con Barra Z",
        category: "Brazos", muscleGroup: "Bíceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Agarra la barra Z a la anchura de los hombros.",
            "Sube la barra flexionando los codos sin mover la espalda.",
            "Aprieta el bíceps 1 segundo en la cima y desciende despacio."
        ],
        tips: "Codos fijos a los costados del cuerpo en todo momento.",
        mistakes: "Balancear el cuerpo, despegar los codos."
    },
    {
        id: "hammer-curl",
        name: "Curl Martillo con Mancuernas (Hammer Curl)",
        category: "Brazos", muscleGroup: "Bíceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Mancuernas a los lados con palmas enfrentadas (agarre neutro).",
            "Sube alternando o simultáneamente sin girar las muñecas.",
            "Aprieta el braquial y braquiorradial en la cima."
        ],
        tips: "Enfocado en braquial y braquiorradial para grosor de brazo.",
        mistakes: "Rotar las muñecas (se convierte en curl normal)."
    },
    {
        id: "incline-dumbbell-curl",
        name: "Curl Inclinado con Mancuernas (Incline Curl)",
        category: "Brazos", muscleGroup: "Bíceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "3-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Banco inclinado a 45°, brazos colgando verticalmente.",
            "Sube las mancuernas flexionando los codos sin mover los hombros.",
            "Máximo estiramiento del bíceps en la posición inferior."
        ],
        tips: "Máximo estiramiento de la cabeza larga del bíceps.",
        mistakes: "Mover los hombros hacia adelante acortando el estiramiento."
    },
    {
        id: "preacher-curl",
        name: "Curl en Banco Scott (Preacher Curl)",
        category: "Brazos", muscleGroup: "Bíceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Apoya los brazos en el pad del banco Scott.",
            "Sube la barra flexionando solo los codos.",
            "Baja controlando hasta extensión casi completa."
        ],
        tips: "Aísla completamente el bíceps eliminando trampas.",
        mistakes: "Hiperextender los codos abajo (riesgo de rotura)."
    },
    {
        id: "cable-curl",
        name: "Curl de Bíceps en Polea Baja",
        category: "Brazos", muscleGroup: "Bíceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Polea baja con barra recta o cuerda.",
            "Sube flexionando los codos con control.",
            "Tensión constante en todo el rango — superior a mancuernas."
        ],
        tips: "La polea mantiene tensión constante. Perfecto para series largas.",
        mistakes: "Balancear los codos, usar impulso."
    },

    // ═══════════════════════════════════════════════════════════════
    //  BRAZOS — TRÍCEPS  (5 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "triceps-pushdown-rope",
        name: "Extensión de Tríceps en Polea con Cuerda",
        category: "Brazos", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Polea alta con cuerda, codos pegados al cuerpo.",
            "Extiende los brazos hacia abajo separando los extremos de la cuerda.",
            "Aprieta el tríceps 1 segundo y regresa a 90°."
        ],
        tips: "Abre la cuerda al final para enfatizar cabeza lateral y medial.",
        mistakes: "Separar los codos del torso, inclinarse sobre la polea."
    },
    {
        id: "triceps-pushdown-bar",
        name: "Extensión de Tríceps en Polea con Barra Recta",
        category: "Brazos", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Polea alta con barra recta, agarre prono.",
            "Extiende los brazos hacia abajo sin mover los codos.",
            "Regresa a 90° de forma controlada."
        ],
        tips: "Variante con barra permite más peso que la cuerda.",
        mistakes: "Inclinar el torso excesivamente."
    },
    {
        id: "overhead-triceps-extension",
        name: "Extensión Tras Nuca en Polea (Overhead Extension)",
        category: "Brazos", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "De espaldas a la polea alta, agarra la cuerda sobre la cabeza.",
            "Extiende los brazos hacia adelante por encima de la cabeza.",
            "Siente el estiramiento de la cabeza larga del tríceps en la bajada."
        ],
        tips: "Estiramiento máximo de la cabeza larga (la más grande del tríceps).",
        mistakes: "Mover los hombros, no mantener los codos fijos."
    },
    {
        id: "skull-crushers",
        name: "Rompecráneos con Barra Z (Skull Crushers)",
        category: "Brazos", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Tumbado en banco, barra Z con los brazos extendidos verticalmente.",
            "Flexiona los codos bajando la barra hacia la frente o detrás de la cabeza.",
            "Extiende los codos sin mover los hombros."
        ],
        tips: "Bajar detrás de la cabeza estira más la cabeza larga.",
        mistakes: "Abrir los codos, usar demasiado peso sin control."
    },
    {
        id: "close-grip-bench-press",
        name: "Press de Banca Agarre Cerrado (Close-Grip Bench)",
        category: "Brazos", muscleGroup: "Tríceps",
        secondaryMuscles: ["Pecho"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Agarre a la anchura de los hombros en banco plano.",
            "Baja la barra hasta el esternón manteniendo los codos pegados.",
            "Empuja enfocando la contracción en los tríceps."
        ],
        tips: "El compuesto más pesado para tríceps. Permite mucha sobrecarga.",
        mistakes: "Agarre demasiado cerrado (dolor de muñeca), abrir codos."
    },

    // ═══════════════════════════════════════════════════════════════
    //  ABDOMEN & CORE  (4 ejercicios)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "cable-crunch",
        name: "Crunch en Polea Alta de Rodillas (Cable Crunch)",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-1",
        image: "img/ex_squat.jpg",
        steps: [
            "De rodillas frente a la polea alta, agarra la cuerda tras la cabeza.",
            "Curva la columna (flexión espinal) llevando el esternón hacia la pelvis.",
            "Aprieta los abdominales 1 segundo y regresa controlando."
        ],
        tips: "Usa flexión espinal, no flexión de cadera.",
        mistakes: "Flexionar la cadera sentándose sobre los talones."
    },
    {
        id: "hanging-leg-raise",
        name: "Elevación de Piernas Colgado en Barra",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-0",
        image: "img/ex_pullup.jpg",
        steps: [
            "Cuélgate de la barra con brazos extendidos.",
            "Eleva las piernas rectas o con rodillas flexionadas.",
            "Lleva la pelvis hacia el esternón (retroversión pélvica).",
            "Baja controlando sin balanceo."
        ],
        tips: "Eleva la pelvis, no solo las piernas. Ahí está la clave.",
        mistakes: "Balanceo del cuerpo, solo subir las piernas sin retroversión."
    },
    {
        id: "ab-wheel-rollout",
        name: "Ab Wheel Rollout (Rueda Abdominal)",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: ["Hombros"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "De rodillas con la rueda frente a ti.",
            "Extiende el cuerpo hacia adelante manteniendo el core activado.",
            "Regresa contrayendo los abdominales sin colapsar la lumbar."
        ],
        tips: "Anti-extensión abdominal. Uno de los mejores ejercicios de core.",
        mistakes: "Colapsar la zona lumbar en la extensión, usar los brazos."
    },
    {
        id: "pallof-press",
        name: "Pallof Press (Anti-Rotación en Polea)",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-2-1-1",
        image: "img/ex_squat.jpg",
        steps: [
            "Polea a la altura del pecho, de lado a la máquina.",
            "Extiende los brazos al frente resistiendo la rotación.",
            "Mantén 2 segundos con los brazos extendidos y regresa."
        ],
        tips: "Ejercicio de anti-rotación. Fundamental para estabilidad del core.",
        mistakes: "Permitir que el cuerpo rote, usar poco peso."
    },

    // ═══════════════════════════════════════════════════════════════
    // MÁQUINAS Y VARIANTES ASISTIDAS (GIMNASIO MODERNO)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "assisted-pullup-machine",
        name: "Dominadas en Máquina Asistida",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps", "Core"],
        type: "Máquina Asistida", defaultRir: 2, restSeconds: 90, tempo: "3-0-1-0",
        image: "img/ex_pullup.jpg",
        steps: [
            "Coloca las rodillas o pies sobre la plataforma de contrapeso.",
            "Sujeta los agarres superiores con palmas hacia el frente.",
            "Tira de los codos hacia abajo hasta subir el mentón sobre la barra.",
            "Desciende de forma lenta y controlada sintiendo el estiramiento dorsal."
        ],
        tips: "Ideal si aún no haces dominadas libres con técnica estricta. El peso restado ayuda a subir.",
        mistakes: "Aprovechar la inercia del contrapeso, encoger los hombros."
    },
    {
        id: "press-chest-machine",
        name: "Press de Pecho en Máquina Convergente",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Tríceps", "Hombros"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Ajusta el asiento para que los agarres queden a la altura del pectoral medio.",
            "Empuja las palancas hacia adelante apretando el pecho en el centro.",
            "Baja de forma muy controlada hasta alinear los agarres con el tórax."
        ],
        tips: "Trayectoria muy segura. Permite llegar al fallo muscular sin riesgo de barra.",
        mistakes: "Despegar la espalda del respaldo, no usar rango completo."
    },
    {
        id: "hack-squat-machine",
        name: "Sentadilla Hack en Máquina",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 120, tempo: "3-1-1-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Apoya la espalda en el respaldo de la máquina Hack y los hombros en los soportes.",
            "Coloca los pies a la anchura de los hombros en la plataforma.",
            "Desciende flexionando las rodillas hasta formar 90° o más.",
            "Empuja con toda la planta del pie extendiendo las piernas."
        ],
        tips: "Enfoque brutal en cuádriceps eliminando la carga axial sobre la columna.",
        mistakes: "Desprender la zona lumbar del respaldo, despegar los talones."
    },
    {
        id: "leg-press-machine",
        name: "Prensa de Piernas Inclinada a 45°",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos", "Isquios"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Siéntate apoyando completamente la espalda y la cadera en el respaldo.",
            "Coloca los pies a la altura media de la plataforma.",
            "Baja el carro de carga hasta 90° sin levantar la cadera.",
            "Empuja la plataforma sin bloquear las rodillas al final."
        ],
        tips: "Permite mover altas cargas con máxima estabilidad.",
        mistakes: "Bloquear/hiperextender las rodillas arriba, despegar la cadera."
    },
    {
        id: "shoulder-press-machine",
        name: "Press de Hombros Guiado en Máquina",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Tríceps"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_overhead_press.jpg",
        steps: [
            "Ajusta el asiento para que los mangos queden a la altura de las orejas.",
            "Empuja verticalmente hasta extender los brazos sin bloquear codos.",
            "Desciende sintiendo el control en el deltoides anterior."
        ],
        tips: "Ideal para aislar el hombro sin requerir equilibrio con barra.",
        mistakes: "Arquear excesivamente la espalda baja."
    },
    {
        id: "assisted-dips-machine",
        name: "Fondos en Máquina Asistida de Tríceps / Pecho",
        category: "Tríceps", muscleGroup: "Tríceps",
        secondaryMuscles: ["Pecho", "Hombros"],
        type: "Máquina Asistida", defaultRir: 1, restSeconds: 90, tempo: "3-0-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Apoya las rodillas o pies en la plataforma de asistencia.",
            "Sujeta los agarres laterales y desciende doblando los codos a 90°.",
            "Empuja hacia abajo contratando los tríceps con fuerza."
        ],
        tips: "El contrapeso ajustado te permite hacer fondos con técnica perfecta aunque estés empezando.",
        mistakes: "Encorvar los hombros hacia adelante."
    },
    {
        id: "lat-pulldown-machine-lever",
        name: "Jalón Dorsal en Máquina Articulada",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Ajusta la rodillera para bloquear los muslos.",
            "Tira de las empuñaduras independientes hacia abajo apretando los dorsales.",
            "Retorna la carga sintiendo un estiramiento progresivo en la espalda."
        ],
        tips: "Trayectoria biomecánica curva ideal para aislar el dorsal sin sobrecargar antebrazos.",
        mistakes: "Despegar la cadera del asiento."
    },
    {
        id: "seated-row-machine",
        name: "Remo de Espalda en Máquina con Apoyo de Pecho",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Bíceps"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "Apoya el tórax en la almohadilla frontal ajustada a tu medida.",
            "Tira de las empuñaduras juntando las paletillas traseras.",
            "Pausa 1 segundo atrás y vuelve controladamente."
        ],
        tips: "Al apoyar el pecho eliminas 100% el esfuerzo lumbar. Cero riesgo de espalda baja.",
        mistakes: "Separar el pecho del cojín durante el tirón."
    },
    {
        id: "smith-machine-bench-press",
        name: "Press de Banca en Multipower (Máquina Smith)",
        category: "Pecho", muscleGroup: "Pecho",
        secondaryMuscles: ["Tríceps", "Hombros"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-0",
        image: "img/ex_bench.jpg",
        steps: [
            "Coloca el banco plano centrado justo bajo la barra del Smith.",
            "Desengancha la barra y desciende guiado hasta tocar suavemente el pecho.",
            "Empuja hacia arriba con fuerza sin necesidad de estabilizar el plano lateral."
        ],
        tips: "Trayectoria fija ultra-segura para hipertrofia pura y entrenar cerca del fallo solo.",
        mistakes: "Mal posicionamiento del banco respecto a la línea del esternón."
    },
    {
        id: "smith-machine-squat",
        name: "Sentadilla en Multipower (Máquina Smith)",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 120, tempo: "3-1-1-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Colócate bajo la barra del Smith con los pies un paso por delante de la barra.",
            "Desciende flexionando rodillas manteniendo la espalda apoyada contra el vector del Smith.",
            "Sube empujando con los cuádriceps."
        ],
        tips: "Al adelantar los pies enfocas todo el esfuerzo en los cuádriceps sin sobrecargar la espalda.",
        mistakes: "Pies demasiado atrás bajo la barra provocando presión en rodillas."
    },
    {
        id: "lying-leg-curl-machine",
        name: "Curl Femoral Tumbado en Máquina",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: ["Gemelos"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-1-0",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Túmbate boca abajo colocando el rodillo justo encima de los talones de Aquiles.",
            "Flexiona las piernas hacia los glúteos de forma fluida.",
            "Aguanta 1 segundo la contracción arriba y baja controlando (2 seg)."
        ],
        tips: "Aislamiento directo de los isquiotibiales en flexión de rodilla.",
        mistakes: "Levantar la cadera del banco al flexionar las piernas."
    },
    {
        id: "seated-leg-curl-machine",
        name: "Curl Femoral Sentado en Máquina",
        category: "Piernas", muscleGroup: "Isquios",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 90, tempo: "2-1-2-0",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Siéntate asegurando la almohadilla superior sobre los muslos.",
            "Flexiona las piernas empujando el rodillo hacia abajo y atrás.",
            "Retorna lentamente manteniendo tensión continua en la parte posterior del muslo."
        ],
        tips: "Mayor estiramiento de la cadera flexionada, ideal para hipertrofia de isquios.",
        mistakes: "No ajustar la fijación de los muslos."
    },
    {
        id: "leg-extension-machine",
        name: "Extensión de Cuádriceps en Máquina",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "2-1-2-0",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Ajusta el respaldo para que la articulación de la rodilla coincida con el eje de la máquina.",
            "Extiende las piernas elevando el rodillo hasta bloquear casi por completo.",
            "Aprieta los cuádriceps 1 segundo arriba y desciende despacio."
        ],
        tips: "El mejor ejercicio de aislamiento para el recto femoral.",
        mistakes: "Usar tirones bruscos, no alinear el eje de la máquina con la rodilla."
    },
    {
        id: "hip-thrust-machine",
        name: "Elevación de Cadera en Máquina Hip Thrust",
        category: "Piernas", muscleGroup: "Glúteos",
        secondaryMuscles: ["Isquios"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 120, tempo: "2-1-1-1",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Siéntate dentro de la máquina y abrocha el cinturón acolchado sobre la pelvis.",
            "Apoya los pies firmes y empuja la cadera hacia arriba apretando los glúteos.",
            "Baja la pelvis controlando la excéntrica."
        ],
        tips: "Forma mucho más cómoda y rápida de hacer Hip Thrust sin cargar discos en la barra.",
        mistakes: "Hiperextender la zona lumbar arriba en vez de apretar glúteos."
    },
    {
        id: "lateral-raise-machine",
        name: "Elevación Lateral de Hombro en Máquina",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 0, restSeconds: 75, tempo: "2-1-2-0",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Siéntate y apoya los brazos en los cojines laterales.",
            "Eleva los codos hacia los lados hasta la altura de los hombros.",
            "Aguanta 1 segundo la máxima tensión del deltoides lateral."
        ],
        tips: "Tensión constante en toda la curva de recorrido a diferencia de las mancuernas.",
        mistakes: "Encorvar los hombros o subir con los trapecios."
    },
    {
        id: "preacher-curl-machine",
        name: "Curl de Bíceps en Máquina Banco Scott / Predicador",
        category: "Bíceps", muscleGroup: "Bíceps",
        secondaryMuscles: ["Antebrazos"],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 75, tempo: "2-1-2-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Apoya los tríceps firmemente en el almohadillado inclinado del banco Scott.",
            "Sujeta los manerales y flexiona los codos aislando el bíceps.",
            "Baja de forma muy controlada sin estirar el codo bruscamente."
        ],
        tips: "Evita trampear con el cuerpo. Tensión pura en el bíceps.",
        mistakes: "Despegar los brazos del cojín, soltar la carga bruscamente abajo."
    },
    {
        id: "cable-biceps-curl",
        name: "Curl de Bíceps de Pie en Polea Baja con Barra Recta",
        category: "Bíceps", muscleGroup: "Bíceps",
        secondaryMuscles: ["Antebrazos"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Engancha la barra a la polea baja y mantente erguido.",
            "Sube la barra manteniendo los codos pegados al costado.",
            "Aprieta el bíceps arriba y desciende sintiendo la tensión continua del cable."
        ],
        tips: "La polea mantiene resistencia durante todo el recorrido.",
        mistakes: "Mover el codo hacia adelante o arquear la espalda."
    },
    {
        id: "triceps-pushdown-rope",
        name: "Extensión de Tríceps en Polea Alta con Cuerda",
        category: "Tríceps", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Polea alta con agarre de cuerda, codos pegados a los costados.",
            "Empuja hacia abajo extendiendo los brazos y abre las puntas de la cuerda al final.",
            "Pausa 1 segundo con los tríceps apretados y vuelve despacio."
        ],
        tips: "La apertura de cuerda enfatiza la cabeza lateral y medial del tríceps.",
        mistakes: "Separar los codos del torso, balancearse."
    },
    {
        id: "triceps-overhead-cable",
        name: "Extensión de Tríceps Copita por Encima de la Cabeza en Polea",
        category: "Tríceps", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "De espaldas a la polea en posición media/alta con la cuerda sobre la cabeza.",
            "Extiende los codos hacia adelante con el torso erguido.",
            "Siente un estiramiento profundo en la cabeza larga del tríceps al flexionar."
        ],
        tips: "Excelente para el desarrollo de la cabeza larga del tríceps.",
        mistakes: "Mover los codos arriba y abajo durante la repetición."
    },
    {
        id: "standing-calf-machine",
        name: "Elevación de Talones De Pie en Máquina para Gemelos",
        category: "Pantorrillas", muscleGroup: "Pantorrillas",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 60, tempo: "2-2-1-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Apoya los hombros en los cojines y la punta de los pies en el escalón.",
            "Baja los talones profundamente para un gran estiramiento (2 seg).",
            "Eleva el cuerpo sobre las punteras apretando los gemelos 1-2 segundos."
        ],
        tips: "La pausa abajo en estiramiento es clave para activar el gemelo.",
        mistakes: "Rebotar rápido abajo sin controlar la excéntrica."
    },
    {
        id: "seated-calf-machine",
        name: "Elevación de Talones Sentado en Máquina (Sóleo)",
        category: "Pantorrillas", muscleGroup: "Pantorrillas",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Siéntate apoyando los muslos bajo el cojín de fijación.",
            "Baja los talones al máximo y eleva contrayendo las pantorrillas.",
            "Mantén la presión constante."
        ],
        tips: "Con rodilla doblada a 90° aislas el músculo sóleo.",
        mistakes: "Movimiento incompleto."
    },

    // ═══════════════════════════════════════════════════════════════
    // AMPLIACIÓN MASIVA: POLEAS, MÁQUINAS ESPECIALIZADAS Y MANCUERNAS
    // ═══════════════════════════════════════════════════════════════
    {
        id: "pullover-cable",
        name: "Pullover de Espalda en Polea Alta con Cuerda / Barra",
        category: "Espalda", muscleGroup: "Espalda",
        secondaryMuscles: ["Tríceps", "Abdomen"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 75, tempo: "3-1-1-1",
        image: "img/ex_pullup.jpg",
        steps: [
            "De pie frente a la polea alta con inclinación ligera de torso (20°).",
            "Mantiene los brazos casi rectos y empuja el maneral hacia los muslos.",
            "Aprieta el dorsal abajo 1 segundo y regresa sintiendo el estiramiento profundo."
        ],
        tips: "Aislamiento puro del dorsal ancho en extensión de hombro sin participación del bíceps.",
        mistakes: "Doblar excesivamente los codos convirtiéndolo en un pushdown de tríceps."
    },
    {
        id: "face-pull-cable",
        name: "Face Pull en Polea Alta con Cuerda",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: ["Espalda", "Trapecio"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Polea ajustada a la altura del rostro con agarre de cuerda doble.",
            "Tira de la cuerda hacia los ojos abriendo las puntas hacia los lados.",
            "Aprieta el deltoides posterior y la musculatura rotadora externa 1 segundo."
        ],
        tips: "El mejor ejercicio corrector de postura y salud articular del manguito rotador.",
        mistakes: "Usar demasiado peso e inclinar el torso hacia atrás."
    },
    {
        id: "cable-lateral-raise",
        name: "Elevación Lateral en Polea Baja a 1 Mano",
        category: "Hombros", muscleGroup: "Hombros",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 0, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_lateral_raise.jpg",
        steps: [
            "Colócate de lado a la polea baja sujetando el maneral con la mano externa.",
            "Eleva el brazo en el plano escapular hasta la altura del hombro.",
            "Desciende despacio sintiendo la tensión uniforme del cable durante todo el rango."
        ],
        tips: "A diferencia de las mancuernas, la polea mantiene máxima tensión desde el punto inicial abajo.",
        mistakes: "Usar impulso del torso."
    },
    {
        id: "hip-abductor-machine",
        name: "Abductores en Máquina Sentado (Glúteo Medio)",
        category: "Piernas", muscleGroup: "Glúteos",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 75, tempo: "2-1-2-1",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Siéntate en la máquina de abducción con las almohadillas por fuera de las rodillas.",
            "Abre las piernas con fuerza hacia los lados separando los cojines.",
            "Aprieta el glúteo medio 1 segundo en la máxima apertura y regresa despacio."
        ],
        tips: "Aislamiento magnífico del glúteo medio y estabilidad lateral de cadera.",
        mistakes: "Avanzar el torso para trampear."
    },
    {
        id: "hip-adductor-machine",
        name: "Aductores en Máquina Sentado (Muslo Interno)",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: [],
        type: "Máquina Guiada", defaultRir: 1, restSeconds: 75, tempo: "2-1-2-1",
        image: "img/ex_leg_press.jpg",
        steps: [
            "Ajusta la máquina con los cojines por dentro de las rodillas en máxima apertura.",
            "Junta las piernas hacia el centro apretando los aductores del muslo.",
            "Vuelve sintiendo el estiramiento controlado de la ingle."
        ],
        tips: "Desarrolla la cara interna de los muslos y previene lesiones inguinales.",
        mistakes: "Soltar las piernas sin frenar la excéntrica."
    },
    {
        id: "cable-glute-kickback",
        name: "Patada de Glúteo en Polea Baja con Tobillera",
        category: "Piernas", muscleGroup: "Glúteos",
        secondaryMuscles: ["Isquios"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 75, tempo: "2-1-1-1",
        image: "img/ex_deadlift.jpg",
        steps: [
            "Engancha la tobillera a la polea baja y sostente de la estructura.",
            "Extiende la pierna hacia atrás apretando el glúteo en el punto máximo.",
            "Retorna la pierna lentamente sin tocar el suelo."
        ],
        tips: "Tensión constante en el glúteo mayor.",
        mistakes: "Arquear la zona lumbar en lugar de extender la cadera."
    },
    {
        id: "bulgarian-split-squat",
        name: "Sentadilla Búlgara con Mancuernas",
        category: "Piernas", muscleGroup: "Cuádriceps",
        secondaryMuscles: ["Glúteos"],
        type: "Multiarticular", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Apoya el empeine de la pierna trasera en un banco.",
            "Desciende la rodilla trasera hacia el suelo manteniendo el torso ligeramente inclinado.",
            "Empuja con la pierna delantera para regresar arriba."
        ],
        tips: "El mejor ejercicio unilateral para hipertrofia y simetría de pierna y glúteo.",
        mistakes: "Colocar el pie delantero demasiado cerca del banco."
    },
    {
        id: "hammer-curl-dumbbell",
        name: "Curl Martillo con Mancuernas (Neutro)",
        category: "Bíceps", muscleGroup: "Bíceps",
        secondaryMuscles: ["Antebrazos"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 75, tempo: "2-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Sujeta las mancuernas con las palmas mirándose entre sí (agarre neutro).",
            "Flexiona el codo subiendo la mancuerna sin rotar la muñeca.",
            "Aprieta el braquial anterior y braquiorradial y desciende controlado."
        ],
        tips: "Desarrolla el braquial y aporta grosor lateral al brazo.",
        mistakes: "Balancear el torso."
    },
    {
        id: "incline-dumbbell-biceps-curl",
        name: "Curl de Bíceps Inclinado en Banco a 45°",
        category: "Bíceps", muscleGroup: "Bíceps",
        secondaryMuscles: ["Antebrazos"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_biceps_curl.jpg",
        steps: [
            "Siéntate en un banco inclinado a 45° dejando colgar los brazos con mancuernas.",
            "Sube la carga supinando la muñeca en la mitad del recorrido.",
            "Siente el estiramiento profundo de la cabeza larga del bíceps abajo."
        ],
        tips: "Máximo estiramiento de la cabeza larga del bíceps gracias a la extensión de hombro.",
        mistakes: "Adelantar los codos durante la elevación."
    },
    {
        id: "skullcrusher-ez-bar",
        name: "Press Francés con Barra EZ (Skullcrusher)",
        category: "Tríceps", muscleGroup: "Tríceps",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 90, tempo: "3-1-1-0",
        image: "img/ex_triceps_pushdown.jpg",
        steps: [
            "Túmbate en un banco plano sujetando la barra EZ arriba.",
            "Flexiona los codos llevando la barra hacia la frente/coronilla.",
            "Extiende los codos volviendo a la posición inicial sin mover los brazos."
        ],
        tips: "Ejercicio rey para volumen y fuerza de tríceps.",
        mistakes: "Abrir los codos hacia afuera en exceso."
    },
    {
        id: "cable-crunch",
        name: "Crunch Abdominal en Polea Alta con Cuerda",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: [],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-1",
        image: "img/ex_squat.jpg",
        steps: [
            "De rodillas frente a la polea alta sujetando la cuerda a los lados de la cabeza.",
            "Flexiona la columna llevando las costillas hacia las crestas ilíacas.",
            "Aprieta el abdomen 1 segundo y regresa estirando sin mover la cadera."
        ],
        tips: "Permite aplicar sobrecarga progresiva en los abdominales con peso exacto.",
        mistakes: "Flexionar la cadera en lugar de la columna vertebral."
    },
    {
        id: "roman-chair-leg-raise",
        name: "Elevación de Rodillas / Piernas en Silla Romana",
        category: "Abdomen", muscleGroup: "Abdomen",
        secondaryMuscles: ["Psoas"],
        type: "Aislamiento", defaultRir: 1, restSeconds: 60, tempo: "2-1-1-0",
        image: "img/ex_squat.jpg",
        steps: [
            "Apoya los antebrazos y la espalda firmes en la silla romana.",
            "Eleva las rodillas hacia el pecho realizando una ligera retroversión de cadera.",
            "Baja las piernas de forma lenta y controlada."
        ],
        tips: "Enfoque brutal en el abdomen inferior.",
        mistakes: "Balancear las piernas con inercia."
    }
];
