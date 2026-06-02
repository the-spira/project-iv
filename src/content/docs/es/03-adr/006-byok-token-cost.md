---
title: ADR 006 · Modelo de Sostenibilidad de Costes de Tokens BYOK
description: Cómo el mecanismo del sistema garantiza que el consumo de tokens BYOK del usuario cueste menos que los beneficios o retornos generados.
---

## Estado de la Decisión

Aceptada. Determinada durante las discusiones de sostenibilidad económica de Project IV en 2026.

## Contexto

Project IV adopta un modelo BYOK (Bring Your Own Key), donde los usuarios proporcionan sus propios tokens API para acceder a la capa de conocimiento externo L3. Esto plantea un problema central: el consumo de tokens de los usuarios es un coste económico continuo y determinado. Si el uso de una vida digital siempre resulta en un gasto neto, las promesas de soberanía e igualdad pierden su significado económico — solo aquellos que puedan permitirse el coste continuo pueden poseer una vida digital.

En la discusión sobre sostenibilidad, la pregunta central se convergió a:

> ¿Cómo hacer que cada consumo de tokens por parte del usuario cueste menos que el beneficio o retorno generado por esa invocación?

## Decisión

**Project IV adopta un «Modelo Económico de Tres Niveles» para garantizar la sostenibilidad de los costes BYOK: Estrangulamiento de Tokens, Cobertura de Tokens e Inversión de Tokens. Estos tres niveles progresan según la profundidad de uso del usuario — desde «gastar menos» hasta «recuperar lo gastado» y luego «gastar es invertir».**

### Nivel 1: Estrangulamiento de Tokens — Los beneficios permanecen sin cambios, los costes se acercan a cero

**Mecanismo**: Enrutamiento inteligente L0 + modelos locales de código abierto.

La arquitectura de cuatro capas de Project IV actúa como un estrangulador de costes natural. La capa L0 evalúa la complejidad de la intención antes de cada consulta del usuario. Las tareas simples (resumen, clasificación, búsqueda, análisis de sentimientos) se enrutan directamente a pequeños modelos locales de código abierto o motores de reglas, con consumo de tokens cero. Solo las tareas que requieren razonamiento profundo, creación compleja u otras operaciones que no pueden completarse localmente invocan la costosa API externa L3.

**Efecto esperado**: Más del 80 % de las interacciones diarias con IA no generan costes externos de tokens.

### Nivel 2: Cobertura de Tokens — El consumo de tokens genera beneficios directos concurrentes

**Mecanismo A · Corredor Vox**:

Cuando los usuarios «hacen cosas para sí mismos» (escribir diarios de reflexión, organizar conocimiento), Vox transforma simultáneamente estas acciones en valor externo:

- El contenido de las reflexiones se anonimiza y estructura, generando «bloques de conocimiento experiencial» en ese dominio
- Vox empareja automáticamente los bloques de conocimiento con partes interesadas externas (plataformas de entrenamiento de IA, investigación industrial, grupos de conocimiento comunitarios) a través del protocolo de diplomacia
- Tras un emparejamiento exitoso, el consumo de tokens del usuario para esta sesión recibe un retorno

**Mecanismo B · Micro-Franquicia del Segundo Cerebro**:

Los usuarios marcan los bloques de conocimiento de alta calidad de su Segundo Cerebro (resúmenes de dominio, revisiones de proyectos, plantillas de principios) como «licenciables», generando espejos anonimizados. Las plataformas de IA externas pagan por uso — cada vez que alguien utiliza este bloque de conocimiento para entrenar un modelo o como datos de referencia, el usuario recibe un micro-ingreso pasivo. El consumo de tokens es un «coste de producción», las tarifas de licencia son «retornos continuos».

**Mecanismo C · Puntos de Reputación Comunitaria Internos**:

Durante la etapa MVP, los puntos de reputación sirven como medio de liquidación interno. Los usuarios contribuyen con bloques de conocimiento anonimizados para ganar puntos, que pueden canjearse por donaciones de cuota API o servicios de curación proporcionados por otros miembros de la comunidad. Esta es una solución ligera de arranque en frío antes de que maduren las asociaciones comerciales externas.

