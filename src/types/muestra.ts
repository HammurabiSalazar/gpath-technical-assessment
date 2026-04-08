/*
Definimos los tipos de estudio exactos en una lista de opciones permitidas. 
 */
export type TipoEstudio = 'Biopsia' | 'Citología' | 'Inmunohistoquímica';    // Solo estos 3 tipos de estudio definidos son seleccionables

/*
Estructura de campos que tendra cada muestra.
 */
export interface Muestra {
  id: string;                       // Un ID único para cada muestra, se va a generar automáticamente
  pacienteId: string;              // El ID del paciente al que pertenece esta muestra
  tipoEstudio: TipoEstudio;       // Solo uno de los 3 tipos de estudio permitidos en el bloque anterior
  descripcion: string;           // Una breve descripción del estudio
  fechaRegistro: string;        // Fecha y hora del registro, se va a generar automáticamente
}