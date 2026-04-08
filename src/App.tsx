import { FormularioMuestra } from "./components/FormularioMuestra"

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>GPath: Gestión de Muestras de Tejido</h1>
      <p>Entorno preparado. Próximo paso: El Formulario.</p>
        {/* Aquí se importará el componente del formulario */}
      <FormularioMuestra />

    </div>
  )
}

export default App