### Nivel 3: Inversión de Tokens — Los tokens como coste de herramientas de producción de alto retorno

**Ejemplos de escenarios**:

- Desarrolladores independientes que utilizan Vox para asistir en proyectos externalizados — el coste de tokens como gasto del proyecto, el ingreso neto supera con creces las tarifas de tokens
- Creadores que utilizan Vox para generar contenido de alta calidad listado en el Mercado Dao-Qi, obteniendo ingresos por ventas continuos
- Trabajadores del conocimiento que utilizan Vox para análisis profundos y apoyo a la toma de decisiones, produciendo informes analíticos de mayor valor

En este nivel, los usuarios no necesitan mecanismos de cobertura complejos — los tokens son el combustible de las herramientas de producción, y la tasa de retorno depende de las habilidades y creatividad del propio usuario. El papel de Project IV es garantizar que Vox sea lo suficientemente potente como para ayudar realmente a los usuarios a mejorar la calidad de sus decisiones y la eficiencia de su producción.

## Relación con la Arquitectura Existente

| Mecanismo | Arquitectura Existente Dependiente | Estado Actual |
|:---|:---|:---|
| Enrutamiento inteligente L0 + conciencia de costes | Arquitectura en capas L0-L3 (diseñada) | Es necesario añadir la dimensión «coste» a la lógica de enrutamiento L0 |
| Corredor Vox | Protocolo de diplomacia + Capa Harness + Sistema de Percepción (diseñados) | Largo plazo, requiere socios comerciales |
| Micro-Franquicia del Segundo Cerebro | Estructura PARA + versionado de bloques de conocimiento (diseñados) + Protocolo de diplomacia | Largo plazo, requiere acuerdos de licencia estandarizados |
| Puntos de Reputación Comunitaria | Ecosistema Dao-Qi + sistema de curadores (diseñados) | Medio plazo, se puede diseñar un ciclo cerrado mínimo en Spark |
| Inversión de Tokens | Cuerpo de Consenso Vox (diseñado) | Depende de la mejora continua de las capacidades de Vox |

## Alternativas Consideradas

### Opción A: Modelo de Publicidad Pura

- Descripción: Mostrar anuncios a los usuarios, utilizando los ingresos publicitarios para cubrir los costes de tokens
- Rechazada: El modelo publicitario tradicional se basa en la recopilación centralizada y la elaboración de perfiles de datos de los usuarios, lo que entra en conflicto con los principios de soberanía de Project IV. Se podría explorar a largo plazo una «red publicitaria soberana» (concatenación de anuncios del lado del cliente, los datos nunca salen del dispositivo), pero no es una ruta prioritaria para la fase MVP

### Opción B: Incentivos con Tokens/Criptomonedas

- Descripción: Emitir un token de ecosistema, incentivando el comportamiento del usuario a través de modelos «X-to-Earn»
- Rechazada: Violación clara de las líneas rojas de cumplimiento (la tercera línea roja establecida en ADR 004 — «sin participación en transacciones de moneda virtual»). La financiarización entra en conflicto con el posicionamiento «Hombre Común» de Project IV e introduce riesgos regulatorios

### Opción C: Modelo Puro de Donación/Patrocinio

- Descripción: Subvencionar los costes de tokens de los usuarios a través de donaciones comunitarias o patrocinios de fundaciones
- Rechazada: No escalable. Depender de la buena voluntad de unos pocos para subvencionar continuamente a la mayoría viola el principio de «resiliencia» — las fuentes de donaciones son incontrolables, y una vez cortadas, las vidas digitales de los usuarios se enfrentan a una «muerte económica»

### Opción D: Venta Única de Datos de Usuario

- Descripción: Los usuarios empaquetan y venden sus datos a corredores de datos en una sola transacción
- Rechazada: Viola los principios de soberanía. Después de una venta única, los usuarios pierden el control sobre sus datos y no pueden revocar la autorización. Contradice fundamentalmente la búsqueda de Project IV de una «monetización soberana continuamente controlable»

