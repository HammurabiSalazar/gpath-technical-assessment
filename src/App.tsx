import { useState, useEffect } from 'react';
import { FormularioMuestra } from './components/FormularioMuestra';
import { ListaMuestras } from './components/ListaMuestras';
import type { Muestra } from './types/muestra';
import Swal from 'sweetalert2';
import logoGpath from './assets/Logo-gpath.png';
import './App.css';

function App() {
  // --- ESTADO GLOBAL: Muestras y visibilidad del formulario ---
  const [muestras, setMuestras] = useState<Muestra[]>(() => {
    const guardadas = localStorage.getItem('gpath_muestras');
    return guardadas ? JSON.parse(guardadas) : [];
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- PERSISTENCIA: Guarda en LocalStorage automáticamente ---
  useEffect(() => {
    localStorage.setItem('gpath_muestras', JSON.stringify(muestras));
  }, [muestras]);

  // --- LÓGICA: Agregar nueva muestra ---
  const agregarMuestra = (datos: Omit<Muestra, 'id' | 'fechaRegistro'>) => {
    const nueva: Muestra = {
      ...datos,
      id: crypto.randomUUID(),
      fechaRegistro: new Date().toLocaleString()
    };
    setMuestras([nueva, ...muestras]);
    setMostrarFormulario(false); 
    Swal.fire({
    title: '¡Muestra Registrada!',
    text: 'El registro se ha guardado exitosamente en el sistema.',
    icon: 'success',
    confirmButtonColor: '#03045E', // Nuestro azul Crepúsculo
    timer: 2500, // Se cierra sola en 2.5 segundos
    timerProgressBar: true,
    customClass: {
      popup: 'modal-card-swal', // Reutilizamos la clase que ya definimos
      title: 'form-title-swal'
    }
  });

  };

  // --- LÓGICA: Eliminar registro ---
  const eliminarMuestra = (id: string) => {
    setMuestras(muestras.filter(m => m.id !== id));
  };

  // --- LÓGICA: Actualizar registro existente ---
  const actualizarMuestra = (id: string, datos: Partial<Muestra>) => {
    setMuestras(muestras.map(m => m.id === id ? { ...m, ...datos } : m));
  };

  return (
    <div className="main-layout">
      
      {/* 1. CABECERA: Logo e información del sistema con diseño inclinado */}
      <header className="top-nav">
        <div className="logo-box">
          <img src={logoGpath} alt="Logo" className="logo-img" />
        </div>
        <div className="gray-info">
          <div className="header-text-container">
            <span className="info-text">Panel de Gestión de Laboratorio</span>
            <span className="info-subtitle">Sistema de Registro de Tejidos</span>
          </div>
        </div>
      </header>

      <main className="container">
        
        {/* 2. BARRA DE TÍTULO: Título de sección y botón de añadir (Lupa eliminada) */}
        <div className="action-bar">
          <h1 className="title">Registro De Muestras</h1>
          <div className="button-group">
            <button 
              className="btn-add-simple" 
              onClick={() => setMostrarFormulario(true)}
            >
              <span>
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
                Añadir
              </span>
            </button>
          </div>
        </div>

        {/* 3. ÁREA DE CONTENIDO: Visualización de la tabla principal */}
          <ListaMuestras 
            muestras={muestras} 
            onEliminar={eliminarMuestra} 
            onActualizar={actualizarMuestra} 
          />

        {/* 4. MODAL/OVERLAY: Formulario emergente para registro */}
        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-card">
              <button className="btn-close" onClick={() => setMostrarFormulario(false)}>×</button>
              <FormularioMuestra onAgregar={agregarMuestra} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;