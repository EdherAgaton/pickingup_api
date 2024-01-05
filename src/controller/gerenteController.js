const {pool} = require('../routes/database')


//Metodo para ingresar el corte 
const updateCortes = async (req, res) => {
    const { id_usuario, nombre, sucursal, fechaCorte, cantidadEntregada, referencia, img  } = req.body


    try {
        const result = await pool.query()
    } catch (error) {
        
    }
}


//metodo para ingresar a un crote en especifico 
const getCorte = async (req, res ) => {
    const { id_usuario, sucursal, id_corte} = req.body

    try {
        const result = await pool.query('SELECT * FROM cortes WHERE id_corte= $1', [id_corte])

        if(result.rows.length === 0){
            res.status(404).json({"message" : "Error al cargar datos"})
        }else{
            const data = result.rows
            res.status(200).json({"message" : "CONSULTA REALIZADA CON EXITO", "data": data})
        }

        
        
    } catch (error) {
        console.error("Error al recuperar corte");
        
    }
}

//Metodo para consultar toda la lista de cortes 
const viewCortes = async (req , res) => {

 

    const {id_usuario, sucursal} = req.body

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate()-2)

    /*  JSON DE PRUEBA

      {
    "id_usuario" : "001GERENTE01",
    "sucursal" : "NAV",
    "fecha" : "2023-12-29"

    }   

    */

    // Manejar el cambio de año si es necesario
if (currentDate.getDate() < 1) {
    // Si el día resultante es menor que 1, restamos 1 al mes
    currentDate.setMonth(currentDate.getMonth() - 1);
    // Y establecemos el día en el último día del mes anterior
    currentDate.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
  }


  

    const currentDay = String(currentDate.getDate()).padStart(2, '0')
    const currentMonth = String(currentDate.getMonth()+1).padStart(2, '0')
    const currentYear = currentDate.getFullYear().toString()

    const actualDate =  String(currentYear+"-"+ currentMonth +"-"+ currentDay)

    //console.log(actualDate) //2024-01-01

    try {
        
        const result = await pool.query('SELECT * FROM cortes WHERE id_usuario_cierre = $1 AND id_sucursal = $2 AND fecha_cierre >= $3 ', [id_usuario, sucursal, actualDate])


        if(result.rows.length === 0){
            res.status(404).json({error: "ERROR, NO HAY CORTES RESULTANTES"})
        }else{
            const data = result.rows

            /*

            "data": [
        {
            "id_corte": "2",
            "id_sucursal": "NAV",
            "saldo_inicial": "120.00",
            "id_usuario_inicio": "001GERENTE01",
            "id_usuario_cierre": "001GERENTE01",
            "saldo_cierre": "130.00",
            "fecha_inicio": "2023-12-28T06:00:00.000Z",
            "fecha_cierre": "2023-12-28T06:00:00.000Z",
            "hora_inicio": "10:01:20-06",
            "hora_cierre": "20:01:20-06"
        },


        id_corte: data.id_corte, 
            id_sucursal : data.id_sucursal,
            saldo_inicial : data.id_usuario_inicio,
            saldo_cierre : data.saldo_cierre,
            id_usuario_inicio : data.id,
            fecha_inicio : data.fecha_inicio,
            fecha_cierre : data.fecha_cierre,
            hora_inicio : data.hora_inicio,
            hora_cierre : data.hora_cierre


            */

            res.status(200).json({menssage: "CONSUTA DE CORTES REALIZADA CON EXITO", data: data})
        }
        
    } catch (error) {

        console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'ERROR EN LA CONSULTA' });
        
    }

}


//Registra deposito

const postDeposito = async (req, res) => {

    const { id_usuario, nombre, sucursal, fechaCorte, cantidadEntregada, referencia, img, id_corte  } = req.body


    try {
        //Se consulta para coprobar si hay incidencia 
        const aux = await pool.query("SELECT saldo_cierre FROM cortes WHERE id_corte = $1 ", [id_corte])
        if(aux.rows.length === 0){
            res.status(404).json({"menssage" : "ERROR AL BUSCAR EL CORTE"})

        }else {
            const data = aux.rows
            res.status(200).json({"menssage" : "Consulta realizada con exito", "dataCorte" : data})
            
        }

        try {
        
            const result = await pool.query("INSERT INTO depositos VALUES ()")
        } catch (error) {
            
        }
    
        
    } catch (error) {
        
    }
}



module.exports = {
    viewCortes,
    updateCortes,
    getCorte,
    postDeposito

}