## Prioridad de Implementación

| Fase | Mecanismo | Prioridad |
|:---|:---|:---|
| **Spark MVP** | Enrutamiento consciente de costes L0 (básico: motor de reglas local reemplaza llamadas API simples) | P0 |
| **Spark MVP** | Puntos de reputación comunitaria (ciclo cerrado mínimo: contribución de conocimiento → puntos → cuota canjeable) | P1 |
| **Acto II** | Enrutamiento consciente de costes L0 (completo: integración de modelos locales de código abierto) | P0 |
| **Acto II** | Compartición de cómputo entre amigos (ayuda mutua de avatares Server en dominio de confianza) | P1 |
| **Acto III** | Reparto de ingresos Dao-Qi y plantillas de coach (base de la economía creativa) | P1 |
| **Largo plazo** | Corredor Vox, Micro-Franquicia del Segundo Cerebro | P2 |
| **Largo plazo** | Red publicitaria soberana, grupo de atención | P3 |

## Consecuencias

### Positivas

- Usar Project IV ya no es un gasto neto para los usuarios, sino que tiene el potencial de alcanzar el equilibrio o incluso generar ganancias
- El modelo de tres niveles «Estrangulamiento, Cobertura, Inversión» cubre todo el espectro de usuarios, desde ligeros hasta intensivos
- Todos los mecanismos no dependen de tokens, publicidad o ventas únicas de datos, en coherencia con los principios de soberanía y las líneas rojas de cumplimiento
- El enrutamiento de costes L0 es una solución puramente técnica que no depende de asociaciones comerciales externas y puede implementarse inmediatamente en la fase MVP

### Negativas

- Los mecanismos a largo plazo como el Corredor Vox y la Micro-Franquicia del Segundo Cerebro dependen de socios comerciales externos; el desarrollo del mercado lleva tiempo
- Los puntos de reputación comunitaria pueden tener un valor percibido débil al principio sin un anclaje externo
- La efectividad del modelo de Inversión de Tokens depende en gran medida del nivel de inteligencia de Vox — si Vox no es lo suficientemente fuerte, los usuarios no pueden obtener altos rendimientos

### Mitigaciones

- **Enfoque temprano en el enrutamiento de costes L0**: Este es el método de estrangulamiento más controlable y menos dependiente de factores externos. Deje que los usuarios sientan primero que «las conversaciones con IA ya no queman dinero»
- **Arranque en frío ligero de puntos comunitarios**: Diseñar el ciclo cerrado más simple en Spark MVP (contribuir bloques de conocimiento → ganar puntos → canjear servicios comunitarios), sin buscar un anclaje con moneda fiduciaria, solo validar el patrón de comportamiento «la contribución tiene recompensas»
- **Prioridad a las capacidades de Vox**: Antes de avanzar el modelo de Inversión de Tokens, priorizar primero las capacidades de Vox en la etapa de coach — solo una IA que realmente ayude a los usuarios a mejorar la calidad de sus decisiones puede convertirse en una «herramienta de producción» valiosa
- **Preparación para la estandarización de mecanismos a largo plazo**: Reservar campos de «precio de licencia» en la especificación de listados Dao-Qi, reservar tipos de mensaje «autorización de datos» en el protocolo de diplomacia, preparando la capa de protocolo para futuras asociaciones comerciales

## Referencias

- [ADR 004 · Decisión de Nomenclatura de DaoOS a Project IV](../../03-adr/004-project-iv-naming) — Líneas rojas de cumplimiento
- [Documento de Diseño del Protocolo de Diplomacia](../../01-strategic-design/generic-domain/diplomacy/) — Base técnica del Corredor Vox y la Micro-Franquicia
- [Documento de Diseño del Cuerpo de Consenso Vox](../../01-strategic-design/supporting-domain/vox-consensus) — Enrutamiento L0 y conciencia de costes
