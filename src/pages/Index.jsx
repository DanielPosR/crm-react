import { useLoaderData } from "react-router-dom";
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";



//*  LOADER HACE LA FUNCION DE UN USEEFFECT 
/**esta funcion se exporta al archivo principal y de asocia al componente mediante el arreglo de createBrowserRouter({}) */
export async function loader() {

  const clientes = obtenerClientes();
  return clientes;
}






//* INICIO DE COMPONENTE
const Index = () => {

  const clientes = useLoaderData();//Para extraer los valores de loader

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clientes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto text-center">

          <thead className="bg-blue-800 text-white">

            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Notas</th>
              <th className="p-2">Acciones</th>
            </tr>

          </thead>


          <tbody>
            {clientes.map(cliente => (
              <Cliente
                cliente={cliente}
                key={cliente.id}
              />
            ))}
          </tbody>

        </table>

      ) : (
        <p className="mt-10 text-center">No hay clientes</p>
      )}
    </>
  )
}

export default Index