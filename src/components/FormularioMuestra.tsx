// src/components/FormularioMuestra.tsx
import { useForm } from 'react-hook-form';
import type { Muestra } from '../types/muestra';
import './FormularioMuestra.css';

interface Props {
  onAgregar: (datos: Omit<Muestra, 'id' | 'fechaRegistro'>) => void;
}

export const FormularioMuestra = ({ onAgregar }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Muestra, 'id' | 'fechaRegistro'>>();

  const onSubmit = (data: any) => {
    onAgregar(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2 className="form-title">Registrar Muestra</h2>

      {/* ID PACIENTE */}
      <div className="group">
        <input 
          {...register("pacienteId", { 
            required: "El ID es obligatorio", 
            maxLength: { value: 15, message: "Máximo 15 caracteres" } 
          })}
          className="input"
          placeholder=" " 
        />
        <span className="bar"></span>
        <label className="label-gpath">ID del Paciente</label>
        {errors.pacienteId && <span className="error-msg">{errors.pacienteId.message}</span>}
      </div>

      {/* TIPO ESTUDIO */}
      <div className="group">
        <select 
          {...register("tipoEstudio", { required: "Selecciona un estudio" })}
          className="input"
        >
          <option value="" hidden></option> {/* Opción oculta para manejar el label */}
          <option value="Biopsia">Biopsia</option>
          <option value="Citología">Citología</option>
          <option value="Inmunohistoquímica">Inmunohistoquímica</option>
        </select>
        <span className="bar"></span>
        <label className="label-gpath">Tipo de Estudio</label>
        {errors.tipoEstudio && <span className="error-msg">{errors.tipoEstudio.message}</span>}
      </div>

      {/* DESCRIPCIÓN */}
      <div className="group">
        <textarea 
          {...register("descripcion", { 
            required: "La descripción es necesaria",
            maxLength: { value: 200, message: "Máximo 200 caracteres" }
          })}
          className="input textarea"
          rows={3}
          placeholder=" " // Espacio vital para la animación
        />
        <span className="bar"></span>
        <label className="label-gpath">Descripción de la Muestra</label>
        {errors.descripcion && <span className="error-msg">{errors.descripcion.message}</span>}
      </div>

      <button type="submit" className="form-button">Guardar en Laboratorio</button>
    </form>
  );
};